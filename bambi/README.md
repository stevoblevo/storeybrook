# Bambi — a Storeybrook telling

A play-and-listen storybook: Felix Salten's original *Bambi* (1923), in the
public domain, retold in our own words. No Disney film expression is used —
none of the film's designs, invented characters, or music; our Bambi is drawn
from roe-deer anatomy and our own designs only.

**Live:** https://stevoblevo.github.io/storeybrook/bambi/

## What's here

- `index.html` — the whole book as ONE self-contained file (2,527,408 bytes):
  the Rainwake Table, the cover, three spreads ("The Thicket Breaks",
  "First Steps", "Meadow Names"), the Rainwake listening place, the Road
  Ahead, and the Jar Shelf. Book version **v0.3.1** (0.x by the house version
  discipline — a draft until Sven's eye calls it ship quality).
- `FIT.md` — the placement audit: where this book lives and how its
  keepsake doors connect to the rest of the estate.

## The kit build

The book is built on the **Storeybrook kit, pinned at v1.1.0**
(`project/design-system.json` lastChange 2026-10-27). Following the kit
practice (the kit repo is the single source of truth; each build inlines a
pinned snapshot; the colophon stamps the version; book scenes stay
hand-made), `index.html` inlines:

- `project/tokens.css` whole;
- `project/components/bundle.css` sections genuinely adopted — the look
  hooks/base, the washes + sun, and the reduced-motion/e-ink tail;
- the SVG filter defs from `project/components/bundle.js` `ensureDefs()`
  (under Meta Daylight the hooks point at `url(#sb-bleed)` /
  `url(#sb-deckle)`, so a daylight snapshot carries the defs);
- the book's warmed Daylight values as a named page-layer variant above
  the snapshot, and the book's own scenes, prose and behaviour untouched —
  its JavaScript is byte-identical to v0.3.1.

The build is reproducible: `build-bambi-kit.py` in the Bambi workspace
regenerates the file from `bambi-all-together-v0.3.1.html` and the kit
sources. Never hand-edit the snapshot inside the book; change the kit or
the recipe and rebuild. The Google Fonts `@import` from bundle.css is
deliberately not carried — the file has zero external references.

One named visual consequence: v0.3.1's rose wash referenced a token the
book never defined, so it rendered as nothing; the kit snapshot defines
`--wash-rose`, and the Rainwake Table's rose wash now renders. The Table's
washes are the kit's (radial falloff, bleed filter) rather than the book's
hand-rolled flats — that drift is confined to the Table's weather; the
book spreads are pixel-identical (the phone spread screenshot is
byte-identical to v0.3.1's).

Proof at build time (2026-11-16): static validation 41/41; CDP
click-through 35/35 with zero JS errors; supplementary harness 25/25
(shared-nougats contract on fresh and legacy saves, 48px targets, reader
accessible-name sync, arrow-key guard, keyboard ripple, reduced-motion
guards, no-JS static reading).

## Narration

**Not baked.** The reader uses the device voice (the kit's Irish-first
ranking) until Sven ranks the narration auditions; the winning voice then
triggers the baked-track build. No audio files and no API keys are in
this folder.
