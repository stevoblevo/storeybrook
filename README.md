<img src="site/icons/icon-192.png" alt="Storeybrook mark" width="84">

# Storeybrook

A light-first design system for illustrated stories, read-aloud pages and small games. Watercolor paper, stepping stones and a growing creature share the same six looks.

It is the day half of Bleve's toolkit family, beside Depthfield (night) and Hypermetapunk (dusk): six looks on one set of token names, 34 components, a behavior bundle exposed as `window.Storeybrook`, and three add-ons for canvas: the paper pen, the plate and the day pets.

**Meta Daylight · Knight Night · Ink Blot · Comix · Origami · Skein silk**

[Open the showcase](https://stevoblevo.github.io/storeybrook/) · [Read the interactive docs](https://stevoblevo.github.io/storeybrook/docs.html) · [Compare the Saelion toolkits](https://saelion.co/toolkits)

## Try it

[Watch the book play itself](https://stevoblevo.github.io/storeybrook/?autoplay). To try it by hand, open the **Look** menu, refold the stepping stones in Origami, or sample a browser voice in Knight Night.

## Use it in a page

From the repository root, save this as `scratch.html` and run `python3 -m http.server 8702`. Open `http://localhost:8702/scratch.html`. No package install is needed for this example. The kit stylesheets can load web fonts; your browser uses fallback fonts when unavailable.

```html
<!doctype html>
<html lang="en" data-theme="origami" class="sb-root">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Storeybrook example</title>
  <link rel="stylesheet" href="v/1.5.0/tokens.css">
  <link rel="stylesheet" href="v/1.5.0/bundle.css">
  <script src="v/1.5.0/bundle.js"></script>
</head>
<body class="sb-body">
  <a class="sb-btn sb-btn--primary" href="#chapter">Turn the page</a>
  <h1 id="chapter">The paper valley</h1>
</body>
</html>
```

The [1.5.0 runtime](v/1.5.0/) is the current release; every earlier one stays where it was, byte for byte. Each version also keeps its own showcase: open `v/1.5.0/` for the page as it shipped, running on that version's runtime, and `v/1.4.0/` or `v/1.3.2/` for the ones before it. The [version manifest](v/index.json) records SHA-256 hashes. See the [Reader](project/components/Reader/README.md) for browser voice controls and the [Button](project/components/Button/README.md) for the markup contract.

## Draw with it on canvas

Three add-ons load after `bundle.js`, only if a page needs them.

- **The paper pen** (`v/1.5.0/paper.js`): `Storeybrook.looks` lists the six looks as data, each with the mood it rewards in play (still, impact or lit), and `Storeybrook.pen(look)` gives a look's inks, paper stocks and materials, folds any shape as paper lit from one side, and paints a different sun in each look. Folded does the same in the page, without canvas. See [Pen](project/components/Pen/README.md) and [Folded](project/components/Folded/README.md).
- **The plate** (`v/1.5.0/plate.js`, after `paper.js`): `Storeybrook.plate(look, source)` takes one canvas of flat fills and returns it in the look's material: a wash, lamplight, brush ink, print, cut paper or cross-stitch, each with one accent. Depthfield and Hypermetapunk make plates from the same source canvas. See [Plate](project/components/Plate/README.md).
- **The day pets** (`v/1.5.0/pets.js`): `Storeybrook.pets` holds the seven pets found in the showcase, their place in the family's shared save, and `draw(ctx, id, o)`, which paints each one in a look's inks and lets it dance to a beat. See [Pets](project/components/Pets/README.md).

## Project notes

[Brand book](project/README.md) · [Component types](project/components/index.d.ts) · [Project plan](docs/plan.md)

The [Claude artifact](https://claude.ai/artifact/YQrpanzsuY5WPgr47GFCNe) is the design source of truth and may require access. The public repository and demos do not require Claude. For site development and checks, see [AGENTS.md](AGENTS.md).

### The toolkit family

[Depthfield](https://github.com/stevoblevo/depthfield) · [Hypermetapunk](https://github.com/stevoblevo/hypermetapunk) · [Shared toolkit contracts](https://github.com/stevoblevo/depthfield/blob/main/docs/family.md)

### License

The source is publicly viewable. No repository-wide license is published here; public visibility does not grant general permission to reuse or redistribute the code or artwork. Check individual notices for third-party materials, and ask the owner before reusing toolkit assets or code outside the repository.

<details>
<summary>Repository reference and maintenance notes</summary>

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
    paper.js                 The paper add-on (Storeybrook.pen, its sun, and Folded): load it after bundle.js
    plate.js                 The plate add-on (Storeybrook.plate: one drawing in each look's material; load it after paper.js)
    pets.js                  The pets add-on (Storeybrook.pets: the seven day pets, the shared save, a canvas painter)
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
- **Shared with Depthfield and Hypermetapunk.** The three sites save to one `localStorage` key, `crossing:pets` (`sb:`, `df:` and `hmp:` ids), on the same origin. The pets' data and the save live in the kit since 1.4 (`project/components/pets.js`, `Storeybrook.pets`; family task F9), and the showcase uses them. The pet book counts Depthfield's five night pets and Hypermetapunk's five dusk pets, seventeen across the three, and finding all seven here puts Saelion in Depthfield's night sky.

### Taste

Open any page with `?sb-taste` in its address and the bundle reads it against the brand book (see `project/16-taste.md`). The showcase passes its own check.

After changing anything under `project/`, run `python3 site/build.py` and commit the output.

## 1.3.2 reader and scroll patch

The Reader now offers the voices the browser actually exposes, a sample button, Stop, and natural pitch/rate. Automatic selection prefers enhanced/premium/natural/neural voice names or identifiers before accent preference; explicit saved choices always win. Installed operating-system voices are not necessarily exposed to Safari. No voice download, paid speech service or system setting is required.

The showcase updates the brook once per changed scene, and mirror windows preload earlier with visible loading and fallback links. These changes do not claim to diagnose every Safari rendering delay.

`node tests/reader/logic.cjs` and `node tests/showcase/scroll.cjs` cover deterministic behavior. Real audible Safari quality must be reviewed on a device with its available voices.

Versioned runtime files live under `v/1.3.2/`; `v/index.json` records their SHA-256 hashes. The original 1.3.0 runtime and the 1.3.1 candidate remain unchanged. 1.3.2 also resets a paused speech engine when stopping, so the next Play can start normally.

## 1.4.0 the pets and the sun

- **Pets** (`project/components/pets.js`, an add-on loaded after `bundle.js`): `Storeybrook.pets` holds the seven day pets as data with `has`, `find`, `count` and `total` over the shared `crossing:pets` save, the same contract as Depthfield's and Hypermetapunk's pets (family F9). `pets.draw(ctx, id, { x, y, size, t, beat, look, still, alpha })` paints a pet on canvas in a look's own inks and lets it dance to the beat with a swing. The showcase takes its pets from it and counts Hypermetapunk's dusk pets.
- **The sun in the pen**: `Storeybrook.pen(look).sun(ctx, { x, y, r, t, still, alpha })` paints a watercolour sun in Meta Daylight, a moon in Knight Night, and its own sun in each other look. The fold light the pen called `sun` in 1.3 is `light` now; `sun[0]` to `sun[2]` still read it.
- `node tests/pets/logic.cjs` checks the contract and keeps the pets' ink table in step with `tokens.json` and `bundle.css`; `node tests/pets/browser.cjs` (Chromium or WebKit) checks the pet book, `draw` and the sun.
- Versioned runtime files live under `v/1.4.0/`, which now include `pets.js`; earlier versions are unchanged.

## 1.5.0 the plate and the moods

- **Plate** (`project/components/plate.js`, an add-on loaded after `paper.js`): `Storeybrook.plate(look, source, { word, seed, font })` makes one drawing in each look's material, with one accent per look, and puts the accent in the emptiest corner. `Storeybrook.tint` and `Storeybrook.edges` are the two helpers the family shares (family F9, the Storeybrook half).
- **Moods**: every entry of `Storeybrook.looks` carries `mood`: `still` for the day looks, `impact` for Comix, `lit` for Knight Night (family F10). A game reads it to choose what a look rewards.
- **Taste** no longer counts a control inside closed `<details>`, so the showcase passes its own check with the voice options shut.
- `node tests/plate/browser.cjs` (Chromium or WebKit) makes the six plates from one drawing, checks that the source is never changed and that the Plate page does not scroll sideways at 390 px.
- Versioned runtime files live under `v/1.5.0/`, which now include `plate.js`; earlier versions are unchanged.
- **Versioned showcases**: `tools/release.py` now freezes `index.html`, with the styles, scripts and mirror page it loads, under `v/<version>/` (new `tools/landing.py`). The showcases of 1.3.2 and 1.4.0 are back-filled from history into their folders; no file that was already there is changed. `node tests/landing/browser.cjs` opens every frozen showcase.

</details>
