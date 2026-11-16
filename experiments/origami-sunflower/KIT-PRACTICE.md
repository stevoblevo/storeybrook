# Building on the Storeybrook kit — the practice

*Set down 2026-11-16, on Sven's word: "What's better and best? You tell me.
Then do the best practice eh." First applied to the origami sunflower
experiment (`origami-sunflower-fold-play-kit.html`).*

## Why

Hand-copying the kit's *manner* into each book drifts. It already happened:
the sequel v0.2 flattened Pipkin's voice to pitch 1.0 because the convention
lived in notes, not in code, and a builder working from notes paraphrased it.
Conventions that live in prose get paraphrased; conventions that live in the
kit's own files get copied exactly. So:

## The four rules

1. **The kit repo is the single source of truth** for everything shared:
   tokens (colour, type, spacing, radius, motion), component styles and
   behaviour, and the six looks. The repo is `~/workspace/storeybrook`
   (GitHub: stevoblevo/storeybrook). If a shared value is wrong, fix it in
   the kit, not in a book.
2. **Each book build inlines a pinned snapshot of the kit at build time.**
   Books ship as ONE self-contained file (Sven's delivery bar: his panel
   does not load sibling css/js), so the kit cannot be linked — it is
   copied in, by a build script, from the kit source, at a pinned version.
   Nobody hand-edits the snapshot inside a book file; to change it, change
   the kit or the snapshot recipe and rebuild.
3. **The colophon stamps the kit version used.** Every kit-built page
   carries an HTML comment at the top and a short "Kit." paragraph in its
   footer: kit version, what was snapshotted, the snapshot date, and a
   pointer back here. A reader (or a future builder) can always tell which
   kit a page was built from.
4. **Book-specific scenes stay hand-made.** The shared layer is the kit's;
   the story's own scenes — the sunflower, the folds, Pipkin himself — are
   written per page, below the kit layer, and may use kit tokens for their
   values. A scene is never forced into a component it is not.

## What "pinned snapshot" means here

- **Source:** `~/workspace/storeybrook/project/tokens.css` and
  `~/workspace/storeybrook/project/components/bundle.css` (and
  `bundle.js` only when a page genuinely uses a kit JS component).
- **Pin:** the kit's version as recorded in
  `project/design-system.json` (`lastChange` note). Current pin:
  **Storeybrook 1.1.0** (lastChange 2026-10-27).
- **Stamp:** `<!-- Storeybrook kit snapshot: v1.1.0 · source … · inlined
  <date> by <build script> · see files/KIT-PRACTICE.md -->` plus the footer
  colophon paragraph.
- **Recipe:** `hidden_files/build-origami-kit.py` is the pattern: it reads
  the kit files, extracts the token file whole and the bundle.css sections
  for the components the page uses (anchored slices, so the extraction is
  reviewable), rewrites the page's shared markup to the kit's classes, and
  asserts the stamp landed. Re-running it reproduces the file.
- **Tokens travel whole; components travel by the section.** tokens.css is
  small (13.4 KB) and is the vocabulary every look shares, so it is inlined
  entire — a page can then be re-looked by changing `data-theme` alone.
  bundle.css is 55 KB across 28 components; a page takes the sections for
  the components it actually uses, named in the stamp.

## Snapshot adaptations (honest, deliberate)

- **The Google Fonts `@import` (bundle.css line 1) is NOT carried.** It is
  an external reference and the deliverable must have zero. The kit's font
  stacks name local fallbacks after each webfont (Georgia, Palatino,
  system faces), so a snapshotted page renders in those — the same
  behaviour the hand-rolled pages always had. If a future build may load
  fonts, restore the import in the page layer, never inside the snapshot.
- **`url(#sb-deckle)` / `url(#sb-bleed)` filters** in the kit's hooks point
  at SVG filter defs the full kit scaffold ships. The Origami look sets
  both to `none`, so a snapshot under Origami needs no defs. A snapshot
  under Meta Daylight must include the defs block or set the hooks to
  `none` in the page layer — check before re-looking a page.
- **No bundle.js unless a component is genuinely used.** CSS-only
  components (Button, Chip, Balloon, Washes, Sheet) need no JS. Do not
  inline 60 KB of bundle to look official.

## How a future book build applies it

1. Copy `hidden_files/build-origami-kit.py`; point it at the book's source
   file and output name.
2. Audit the page (table below is the worked example): which styles are
   the kit's tokens/components wearing hand-rolled clothes, and which are
   the book's own scene.
3. Choose the bundle.css sections for the components the audit names;
   extend the script's slice list. Keep tokens whole.
4. Rewrite only the shared markup to kit classes (`sb-btn`, `sb-chip`,
   `sb-balloon`, `sb-page`/`sb-sheet`, `sb-washes`, `data-theme`,
   type classes). Leave the scene markup, copy and JS untouched.
5. Prove to the usual standard: static validation
   (`hidden_files/validate-single-file.js`) + the page's CDP harness
   re-run end to end, zero JS errors, screenshots read by eye against the
   pre-kit shots. A visual change is expected ONLY where the kit's look
   genuinely differs from the hand-rolled impression of it — name those
   in the report, don't hide them.
6. Record it: PLAN.md entry, goal timeline entry, daily memory note.

## The audit — origami sunflower (2026-11-16)

Source page: `origami-sunflower-fold-play.html` (20,659 B, hand-rolled in
the manner). Kit build: `origami-sunflower-fold-play-kit.html` (55,140 B).

| Page element | Before (hand-rolled) | Kit source | Verdict |
|---|---|---|---|
| Ink colour `--ink #1f2a33` | copied hex | tokens.css, Origami `--ink` — the identical hex | kit token |
| Paper ground | warm cream `#f7f2e9` + radial washes | Origami look: cutting-mat `--paper #eceef0`, grid lines, `sb-wash` folded-corner washes (`--sun`, `--brook`) | kit look — the ground honestly changes (see below) |
| Type | Georgia / system-ui | `--sb-story` (Alegreya stack); Origami display + UI = `--font-fold` (Zen Maru Gothic stack) | kit tokens |
| Title | hand-sized serif h1 | `display-s` type class | kit component class |
| "Storeybrook · Origami play" tag | hand-rolled eyebrow text | Chip `sb-chip sb-chip--sun` | kit component |
| Name buttons (Sunny/Goldie/Tallulah) | hand-rolled pills, 44px | Button `sb-btn sb-btn--secondary sb-btn--sm`; picked state → `--gamboge-soft`/`--gamboge` tokens | kit component |
| Step + action buttons | hand-rolled pills; primary = plain ink block | Button `sb-btn--secondary` / `sb-btn--primary` (accent + Origami folded-corner treatment); done state → `--rose-soft`/`--rose`, blooming → gamboge tokens | kit component |
| Pipkin's speech bubble | hand-rolled `.bubble`, left tail | Balloon `sb-balloon` (page surface, border-ink art-line, sticker shadow); tail turned left in the page layer to point at Pipkin | kit component |
| The sheet's surface | hand gradient + hand shadow | `--page` / `--surface` tokens + `--shadow-lift`; fibre whisper kept (page layer) | kit tokens |
| Fold timing | `.7s cubic-bezier(.34,1.2,.4,1)` | `--dur-turn` (700ms) + `--ease-paper` — the kit's fold values | kit tokens |
| Crease grey / gold | hand hexes `#8b9096` / `#c9a227` | `--ink-muted` / `--gamboge` (Origami `#d99a12`) | kit tokens |
| Focus ring | none specified | kit focus ring (`--focus`, 3px) comes with the base layer | kit base |
| The 3D flaps (tuck/water/breathe) | preserve-3d scene folds | — the kit's Fold component is a *view* transition (snapshot + swap), not a paper-craft scene | **page-specific** |
| The sunflower SVG + growth states | hand-drawn, s1–s4 / b1–b3 | — scene art; petal/leaf/soil colours stay the page's own pigments | **page-specific** |
| Crease SVG + gold season map | hand-drawn | — scene art (values now from tokens) | **page-specific** |
| Pipkin artwork | canonical book SVG | — the kit Creature is the Saelion creature, a different character; continuity rule keeps Pipkin as drawn | **page-specific** |
| Red thread stitch | hand-drawn motif | — the book's own motif | **page-specific** |
| Fold state machine, rustle/plink audio | page JS + WebAudio | — no kit JS component is genuinely used (Fold/Reader don't fit this single-scene page), so bundle.js is not inlined | **page-specific** |
| Chip as a *button* | — | Chip's own README: "Don't use a chip as a button" — the fold steps are Buttons; only the static tag is a Chip | kit rule observed |

## What the kit build changed visually (named, not hidden)

Proof: static 23/23; CDP click-through 29/29, zero JS errors — the same 29
checks the hand-rolled page passed. Screenshots
`files/origami-sunflower-shots/shot-bloom-kit.png` and
`shot-unfolded-kit.png`, read by eye against the originals:

- **The scene is faithful.** Sunflower, folds, creases, red thread and
  Pipkin are unchanged; the bloom and the gold season map read identically.
- **The chrome is now the real Origami look, and it is cooler.** The
  hand-rolled page wore a warm cream impression of Origami; the kit's
  Origami is folded paper on a cutting mat — pale blue-grey grid, flat
  folded washes, squared 4px buttons with ink borders, a rounded display
  face. That is the kit being itself, not a defect — but it is a mood
  change, and whether the warmer impression or the true mat suits the
  garden is Sven's eye to judge.
- **Buttons grew up.** Kit targets are 48px with the kit's hover/press
  motion; the picked name and done steps read in gamboge and rose tokens
  instead of hand-mixed tints.
- **The balloon is the kit's** — heavier ink line, sticker shadow, tail
  turned to point at Pipkin.

## Where the snapshot approach fought back

- bundle.css opens with an external font import — the snapshot recipe has
  to know to leave exactly one line behind (the build script asserts no
  `@import` survives).
- The kit's component CSS assumes its scaffold (grain/fibre data-URIs ride
  inside bundle.css itself, so those travel fine; the SVG filter defs do
  not, and are only safe to skip because Origami nulls them).
- Kit base styles are written for the kit's page scaffold (`.sb-body > *`
  layering, washes behind content). A book page keeps its own layout in
  the page layer and borrows the base, rather than adopting the scaffold
  wholesale — rule 4 cuts both ways.

## Across the other works

The same four rules are audited family by family — Bambi, Reignfawn,
Hypermetapunk, bespoke.gig and Queso Hades — in
`~/workspace/KIT-PRACTICE-ALL-WORKS.md`, with a recommended rollout
order. That note is the cross-work companion to this practice.
