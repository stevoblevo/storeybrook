<img src="site/icons/icon-192.png" alt="Storeybrook mark" width="84">

# Storeybrook

A light-first design system for illustrated stories, read-aloud pages and small games. Watercolor paper, stepping stones and a growing creature share the same six looks.

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
  <link rel="stylesheet" href="v/1.3.2/tokens.css">
  <link rel="stylesheet" href="v/1.3.2/bundle.css">
  <script src="v/1.3.2/bundle.js"></script>
</head>
<body class="sb-body">
  <a class="sb-btn sb-btn--primary" href="#chapter">Turn the page</a>
  <h1 id="chapter">The paper valley</h1>
</body>
</html>
```

The [1.3.2 runtime](v/1.3.2/) includes `paper.js` for Pen and Folded; load it after `bundle.js` only if needed. The [version manifest](v/index.json) records SHA-256 hashes. See the [Reader](project/components/Reader/README.md) for browser voice controls and the [Button](project/components/Button/README.md) for the markup contract.

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
    paper.js                 The paper add-on (Storeybrook.pen and Folded): load it after bundle.js
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

## 1.3.2 reader and scroll patch

The Reader now offers the voices the browser actually exposes, a sample button, Stop, and natural pitch/rate. Automatic selection prefers enhanced/premium/natural/neural voice names or identifiers before accent preference; explicit saved choices always win. Installed operating-system voices are not necessarily exposed to Safari. No voice download, paid speech service or system setting is required.

The showcase updates the brook once per changed scene, and mirror windows preload earlier with visible loading and fallback links. These changes do not claim to diagnose every Safari rendering delay.

`node tests/reader/logic.cjs` and `node tests/showcase/scroll.cjs` cover deterministic behavior. Real audible Safari quality must be reviewed on a device with its available voices.

Versioned runtime files live under `v/1.3.2/`; `v/index.json` records their SHA-256 hashes. The original 1.3.0 runtime and the 1.3.1 candidate remain unchanged. 1.3.2 also resets a paused speech engine when stopping, so the next Play can start normally.

</details>
