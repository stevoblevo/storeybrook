/* family F9 and F10: the plate in a real browser. One source drawing through all six looks, the moods in the looks data,
   the Plate page in the docs, and the showcase's own taste. */
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

  /* the showcase passes its own taste: controls inside the closed voice options are not on the page */
  await page.goto(base);
  assert.deepEqual(await page.evaluate(() => Storeybrook.taste({ log: false }).filter(f => f.severity === 'warn')), [], 'showcase taste');

  /* the Plate page: six plates from one drawing */
  await page.goto(base + '/docs.html#/components/Plate');
  const frame = await (await page.locator('iframe.frame').first().elementHandle()).contentFrame();
  await frame.waitForSelector('#looks canvas >> nth=5');
  assert.deepEqual(await frame.evaluate(() => Storeybrook.looks.map(l => l.id + ':' + l.mood)), ['daylight:still', 'knight:lit', 'inkblot:still', 'comix:impact', 'origami:still', 'skein:still'], 'every look carries a mood (family F10)');
  const out = await frame.evaluate(() => {
    const S = Storeybrook, src = document.createElement('canvas'); src.width = src.height = 200;
    const g = src.getContext('2d'); g.fillStyle = '#6b8fae'; g.beginPath(); g.arc(100, 110, 60, 0, 7); g.fill(); g.fillStyle = '#1f2a37'; g.fillRect(60, 150, 80, 30);
    const before = src.toDataURL(), seen = {}, res = { media: Object.keys(S.plate.media), version: S.plateVersion, plates: {} };
    S.looks.forEach(l => {
      const c = S.plate(l.id, src), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0, sum = 0;
      for (let i = 0; i < d.length; i += 4) { if (d[i + 3] === 255) n++; sum += d[i] + d[i + 1] * 3 + d[i + 2] * 7; }
      res.plates[l.id] = { w: c.width, h: c.height, opaque: n / (d.length / 4), fresh: c !== src, unique: !seen[sum] }; seen[sum] = 1;
    });
    res.sourceKept = src.toDataURL() === before;
    res.same = S.plate('comix', src).toDataURL() === S.plate('comix', src).toDataURL();
    res.noWord = S.plate('comix', src, { word: '' }).toDataURL() !== S.plate('comix', src).toDataURL();
    res.byElement = (() => { const el = document.createElement('i'); el.setAttribute('data-theme', 'knight'); document.body.appendChild(el); const a = S.plate(el, src).toDataURL(); el.remove(); return a === S.plate('knight', src).toDataURL(); })();
    res.helpers = S.tint(src, '#f00').width === 200 && S.edges(src, [0, 0, 0], 2).height === 200;
    res.labels = [...document.querySelectorAll('canvas[role="img"]')].length;
    return res;
  });
  assert.deepEqual(out.media, ['daylight', 'knight', 'inkblot', 'comix', 'origami', 'skein']); assert.equal(out.version, '1.5.1');
  for (const [id, p] of Object.entries(out.plates)) { assert.equal(p.w, 200, id); assert.equal(p.h, 200, id); assert.ok(p.opaque > 0.99, id + ' covers its ground'); assert.ok(p.fresh && p.unique, id + ' is its own picture'); }
  assert.ok(out.sourceKept, 'the source drawing is never changed'); assert.ok(out.same, 'a plate is deterministic'); assert.ok(out.noWord, 'the sound word can be left out');
  assert.ok(out.byElement, 'an element gives its look'); assert.ok(out.helpers, 'tint and edges'); assert.equal(out.labels, 8, 'the source, the large plate and six small ones are named pictures');

  /* drawing on the source remakes the plates; the page does not scroll sideways on a phone */
  const first = await frame.evaluate(() => document.querySelector('#big canvas').toDataURL());
  const box = await frame.locator('#src').boundingBox(); await page.mouse.move(box.x + box.width * .7, box.y + box.height * .2); await page.mouse.down(); await page.mouse.move(box.x + box.width * .8, box.y + box.height * .3, { steps: 4 }); await page.mouse.up();
  await page.waitForTimeout(300);
  assert.notEqual(await frame.evaluate(() => document.querySelector('#big canvas').toDataURL()), first, 'the plate follows the drawing');
  /* a tap paints a dot, and a picked colour shows on the drawing's frame (Bleve's comment, 25 Nov) */
  const beforeTap = await frame.evaluate(() => document.querySelector('#src').toDataURL());
  await frame.locator('.sw[data-c="#d95f6a"]').click(); assert.equal(await frame.evaluate(() => getComputedStyle(document.querySelector('#src')).borderTopColor), 'rgb(217, 95, 106)', 'the frame takes the brush colour');
  await page.mouse.click(box.x + box.width * .15, box.y + box.height * .9); await page.waitForTimeout(250);
  assert.notEqual(await frame.evaluate(() => document.querySelector('#src').toDataURL()), beforeTap, 'a tap paints');
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(200);
  assert.ok(await frame.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll in the preview at 390 px');
  assert.deepEqual(errors, []);
  console.log(`plate browser (${engine}): ok`);
} finally { if (browser) await browser.close(); server.close(); } })().catch(e => { console.error(e); process.exit(1); });
