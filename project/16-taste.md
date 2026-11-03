# Taste

A Storeybrook page should read like a book someone made, not a page a model wrote. Most of what makes the difference is already in this book: sentence case, no eyebrows, real names for buttons, no dark patterns, materials instead of boxes. `Storeybrook.taste()` checks a page for all of it, and for the generic tells it shares with Depthfield.

## The generic tells

These came from one review (Maesage Study 03, November 2026) of a page that was correct and still read as generated:

- **A showroom render** instead of the thing in use. Draw it with the kit's pen, in the look, doing something.
- **A frame and a sidebar**: tabs, a bordered app frame, a column of settings beside the picture. A Storeybrook page is a table with a book on it (Layout); settings live in the drawer.
- **Identical tiles**: six tiles each saying the same label. A choice is a stone, a cover, a sticker or a guardian, each drawn as what it is.
- **The same choices shown again and again**: on the art, as chips, as tiles, as a list. Show a choice once, where it is used.
- **Slogans**: "The cloth becomes a surface. The table becomes a world." Narration names real things (Writing): the far stone, the copper lid.
- **The diminutive**: "a little feint", "a little world". Say a size when it is a size.

## Rules

- Run `?sb-taste` on every new page, in each look it ships in, before a person reviews it.
- Fix every `warn`. Keep an `info` only if you can say why.
- The linter finds tells; a person finds taste. Read the page aloud with the reader (Sound) before you ship it: generated copy sounds generated.
