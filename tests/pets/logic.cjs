/* plan S7: the crossing pets contract (family F9) and the pets' ink table, without a browser. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('project/components/pets.js', 'utf8');

function run(storage) {
  const events = [];
  const window = {
    Storeybrook: { creatureSVG: () => '<svg viewBox="0 0 200 200"></svg>' },
    localStorage: storage, devicePixelRatio: 1,
    matchMedia: () => ({ matches: false }),
    dispatchEvent: e => events.push(e), CustomEvent: class { constructor(type, o) { this.type = type; this.detail = o && o.detail; } }
  };
  const context = { window, document: {}, CustomEvent: window.CustomEvent, JSON, Object, Array, Math, Date, String };
  vm.createContext(context);
  vm.runInContext(source, context);
  return { pets: window.Storeybrook.pets, events };
}
function memory(initial) {
  const data = Object.assign({}, initial);
  return { data, getItem: k => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: k => { delete data[k]; } };
}

/* the contract's names, exactly */
let store = memory({ 'crossing:pets': JSON.stringify({ found: { 'df:firefly': 1, 'df:winkle': 2, 'hmp:a': 3, 'hmp:b': 4 }, active: { df: 'firefly' } }) });
let { pets, events } = run(store);
assert.deepEqual(Object.keys(pets), ['kit', 'key', 'version', 'list', 'has', 'find', 'count', 'total', 'draw']);
assert.equal(pets.kit, 'sb'); assert.equal(pets.key, 'crossing:pets'); assert.equal(pets.version, '1.4.0');
assert.deepEqual(Array.from(pets.list, p => p.id), ['egg', 'kit', 'octopus', 'bunny', 'sprite', 'pixie', 'saelion']);
for (const p of pets.list) {
  assert.deepEqual(Object.keys(p), ['id', 'name', 'line', 'how', 'where', 'look', 'o']);
  assert.match(p.where, /^https:\/\/stevoblevo\.github\.io\/storeybrook\//);
  assert.ok(p.o.form && p.o.stage != null, p.id + ' has creature options');
}
assert.equal(pets.list[6].look, null, 'Saelion comes after the six, in no look');
assert.equal(pets.list[1].where, 'https://stevoblevo.github.io/storeybrook/?look=knight');

/* has, find, count, total over one shared save */
assert.equal(pets.count(), 0);
assert.deepEqual({ ...pets.total() }, { sb: 0, df: 2, hmp: 2, all: 4 });
assert.equal(pets.find('kit'), true, 'newly found');
assert.equal(pets.find('sb:kit'), false, 'found once only, with or without the prefix');
assert.equal(pets.find('dragon'), false, 'not one of ours');
assert.equal(pets.has('kit'), true); assert.equal(pets.has('sb:kit'), true); assert.equal(pets.has('egg'), false);
let saved = JSON.parse(store.data['crossing:pets']);
assert.equal(typeof saved.found['sb:kit'], 'number');
assert.equal(saved.found['df:firefly'], 1, 'Depthfield entries are kept');
assert.equal(saved.found['hmp:b'], 4, 'Hypermetapunk entries are kept');
assert.deepEqual(saved.active, { df: 'firefly' }, 'find never changes active');
assert.equal(events.length, 1); assert.equal(events[0].type, 'sb:pet'); assert.equal(events[0].detail.id, 'kit');
pets.find('egg');
assert.equal(pets.count(), 2);
assert.deepEqual({ ...pets.total() }, { sb: 2, df: 2, hmp: 2, all: 6 });

/* totals are capped at each kit's set: 7, 5 and 5 */
store = memory({ 'crossing:pets': JSON.stringify({ found: Object.fromEntries([...Array(9)].map((_, i) => ['df:x' + i, 1]).concat([['sb:ghost', 1]])) }) });
({ pets } = run(store));
assert.deepEqual({ ...pets.total() }, { sb: 0, df: 5, hmp: 0, all: 5 }, 'unknown sb ids do not count');

/* a broken save and blocked storage do not throw */
store = memory({ 'crossing:pets': '{not json' });
({ pets } = run(store));
assert.equal(pets.count(), 0); assert.equal(pets.find('bunny'), true); assert.equal(pets.has('bunny'), true);
const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
({ pets } = run(blocked));
assert.equal(pets.find('pixie'), true, 'kept for the visit'); assert.equal(pets.has('pixie'), true); assert.equal(pets.find('pixie'), false);

/* draw never throws, and says false until it can draw */
assert.equal(pets.draw(null, 'kit'), false);
assert.equal(pets.draw({ drawImage() {} }, 'nobody', {}), false);

/* the ink table matches tokens.json and the creature's own rules in bundle.css */
const tokens = JSON.parse(fs.readFileSync('project/tokens.json', 'utf8'));
const byName = Object.fromEntries(tokens.color.tokens.map(t => [t.name, t.value]));
function resolve(v, th) { if (v && typeof v === 'object') v = v[th]; const m = /^\{(.+)\}$/.exec(v); return m ? resolve(byName[m[1]], th) : String(v).toLowerCase(); }
const table = vm.runInNewContext('(' + /var INK = (\{[\s\S]*?\n {2}\});/.exec(source)[1] + ')');
const names = ['art-line', 'art-light', 'art-shade', 'wash-rose', 'wash-sky', 'wash-sun', 'gamboge', 'tag-sun', 'tag-sky', 'tag-rose', 'tag-sea'];
const css = fs.readFileSync('project/components/bundle.css', 'utf8');
const fur = { default: /\.sbc-body \{ fill: var\(--sbc-fur, (#[0-9a-f]{6})\)/.exec(css)[1], arm: /\.sbc-arm \{[^}]*var\(--sbc-arm, (#[0-9a-f]{6})\)/.exec(css)[1] };
for (const th of tokens.color.themes.map(t => t.id)) {
  assert.ok(table[th], th + ' has inks');
  names.forEach((n, i) => assert.equal(table[th][i], resolve(byName[n], th), th + ' ' + n));
  const own = new RegExp('\\[data-theme="' + th + '"\\] \\.sb-creature \\{([^}]*)\\}').exec(css);
  const f = own && /--sbc-fur: (#[0-9a-f]{6})/.exec(own[1]), a = own && /--sbc-arm: (#[0-9a-f]{6})/.exec(own[1]);
  assert.equal(table[th][11], f ? f[1] : fur.default, th + ' fur');
  assert.equal(table[th][12], a ? a[1] : fur.arm, th + ' arm');
}

/* the showcase takes its pets from the kit */
const showcase = fs.readFileSync('site/showcase.js', 'utf8');
assert.ok(/S\.pets/.test(showcase) && !/id: 'octopus'/.test(showcase), 'showcase uses Storeybrook.pets');
assert.ok(/<script src="project\/components\/pets\.js"><\/script>/.test(fs.readFileSync('index.html', 'utf8')), 'the showcase loads pets.js');
console.log('pets logic: ok');
