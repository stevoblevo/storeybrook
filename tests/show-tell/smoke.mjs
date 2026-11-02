// Run only in the authorized repository CI environment. No local sandbox workaround.
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile, appendFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

if (process.env.GITHUB_ACTIONS !== 'true') throw new Error('Run this browser smoke through the authorized GitHub Actions candidate workflow.');
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const root = resolve('.');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], {encoding:'utf8'}).trim();
assert.equal(sha, process.env.GITHUB_SHA, 'Checkout must match the exact push candidate.');
const results = [], mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.mp3':'audio/mpeg','.ttf':'font/ttf','.json':'application/json'};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const bytes = await readFile(file);
    res.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream','Content-Length':bytes.length});
    res.end(bytes);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  // Use the hosted runner's ordinary installed Chrome. Fail if its sandbox is unavailable.
  browser = await chromium.launch({channel:'chrome', headless:true, chromiumSandbox:true, args:['--mute-audio','--enable-automation']});
  const session = await browser.newBrowserCDPSession();
  const command = await session.send('Browser.getBrowserCommandLine');
  assert(!command.arguments.some(arg => /^--(no-sandbox|disable-setuid-sandbox|disable-seccomp-filter-sandbox|disable-namespace-sandbox)(=|$)/.test(arg)), 'Sandbox-disabling flags are forbidden.');
  const sandbox = await browser.newPage();
  await sandbox.goto('chrome://sandbox');
  const sandboxStatus = await sandbox.locator('body').innerText();
  assert.match(sandboxStatus, /Seccomp-BPF sandbox\s+Yes/);
  console.log(JSON.stringify({candidate:sha, browser:browser.version(), sandboxStatus, muted:true}));
  await sandbox.close();
  const context = await browser.newContext({viewport:{width:1280,height:900}, reducedMotion:'reduce', acceptDownloads:true});
  const externalRequests = new Set();
  context.on('request', req => { if (/^https?:/.test(req.url()) && !req.url().startsWith(origin+'/')) externalRequests.add(new URL(req.url()).origin); });
  async function check(name, route, action) {
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(origin+'/') && response.status() >= 400 && !response.url().endsWith('/favicon.ico')) errors.push(`${response.status()} ${new URL(response.url()).pathname}`); });
    try {
      const response = await page.goto(origin + '/show-tell/' + route);
      assert.equal(response.status(), 200);
      await action(page);
      assert.deepEqual(errors, [], 'No page errors or failed local requests.');
      results.push({name,pass:true});
    } catch (error) { results.push({name,pass:false,error:String(error),pageErrors:errors}); }
    finally { await page.close(); }
  }
  async function keyboardClick(page, selector) { await page.locator(selector).focus(); await page.keyboard.press('Enter'); }
  async function hasClass(page, selector, cls) { await page.waitForFunction(([sel,c]) => document.querySelector(sel).classList.contains(c), [selector,cls]); }

  await check('Hub and every exhibit link', '', async page => {
    const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(n=>n.href).filter(url=>url.startsWith(location.origin)));
    assert(links.length >= 10);
    for (const url of links) assert.equal((await context.request.get(url)).status(), 200, url);
  });
  const clues = [
    ['01-feast',['.moon','#napkin']], ['02-market',['#apron','#sixthPrint']],
    ['03-cottage',['#mending','#cushion']], ['04-tea',['#hem','#chair']],
    ['05-brook',['#apart','#handLine']]
  ];
  for (const [slug,controls] of clues) await check(`Piggie ${slug}: clue and reset`, `meef/sixth-piggie-${slug}.html`, async page => {
    for (const control of controls) await keyboardClick(page, control + (control === '.moon' ? ':first-of-type' : ''));
    await hasClass(page, '#unlock', 'show');
    await page.locator('#reset').click();
    assert.equal(await page.locator('#unlock').evaluate(n=>n.classList.contains('show')), false);
  });
  await check('Mallow: cups, six thoughts, remembered return', 'meef/sixth-piggie-06-mallows-little-while.html', async page => {
    await keyboardClick(page, '#sitDown');
    await page.locator('#cupForMallow').click(); await page.locator('#cupForPipkin').click();
    for (let i=0;i<6;i++) await page.locator(`[data-thought="${i}"]`).click();
    await hasClass(page, '#ending', 'show');
    assert.equal(await page.evaluate(()=>localStorage.getItem('piggie-sixth-mallow-found')), '1');
    await page.reload(); await hasClass(page, '#returning', 'show');
  });
  await check('Art wall: 18 decoded images, verdict persistence and export', 'malachi-art/art-wall.html', async page => {
    await page.waitForFunction(()=>document.querySelectorAll('#wall img').length===18);
    await page.locator('#wall img').evaluateAll(async images => { for(const image of images) {image.loading='eager'; await image.decode(); if(!image.naturalWidth) throw new Error(image.src);} });
    await page.locator('.vbtn[data-v="keep"]').first().click();
    await page.locator('textarea').first().fill('CI review note');
    await page.reload();
    assert.equal(await page.locator('.vbtn[data-v="keep"]').first().getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('textarea').first().inputValue(), 'CI review note');
    assert.equal(await page.locator('#pCount').innerText(), '1');
    const download = page.waitForEvent('download'); await page.locator('#exportBtn').click();
    assert.match(await readFile(await (await download).path(),'utf8'), /CI review note/);
  });
  await check('Malachi: four styles, dialogs, licensed fonts and public scenery', 'malachi-site/', async page => {
    await page.waitForFunction(()=>!!window.paperWorld);
    for(const spec of ['16px PaperSerif','italic 16px PaperSerif','16px PaperSans']) {
      const loaded = await page.evaluate(async spec => (await document.fonts.load(spec)).length, spec);
      assert(loaded>0, `Font did not load: ${spec}`);
    }
    await page.locator('#notebook-open').click(); await page.locator('#reflection').fill('Keep this thought');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#notebook-open').evaluate(n=>n===document.activeElement), true);
    for(const style of ['gen4','gen2','skeptic','semiotic']) {
      await page.locator('[data-fs-settings-open]').click();
      await page.locator(`[data-fs-mode="${style}"]`).click();
      await page.keyboard.press('Escape');
      await page.waitForFunction(style=>document.body.dataset.fsStyle===style, style);
      assert.equal(await page.locator('#reflection').inputValue(), 'Keep this thought');
    }
    for(let i=0;i<5;i++) {
      await page.locator(`[data-chapter="${i}"]`).click();
      await page.waitForFunction(i=>window.paperWorld.getState().chapter===i, i);
      await page.locator('#scene-art').evaluate(image=>image.decode());
    }
    assert.equal(await page.locator('audio').count(), 10, 'Only the ten approved excerpts have players.');
    assert.equal(await page.locator('[src*="edited-excerpts"],[src*="reference/image"]').count(), 0);
  });
  await check('Malachi: ten real muted MP3 decodes and manual play/pause/resume', 'malachi-site/', async page => {
    await page.waitForFunction(()=>document.querySelectorAll('.clip-audio').length===10);
    const clips=page.locator('.clip-audio');
    for(let i=0;i<10;i++) {
      const metadata=await clips.nth(i).evaluate(async audio=>{
        audio.muted=true; audio.preload='auto';
        await new Promise((resolve,reject)=>{audio.addEventListener('loadeddata',resolve,{once:true});audio.addEventListener('error',()=>reject(new Error('MP3 decode failed: '+audio.src)),{once:true});audio.load();});
        return {src:new URL(audio.src).pathname,duration:audio.duration};
      });
      assert(Number.isFinite(metadata.duration)&&metadata.duration>0, JSON.stringify(metadata));
      console.log(JSON.stringify({candidate:sha,decodedAudio:metadata}));
    }
    await keyboardClick(page, '#listen');
    await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>0.15));
    await page.locator('#listen').click();
    const paused=await page.evaluate(()=>window.paperWorld.getState().time);
    assert(await page.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.paused)));
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(()=>window.paperWorld.getState().time),paused);
    await page.locator('#listen').click();
    await page.waitForFunction(paused=>window.paperWorld.getState().time>paused+0.15,paused);
    await page.locator('[data-chapter="1"]').click();
    assert(await page.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.paused)));
    await page.locator('#listen').click();
    await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.src.endsWith('/knowledge.mp3')));
    await page.locator('#recording-open').click();
    await page.locator('#captions-toggle').click();
    assert.equal(await page.locator('#captions-toggle').getAttribute('aria-pressed'),'false');
    await page.locator('#stop-audio').click();
    assert(await page.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.paused)));
  });
  for(const variant of ['platform-prototype','hypermetapunk']) await check(`bespoke.gig ${variant}: journey and local post`, `bespoke/bespoke-gig-${variant}.html`, async page => {
    await page.locator('#next-step').click();
    assert.equal(await page.locator('.step.on').getAttribute('data-step'),'1');
    await page.locator('#f-title').fill('CI paper lantern'); await page.locator('#f-by').fill('Smoke test');
    await page.locator('#post-form button[type="submit"]').click();
    assert.match(await page.locator('#grid').innerText(), /CI paper lantern/);
    await page.locator('[data-filter="Grow"]').click();
    assert.equal(await page.locator('[data-filter="Grow"]').evaluate(n=>n.classList.contains('on')), true);
  });
  console.log(JSON.stringify({candidate:sha,externalOrigins:[...externalRequests],results,audibleVerification:false},null,2));
  if(process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `Candidate: \`${sha}\`\n\nSandboxed, muted browser automation; no audible or human visual verification.\n\n`+results.map(r=>`- ${r.pass?'PASS':'FAIL'}: ${r.name}${r.error?' — '+r.error:''}\n`).join(''));
  assert(results.every(r=>r.pass),'One or more browser checks failed.');
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
