// Only the already authorized, sandboxed hosted CI browser lane.
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
assert.equal(process.env.GITHUB_ACTIONS,'true');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const root=resolve('.'), out=resolve('tests/malachi-visual/output');
await mkdir(out,{recursive:true});
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(sha,process.env.GITHUB_SHA);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const f=resolve(root,'.'+p+(p.endsWith('/')?'index.html':''));if(!f.startsWith(root+sep)){res.writeHead(403).end();return;}const b=await readFile(f);const headers={'Content-Type':mime[extname(f)]||'application/octet-stream','Accept-Ranges':'bytes'};const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');if(range){const start=+range[1],end=range[2]?Math.min(+range[2],b.length-1):b.length-1;res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${b.length}`,'Content-Length':end-start+1});res.end(b.subarray(start,end+1));}else{res.writeHead(200,{...headers,'Content-Length':b.length});res.end(b);}}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true,args:['--mute-audio','--enable-automation']});
const report={sha,muted:true,audibleVerification:false,profiles:[],screenshots:[]};
try{
 const cdp=await browser.newBrowserCDPSession();const command=await cdp.send('Browser.getBrowserCommandLine');
 assert(!command.arguments.some(x=>/^--(no-sandbox|disable-setuid-sandbox|disable-seccomp-filter-sandbox|disable-namespace-sandbox)(=|$)/.test(x)));
 const sandbox=await browser.newPage();await sandbox.goto('chrome://sandbox');report.sandbox=await sandbox.locator('body').innerText();assert.match(report.sandbox,/Seccomp-BPF sandbox\s+Yes/);await sandbox.close();
 report.browser=browser.version();
 for(const profile of [{name:'desktop',width:1280,height:900},{name:'mobile',width:390,height:844},{name:'narrow',width:320,height:740},{name:'text200',width:390,height:844,textScale:2},{name:'tv',width:1280,height:900,density:true}]){
  for(const style of ['gen4','gen2','skeptic','semiotic']){
   const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+'/show-tell/malachi-site/');await page.waitForFunction(()=>!!window.paperWorld);
   await page.locator('[data-fs-settings-open]').click();await page.locator(`[data-fs-mode="${style}"]`).click();await page.keyboard.press('Escape');
   await page.waitForTimeout(2600);
   if(await page.locator('#reveal-note').isVisible())await page.locator('#reveal-close').click();
   if(profile.density){await page.locator('[data-fs-settings-open]').click();await page.locator('[data-fs-density]').click();await page.keyboard.press('Escape');}
   if(profile.textScale)await page.evaluate(()=>{
    // Deliberate text-size stress, not a claim of native OS/browser zoom.
    const nodes=[...document.querySelectorAll('body *')].filter(n=>n instanceof HTMLElement&&[...n.childNodes].some(c=>c.nodeType===Node.TEXT_NODE&&c.textContent.trim()));
    const sizes=nodes.map(n=>{const s=getComputedStyle(n);return[n,parseFloat(s.fontSize),parseFloat(s.lineHeight)];});
    for(const[n,f,l]of sizes){n.style.fontSize=`${f*2}px`;if(Number.isFinite(l))n.style.lineHeight=`${l*2}px`;}
   });
   // Longest real opening caption, through an actual manually-started public MP3.
   await page.locator('#listen').click();await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.readyState>=2&&a.currentTime>.15));
   const cue=await page.evaluate(()=>{const clip=window.SERMON.timeline.find(c=>c.id==='hail');const cue=window.SERMON.captions.filter(c=>c.start>=clip.start&&c.end<=clip.end).sort((a,b)=>b.text.length-a.text.length)[0];const a=[...document.querySelectorAll('audio')].find(a=>!a.paused);a.currentTime=cue.start-clip.start+.1;a.pause();return cue;});
   await page.waitForTimeout(350);
   const playback=await page.evaluate(()=>({caption:document.querySelector('#caption').textContent,players:[...document.querySelectorAll('audio')].map(a=>({time:a.currentTime,ready:a.readyState,paused:a.paused,src:a.src}))}));
   if(await page.locator('#reveal-note').isVisible())await page.locator('#reveal-close').click();
   await page.locator('.world-footer').evaluate(n=>n.scrollIntoView({block:'end'}));
   const name=`${profile.name}-${style}`;
   await page.screenshot({path:`${out}/${name}.png`,fullPage:false});
   await page.screenshot({path:`${out}/${name}-full.png`,fullPage:true});
   const geometry=await page.evaluate(()=>{
    const rect=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
    const caption=rect(document.querySelector('#caption-well')),nav=rect(document.querySelector('#journey'));
    const intersection={width:Math.max(0,Math.min(caption.right,nav.right)-Math.max(caption.x,nav.x)),height:Math.max(0,Math.min(caption.bottom,nav.bottom)-Math.max(caption.y,nav.y))};
    return {caption,nav,intersection,documentWidth:document.documentElement.scrollWidth,viewport:innerWidth,scrollY,captionHidden:document.querySelector('#caption-well').hidden,captionDisplay:getComputedStyle(document.querySelector('#caption-well')).display,captionText:rect(document.querySelector('#caption')),captionZ:getComputedStyle(document.querySelector('#caption-well')).zIndex,navZ:getComputedStyle(document.querySelector('.world-footer')).zIndex};
   });
   report.profiles.push({profile:profile.name,style,cue,playback,geometry,errors});report.screenshots.push(`${name}.png`,`${name}-full.png`);
   console.log(JSON.stringify({profile:profile.name,style,playback,geometry,errors}));await context.close();
  }
 }
}finally{await writeFile(`${out}/receipt.json`,JSON.stringify(report,null,2));await browser.close();await new Promise(r=>server.close(r));}
