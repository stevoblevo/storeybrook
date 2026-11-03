# Folded

A figure folded from paper in the page itself: an SVG built from the same facets as the Pen, which folds itself the first time it comes into view.

**Provide** `components/paper.js` after `bundle.js`, then `<div data-sb-folded="crane"></div>` or `<div data-sb-folded='{"shape":"mountain","stock":"kami","label":"A folded mountain"}'></div>`. In script: `Storeybrook.folded(el, { shape, stock, color, tags, label, reveal })` → `{ el, render(), refold(), set(opts), destroy() }`. `--fw` sets the width (160px by default; it is square).

- Shapes and papers are the Pen's: `mountain`, `pine`, `crane`, `stone`, `boat`, `deer`; `kami`, `washi`, `kraft`, `foil` or a colour token.
- On reveal the facets arrive one after another, turning in from their centres, then the creases and the shadow settle. `refold()` plays it again; `reveal: false` shows it folded at once.
- It takes the look of the nearest `[data-theme]` and repaints when the look changes.
- Use it for a chapter's emblem, an empty state or a reward, one or two to a screen. It is a picture, not a button: put it inside a button if it does something.

**Accessibility**: it is `role="img"` with an `aria-label` (`label`, or "A folded paper crane"). Reduced motion and Ink Blot show the finished fold with no movement.
