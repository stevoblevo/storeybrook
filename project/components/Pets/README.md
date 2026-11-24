# Pets

The seven day pets as data, and a canvas painter that lets each one dance to the beat: `Storeybrook.pets` is Storeybrook's side of the family's crossing pets, which Depthfield and Hypermetapunk keep under the same names.

**Provide** `components/pets.js` after `bundle.js` (an add-on: it uses `Storeybrook.creatureSVG` and nothing else). Pages that only list pets do not need `paper.js`; the preview loads it for the paper and the sun.

```js
var pets = Storeybrook.pets;            // { kit: 'sb', key: 'crossing:pets', version: '1.4.0', list, has, find, count, total, draw }
pets.find('kit');                        // true the first time: saves found['sb:kit'] = Date.now()
pets.has('sb:kit');                      // with or without the prefix
pets.count();                            // 0 to 7, this kit's pets found
pets.total();                            // { sb, df, hmp, all }: the family from the same save (7 + 5 + 5 = 17 at most)
pets.draw(ctx, 'bunny', { x: 120, y: 90, size: 96, t: now / 1000, beat: beat, look: 'comix' });
```

- `pets.list` holds `{ id, name, line, how, where, look, o }` for `egg`, `kit`, `octopus`, `bunny`, `sprite`, `pixie` and `saelion`, in that order. `look` is the look whose scene hides the pet (`null` for Saelion, who comes after the other six), `where` is that scene on the showcase, `line` is said when it is found and `how` is the hint while it is hidden. `o` are its `creatureSVG` options, so `Storeybrook.creatureSVG(p.o)` draws it in the page.
- **The save** is one `localStorage` key, `crossing:pets`, on stevoblevo.github.io: `{ found: { 'sb:<id>': ts, 'df:<id>': ts, 'hmp:<id>': ts }, active: { sb: id } }`. `find` reads it, adds its own entry and writes it back; it never removes another kit's entries and never changes `active` (the page decides which pet walks with you). With storage blocked the pets are kept for the visit. A new find fires `sb:pet` on `window` with `{ id, name, kit }`.
- **`draw(ctx, id, { x, y, size, t, beat, look, still, alpha })`** paints the pet centred on `x, y`, `size` CSS px tall (the creature's 200-unit box), in a Storeybrook look (`daylight` by default). It returns `true` when it drew and `false` while the pet's picture is still being made: the first call starts it and the next frames have it. Call it every frame with the same `t` (seconds) and `beat` for every pet.
- **The beat.** `beat` runs 0 to 1: it jumps to 1 on each beat of the music and decays; 0 or missing means no music. The pets learn the tempo from the jumps and dance with a swing: long-short, the long part two thirds of the beat, a little behind it. The egg rocks and hops on the "and", the kit bobs and its ears flop after each landing, the octopus shimmies and its arms trail, the bunny takes the long beat in one hop and skips the short one, the sprite floats and beats its wings, the pixie flutters along a curve and Saelion dips, opens her wings and ripples her arms. When the music stops they ease back to breathing and blinking.
- **Looks.** Each look's inks are written into the picture (fur, outline, cheeks, wings, the chimera coat), the same as the Creature component in that look. In Knight Night the pets glow by candlelight. Ink Blot is e-ink, so its pets hold still like the rest of the look; with `still: false` a pet changes pose once a beat and never tweens.
- **Cost.** The picture is made once per pet, look and size step and cut into parts (wings, ears, arms, the rest) that move on their own; a frame is a handful of `drawImage` calls, with nothing allocated, so seven pets at 60 frames a second are cheap. Sizes from 24 to 160 px stay crisp; small sizes draw the outline a little heavier.

**Accessibility**: `still` defaults to true under reduced motion and in Ink Blot, and `still: true` draws the pet at rest. A canvas is a picture: give it an `aria-label` that names the pets in it, and keep the pet book (names, lines, hints) in the page as text.

**Do / Don't**
- Do pass one clock to every pet in a frame, so they dance together.
- Do let a found pet walk with the player; the save's `active.sb` says which.
- Don't draw a pet that is still hidden; draw its silhouette in the page instead.
