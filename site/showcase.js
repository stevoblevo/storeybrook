/* Storeybrook showcase — behaviour. Uses only window.Storeybrook (components/bundle.js). */
(function () {
  'use strict';
  var S = window.Storeybrook;
  if (!S) return;
  var doc = document, root = doc.documentElement;
  function $(s, el) { return (el || doc).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); }

  var LOOKS = [
    { id: 'daylight', name: 'Meta Daylight', sub: 'the front page' },
    { id: 'knight', name: 'Knight Night', sub: 'bedtime' },
    { id: 'inkblot', name: 'Ink Blot', sub: 'e-ink and print' },
    { id: 'comix', name: 'Comix', sub: 'the loud chapter' },
    { id: 'origami', name: 'Origami', sub: 'making things' },
    { id: 'skein', name: 'Skein silk', sub: 'the album' }
  ];
  function look(id) { return LOOKS.filter(function (l) { return l.id === id; })[0]; }

  /* Where the reader asked to start: ?look= (Storeybrook's own) or ?theme= */
  var q = new URLSearchParams(location.search);
  var startAt = q.get('look') || q.get('theme');

  S.init();
  S.rewards.paint();
  S.unlocks.paint();

  /* ---------- the front page: the brook is the map ---------- */
  var visited = {};
  var frontBrook = S.brook($('#front-brook'), {
    seed: 7,
    stones: LOOKS.map(function (l, i) { return { id: l.id, label: l.name, sub: l.sub, state: i === 0 ? 'current' : 'open', mark: String(i + 1) }; }),
    onStep: function (stone) { go(stone.id); }
  });
  function go(id) {
    var el = doc.getElementById('look-' + id);
    if (el) el.scrollIntoView({ behavior: S.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- the scene in view sets the page's look ---------- */
  var scenes = $$('main > .sc[data-theme]');
  var links = {};
  $$('[data-scene-link]').forEach(function (a) { links[a.getAttribute('data-scene-link')] = a; });
  var current = null, ready = false;

  function enter(sec) {
    if (sec === current) return;
    current = sec;
    root.setAttribute('data-theme', sec.getAttribute('data-theme'));
    var id = sec.getAttribute('data-scene');
    if (!id) return;
    Object.keys(links).forEach(function (k) { links[k].setAttribute('aria-current', String(k === id)); });
    if (links[id] && links[id].scrollIntoView && innerWidth < 1100) {
      var nav = links[id].parentNode; nav.scrollTo({ left: links[id].offsetLeft - 16, behavior: 'smooth' });
    }
    if (frontBrook) {
      LOOKS.forEach(function (l) { frontBrook.set(l.id, l.id === id ? 'current' : visited[l.id] ? 'done' : 'open'); });
    }
    if (!visited[id]) {
      visited[id] = true;
      var first = !S.unlocks.has('look-' + id);
      S.unlock('look-' + id, { name: look(id).name, toast: false });
      /* a look walked for the first time drops a nougat, from its place in the bar */
      if (ready && first) S.rewards.drop(1, { from: links[id], to: $('#jar'), reason: 'walking to ' + look(id).name });
    }
    try {
      var u = new URL(location.href);
      u.searchParams.delete('theme');
      if (id === 'daylight') u.searchParams.delete('look'); else u.searchParams.set('look', id);
      history.replaceState(null, '', u.href);
    } catch (e) {}
  }
  function pick() {
    var y = innerHeight * 0.38, hit = scenes[0];
    scenes.forEach(function (s) { if (s.getBoundingClientRect().top <= y) hit = s; });
    enter(hit);
  }
  var tick = 0;
  addEventListener('scroll', function () { if (!tick) tick = requestAnimationFrame(function () { tick = 0; pick(); }); }, { passive: true });
  addEventListener('resize', pick);

  /* ---------- read it to me (the front page) ---------- */
  $$('[data-sc-read]').forEach(function (b) {
    b.addEventListener('click', function () { var t = $(b.getAttribute('data-sc-read')); if (t) S.read.toggle(t); });
  });

  /* ---------- Ink Blot: turn the slate's pages, print it ---------- */
  var spreadEl = $('#ink-spread');
  $$('[data-sc-turn]').forEach(function (b) {
    b.addEventListener('click', function () { var sp = spreadEl && spreadEl.__spread; if (sp) sp[b.getAttribute('data-sc-turn')](); });
  });
  var printBtn = $('#ink-print');
  if (printBtn) printBtn.addEventListener('click', function () {
    doc.body.classList.add('sc-print-ink');
    var done = function () { doc.body.classList.remove('sc-print-ink'); removeEventListener('afterprint', done); };
    addEventListener('afterprint', done);
    print();
  });
  S.brook($('#ink-brook'), {
    seed: 3,
    stones: [{ id: 'porch', label: 'The porch', state: 'done' }, { id: 'wobble', label: 'The wobbly one', state: 'done' },
      { id: 'far', label: 'The far stone', sub: 'reading now', state: 'current', mark: '3' }, { id: 'home', label: 'Home', state: 'open', mark: '4' }]
  });

  /* ---------- Origami: the level maker ---------- */
  var STAGES = ['An egg, for now.', 'A kit: ears first.', 'A bun, with two arms.', 'A sprite: small wings, three arms.', 'Saelion, all grown.'];
  var mk = { n: $('#mk-n'), out: $('#mk-n-out'), lock: $('#mk-lock'), down: $('#mk-down'), host: $('#mk-brook'), walked: 0 };
  var grower = S.creature($('#mk-creature'), { form: 'saelion', stage: 0 });
  var mkOpts = { seed: 11, stones: [], direction: 'across', onStep: function (s, i) { if (i === mk.walked) walk(); } };
  var mkBrook = null;
  function kind() { var r = $('input[name="mk-kind"]:checked'); return r ? r.value : 'Story'; }
  function refold() {
    var n = +mk.n.value, k = kind();
    mk.out.textContent = String(n);
    mk.n.style.setProperty('--p', ((n - 3) / 5 * 100) + '%');
    if (mk.walked > n - 1) mk.walked = n - 1;
    var stones = [];
    for (var i = 0; i < n; i++) {
      var last = i === n - 1, locked = last && mk.lock.checked && mk.walked < i;
      stones.push({
        id: 'mk' + i, label: k + ' ' + (i + 1),
        state: i < mk.walked ? 'done' : i === mk.walked ? 'current' : locked ? 'locked' : 'open',
        sub: i === mk.walked ? 'you are here' : locked ? 'walk the rest first' : '',
        mark: String(i + 1), why: 'Walk every other stone first to open the last one.'
      });
    }
    mkOpts.stones.length = 0; Array.prototype.push.apply(mkOpts.stones, stones);
    mkOpts.direction = mk.down.checked ? 'down' : 'across';
    mk.host.classList.toggle('is-down', mk.down.checked);
    if (!mkBrook) mkBrook = S.brook(mk.host, mkOpts); else mkBrook.layout();
    var stage = Math.min(4, Math.round(mk.walked / Math.max(1, n - 1) * 4));
    if (grower) grower.set({ stage: stage });
    $('#mk-stage').textContent = STAGES[stage];
  }
  function walk() {
    var n = +mk.n.value;
    if (mk.walked >= n - 1) { S.toast('<span>Every stone is walked. <b>Start over</b> to fold a new brook.</span>', { ms: 2600 }); return; }
    mk.walked++;
    refold();
    S.rewards.drop(1, { from: $('#mk-walk'), to: $('#jar'), reason: 'walking a stone' });
  }
  if (mk.host) {
    [mk.n, mk.lock, mk.down].forEach(function (c) { c.addEventListener('input', refold); c.addEventListener('change', refold); });
    $$('input[name="mk-kind"]').forEach(function (r) { r.addEventListener('change', refold); });
    $('#mk-walk').addEventListener('click', walk);
    $('#mk-reset').addEventListener('click', function () { mk.walked = 0; refold(); });
    refold();
  }

  /* ---------- Skein silk: keep the album ---------- */
  var keep = $('#keep');
  if (keep) keep.addEventListener('click', function () {
    var n = LOOKS.filter(function (l) { return S.unlocks.has('look-' + l.id); }).length;
    $('#keep-line').textContent = n === LOOKS.length ? 'Kept. All six stickers, and the jar, are yours.' : 'Kept. ' + n + ' of six stickers so far; the rest are waiting down the brook.';
    S.toast('<span class="sb-nougat" style="--n:34px">' + S.nougatSVG(6) + '</span><span><b>The album</b> is kept.</span>', { ms: 2800 });
  });
  var jar = $('#jar');
  if (jar) { jar.setAttribute('aria-label', jar.getAttribute('aria-label') + '. Open the album'); jar.addEventListener('click', function () { go('skein'); }); }

  /* ---------- start the book again ---------- */
  var restart = $('#restart');
  if (restart) restart.addEventListener('click', function () {
    S.unlocks.list().forEach(function (id) { if (/^look-/.test(id)) S.unlocks.lock(id); });
    S.rewards.set(0); S.unlocks.paint();
    visited = {}; current = null;
    go('daylight');
    S.toast('<span>The book is new again.</span>', { ms: 2200 });
  });

  /* ---------- mirror windows: lazy frames, scaled into their bezels ---------- */
  var devices = $$('.sc-device');
  function fit(fig) {
    var scr = $('.sc-device__screen', fig), f = $('iframe', scr);
    if (!f) return;
    var k = scr.clientWidth / +fig.getAttribute('data-w');
    f.style.transform = 'scale(' + k + ')';
  }
  function load(fig) {
    if ($('iframe', fig)) return;
    var f = doc.createElement('iframe');
    f.src = fig.getAttribute('data-src');
    f.width = fig.getAttribute('data-w'); f.height = fig.getAttribute('data-h');
    f.setAttribute('tabindex', '-1'); f.setAttribute('aria-hidden', 'true'); f.title = fig.querySelector('figcaption').textContent;
    $('.sc-device__screen', fig).appendChild(f);
    fit(fig);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } }); }, { rootMargin: '400px 0px' });
    devices.forEach(function (d) { io.observe(d); });
  } else devices.forEach(load);
  if (window.ResizeObserver) { var ro = new ResizeObserver(function () { devices.forEach(fit); }); devices.forEach(function (d) { ro.observe(d); }); }
  else addEventListener('resize', function () { devices.forEach(fit); });

  /* ---------- start ---------- */
  if (startAt && look(startAt) && startAt !== 'daylight') {
    var el = doc.getElementById('look-' + startAt);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  pick();
  ready = true;
})();
