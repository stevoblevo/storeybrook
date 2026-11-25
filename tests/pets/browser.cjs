/* plan S7: the pets in a real browser: the showcase's pet book over the shared save, pets.draw and pen.sun. */
const assert = require('node:assert/strict'), http = require('node:http'), fs = require('node:fs/promises'), path = require('node:path');
const { chromium, webkit } = require('playwright');
const ROOT = path.resolve(__dirname, '../..'), engine = process.env.BROWSER || 'chromium';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/markdown' };
const server = http.createServer(async (req, res) => { try { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; const file = path.normalize(path.join(ROOT, p)); if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403).end(); return; } const data = await fs.readFile(file); res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' }).end(data); } catch { res.writeHead(404).end(); } });
(async () => { let browser; try {
  await new Promise(r => server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${server.address().port}`;
  browser = await (engine === 'webkit' ? webkit.launch() : chromium.launch({ chromiumSandbox: true, executablePath: process.env.CHROME_BIN || undefined }));
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }), errors = [];
  page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { sessionStorage.setItem('seeded', '1'); localStorage.setItem('crossing:pets', JSON.stringify({ found: { 'df:firefly': 1, 'df:winkle': 2, 'hmp:one': 3 }, active: { df: 'firefly' } })); } });
  await page.goto(base);
  assert.equal(await page.evaluate(() => Storeybrook.pets && Storeybrook.pets.version), '1.5.1');
  await page.locator('#front-creature').dispatchEvent('click'); /* a click event, not a tap: no full-screen request mid-test */
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('crossing:pets')));
  assert.equal(typeof saved.found['sb:egg'], 'number', 'tapping Saelion finds the egg');
  assert.equal(saved.found['df:winkle'], 2, 'night pets kept'); assert.equal(saved.found['hmp:one'], 3, 'dusk pets kept');
  assert.equal(saved.active.sb, 'egg', 'the showcase walks with the pet it found'); assert.equal(saved.active.df, 'firefly');
  await page.locator('#pet').dispatchEvent('click'); /* the pet walking with you opens the book */
  assert.match(await page.locator('#petbook-count').textContent(), /^1 of 7 pets found/);
  assert.match(await page.locator('#petbook-night').textContent(), /Night pets from Depthfield: 2 of 5/);
  const dusk = await page.locator('#petbook-dusk').textContent();
  assert.match(dusk, /Dusk pets from Hypermetapunk: 1 of 5/); assert.match(dusk, /Across the three: 4 of 17/);
  assert.equal(await page.locator('#petbook-dusk a').getAttribute('href'), 'https://stevoblevo.github.io/hypermetapunk/');
  assert.equal(await page.locator('.sc-petrow[aria-pressed="true"]').count(), 1);

  /* every pet draws, in three looks, and lands on the canvas */
  const drawn = await page.evaluate(async () => {
    const c = document.createElement('canvas'); c.width = c.height = 200; const g = c.getContext('2d'), P = Storeybrook.pets, out = {};
    for (const look of ['daylight', 'knight', 'inkblot']) for (const p of P.list) {
      let ok = false; for (let i = 0; i < 200 && !ok; i++) { g.clearRect(0, 0, 200, 200); ok = P.draw(g, p.id, { x: 100, y: 100, size: 120, look, t: i / 60, beat: i % 30 ? 0.2 : 1 }); if (!ok) await new Promise(r => setTimeout(r, 15)); }
      const px = g.getImageData(0, 0, 200, 200).data; let ink = 0; for (let k = 3; k < px.length; k += 4) if (px[k] > 200) ink++;
      out[look + ':' + p.id] = ok ? ink : -1;
    }
    return out;
  });
  for (const [k, v] of Object.entries(drawn)) assert.ok(v > 1500, k + ' drew (' + v + ' px)');

  /* the sun, from the pen */
  await page.addScriptTag({ url: base + '/project/components/paper.js' });
  const sun = await page.evaluate(() => {
    const c = document.createElement('canvas'); c.width = c.height = 160; const g = c.getContext('2d'), out = {};
    for (const look of ['daylight', 'knight', 'comix']) { const P = Storeybrook.pen(look); g.clearRect(0, 0, 160, 160); P.sun(g, { x: 80, y: 80, r: 40, t: 1.5 }); out[look] = Array.from(g.getImageData(80, 80, 1, 1).data); out[look + ':light'] = P.sun[2] === P.light[2] && P.light.length === 3; }
    return out;
  });
  const [r, gg, b] = sun.daylight; assert.ok(r > gg && gg > b && r > 180, 'a gamboge sun: ' + sun.daylight);
  assert.ok(Math.min(...sun.knight.slice(0, 3)) > 170, 'a pale moon: ' + sun.knight);
  assert.ok(sun.comix[0] > 200 && sun.comix[2] < 120, 'a printed yellow sun: ' + sun.comix);
  assert.ok(sun['daylight:light'], 'pen.sun[0..2] still read the light');
  assert.deepEqual(errors, []);
  console.log('pets browser (' + engine + '): ok');
} finally { if (browser) await browser.close(); server.close(); } })().catch(e => { console.error(e); process.exit(1); });
