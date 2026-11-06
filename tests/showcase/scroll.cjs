/* plan S5: deterministic coverage of scroll state and progressive mirror loading. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('site/showcase.js', 'utf8');
const ids = ['daylight', 'knight', 'inkblot', 'comix', 'origami', 'skein'];
let layouts = 0;
const context = {
  current: null, root: { setAttribute() {} }, links: {}, innerWidth: 1200,
  frontBrook: { stones: ids.map((id, i) => ({ id, state: i ? 'open' : 'current' })), layout() { layouts++; } },
  visited: {}, ready: false, look: id => ({name:id}),
  S: { unlocks: {has:()=>true}, unlock() {} },
  location: {href:'https://example.org/'}, URL, history: {replaceState() {}}
};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('  function enter(sec)'), source.indexOf('  function pick()')), context);
const scenes = ids.map(id => ({getAttribute:name=>id}));
context.enter(scenes[0]);
assert.equal(layouts, 0, 'unchanged initial map is not rebuilt');
context.enter(scenes[1]);
assert.equal(layouts, 1, 'one rebuild, not six, on scene transition');
assert.equal(context.frontBrook.stones[0].state, 'done');
assert.equal(context.frontBrook.stones[1].state, 'current');
context.enter(scenes[1]);
assert.equal(layouts, 1, 'same scene is a no-op');
context.enter(scenes[0]);
assert.equal(layouts, 2);
assert.equal(context.frontBrook.stones[1].state, 'done');
context.visited = {}; context.current = null; context.enter(scenes[0]);
assert.equal(context.frontBrook.stones[1].state, 'open', 'restart clears walked state');
assert.equal(layouts, 3);

function mirrorHarness(observer = true) {
  const figures = [0, 1].map(() => {
    const f = { iframe:null, status:{textContent:'Live preview'}, fallback:{hidden:false} };
    f.screen = {clientWidth:320, appendChild(node) {f.iframe=node;}};
    f.getAttribute = key => ({'data-src':'site/mirror.html?look=knight', 'data-w':'1920','data-h':'1080'}[key]);
    f.querySelector = () => ({textContent:'TV preview'});
    return f;
  });
  let nextTimer=0; const timers = new Map();
  const ctx = {
    $$:()=>figures,
    $:(selector, f)=> selector==='iframe' ? f.iframe : selector==='.sc-device__screen' ? f.screen : selector==='.sc-device__status' ? f.status : f.fallback,
    doc:{createElement:()=>({style:{},classes:new Set(),handlers:{},setAttribute(){},addEventListener(type,cb){this.handlers[type]=cb;},get classList(){return {add:n=>this.classes.add(n)};}})},
    setTimeout:cb=>{timers.set(++nextTimer, cb);return nextTimer;}, clearTimeout:id=>timers.delete(id),
    addEventListener(){}, window:{},
  };
  // fit queries the screen, not the figure.
  for (const f of figures) Object.defineProperty(f.screen,'iframe',{get:()=>f.iframe});
  if(observer) {
    ctx.IntersectionObserver = function(cb, options) {ctx.observer={cb, options, observed:[], removed:[]};this.observe=f=>ctx.observer.observed.push(f);this.unobserve=f=>ctx.observer.removed.push(f);};
    ctx.window.IntersectionObserver = ctx.IntersectionObserver;
  }
  vm.createContext(ctx);
  vm.runInContext(source.slice(source.indexOf('  var devices ='), source.indexOf('  /* ---------- start ---------- */')), ctx);
  return {ctx, figures, timers};
}
let {ctx, figures, timers} = mirrorHarness();
assert.equal(ctx.observer.options.rootMargin, '1600px 0px');
assert.equal(figures[0].iframe, null, 'distant preview is not fetched');
ctx.observer.cb([{target:figures[0],isIntersecting:true}]);
const frame = figures[0].iframe;
assert.match(figures[0].status.textContent,/Loading/);
assert.equal(figures[0].fallback.hidden,false);
ctx.load(figures[0]); assert.equal(figures[0].iframe,frame,'repeated load does not duplicate frame');
[...timers.values()][0]();
assert.match(figures[0].status.textContent,/longer/);
frame.contentDocument={querySelector:()=>({})}; frame.handlers.load();
assert.equal(figures[0].fallback.hidden,true,'late success replaces fallback');
assert.ok(frame.classes.has('is-loaded')); assert.equal(timers.size,0);
ctx.load(figures[1]); figures[1].iframe.handlers.error();
assert.match(figures[1].status.textContent,/could not load/);
assert.equal(figures[1].fallback.hidden,false);
assert.equal(timers.size,0);
({ctx,figures}=mirrorHarness(false));
assert.ok(figures.every(f=>f.iframe),'no IntersectionObserver loads all previews');
figures[0].iframe.contentDocument={querySelector:()=>null};figures[0].iframe.handlers.load();
assert.match(figures[0].status.textContent,/could not load/,'error document is not a valid preview');
const html=fs.readFileSync('index.html','utf8');
assert.equal((html.match(/class="sc-device__fallback"/g)||[]).length,6);
assert.equal((html.match(/>Open this preview<\/a>/g)||[]).length,6,'every preview has a static no-JS link');
assert.match(source,/behavior: S\.reducedMotion\(\) \? 'auto' : 'smooth'/);
console.log('PASS: batched scene updates, restart, mirror preload, loading, timeout, late success, failure, no observer and static fallbacks');
