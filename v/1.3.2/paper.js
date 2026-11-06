/* Storeybrook Paper 1.3.0 · folded paper for canvas and the page. An add-on: load it after bundle.js.
     <script src="components/bundle.js"></script><script src="components/paper.js"></script>
   Storeybrook.pen(look)   a look's resolved inks, its paper stocks and materials, and a pen that draws shapes as folded
                           paper lit from one direction (plan O1; the Storeybrook half of family task F4).
   Storeybrook.folded(el)  the same folds as an SVG figure in the page, which folds itself on reveal (plan O3).
   Storeybrook.looks       the six looks as data: { id, name, light, motion, print }.
   No dependencies, no network. Reduced motion and Ink Blot draw the finished fold at once. Budget: 28 KB. */
(function (w, d) {
  'use strict';
  var S = w.Storeybrook;
  if (!S || S.pen) return;
  var VERSION = '1.3.0';

  var LOOKS = [
    { id: 'daylight', name: 'Meta Daylight', light: true, motion: true, print: false },
    { id: 'knight', name: 'Knight Night', light: false, motion: true, print: false },
    { id: 'inkblot', name: 'Ink Blot', light: true, motion: false, print: true },
    { id: 'comix', name: 'Comix', light: true, motion: true, print: false },
    { id: 'origami', name: 'Origami', light: true, motion: true, print: false },
    { id: 'skein', name: 'Skein silk', light: true, motion: true, print: false }
  ];
  var IDS = LOOKS.map(function (l) { return l.id; });
  var INKS = ['paper', 'surface', 'page', 'ink', 'ink-muted', 'line', 'accent', 'cue', 'art-line', 'art-light', 'art-shade', 'art-stone', 'art-water',
    'wash-sky', 'wash-rose', 'wash-sun', 'wash-meadow', 'wash-brook', 'paper-kami', 'paper-washi', 'paper-kraft', 'paper-foil'];
  var STOCKS = ['kami', 'washi', 'kraft', 'foil'];
  /* how each look lays its paper: outline strength, crease strength, the material over each facet, tone steps */
  var STYLE = {
    daylight: { line: 0.22, crease: 1, mat: 'fibre' },
    knight: { line: 0.2, crease: 0.9, mat: 'fibre' },
    inkblot: { line: 1, crease: 1, mat: 'stipple', mono: true },
    comix: { line: 1, crease: 0.55, mat: 'halftone', steps: 3 },
    origami: { line: 0.3, crease: 1.2, mat: 'fibre' },
    skein: { line: 0.3, crease: 0.8, mat: 'knit', stitch: true }
  };

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function css(c, a) { c = c || [0, 0, 0]; return 'rgba(' + Math.round(clamp(c[0], 0, 255)) + ',' + Math.round(clamp(c[1], 0, 255)) + ',' + Math.round(clamp(c[2], 0, 255)) + ',' + (a == null ? 1 : +(+a).toFixed(3)) + ')'; }
  function rand(seed) { var s = (seed >>> 0) || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function reduced(look) { try { return look === 'inkblot' || w.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  /* ---------- resolving a look's inks: any CSS colour, through one pixel ---------- */
  var px1;
  function toRGB(c) {
    if (c == null) return null;
    if (Array.isArray(c)) return c.slice(0, 3);
    if (!px1) { var cv = d.createElement('canvas'); cv.width = cv.height = 1; px1 = cv.getContext('2d', { willReadFrequently: true }); }
    px1.clearRect(0, 0, 1, 1); px1.fillStyle = '#010203'; px1.fillStyle = String(c);
    if (px1.fillStyle === '#010203' && !/^#010203$/i.test(c)) return null;
    px1.fillRect(0, 0, 1, 1); var p = px1.getImageData(0, 0, 1, 1).data;
    return p[3] ? [p[0], p[1], p[2]] : null;
  }
  function lookOf(el) {
    var t = el && el.closest && el.closest('[data-theme]'), v = (t && t.getAttribute('data-theme')) || d.documentElement.getAttribute('data-theme') || 'daylight';
    return IDS.indexOf(v) < 0 ? 'daylight' : v;
  }

  /* ---------- materials: small tiles in the look's own inks, repeated ---------- */
  function tile(P, kind) {
    var key = '_' + kind; if (P[key]) return P[key];
    var c = d.createElement('canvas'), g, r = rand(kind.length * 97 + 13), i, n;
    var line = P.inks['art-line'] || [40, 40, 40], light = P.inks['art-light'] || [255, 255, 255];
    if (kind === 'halftone') { c.width = c.height = 6; g = c.getContext('2d'); g.fillStyle = css(line, 1); g.beginPath(); g.arc(3, 3, 1.3, 0, 7); g.fill(); }
    else if (kind === 'stipple') { c.width = c.height = 24; g = c.getContext('2d'); g.fillStyle = '#000'; for (i = 0; i < 46; i++) g.fillRect(Math.floor(r() * 24), Math.floor(r() * 24), 1.2, 1.2); }
    else if (kind === 'knit') { c.width = 12; c.height = 10; g = c.getContext('2d'); g.strokeStyle = css(line, 0.55); g.lineWidth = 1.1; g.beginPath(); g.moveTo(1, 2); g.lineTo(6, 8); g.lineTo(11, 2); g.stroke(); }
    else if (kind === 'mat') { c.width = c.height = 48; g = c.getContext('2d'); g.strokeStyle = css(P.inks.line || line, 0.5); g.lineWidth = 1; g.beginPath(); g.moveTo(0, 0.5); g.lineTo(48, 0.5); g.moveTo(0.5, 0); g.lineTo(0.5, 48); g.stroke(); }
    else if (kind === 'grain') { c.width = c.height = 64; g = c.getContext('2d'); for (i = 0; i < 380; i++) { g.fillStyle = r() < 0.5 ? css(line, 0.18) : css(light, 0.25); g.fillRect(r() * 64, r() * 64, 1, 1); } }
    else { /* fibre: the long, pale fibres of washi and kami */
      c.width = c.height = 128; g = c.getContext('2d'); g.lineCap = 'round';
      for (i = 0, n = 70; i < n; i++) {
        var x = r() * 128, y = r() * 128, a = r() * Math.PI, l = 6 + r() * 22;
        g.strokeStyle = r() < 0.6 ? css(light, 0.55) : css(line, 0.22); g.lineWidth = 0.5 + r() * 0.7;
        g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + (r() - 0.5) * 6, y + Math.sin(a) * l * 0.5 + (r() - 0.5) * 6, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
      }
    }
    P[key] = c; return c;
  }
  function material(P, ctx, kind) { return ctx.createPattern(tile(P, kind), 'repeat'); }

  /* ---------- the shapes, drawn back to front: x and y run -1..1 (y down), z comes toward you ---------- */
  function T(a, b, c, tag) { return [a, b, c, tag]; }
  var SHAPES = (function () {
    var m = { P: [-0.05, -0.9, 0.3], C1: [-0.28, -0.45, 0.42], C3: [0.02, -0.42, 0.6], C2: [0.2, -0.45, 0.45], M1: [-0.55, 0, 0.45], M2: [0.5, 0.02, 0.5], F: [0.08, 0.6, 0.85], L: [-1, 0.6, 0], R: [1, 0.6, 0] };
    var mountain = { stock: 'art-stone', tags: { cap: 'washi' }, tris: [
      T(m.P, m.L, m.C1), T(m.C1, m.L, m.M1), T(m.M1, m.L, m.F), T(m.C1, m.M1, m.F), T(m.C1, m.F, m.C3), T(m.C3, m.F, m.C2), T(m.C2, m.F, m.M2), T(m.M2, m.F, m.R),
      T(m.C2, m.M2, m.R), T(m.P, m.C2, m.R), T(m.P, m.C1, m.C3, 'cap'), T(m.P, m.C3, m.C2, 'cap')] };
    var pine = { stock: 'wash-meadow', tags: { trunk: 'kraft' }, tris: [
      T([-0.1, 0.55, 0.1], [0.1, 0.55, 0.1], [0.1, 0.92, 0.1], 'trunk'), T([-0.1, 0.55, 0.1], [0.1, 0.92, 0.1], [-0.1, 0.92, 0.1], 'trunk')] };
    [[-0.2, 0.62, 0.82], [-0.6, 0.15, 0.64], [-1, -0.3, 0.46]].forEach(function (k) {
      var top = [0, k[0] - 0.02 - (k[0] < -0.5 ? 0 : 0.05), 0.35], l = [-k[2], k[1], 0.05], r2 = [k[2], k[1], 0.05], c = [0, k[1], 0.6];
      pine.tris.push(T(top, l, c), T(top, c, r2));
    });
    var c = { K: [0, 0.42, 0.3], B: [0, 0.02, 0.62], NB: [-0.24, 0.14, 0.38], N: [-0.88, -0.52, 0.2], Hd: [-1, -0.36, 0.22], Hn: [-0.82, -0.42, 0.28], TB: [0.24, 0.14, 0.38], Tt: [0.96, -0.5, 0.2], Wf: [-0.18, -0.96, 0.78], Wb: [0.36, -0.86, 0.12], WB: [0.02, -0.06, 0.56] };
    var crane = { stock: 'kami', tris: [
      T(c.WB, c.Wb, c.TB), T(c.WB, c.Wb, c.B), T(c.Tt, c.TB, c.K), T(c.N, c.NB, c.K), T(c.N, c.Hd, c.Hn), T(c.NB, c.B, c.K), T(c.B, c.TB, c.K), T(c.WB, c.Wf, c.NB), T(c.WB, c.Wf, c.B)] };
    var g = { t1: [-0.36, -0.56, 0.62], t2: [0.36, -0.56, 0.62], c1: [-0.82, -0.14, 0.3], c2: [0.82, -0.14, 0.3], g: [0, -0.08, 0.8], p: [0, 0.78, 0.38], b1: [-0.52, -0.62, 0.22], b2: [0.52, -0.62, 0.22] };
    var stone = { stock: 'foil', tris: [T(g.c1, g.b1, g.t1), T(g.t2, g.b2, g.c2), T(g.c1, g.t1, g.g), T(g.t1, g.t2, g.g), T(g.t2, g.c2, g.g), T(g.c1, g.g, g.p), T(g.g, g.c2, g.p)] };
    var b = { S: [0, -0.95, 0.42], SL: [-0.55, 0.15, 0.3], SR: [0.55, 0.15, 0.3], SC: [0, 0.15, 0.6], HL: [-1, 0.12, 0.2], HR: [1, 0.12, 0.2], BL: [-0.62, 0.6, 0.4], BR: [0.62, 0.6, 0.4], HC: [0, 0.12, 0.58], BC: [0, 0.6, 0.62] };
    var boat = { stock: 'washi', tags: { hull: 'kami' }, tris: [T(b.S, b.SL, b.SC), T(b.S, b.SC, b.SR), T(b.HL, b.HC, b.BL, 'hull'), T(b.HC, b.BC, b.BL, 'hull'), T(b.HC, b.HR, b.BR, 'hull'), T(b.HC, b.BR, b.BC, 'hull')] };
    var f = { cr: [0, -0.6, 0.34], F: [0, -0.3, 0.52], cl: [-0.38, 0, 0.36], crr: [0.38, 0, 0.36], N: [0, 0.9, 0.62], el: [-0.86, -0.94, 0.14], eb: [-0.3, -0.42, 0.4], er: [0.86, -0.94, 0.14], ebr: [0.3, -0.42, 0.4], n1: [-0.12, 0.7, 0.64], n2: [0.12, 0.7, 0.64] };
    var deer = { stock: 'kraft', tags: { ear: 'kraft', nose: 'art-line' }, tris: [T(f.el, f.cl, f.eb, 'ear'), T(f.er, f.ebr, f.crr, 'ear'), T(f.cr, f.eb, f.F), T(f.cr, f.F, f.ebr), T(f.eb, f.cl, f.F), T(f.F, f.crr, f.ebr), T(f.cl, f.N, f.F), T(f.F, f.N, f.crr), T(f.n1, f.n2, f.N, 'nose')] };
    return { mountain: mountain, pine: pine, crane: crane, stone: stone, boat: boat, deer: deer };
  })();

  /* ---------- the fold: geometry and light, shared by canvas and SVG ---------- */
  function normal(a, b, c) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var n = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx], l = Math.hypot(n[0], n[1], n[2]) || 1;
    n = [n[0] / l, n[1] / l, n[2] / l]; return n[2] < 0 ? [-n[0], -n[1], -n[2]] : n;
  }
  function stockRGB(P, name, color) {
    var c = color != null ? toRGB(color) : null; if (c) return c;
    if (STOCKS.indexOf(name) >= 0) name = 'paper-' + name;
    return P.inks[name] || toRGB(name) || P.inks['paper-kami'] || [200, 200, 200];
  }
  /* facets(P, tris, o) -> { faces: [{pts, fill, lam, foil}], creases: [{a, b, c}], edges: [{a, b}] } in pixels */
  function facets(P, tris, o) {
    var st = STYLE[P.look] || STYLE.daylight, faces = [], edges = {}, hi = P.inks['art-light'] || [255, 255, 255], L = P.sun;
    tris.forEach(function (t, i) {
      var n = normal(t[0], t[1], t[2]), lam = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
      var stock = (t[3] && o.tags && o.tags[t[3]]) || o.stock, foil = stock === 'foil', base = stockRGB(P, stock, t[3] ? null : o.color), q = lam;
      if (st.steps) q = Math.round(lam * st.steps) / st.steps;
      var tone = foil ? 0.42 + 0.8 * q : 0.6 + 0.5 * q, fill = tone <= 1 ? mul(base, tone) : mix(base, hi, (tone - 1) * 1.6);
      if (foil) { var rz = 2 * lam * n[2] - L[2]; fill = mix(fill, [255, 255, 255], Math.pow(Math.max(0, rz), 16) * 0.85); }
      if (st.mono) fill = [255, 255, 255];
      faces.push({ pts: [t[0], t[1], t[2]], fill: fill, lam: lam, n: n });
      for (var k = 0; k < 3; k++) {
        var a = t[k], b = t[(k + 1) % 3], ka = Math.round(a[0] * 4) + ',' + Math.round(a[1] * 4), kb = Math.round(b[0] * 4) + ',' + Math.round(b[1] * 4), key = ka < kb ? ka + '|' + kb : kb + '|' + ka;
        (edges[key] = edges[key] || { a: a, b: b, f: [] }).f.push(i);
      }
    });
    var creases = [], outline = [];
    Object.keys(edges).forEach(function (k) {
      var e = edges[k];
      if (e.f.length === 1) { outline.push(e); return; }
      var f1 = faces[e.f[0]], f2 = faces[e.f[1]], dot = f1.n[0] * f2.n[0] + f1.n[1] * f2.n[1] + f1.n[2] * f2.n[2];
      if (dot < 0.998) creases.push({ a: e.a, b: e.b, c: f1.lam < f2.lam ? f1.fill : f2.fill, k: clamp((1 - dot) * 6, 0.25, 1) });
    });
    return { faces: faces, creases: creases, outline: outline, style: st };
  }
  /* place a shape: normalised coordinates to pixels, flattened by open (0 a flat sheet, 1 folded) */
  function place(shape, o) {
    var s = o.size || 100, x0 = o.x || 0, y0 = o.y || 0, open = o.open == null ? 1 : clamp(o.open, 0, 1), fl = o.flip ? -1 : 1, rot = o.rot || 0, cr = Math.cos(rot), sr = Math.sin(rot);
    return shape.tris.map(function (t) {
      var out = [0, 1, 2].map(function (k) { var x = t[k][0] * fl, y = t[k][1]; return [x0 + (x * cr - y * sr) * s, y0 + (x * sr + y * cr) * s, t[k][2] * s * open]; });
      out.push(t[3]); return out;
    });
  }
  function shapeOf(name) { return typeof name === 'string' ? SHAPES[name] : name; }

  /* ---------- canvas drawing ---------- */
  function drawFaces(P, ctx, tris, o) {
    o = o || {};
    var F = facets(P, tris, o), st = F.style, s = o.size || 100, lw = o.lineWidth || Math.max(1, s / 80), open = o.open == null ? 1 : clamp(o.open, 0, 1);
    var line = P.inks['art-line'] || [40, 40, 40];
    if (o.shadow !== false && P.shadow > 0 && !st.mono && F.faces.length) {
      var L = P.sun, h = Math.hypot(L[0], L[1]) || 1, off = s * 0.08 * open / Math.max(0.35, Math.tan(Math.asin(clamp(L[2], 0, 0.99)))), dx = -L[0] / h * off, dy = -L[1] / h * off;
      var minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9;
      tris.forEach(function (t) { for (var k = 0; k < 3; k++) { minx = Math.min(minx, t[k][0]); miny = Math.min(miny, t[k][1]); maxx = Math.max(maxx, t[k][0]); maxy = Math.max(maxy, t[k][1]); } });
      var pad = Math.ceil(off + 4), cw = Math.ceil(maxx - minx + pad * 2), ch = Math.ceil(maxy - miny + pad * 2);
      if (cw > 0 && ch > 0 && cw < 8000 && ch < 8000) {
        var sc = d.createElement('canvas'); sc.width = cw; sc.height = ch; var g = sc.getContext('2d'); g.fillStyle = css(P.inks['art-shade'] || [0, 0, 0], 1);
        tris.forEach(function (t) { g.beginPath(); g.moveTo(t[0][0] - minx + pad, t[0][1] - miny + pad); g.lineTo(t[1][0] - minx + pad, t[1][1] - miny + pad); g.lineTo(t[2][0] - minx + pad, t[2][1] - miny + pad); g.closePath(); g.fill(); g.stroke(); });
        ctx.save(); ctx.globalAlpha = P.shadow * (o.shadowAlpha == null ? 1 : o.shadowAlpha);
        try { ctx.filter = 'blur(' + Math.max(1, Math.round(off * 0.45)) + 'px)'; } catch (e) { /* no canvas filters */ }
        ctx.drawImage(sc, minx - pad + dx, miny - pad + dy); ctx.restore();
      }
    }
    var mat = material(P, ctx, st.mat);
    F.faces.forEach(function (f) {
      var p = f.pts; ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); ctx.lineTo(p[1][0], p[1][1]); ctx.lineTo(p[2][0], p[2][1]); ctx.closePath();
      ctx.fillStyle = css(f.fill); ctx.fill(); ctx.strokeStyle = css(f.fill); ctx.lineWidth = 0.8; ctx.stroke();
      var a = st.mono ? clamp((0.85 - f.lam) * 1.3, 0, 0.9) : st.mat === 'halftone' ? clamp((0.55 - f.lam) * 1.4, 0, 0.6) : P.grain * (st.mat === 'knit' ? 2.5 : 1);
      if (a > 0.01) { ctx.save(); ctx.clip(); ctx.globalAlpha = a; ctx.fillStyle = mat; ctx.fill(); ctx.restore(); }
    });
    ctx.save(); ctx.lineCap = 'round';
    F.creases.forEach(function (c) { ctx.strokeStyle = css(mix(c.c, line, 0.4), clamp(P.crease * st.crease * c.k * open, 0, 1)); ctx.lineWidth = lw * 0.8; ctx.beginPath(); ctx.moveTo(c.a[0], c.a[1]); ctx.lineTo(c.b[0], c.b[1]); ctx.stroke(); });
    ctx.strokeStyle = css(st.mono ? [0, 0, 0] : line, st.line); ctx.lineWidth = lw * (st.line >= 1 ? 1.6 : 1); ctx.lineJoin = 'round';
    if (o.baseY != null) F.outline = F.outline.filter(function (e) { return !(e.a[1] >= o.baseY - 0.5 && e.b[1] >= o.baseY - 0.5); });
    F.outline.forEach(function (e) { ctx.beginPath(); ctx.moveTo(e.a[0], e.a[1]); ctx.lineTo(e.b[0], e.b[1]); ctx.stroke(); });
    if (st.stitch) { ctx.setLineDash([lw * 3, lw * 2.4]); ctx.strokeStyle = css(P.inks.accent || line, 0.75); ctx.lineWidth = lw * 0.9; F.outline.forEach(function (e) { ctx.beginPath(); ctx.moveTo(e.a[0], e.a[1]); ctx.lineTo(e.b[0], e.b[1]); ctx.stroke(); }); }
    ctx.restore();
    return F;
  }

  /* a range of folded ridges along a baseline: for dioramas and side-scrollers */
  function rangeTris(o) {
    var r = rand(o.seed || 7), n = o.peaks || 5, x0 = o.x || 0, wd = o.width || 600, base = o.y || 400, H = o.height || 160, z = H * 0.35 * (o.depth == null ? 1 : o.depth) * (o.open == null ? 1 : o.open), step = wd / n, tris = [];
    var prev = [x0, base, 0];
    for (var i = 0; i < n; i++) {
      var apex = [x0 + step * (i + 0.3 + r() * 0.4), base - H * (0.55 + r() * 0.45), z], R = [x0 + step * (i + 1), i === n - 1 ? base : base - H * (0.12 + r() * 0.25), 0], C = [apex[0], base, z * 0.7];
      var lerp = function (a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };
      if (o.cap) {
        var cl = lerp(apex, prev, 0.28), cr = lerp(apex, R, 0.28), cc = lerp(apex, C, 0.28);
        tris.push([prev, cl, cc], [prev, cc, C], [cc, cr, R], [cc, R, C], [cl, apex, cc, 'cap'], [apex, cr, cc, 'cap']);
      } else { /* plan O1: a second crease on each face, so a ridge reads as folded, not cut */
        var ql = lerp(apex, C, 0.55); ql[2] += H * 0.08;
        tris.push([prev, apex, ql], [prev, ql, C], [apex, R, ql], [ql, R, C]);
      }
      tris.push([prev, C, [prev[0], base, 0]], [R, [R[0], base, 0], C]);
      prev = R;
    }
    return tris;
  }

  /* ---------- the pen ---------- */
  var CACHE = {};
  function pen(look, opt) {
    if (look && look.nodeType) look = lookOf(look);
    if (IDS.indexOf(look) < 0) look = lookOf(null);
    if (CACHE[look] && !(opt && opt.fresh)) return CACHE[look];
    var p = d.createElement('i'), inks = {};
    p.setAttribute('data-theme', look); p.setAttribute('aria-hidden', 'true');
    p.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none';
    (d.body || d.documentElement).appendChild(p);
    var cs = getComputedStyle(p);
    INKS.forEach(function (n) { if (!cs.getPropertyValue('--' + n).trim()) return; p.style.color = 'var(--' + n + ')'; inks[n] = toRGB(getComputedStyle(p).color); });
    function num(n, def) { var v = parseFloat(cs.getPropertyValue('--' + n)); return isNaN(v) ? def : v; }
    var az = num('tex-fold-light', 135) * Math.PI / 180, el = num('tex-fold-elevation', 48) * Math.PI / 180;
    var P = {
      look: look, version: VERSION, inks: inks,
      sun: [Math.cos(el) * Math.cos(az), -Math.cos(el) * Math.sin(az), Math.sin(el)],
      crease: num('tex-fold-crease', 0.5), shadow: num('tex-fold-shadow', 0.32), grain: num('tex-fold-grain', 0.1),
      rgb: function (name, a) { return css(inks[name] || toRGB(name), a); },
      stock: function (name) { return stockRGB(P, name); },
      material: function (ctx, kind) { return material(P, ctx, kind || (STYLE[look] || {}).mat || 'fibre'); },
      /* fold(ctx, shape, { x, y, size, stock, color, tags, open, flip, rot, shadow }) draws one shape; returns its facets */
      fold: function (ctx, shape, o) { o = o || {}; var sh = shapeOf(shape); if (!sh) return null; var oo = Object.assign({ stock: sh.stock, tags: Object.assign({}, sh.tags, o.tags) }, o); oo.tags = Object.assign({}, sh.tags, o.tags); return drawFaces(P, ctx, place(sh, oo), oo); },
      /* range(ctx, { x, y, width, height, peaks, seed, stock, cap, depth, open }) draws a ridge of folds */
      range: function (ctx, o) { o = o || {}; var oo = Object.assign({ stock: 'art-stone', size: o.height || 160, shadow: false, baseY: o.y || 400 }, o); oo.tags = Object.assign({ cap: o.cap === true ? 'washi' : o.cap }, o.tags); return drawFaces(P, ctx, rangeTris(oo), oo); },
      /* ground(ctx, { w, h }) lays the look's paper: the page colour, the cutting mat in Origami, the grain */
      ground: function (ctx, o) {
        o = o || {}; var W = o.w || ctx.canvas.width, H = o.h || ctx.canvas.height;
        ctx.save(); ctx.fillStyle = css(inks.paper || [244, 246, 242]); ctx.fillRect(0, 0, W, H);
        if (look === 'origami') { ctx.fillStyle = material(P, ctx, 'mat'); ctx.globalAlpha = 0.6; ctx.fillRect(0, 0, W, H); }
        if (look !== 'inkblot') { ctx.globalAlpha = look === 'knight' ? 0.25 : 0.5; ctx.fillStyle = material(P, ctx, 'grain'); ctx.fillRect(0, 0, W, H); }
        ctx.restore();
      },
      shapes: Object.keys(SHAPES)
    };
    p.remove(); CACHE[look] = P; return P;
  }
  pen.shapes = SHAPES;
  pen.clear = function () { CACHE = {}; };

  /* ---------- Folded: the same folds as an SVG figure that folds itself on reveal (plan O3) ---------- */
  var SVGNS = 'http://www.w3.org/2000/svg', LIVE = [];
  function style() {
    if (d.getElementById('sb-paper-css')) return;
    var s = d.createElement('style'); s.id = 'sb-paper-css';
    s.textContent = '.sb-folded{display:inline-block;position:relative;width:var(--fw,160px);aspect-ratio:1;margin:0;vertical-align:middle}' +
      '.sb-folded svg{display:block;width:100%;height:100%;overflow:visible}' +
      '.sb-folded__facets polygon{transform-box:fill-box;transform-origin:50% 50%;transition:transform var(--dur-base,420ms) var(--ease-paper,ease) calc(var(--i)*60ms),opacity var(--dur-base,420ms) linear calc(var(--i)*60ms)}' +
      '.sb-folded__shadow,.sb-folded__creases{transition:opacity 420ms linear calc(var(--n)*60ms)}' +
      '.sb-folded.is-flat .sb-folded__facets polygon{transform:scale(.12) rotate(-40deg);opacity:0}' +
      '.sb-folded.is-flat .sb-folded__shadow,.sb-folded.is-flat .sb-folded__creases{opacity:0;transition-delay:0s}' +
      '@media (prefers-reduced-motion: reduce){.sb-folded *{transition:none!important}}';
    (d.head || d.documentElement).appendChild(s);
  }
  function svgEl(tag, attrs) { var e = d.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function pts(p) { return p.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); }
  function folded(el, o) {
    if (!el) return null;
    if (el.__folded) return el.__folded;
    if (!o) { var a = el.getAttribute('data-sb-folded') || ''; try { o = /^\s*\{/.test(a) ? JSON.parse(a) : { shape: a }; } catch (e) { o = { shape: a }; } }
    o.shape = o.shape || 'crane';
    style(); el.classList.add('sb-folded');
    if (!el.getAttribute('role')) el.setAttribute('role', 'img');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', o.label || ('A folded paper ' + (typeof o.shape === 'string' ? o.shape : 'shape')));
    var api = { el: el, render: render, refold: refold, set: function (n) { Object.assign(o, n); render(); }, destroy: function () { el.__folded = null; LIVE = LIVE.filter(function (x) { return x !== api; }); el.textContent = ''; } };
    function render() {
      var sh = shapeOf(o.shape); if (!sh) return;
      var P = pen(el), oo = Object.assign({ stock: sh.stock, size: 82, x: 100, y: 100 }, o); oo.tags = Object.assign({}, sh.tags, o.tags);
      var tris = place(sh, oo), F = facets(P, tris, oo), st = F.style, line = P.inks['art-line'] || [40, 40, 40];
      var svg = svgEl('svg', { viewBox: '0 0 200 200', 'aria-hidden': 'true', focusable: 'false' });
      if (!st.mono) {
        var L = P.sun, h = Math.hypot(L[0], L[1]) || 1, off = 7, sg = svgEl('g', { 'class': 'sb-folded__shadow', fill: css(P.inks['art-shade'] || [0, 0, 0]), opacity: P.shadow, transform: 'translate(' + (-L[0] / h * off).toFixed(1) + ' ' + (-L[1] / h * off).toFixed(1) + ')', style: '--n:' + F.faces.length });
        F.faces.forEach(function (f) { sg.appendChild(svgEl('polygon', { points: pts(f.pts) })); });
        svg.appendChild(sg);
      }
      var fg = svgEl('g', { 'class': 'sb-folded__facets' });
      F.faces.forEach(function (f, i) { fg.appendChild(svgEl('polygon', { points: pts(f.pts), fill: css(f.fill), stroke: css(f.fill), 'stroke-width': '0.6', style: '--i:' + i })); });
      svg.appendChild(fg);
      var cg = svgEl('g', { 'class': 'sb-folded__creases', 'stroke-linecap': 'round', style: '--n:' + F.faces.length });
      F.creases.forEach(function (c) { cg.appendChild(svgEl('line', { x1: c.a[0].toFixed(1), y1: c.a[1].toFixed(1), x2: c.b[0].toFixed(1), y2: c.b[1].toFixed(1), stroke: css(mix(c.c, line, 0.4)), 'stroke-opacity': clamp(P.crease * st.crease * c.k, 0, 1).toFixed(2), 'stroke-width': '1.2' })); });
      F.outline.forEach(function (e) { cg.appendChild(svgEl('line', { x1: e.a[0].toFixed(1), y1: e.a[1].toFixed(1), x2: e.b[0].toFixed(1), y2: e.b[1].toFixed(1), stroke: css(st.mono ? [0, 0, 0] : line), 'stroke-opacity': st.line, 'stroke-width': st.line >= 1 ? '2.4' : '1.4' })); });
      if (st.stitch) F.outline.forEach(function (e) { cg.appendChild(svgEl('line', { x1: e.a[0].toFixed(1), y1: e.a[1].toFixed(1), x2: e.b[0].toFixed(1), y2: e.b[1].toFixed(1), stroke: css(P.inks.accent || line), 'stroke-dasharray': '4 3', 'stroke-width': '1.2' })); });
      svg.appendChild(cg);
      el.textContent = ''; el.appendChild(svg);
    }
    function refold() {
      if (reduced(lookOf(el))) { el.classList.remove('is-flat'); return; }
      el.classList.add('is-flat'); void el.offsetWidth;
      w.requestAnimationFrame(function () { w.requestAnimationFrame(function () { el.classList.remove('is-flat'); }); });
    }
    render(); el.__folded = api; LIVE.push(api);
    if (o.reveal !== false && !reduced(lookOf(el)) && 'IntersectionObserver' in w) {
      el.classList.add('is-flat');
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); refold(); } }); }, { threshold: 0.35 });
      io.observe(el);
    }
    return api;
  }
  folded.scan = function (root) { Array.prototype.forEach.call((root || d).querySelectorAll('[data-sb-folded]'), function (el) { folded(el); }); };
  /* a look change repaints every figure in its new inks */
  function watch() {
    try {
      new MutationObserver(function () { LIVE.forEach(function (a) { if (a.el.isConnected) a.render(); }); })
        .observe(d.documentElement, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
    } catch (e) { /* old browser */ }
  }

  S.pen = pen; S.folded = folded; S.looks = S.looks || LOOKS; S.paperVersion = VERSION;
  function start() { folded.scan(); watch(); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})(window, document);
