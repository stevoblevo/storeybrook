/* Storeybrook Plate 1.5.0 · one drawing, made in each look's material. An add-on: load it after bundle.js and paper.js.
     <script src="components/bundle.js"></script><script src="components/paper.js"></script><script src="components/plate.js"></script>
   Storeybrook.plate(look, source, o)  takes a canvas of flat fills on transparency and returns a new canvas of the same
                                       size, made in the look's material. Nothing is redrawn by hand: a material is a
                                       process over the one drawing (family task F9, the Storeybrook half).
   Storeybrook.plate.media             the six materials as data: { look: { id, name, accent } }
   Storeybrook.tint, Storeybrook.edges the family's two shared helpers, the same as Depthfield's.
   Every colour comes from the look's pen. A plate is still, so reduced motion needs no branch. Budget: 14 KB. */
(function (w, d) {
  'use strict';
  var S = w.Storeybrook;
  if (!S || !S.pen || S.plate) return;
  var VERSION = '1.5.0', PI = Math.PI, TAU = PI * 2;
  /* one accent per look: the one mark that is not the subject, so a plate reads as its look at thumbnail size */
  var MEDIA = {
    daylight: { id: 'wash', name: 'Wash', accent: 'a test dab of the accent' },
    knight: { id: 'lamplight', name: 'Lamplight', accent: 'one star' },
    inkblot: { id: 'ink', name: 'Brush ink', accent: 'a seal' },
    comix: { id: 'print', name: 'Print', accent: 'a sound word' },
    origami: { id: 'paper', name: 'Cut paper', accent: 'one fold' },
    skein: { id: 'stitch', name: 'Cross-stitch', accent: 'a running stitch' }
  };

  function mk(wd, ht) { var c = d.createElement('canvas'); c.width = wd; c.height = ht; return c; }
  function css(c, a) { c = c || [0, 0, 0]; return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (a == null ? 1 : a) + ')'; }
  function mul(c, k) { return [c[0] * k, c[1] * k, c[2] * k]; }
  function rand(seed) { var s = (seed >>> 0) || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function copy(src) { var c = mk(src.width, src.height); c.getContext('2d').drawImage(src, 0, 0); return c; }
  function pixels(src) { var c = mk(src.width, src.height), g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(src, 0, 0); return g.getImageData(0, 0, c.width, c.height).data; }
  function lum(p, i) { return (0.3 * p[i] + 0.59 * p[i + 1] + 0.11 * p[i + 2]) / 255; }
  /* where the drawing is: its box, found on a coarse grid */
  function box(p, W, H) {
    var st = Math.max(1, Math.round(W / 160)), x0 = W, y0 = H, x1 = 0, y1 = 0, x, y;
    for (y = 0; y < H; y += st) for (x = 0; x < W; x += st) if (p[(y * W + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return x1 < x0 ? { x: W * 0.25, y: H * 0.25, w: W * 0.5, h: H * 0.5 } : { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /* the emptiest corner for the accent: of the four bw x bh boxes inset by m, the one the drawing covers least */
  function corner(p, W, H, bw, bh, m, order) {
    var st = Math.max(2, Math.round(W / 120)), best = null, i, x, y, n;
    var at = { tr: [W - m - bw, m], tl: [m, m], br: [W - m - bw, H - m - bh], bl: [m, H - m - bh] };
    (order || ['tr', 'tl', 'br', 'bl']).forEach(function (key) {
      var c = at[key]; n = 0;
      for (y = Math.max(0, c[1] | 0); y < Math.min(H, c[1] + bh); y += st) for (x = Math.max(0, c[0] | 0); x < Math.min(W, c[0] + bw); x += st) if (p[(y * W + x) * 4 + 3] > 40) n++;
      if (!best || n < best.n) best = { x: c[0], y: c[1], n: n, key: key };
    });
    return best;
  }

  /* ---------- the family's two helpers (the same as Depthfield.tint and Depthfield.edges) ---------- */
  var tint = S.tint || function (source, colour) {
    var c = mk(source.width, source.height), g = c.getContext('2d');
    g.drawImage(source, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = colour; g.fillRect(0, 0, c.width, c.height); return c;
  };
  var edges = S.edges || function (source, rgb, gain) {
    var W = source.width, H = source.height, src = pixels(source), sc = mk(W, H), sg = sc.getContext('2d'), out = sg.createImageData(W, H), od = out.data, L = new Float32Array(W * H), i, j, x, y;
    for (i = 0, j = 0; i < src.length; i += 4, j++) L[j] = (src[i + 3] / 255) * (60 + 0.3 * src[i] + 0.59 * src[i + 1] + 0.11 * src[i + 2]);
    for (y = 1; y < H - 1; y++) for (x = 1; x < W - 1; x++) {
      j = y * W + x;
      var gx = L[j - W + 1] + 2 * L[j + 1] + L[j + W + 1] - L[j - W - 1] - 2 * L[j - 1] - L[j + W - 1];
      var gy = L[j + W - 1] + 2 * L[j + W] + L[j + W + 1] - L[j - W - 1] - 2 * L[j - W] - L[j - W + 1];
      var m = Math.min(255, Math.sqrt(gx * gx + gy * gy) * (gain || 2) * 0.5);
      if (m < 28) continue;
      od[j * 4] = rgb[0]; od[j * 4 + 1] = rgb[1]; od[j * 4 + 2] = rgb[2]; od[j * 4 + 3] = m;
    }
    sg.putImageData(out, 0, 0); return sc;
  };
  /* a layer the size of the drawing, painted by fn and then cut to the drawing's own shape */
  function inside(src, fn) { var c = mk(src.width, src.height), g = c.getContext('2d'); fn(g); g.globalCompositeOperation = 'destination-in'; g.drawImage(src, 0, 0); return c; }

  /* ---------- Meta Daylight: a wash. The colour sits in the paper, pools at its edge, and pencil shows under it ---------- */
  function wash(P, g, src, W, H, k, B, o, px) {
    var I = P.inks, line = I['art-line'] || I.ink, r = rand(o.seed || 11), i;
    P.ground(g, { w: W, h: H });
    var sheet = copy(src), sg = sheet.getContext('2d');
    sg.globalCompositeOperation = 'source-atop';
    for (i = 0; i < 7; i++) {   /* uneven water: pale blooms where the brush lifted */
      var bx = B.x + r() * B.w, by = B.y + r() * B.h, br = (0.12 + r() * 0.2) * Math.max(B.w, B.h), rg = sg.createRadialGradient(bx, by, 0, bx, by, br);
      rg.addColorStop(0, 'rgba(255,255,255,0.42)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); sg.fillStyle = rg; sg.fillRect(bx - br, by - br, br * 2, br * 2);
    }
    sg.globalAlpha = 0.6; sg.fillStyle = P.material(sg, 'grain'); sg.fillRect(0, 0, W, H);
    g.save(); g.globalCompositeOperation = 'multiply';
    g.globalAlpha = 0.06; for (i = 0; i < 8; i++) g.drawImage(src, Math.cos(i * PI / 4) * 2.6 * k, Math.sin(i * PI / 4) * 2.6 * k);   /* the bleed */
    g.globalAlpha = 0.74; g.drawImage(sheet, 0, 0);
    g.globalAlpha = 0.3; g.drawImage(edges(src, mul(line, 0.8), 1.2), 0, 0);   /* the pooled edge */
    g.restore();
    g.save(); g.globalAlpha = 0.5; g.drawImage(edges(src, line, 1), -1.6 * k, -1.2 * k); g.restore();   /* the pencil, a little off the wash */
    /* accent: the painter's test dab */
    var cn = corner(px, W, H, 44 * k, 30 * k, 10 * k, ['br', 'bl', 'tr', 'tl']), ax = cn.x + 26 * k, ay = cn.y + 15 * k; g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = css(I.accent, 0.78);
    g.beginPath(); for (i = 0; i <= 14; i++) { var an = i / 14 * TAU, rr = (9 + 2.4 * Math.sin(an * 3 + 1) + 1.5 * Math.cos(an * 5)) * k; g.lineTo(ax + Math.cos(an) * rr * 1.25, ay + Math.sin(an) * rr * 0.8); } g.closePath(); g.fill();
    g.fillStyle = css(I.accent, 0.35); g.beginPath(); g.arc(ax - 15 * k, ay + 3 * k, 3.2 * k, 0, TAU); g.fill(); g.restore();
  }

  /* ---------- Knight Night: lamplight. The drawing stands in front of a lamp, dim, with a gold rim ---------- */
  function lamplight(P, g, src, W, H, k, B, o, px) {
    var I = P.inks, gold = I.gamboge || I['art-light'] || I.accent, night = I.paper;
    P.ground(g, { w: W, h: H });
    g.save(); g.shadowColor = css(gold, 0.6); g.shadowBlur = 30 * k; g.drawImage(tint(src, css(gold, 1)), 0, 0); g.shadowBlur = 10 * k; g.drawImage(tint(src, css(gold, 1)), 0, 0); g.restore();
    var dim = copy(src), dg = dim.getContext('2d'); dg.globalCompositeOperation = 'source-atop'; dg.fillStyle = css(night, 0.5); dg.fillRect(0, 0, W, H);
    g.drawImage(dim, 0, 0);
    g.drawImage(inside(src, function (q) { q.drawImage(edges(src, gold, 2.2), 1.6 * k, 1.6 * k); }), 0, 0);   /* the rim, on the side facing the lamp */
    /* accent: one star */
    var cn = corner(px, W, H, 40 * k, 40 * k, 12 * k), sx = cn.x + 20 * k, sy = cn.y + 20 * k, i; g.fillStyle = css(gold, 1); g.beginPath();
    for (i = 0; i < 8; i++) { var an = -PI / 2 + i * PI / 4, rr = (i % 2 ? 2.6 : 12) * k; g.lineTo(sx + Math.cos(an) * rr, sy + Math.sin(an) * rr); } g.closePath(); g.fill();
  }

  /* ---------- Ink Blot: brush ink. The dark fills are solid ink, the rest is stippled; one seal ---------- */
  function inkwork(P, g, src, W, H, k, B, o, p) {
    var I = P.inks, ink = I.ink, r = rand(o.seed || 7), x, y, i;
    g.fillStyle = css(I.paper); g.fillRect(0, 0, W, H);
    var m = mk(W, H), mg = m.getContext('2d'), md = mg.createImageData(W, H), od = md.data;
    for (i = 0; i < p.length; i += 4) if (p[i + 3] > 128 && lum(p, i) < 0.4) { od[i] = ink[0]; od[i + 1] = ink[1]; od[i + 2] = ink[2]; od[i + 3] = 255; }
    mg.putImageData(md, 0, 0); g.drawImage(m, 0, 0);
    var cell = Math.max(3, Math.round(W / 96)); g.fillStyle = css(ink);
    for (y = cell >> 1; y < H; y += cell) for (x = cell >> 1; x < W; x += cell) {
      i = (y * W + x) * 4; if (p[i + 3] < 128) continue;
      var L = lum(p, i); if (L < 0.4) continue;
      var rad = cell * 0.5 * Math.sqrt(Math.max(0, 1.02 - L)) * 1.05; if (rad < 0.4) continue;
      g.beginPath(); g.arc(x + (r() - 0.5) * cell * 0.7, y + (r() - 0.5) * cell * 0.7, rad, 0, TAU); g.fill();
    }
    var E = edges(src, ink, 3.2); g.drawImage(E, 0, 0); g.drawImage(E, 0.7 * k, 0.4 * k);
    /* accent: the seal, cut with one mark */
    var s = 24 * k, cn = corner(p, W, H, s, s, 12 * k, ['br', 'bl', 'tr', 'tl']), sx = cn.x, sy = cn.y, c = I.accent && lum(I.accent, 0) > 0.12 ? I.accent : (I.cue || I.accent);
    g.save(); g.translate(sx + s / 2, sy + s / 2); g.rotate(-0.06); g.fillStyle = css(c, 0.92);
    var q = s / 2, rd = 3 * k; g.beginPath(); g.moveTo(-q + rd, -q); g.arcTo(q, -q, q, q, rd); g.arcTo(q, q, -q, q, rd); g.arcTo(-q, q, -q, -q, rd); g.arcTo(-q, -q, q, -q, rd); g.closePath(); g.fill();
    g.strokeStyle = css(I.paper); g.lineWidth = 2.2 * k; g.lineCap = 'round'; g.beginPath(); g.moveTo(-q * 0.5, -q * 0.15); g.quadraticCurveTo(0, -q * 0.7, q * 0.5, -q * 0.15); g.moveTo(0, -q * 0.45); g.lineTo(0, q * 0.55); g.stroke(); g.restore();
  }

  /* ---------- Comix: print. Flat colour a hair off register, Ben-Day dots, a heavy line; one sound word ---------- */
  function print(P, g, src, W, H, k, B, o, px) {
    var I = P.inks, ink = I.ink;
    P.ground(g, { w: W, h: H });
    g.drawImage(src, 2.2 * k, 1.6 * k);
    g.save(); g.globalAlpha = 0.5; g.drawImage(inside(src, function (q) {
      var lg = q.createLinearGradient(B.x, B.y, B.x + B.w, B.y + B.h); lg.addColorStop(0.35, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(0,0,0,1)');
      q.fillStyle = P.material(q, 'halftone'); q.fillRect(0, 0, W, H); q.globalCompositeOperation = 'destination-in'; q.fillStyle = lg; q.fillRect(0, 0, W, H); q.globalCompositeOperation = 'source-over';
    }), 2.2 * k, 1.6 * k); g.restore();
    var E = edges(src, ink, 4.5); g.drawImage(E, 0, 0); g.drawImage(E, 0.9 * k, 0); g.drawImage(E, 0, 0.9 * k);
    /* accent: the sound word */
    var word = String(o.word == null ? 'FWIP!' : o.word); if (!word) return;
    var fs = Math.round(30 * k); g.save(); g.font = 'italic ' + fs + 'px ' + (o.font || '"Bangers", Impact, "Arial Black", sans-serif');
    var tw = g.measureText(word).width + 10 * k, cn = corner(px, W, H, tw, fs * 1.5, 10 * k);
    g.translate(cn.x + 4 * k, cn.y + fs * 1.2); g.rotate(-0.1); g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
    g.fillStyle = css(ink); g.fillText(word, 2.5 * k, 2.5 * k); g.strokeStyle = css(ink); g.lineWidth = 4.5 * k; g.strokeText(word, 0, 0); g.fillStyle = css(I.accent); g.fillText(word, 0, 0); g.restore();
  }

  /* ---------- Origami: cut paper. A sheet lifted off the mat, its shadow thrown away from the light; one fold ---------- */
  function paper(P, g, src, W, H, k, B, o) {
    var I = P.inks, shade = I.ink, lx = P.light[0], ly = P.light[1], dx = -lx * 9 * k, dy = -ly * 9 * k, i;
    P.ground(g, { w: W, h: H });
    var sh = tint(src, css(shade, 1)); g.save(); g.globalAlpha = Math.min(0.3, P.shadow * 0.36);
    for (i = 1; i <= 3; i++) g.drawImage(sh, dx * i * 0.5, dy * i * 0.5); g.restore();
    var sheet = copy(src), sg = sheet.getContext('2d'); sg.globalCompositeOperation = 'source-atop';
    /* the fold: a crease from shoulder to hip of the box; the half turned from the light lies in shade */
    var ax = B.x + B.w * 0.18, ay = B.y - 4, bx = B.x + B.w * 0.86, by = B.y + B.h + 4;
    sg.fillStyle = css(shade, 0.13); sg.beginPath(); sg.moveTo(ax, ay); sg.lineTo(bx, by); sg.lineTo(W, by); sg.lineTo(W, ay); sg.closePath(); sg.fill();
    sg.strokeStyle = css(shade, 0.38 * Math.min(1.4, P.crease * 2)); sg.lineWidth = 1.2 * k; sg.beginPath(); sg.moveTo(ax, ay); sg.lineTo(bx, by); sg.stroke();
    sg.strokeStyle = 'rgba(255,255,255,0.5)'; sg.beginPath(); sg.moveTo(ax - 1.4 * k, ay); sg.lineTo(bx - 1.4 * k, by); sg.stroke();
    sg.globalAlpha = 0.5; sg.drawImage(edges(src, [255, 255, 255], 1.6), -lx * 1.8 * k, -ly * 1.8 * k);   /* the cut edge catches the light */
    sg.globalAlpha = 0.4; sg.fillStyle = P.material(sg, 'fibre'); sg.fillRect(0, 0, W, H);
    g.drawImage(sheet, 0, 0);
  }

  /* ---------- Skein silk: cross-stitch. The drawing is counted out in stitches on the cloth; one running stitch ---------- */
  function stitch(P, g, src, W, H, k, B, o, p) {
    var I = P.inks, cell = Math.max(5, Math.round(W / 46)), x, y, i, cx, cy, h = cell * 0.36, c;
    P.ground(g, { w: W, h: H });
    g.save(); g.globalAlpha = 0.5; g.fillStyle = P.material(g, 'knit'); g.fillRect(0, 0, W, H); g.restore();
    g.lineCap = 'round'; g.lineWidth = Math.max(1.4, cell * 0.3);
    for (y = 0; y + cell <= H; y += cell) for (x = 0; x + cell <= W; x += cell) {
      cx = x + cell / 2; cy = y + cell / 2; i = ((cy | 0) * W + (cx | 0)) * 4; if (p[i + 3] < 120) continue;
      c = [p[i], p[i + 1], p[i + 2]];
      g.strokeStyle = css(mul(c, 0.78)); g.beginPath(); g.moveTo(cx - h, cy - h); g.lineTo(cx + h, cy + h); g.stroke();
      g.strokeStyle = css(c); g.beginPath(); g.moveTo(cx + h, cy - h); g.lineTo(cx - h, cy + h); g.stroke();
    }
    /* accent: the running stitch round the cloth */
    var m = 9 * k; g.strokeStyle = css(I.copper || I.accent, 0.95); g.lineWidth = Math.max(1.5, 1.8 * k); g.setLineDash([7 * k, 5 * k]); g.strokeRect(m, m, W - 2 * m, H - 2 * m); g.setLineDash([]);
  }

  var MAKE = { daylight: wash, knight: lamplight, inkblot: inkwork, comix: print, origami: paper, skein: stitch };

  /* plate(look, source, { word, seed, font }): look is a look id or an element whose look to use */
  function plate(look, source, o) {
    o = o || {};
    var P = S.pen(look), id = MAKE[P.look] ? P.look : 'daylight', W = source.width, H = source.height, c = mk(W, H), g = c.getContext('2d');
    if (!W || !H) return c;
    var px = pixels(source); MAKE[id](P, g, source, W, H, W / 320, box(px, W, H), o, px);
    return c;
  }
  plate.media = MEDIA; plate.version = VERSION;
  S.plate = plate; S.tint = tint; S.edges = edges; S.plateVersion = VERSION;
})(window, document);
