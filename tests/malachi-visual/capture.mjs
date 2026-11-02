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
   // Longest real opening caption, through an actual manually-started public MP3.
   try{await page.locator('#listen').click({timeout:3000});}catch(e){errors.push('Listen pointer activation failed: '+e.message);await page.screenshot({path:`${out}/${profile.name}-${style}-activation-failure.png`});await page.locator('#listen').focus();await page.keyboard.press('Enter');}
   await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.readyState>=2&&a.currentTime>.15));
   const cue=await page.evaluate(()=>{const clip=window.SERMON.timeline.find(c=>c.id==='hail');const cue=window.SERMON.captions.filter(c=>c.start>=clip.start&&c.end<=clip.end).sort((a,b)=>b.text.length-a.text.length)[0];const a=[...document.querySelectorAll('audio')].find(a=>!a.paused);a.currentTime=cue.start-clip.start+.1;a.pause();return cue;});
   await page.waitForTimeout(350);
   const playback=await page.evaluate(()=>({caption:document.querySelector('#caption').textContent,players:[...document.querySelectorAll('audio')].map(a=>({time:a.currentTime,ready:a.readyState,paused:a.paused,src:a.src}))}));
   if(profile.textScale)await page.evaluate(()=>{
    // Deliberate text-size stress, not a claim of native OS/browser zoom.
    const nodes=[...document.querySelectorAll('body *')].filter(n=>n instanceof HTMLElement&&(n.matches('button,input,select,textarea')||[...n.childNodes].some(c=>c.nodeType===Node.TEXT_NODE&&c.textContent.trim())));
    const sizes=nodes.map(n=>{const s=getComputedStyle(n);return[n,parseFloat(s.fontSize),parseFloat(s.lineHeight)];});
    for(const[n,f,l]of sizes){n.style.setProperty('font-size',`${f*2}px`,'important');if(Number.isFinite(l))n.style.setProperty('line-height',`${l*2}px`,'important');}
   });
   if(await page.locator('#reveal-note').isVisible())await page.locator('#reveal-close').click();
   await page.locator('.world-footer').evaluate(n=>n.scrollIntoView({block:'end'}));
   const name=`${profile.name}-${style}`;
   await page.screenshot({path:`${out}/${name}.png`,fullPage:false});
   await page.screenshot({path:`${out}/${name}-full.png`,fullPage:true});
   const geometry=await page.evaluate(()=>{
    const rect=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
    const caption=rect(document.querySelector('#caption-well')),nav=rect(document.querySelector('#journey'));
    const intersection={width:Math.max(0,Math.min(caption.right,nav.right)-Math.max(caption.x,nav.x)),height:Math.max(0,Math.min(caption.bottom,nav.bottom)-Math.max(caption.y,nav.y))};
    return {caption,nav,intersection,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,viewport:innerWidth,viewportHeight:innerHeight,scrollY,art:rect(document.querySelector('#scene-art')),captionHidden:document.querySelector('#caption-well').hidden,captionDisplay:getComputedStyle(document.querySelector('#caption-well')).display,captionFont:getComputedStyle(document.querySelector('#caption')).fontSize,captionText:rect(document.querySelector('#caption')),captionZ:getComputedStyle(document.querySelector('#caption-well')).zIndex,navZ:getComputedStyle(document.querySelector('.world-footer')).zIndex};
   });
   const checks={captionMatches:playback.caption===cue.text,captionVisible:!geometry.captionHidden&&geometry.caption.height>0,noNavOverlap:geometry.intersection.height===0,noHorizontalOverflow:geometry.documentWidth<=geometry.viewport,captionWithinViewport:geometry.caption.x>=0&&geometry.caption.right<=geometry.viewport};
   report.profiles.push({profile:profile.name,style,cue,playback,geometry,checks,errors});report.screenshots.push(`${name}.png`,`${name}-full.png`);
   console.log(JSON.stringify({profile:profile.name,style,geometry,checks,errors}));await context.close();
  }
 }
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce',acceptDownloads:true});
 const page=await context.newPage();await page.goto(origin+'/show-tell/malachi-site/');await page.waitForFunction(()=>!!window.paperWorld);
 if(await page.locator('#moment-select').count()){
  report.art=[];
  const options=await page.locator('#moment-select option').evaluateAll(ns=>ns.map(n=>({value:n.value,text:n.textContent})));
  assert.equal(options.length,17,'16 wall moments plus the original gospel interlude');
  for(const option of options){
   await page.locator('#moment-select').selectOption(option.value);
   assert(await page.locator('audio').evaluateAll(ns=>ns.every(n=>n.paused)),'Browsing never starts audio');
   const count=await page.locator('#moment-variants button').count();
   for(let v=0;v<Math.max(1,count);v++){
    if(count)await page.locator('#moment-variants button').nth(v).click();
    const image=await page.locator('#scene-art').evaluate(async n=>{await n.decode();return{src:new URL(n.src).pathname,alt:n.alt,width:n.naturalWidth,display:getComputedStyle(n).objectFit};});
    assert(image.width>0&&image.alt.length>20);assert.equal(image.display,'contain');report.art.push({moment:option.value,...image});if(count){await page.locator('#art-wrap').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/variant-${option.value}-${v}.png`});}
   }
  }
  assert.equal(new Set(report.art.filter(i=>i.src.endsWith('.png')).map(i=>i.src)).size,18);
  // Selecting a moment must start that cue, never resume an earlier position in the same clip.
  await page.locator('#moment-select').selectOption('2');await page.locator('#listen').click();await page.waitForFunction(()=>window.paperWorld.getState().time>3.8);await page.locator('#listen').click();
  await page.locator('#moment-select').selectOption('3');await page.locator('#listen').click();await page.waitForFunction(()=>window.paperWorld.getState().time>=22.26&&window.paperWorld.getState().time<25);await page.locator('#listen').click();
  assert.equal(await page.locator('#moment-select').inputValue(),'3');
  await page.locator('#moment-select').selectOption('4');await page.locator('#listen').click();await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.readyState>=2));
  await page.locator('audio').evaluateAll(ns=>{const a=ns.find(a=>!a.paused);a.currentTime=59-37.95;a.pause();});
  await page.waitForFunction(()=>document.querySelector('#moment-select').value==='5');
  await page.locator('#workshop-open').click();assert.match(await page.locator('#workshop-passage').innerText(),/Information can help/);
  await page.locator('#voice-direction').fill('Where does the map stop?');
  const downloading=page.waitForEvent('download');await page.locator('#save-workshop').click();const download=await downloading;
  const notes=JSON.parse(await readFile(await download.path(),'utf8'));assert.equal(notes.source_clip_id,'knowledge');assert.equal(notes.phrase,'Where does the map stop?');assert.equal(notes.format,'passage-notes-v1');
  assert(!/synthetic takes pending|No cloned take|future take/.test(await page.locator('body').innerText()));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#workshop-open').evaluate(n=>n===document.activeElement),true);
  report.interactions='PASS: all 18 PNGs + gospel, both variants, no audio on browse, selected-cue seek, automatic art cue, source-matched notes export, Escape focus';
  report.layoutPass=report.profiles.every(p=>Object.values(p.checks).every(Boolean)&&p.errors.length===0);
  assert(report.layoutPass,'Candidate geometry or caption regression; inspect screenshots and receipt.');
 }
 await context.close();

}finally{await writeFile(`${out}/receipt.json`,JSON.stringify(report,null,2));await browser.close();await new Promise(r=>server.close(r));}
