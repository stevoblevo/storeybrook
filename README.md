# Storeybrook

A light-first design system for storybook pages and little games. Its pieces are watercolor paper, pages that turn, stories read aloud, a brook of stepping stones, nougats that fly into a jar, and a creature that grows. It has six looks (Meta Daylight, Knight Night, Ink Blot, Comix, Origami, Skein silk) built on one set of token names, 28 components, and a behavior bundle exposed as `window.Storeybrook`. It is the daylight counterpart to [Depthfield](https://github.com/stevoblevo/depthfield).

This repo is a read-only export of the Storeybrook design system (index format v3) from its Claude artifact:
<https://claude.ai/artifact/YQrpanzsuY5WPgr47GFCNe>

The artifact is the source of truth. Opening that link requires access on claude.ai; everything needed to read the system is in this repo.

## Start here

Read [`project/README.md`](project/README.md) first. It is the brand book and explains how the other files fit together.

## Layout

```
SKILL.md                     How the Design System artifact format works (file shapes, caps, write order)
project/
  README.md                  Brand book — start here
  01-paper.md … 15-play.md   Foundations, one topic per file:
                             paper, looks, color, type, layout, motion, iconography, writing,
                             sound, progression, devices, accessibility, code, governance, play
  design-system.json         Index: title, namespace, libraries, asset-group records
  tokens.json                All tokens (six looks as color themes, type, spacing, radius, …) as lists
  components/
    bundle.js                One classic script that assigns window.Storeybrook
    bundle.css               Component styles and the six looks' hooks
    index.d.ts               Types, as documentation of the API
    <Component>/README.md    Usage guidelines (first sentence = summary)
    <Component>/preview.html Live preview card
  assets/
    Creature/                Saelion reference renders: five stages, asleep, and the three forms + README
    Nougat/                  Nougats and the jar (empty, half, full) + README
    Icons/                   44 icons (24px grid, 2px strokes) + README
```

## Notes on the export

- **SVG assets** came from the artifact's asset store. They sit under `project/assets/<Group>/` with the names `design-system.json` gives them under `assetGroups`. Their colors are fixed. In pages, draw icons, the creature and nougats with `Storeybrook.icon(name)`, `Storeybrook.creature(host, opts)` and `Storeybrook.nougatSVG(seed)` from `bundle.js`, which follow the current look.

## What is not here

- **Generated files.** `tokens.css`, `api/` and `manifest.json` are built by the artifact page from `tokens.json` and the bundle, so they are left out.
- **Artifact runtime.** `artifact-type/` (the viewer's `app.js`, `app.css` and references) belongs to the hosting type, not to this system.

## Previews outside the artifact

Each `preview.html` expects the host to inject `tokens.css`, the fonts, `bundle.css` and `bundle.js` first. Opened directly (including on GitHub Pages), a preview loads unstyled. For styled output, see the artifact.
