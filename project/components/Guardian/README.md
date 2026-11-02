# Guardian

A small drawn object, with no visible label, that floats near the creature and switches one real thing when tapped; it can be dragged anywhere and flicked off the page to sleep.

**Provide** a positioned host (a page, a panel) and, usually, the creature's element to sit beside: `Storeybrook.guardian(host, { kind, label, on, near, from, onTap, fill, svg, sleepNote })` → `{ el, on, asleep, set(on), sleep(), wake(), place(x, y), destroy() }`. `kind` is one of `ice`, `heart`, `star`, `leaf`, `moon`, `bell`, drawn with the kit's pen (2px `art-line`) and filled with a wash (`fill`, a wash token name, picks another); `svg` draws your own inside the 56px box.

- A guardian arrives because something happened (a word overheard, a stone walked): from `from`, it hops to its place beside `near` over `dur-base` with `ease-bounce`. It does not float or bob after that; it holds still until touched.
- Tap: it switches its thing, keeps `aria-pressed` in step, rings a `cue` around itself while on, plays the stone sound if sound is on, and fires `sb:guardian` with `{kind, label, on}`.
- Drag: it moves anywhere in the host. Flick it fast toward an edge: it flies off and sleeps, and a toast says so ("Quiet mode went to sleep."). `Storeybrook.guardian.asleep()` lists sleepers; `wakeAll()` brings them back (offer it in the drawer or settings).
- Four at most on a screen, and never over the story text.

**Accessibility**: each guardian is a real button whose accessible name says what it switches (`label`); Space or Enter toggles it, Delete puts it to sleep. Everything a guardian switches is also in the settings. Reduced motion and Ink Blot: no hop and no flight; a flick puts it to sleep at once.
