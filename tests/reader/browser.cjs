const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium,webkit}=require('playwright');
const ROOT=path.resolve(__dirname,'../..'),engine=process.env.BROWSER||'chromium';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.md':'text/markdown'};
const server=http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const file=path.normalize(path.join(ROOT,p));if(!file.startsWith(ROOT+path.sep)){res.writeHead(403).end();return;}const data=await fs.readFile(file);res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'}).end(data);}catch{res.writeHead(404).end();}});
(async()=>{let browser;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 browser=await(engine==='webkit'?webkit.launch():chromium.launch({chromiumSandbox:true,executablePath:process.env.CHROME_BIN||undefined}));
 const page=await browser.newPage({viewport:{width:1360,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.addInitScript(()=>{
  const bus=new EventTarget(),state={spoken:[],current:null,cancels:0};
  state.voices=[{name:'Moira',lang:'en-IE',voiceURI:'moira-basic',localService:true,default:false},{name:'Moira (Enhanced)',lang:'en-IE',voiceURI:'moira-enhanced',localService:true,default:false},{name:'Samantha',lang:'en-US',voiceURI:'samantha',localService:true,default:true},{name:'Bad News',lang:'en-US',voiceURI:'bad-news',localService:true,default:false}];
  const synth={getVoices:()=>state.voices,speak(u){state.current=u;state.spoken.push({text:u.text,voice:u.voice&&u.voice.name,rate:u.rate,pitch:u.pitch});if(u.onstart)u.onstart();},cancel(){state.cancels++;},pause(){},resume(){},addEventListener:bus.addEventListener.bind(bus)};
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:synth});Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{constructor(t){this.text=t;}}});state.voicesChanged=()=>bus.dispatchEvent(new Event('voiceschanged'));window.__speech=state;
 });
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.evaluate(()=>__speech.spoken.length),0,'no autoplay');
 await page.locator('.sc-voice-options summary').click();
 const picker=page.locator('.sc-voice-options select[data-sb-voice]');assert.equal(await picker.inputValue(),'');
 await page.locator('[data-sc-read]').click();
 assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).voice),'Moira (Enhanced)');assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).pitch),1);
 await picker.selectOption('samantha');assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).voice),'Samantha');
 await page.locator('.sc-voice-options [data-sb-read-stop]').click();assert.equal(await page.evaluate(()=>Storeybrook.read.state),'idle');
 await page.locator('.sc-voice-options select[data-sb-rate]').selectOption('0.85');
 assert.deepEqual(await page.locator('select[data-sb-rate]').evaluateAll(xs=>xs.map(x=>x.value)),['0.85','0.85']);
 await page.reload();await page.locator('.sc-voice-options summary').click();assert.equal(await picker.inputValue(),'samantha');
 assert.deepEqual(await page.locator('select[data-sb-rate]').evaluateAll(xs=>xs.map(x=>x.value)),['0.85','0.85']);
 await page.locator('.sc-voice-options [data-sb-voice-preview]').click();assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).voice),'Samantha');
 await page.locator('.sc-voice-options [data-sb-read-stop]').click();
 await picker.selectOption('');await page.locator('[data-sc-read]').click();assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).voice),'Moira (Enhanced)');
 await page.locator('.sc-voice-options [data-sb-read-stop]').click();
 await page.evaluate(()=>{__speech.voices=[];__speech.voicesChanged();});assert.equal(await picker.isDisabled(),true);
 await page.evaluate(()=>{__speech.voices=[{name:'Daniel (Enhanced)',lang:'en-GB',voiceURI:'daniel-enhanced',localService:true,default:true}];__speech.voicesChanged();});assert.equal(await picker.isDisabled(),false);
 await page.locator('[data-sc-read]').click();assert.equal(await page.evaluate(()=>__speech.spoken.at(-1).voice),'Daniel (Enhanced)');
 await page.locator('.sc-voice-options [data-sb-read-stop]').click();
 await fs.mkdir(path.join(ROOT,'test-results'),{recursive:true});await page.screenshot({path:path.join(ROOT,`test-results/reader-${engine}-desktop.png`)});
 await page.setViewportSize({width:390,height:844});
 for(const id of ['look-daylight','look-knight','look-inkblot','look-comix','look-origami','look-skein']){await page.locator('#'+id).scrollIntoViewIfNeeded();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${id}`);}
 await page.locator('#look-knight').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(ROOT,`test-results/reader-${engine}-phone.png`)});
 const devices=page.locator('.sc-device');assert.equal(await devices.count(),6);
 for(let i=0;i<6;i++){const device=devices.nth(i);await device.scrollIntoViewIfNeeded();await device.locator('iframe.is-loaded').waitFor({state:'attached',timeout:30000});assert.equal(await device.locator('.sc-device__fallback').isVisible(),false);}
 await page.screenshot({path:path.join(ROOT,`test-results/mirrors-${engine}.png`)});
 assert.deepEqual(errors,[]);
 const taste=await page.evaluate(()=>Storeybrook.taste({log:false}).map(x=>({rule:x.rule,severity:x.severity,count:x.count,sample:x.sample})));console.log('Taste review:',JSON.stringify(taste));
 for(const theme of ['daylight','knight','inkblot','comix','origami','skein']){await page.goto(`${base}/docs.html?theme=${theme}#/components/Reader`);const frame=page.frameLocator('iframe.frame').first();await frame.locator('.sb-reader__choices').waitFor();await page.waitForFunction(()=>{const f=document.querySelector('iframe.frame');return f&&f.contentDocument&&f.clientHeight+4>=f.contentDocument.documentElement.scrollHeight;});assert.equal(await frame.locator('body').evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Reader preview overflow: ${theme}`);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`docs overflow: ${theme}`);}
 await page.screenshot({path:path.join(ROOT,`test-results/reader-docs-${engine}.png`)});assert.deepEqual(errors,[]);
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base);assert.equal(await nojs.locator('.sc-device__fallback a').count(),6);await nojs.close();
 console.log(`PASS ${engine}: visible voice choices, quality default, explicit saved choice, sample/stop, delayed voice enumeration, no autoplay, six phone scenes, mirror load, no-JS fallback. Speech is mocked; this is not audible voice-quality verification.`);
 }finally{if(browser)await browser.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
