/* plan S10: every version that has a frozen front page opens it, on its own runtime, with nothing missing. */
const assert = require('node:assert/strict'), http = require('node:http'), fs = require('node:fs/promises'), path = require('node:path');
const { chromium, webkit } = require('playwright');
const ROOT = path.resolve(__dirname, '../..'), engine = process.env.BROWSER || 'chromium';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/markdown', '.webmanifest': 'application/manifest+json' };
const server = http.createServer(async (req, res) => { try { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; const file = path.normalize(path.join(ROOT, p)); if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403).end(); return; } const data = await fs.readFile(file); res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' }).end(data); } catch { res.writeHead(404).end(); } });
(async () => { let browser; try {
  await new Promise(r => server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${server.address().port}`;
  browser = await (engine === 'webkit' ? webkit.launch() : chromium.launch({ chromiumSandbox: true, executablePath: process.env.CHROME_BIN || undefined }));
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }), errors = []; let missing = [];
  page.on('pageerror', e => errors.push(String(e))); page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) missing.push(r.url()); });
  const versions = [];
  for (const ver of (await fs.readdir(path.join(ROOT, 'v'))).sort()) { try { await fs.access(path.join(ROOT, 'v', ver, 'index.html')); versions.push(ver); } catch { /* a runtime with no frozen page */ } }
  assert.ok(versions.length >= 3, 'frozen front pages are present');
  for (const ver of versions) {
    missing = []; await page.goto(`${base}/v/${ver}/`); await page.waitForLoadState('networkidle');
    assert.equal(await page.evaluate(() => Storeybrook.version), ver, `v/${ver}/ runs its own runtime`);
    assert.ok(await page.evaluate(() => [...document.styleSheets].filter(s => s.href && s.href.startsWith(location.origin)).every(s => s.href.includes(location.pathname))), `v/${ver}/ loads its own styles`);
    assert.equal(await page.getAttribute('link[rel="canonical"]', 'href'), '../../', `v/${ver}/ names the current page as canonical`);
    assert.deepEqual(missing.filter(u => !u.endsWith('/favicon.ico')), [], `v/${ver}/ has every file it asks for`);
  }
  const latest = JSON.parse(await fs.readFile(path.join(ROOT, 'v/index.json'), 'utf8')).latest;
  assert.ok(versions.includes(latest), 'the latest release has its front page');
  assert.equal(await fs.readFile(path.join(ROOT, 'v', latest, 'site/showcase.js'), 'utf8'), await fs.readFile(path.join(ROOT, 'site/showcase.js'), 'utf8'), 'the latest frozen page is the page on main');
  assert.deepEqual(errors, []);
  console.log(`landing browser (${engine}): ok, ${versions.join(', ')}`);
} finally { if (browser) await browser.close(); server.close(); } })().catch(e => { console.error(e); process.exit(1); });
