# Plate

One drawing, made in a look's material: `Storeybrook.plate(look, source)` takes a canvas of flat fills on transparency and returns the same drawing as a wash, by lamplight, in brush ink, in print, in cut paper or in cross-stitch. Nothing is redrawn by hand.

**Provide** `components/paper.js` and then `components/plate.js` after `bundle.js` (an add-on: pages that make no plates do not load it), and a source canvas. Call `Storeybrook.plate(look, source, options)` with a look id, or an element whose look to use, and place the canvas it returns.

- **Meta Daylight, a wash.** The colour sits in the paper, blooms where the brush lifted and pools at its edge; the pencil shows a little off the wash. Its accent is the painter's test dab.
- **Knight Night, lamplight.** The drawing stands in front of a lamp, dimmed to the night's paper, with a gold rim. Its accent is one star.
- **Ink Blot, brush ink.** Dark fills become solid ink and the rest is stippled by how dark it is; a heavy line holds the shape. Its accent is a seal.
- **Comix, print.** Flat colour a hair off register, Ben-Day dots toward the shadow side and a heavy line. Its accent is a sound word: `word` sets it, and `word: ''` leaves it out.
- **Origami, cut paper.** A sheet lifted off the cutting mat, its shadow thrown away from the fold light, fibres over it. Its accent is one fold.
- **Skein silk, cross-stitch.** The drawing is counted out in stitches on the cloth. Its accent is the running stitch round the edge.
- One accent per plate, so it reads as its look at thumbnail size. The plate puts the accent in the emptiest corner; do not add a second.
- Draw the source in flat fills with no outlines, shading or text: the material adds those. About 320 to 640 px a side is enough; a plate takes a few milliseconds, so make it once and keep the canvas.
- `Storeybrook.plate.media` lists the six as data (`{ id, name, accent }` by look). `Storeybrook.tint(source, colour)` and `Storeybrook.edges(source, rgb, gain)` are the two helpers the family shares; Depthfield and Hypermetapunk make their plates from the same two.
- Every colour comes from the look's pen, so a plate changes with the tokens. Options: `word`, `seed` (where the wash blooms and the stipple falls) and `font` (the sound word's font stack).

**Accessibility**: a plate is a picture. Give the canvas `role="img"` and an `aria-label` that names the subject and the material, and keep anything a reader must read or press out of it. A plate is still, so it needs no reduced-motion branch.

Family task F9; Depthfield's plate (scan and stage) and Hypermetapunk's (neon, xerox and solid) take the same source canvas.
