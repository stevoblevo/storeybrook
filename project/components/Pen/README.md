# Pen

A look's inks and paper for canvas: `Storeybrook.pen(look)` resolves the look's colours to RGB and draws shapes as folded paper lit from one direction, so a game drawn on canvas looks like the page around it.

**Provide** `components/paper.js` after `bundle.js` (an add-on: pages that draw no paper do not load it). Then `var P = Storeybrook.pen('origami')` (a look id, or an element whose look to use) → `{ look, inks, sun, rgb(name, a), stock(name), material(ctx, kind), fold(ctx, shape, opts), range(ctx, opts), ground(ctx, { w, h }), shapes }`.

- `P.inks` holds every colour token the art uses (`paper`, `ink`, `accent`, `art-*`, `wash-*`, `paper-kami`, `paper-washi`, `paper-kraft`, `paper-foil`) as `[r, g, b]`. Ask for a colour by its token name, never by a hex value: the same code then draws in every look.
- `P.fold(ctx, shape, { x, y, size, stock, color, tags, open, flip, rot, shadow })` draws one of `mountain`, `pine`, `crane`, `stone`, `boat`, `deer` (or your own `{ tris, stock, tags }`). Each facet is shaded from its angle to the light (`tex-fold-light`, `tex-fold-elevation`), creases are drawn where facets meet (`tex-fold-crease`), the shape casts a soft shadow (`tex-fold-shadow`) and fibres lie over the paper (`tex-fold-grain`). `open` runs from 0 (a flat sheet) to 1 (folded).
- `stock` is a paper: `kami` (the coloured sheet), `washi` (pale, fibrous: snow, skies, lanterns), `kraft` (brown: ground, trunks, boats) or `foil` (one precious thing per scene; it catches a hard highlight), or any colour token name.
- `P.range(ctx, { x, y, width, height, peaks, seed, stock, cap, depth })` folds a ridge of mountains along a baseline, for dioramas and side-scrollers. `cap: true` puts washi snow on the peaks.
- `P.ground(ctx)` lays the look's paper: the page colour, the cutting mat in Origami and the grain. `P.material(ctx, kind)` gives a pattern: `fibre`, `grain`, `halftone`, `stipple`, `knit` or `mat`.
- Each look keeps its own hand: Ink Blot draws white paper, black outlines and stippled shade; Comix steps the light in three and halftones the dark facets; Skein silk knits its paper and stitches its edges in copper.
- `Storeybrook.looks` lists the six looks as data (`id`, `name`, `light`, `motion`, `print`) for apps that offer a look picker.

**Accessibility**: a canvas is a picture; give it an `aria-label` that says what is drawn, and keep anything a player must read or press out of the canvas. Ink Blot and reduced motion draw finished folds (`open: 1`).
