# Storeybrook

A light-first design system for storybook pages and little games. Its pieces are watercolor paper, pages that turn, stories read aloud, a brook of stepping stones, nougats that fly into a jar, and a creature that grows. It has six looks (Meta Daylight, Knight Night, Ink Blot, Comix, Origami, Skein silk) built on one set of token names, 28 components, and a behavior bundle exposed as `window.Storeybrook`. It is the daylight counterpart to [Depthfield](https://github.com/stevoblevo/depthfield).

This repo is a read-only export of the Storeybrook design system (index format v3) from its Claude artifact:
<https://claude.ai/artifact/YQrpanzsuY5WPgr47GFCNe>

The artifact is the source of truth. Opening that link requires access on claude.ai; everything needed to read the system is in this repo.

**Live site:** <https://stevoblevo.github.io/storeybrook/> — the brand book, every token per theme, all components running live, and the assets, styled by the system itself.

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

- **The artifact's other generated files.** `api/` and `manifest.json` are built by the artifact page and are not needed here.
- **Artifact runtime.** `artifact-type/` (the viewer's `app.js`, `app.css` and references) belongs to the hosting type, not to this system.

## The site

`index.html` and `site/` make up the GitHub Pages site. The **Look** menu in the header switches the whole site, the cover and every live preview between the system's styles. Storeybrook also has a Density control (Regular, Kid, TV) that applies to the live previews. The choice is kept in the address (`?theme=…`), so a link opens in the same style, and picking a look inside a preview, such as Storeybrook's own Looks component, restyles the site too. It loads each preview the way the artifact does: `project/tokens.css`, `components/bundle.css` and `components/bundle.js` come first, and `<html data-theme>` is set to the theme picked in the header.

- `project/tokens.css` is compiled from `project/tokens.json` by `site/build.py`, following the artifact's tokens.css rules: one `[data-theme]` block per theme, `--font-*` families, a class per type style.
- `site/site.json` is the site's index (sections, components, assets, style groups), and `site/hooks.css` repeats the bundle's per-look defaults so a look can sit inside another (the style cards). Both are written by the same script from `site/config.json`.
- `site/vendor/` holds pinned copies of marked 12.0.2 and DOMPurify 3.1.6 for rendering the Markdown.
- `.nojekyll` makes Pages serve the raw files.

After changing anything under `project/`, run `python3 site/build.py` and commit the output.
