# Storeybrook

A light-first design system for storybook pages and little games. Its pieces are watercolor paper, pages that turn, stories read aloud, a brook of stepping stones, nougats that fly into a jar, and a creature that grows. It has six looks (Meta Daylight, Knight Night, Ink Blot, Comix, Origami, Skein silk) built on one set of token names, 30 components (guardians and a taste check among them), and a behavior bundle exposed as `window.Storeybrook` (1.2.0). It is the daylight counterpart to [Depthfield](https://github.com/stevoblevo/depthfield).

This repo is a read-only export of the Storeybrook design system (index format v3) from its Claude artifact:
<https://claude.ai/artifact/YQrpanzsuY5WPgr47GFCNe>

The artifact is the source of truth. Opening that link requires access on claude.ai; everything needed to read the system is in this repo.

**Live site:** <https://stevoblevo.github.io/storeybrook/> is the showcase, one scene per look, each built for what that look is for: a front page with the brook as its map and a shelf of covers (Meta Daylight), a bedtime story read aloud (Knight Night), an e-ink slate you can print (Ink Blot), a comic (Comix), a level maker that refolds the brook (Origami), a sticker album (Skein silk), and mirror windows showing one page on six devices at once. Seven pets are hidden along the brook, and the book can play itself (<https://stevoblevo.github.io/storeybrook/?autoplay>). The docs (brand book, tokens per theme, every component running live, assets) are at <https://stevoblevo.github.io/storeybrook/docs.html>. Both are built from the system's own files.

## Start here

Read [`project/README.md`](project/README.md) first. It is the brand book and explains how the other files fit together.

## Layout

```
SKILL.md                     How the Design System artifact format works (file shapes, caps, write order)
project/
  README.md                  Brand book — start here
  01-paper.md … 16-taste.md  Foundations, one topic per file:
                             paper, looks, color, type, layout, motion, iconography, writing,
                             sound, progression, devices, accessibility, code, governance, play, taste
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

`index.html` is the showcase (with `site/showcase.css` and `site/showcase.js`, plus `site/mirror.html` for the mirror windows). `docs.html` and the rest of `site/` make up the docs. The **Look** menu in the header switches the whole site, the cover and every live preview between the system's styles. Storeybrook also has a Density control (Regular, Kid, TV) that applies to the live previews. The choice is kept in the address (`?theme=…`), so a link opens in the same style, and picking a look inside a preview, such as Storeybrook's own Looks component, restyles the site too. It loads each preview the way the artifact does: `project/tokens.css`, `components/bundle.css` and `components/bundle.js` come first, and `<html data-theme>` is set to the theme picked in the header.

- `project/tokens.css` is compiled from `project/tokens.json` by `site/build.py`, following the artifact's tokens.css rules: one `[data-theme]` block per theme, `--font-*` families, a class per type style.
- `site/site.json` is the site's index (sections, components, assets, style groups), and `site/hooks.css` repeats the bundle's per-look defaults so a look can sit inside another (the style cards). Both are written by the same script from `site/config.json`.
- `site/vendor/` holds pinned copies of marked 12.0.2 and DOMPurify 3.1.6 for rendering the Markdown.
- `.nojekyll` makes Pages serve the raw files.

### Full screen on phones

- **Android and iPad:** the first tap anywhere asks the browser for full screen (browsers only allow it after a tap), and the browser's bars fold away. Leaving full screen is respected for the rest of the visit. The full-screen button in the header switches it back on.
- **iPhone:** Safari gives full screen only to sites opened from the Home Screen. A one-time hint says so: Share, then Add to Home Screen. The site ships `manifest.webmanifest` (`display: fullscreen`) and Apple's web-app meta so it opens there without Safari's bars.
- The browser's own chrome (`theme-color`) is tinted to the ground of whatever is on screen, and the page paints its background before any stylesheet loads, so a slow font never shows a white screen.
- All of this is in `site/immersive.js`, which is shared with the sister site and has no dependencies.

### The adventure

- **Seven pets.** One waits in each look, and Saelion arrives for whoever finds the other six. Each is found by doing the thing that look is for: tap Saelion on the front page, wake the sleeper at bedtime, turn the slate to its last page, grab the nougats in the comic, walk three stones in the level maker, and press the seal on the album. The pet you choose walks with you in the corner, and the pet book lists all seven with a hint for each one still hidden.
- **Play it for me.** The adventure plays itself in seven steps, about 45 seconds, finding every pet on the way. Any touch, key or wheel hands it back. `?autoplay` starts it from a link, which is how the home-screen shortcut works. It never starts on its own.
- **Shared with Depthfield.** Both sites save to one `localStorage` key, `crossing:pets` (`sb:` and `df:` ids), on the same origin. The pet book counts Depthfield's five night pets, and finding all seven here puts Saelion in Depthfield's night sky.

### Taste

Open any page with `?sb-taste` in its address and the bundle reads it against the brand book (see `project/16-taste.md`). The showcase passes its own check.

After changing anything under `project/`, run `python3 site/build.py` and commit the output.
