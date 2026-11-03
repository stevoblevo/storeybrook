# Storeybrook plan

Owner: Bleve. Last updated 3 Nov 2026 by Claude (session 01ApCRaiX6JVCSowgVuAsG4V). Work that crosses the family (versions, the pen, Hypermetapunk) is in the family plan: <https://github.com/stevoblevo/depthfield/blob/main/docs/family.md>. Claim a task the same way as there.

## Where things stand

- `main` is **Storeybrook 1.2.0**: 30 components (Guardian and Taste are new), six looks, 16 brand-book chapters, merged 3 Nov from `claude/storeybrook-1-2`.
- The showcase (`index.html`) gives each look a scene and hides seven pets along the brook; "Play it for me" runs the adventure.
- Consumers: AND SO (all six looks as `sb-*` skins, on a fork of the 1.0 bundle), the Malachi sites (a 1.0 copy), Reignfawn (its own origami, daylight, knight, ink and comix looks).

## Origami: from the settings look to papercraft

Origami today is folded-paper styling for editors and settings: 45° stones, dog-eared sheets, two-tone facet washes. The games want more. Reignfawn's world is origami by default, AND SO draws origami facets itself, and Bleve wants papercraft rather than pixel art for his games. Origami 2 gives every page and every canvas the same paper.

| ID | Task | Acceptance check | Size | Who | Status |
| --- | --- | --- | --- | --- | --- |
| O1 | The papercraft pen: `Storeybrook.paper(look)` (resolved inks and stocks) and `Storeybrook.fold(ctx, shape, opts)`, which draws a shape as folded paper lit from one direction: facet shades, crease lines, a cast shadow, paper grain | A canvas demo draws a mountain, a fawn-shaped head and a crane in Origami and in two other looks from the pen alone | M | Claude | doing |
| O2 | Origami tokens: paper stocks (`kami`, `washi`, `kraft`, `foil`), light direction, crease and fold-shadow strengths, used by the CSS and the pen | `tokens.json` has them; the docs token table shows them | S | Claude | doing |
| O3 | The Folded component: a DOM figure built of facets (CSS, no canvas) that folds open on reveal and lies flat under reduced motion | README and preview; works inside any look, best in Origami | M | Claude | doing |
| O4 | The showcase's Origami scene becomes a papercraft diorama: the level maker refolds a paper valley (pen) instead of only a map | Scene shows the valley; changing a control refolds it | M | open | open |
| O5 | The creature in paper: `creatureSVG` draws faceted forms in Origami | Every stage and form reads as folded paper in Origami | M | open | open |
| O6 | Hand O1 to Reignfawn and AND SO through their own rules (candidate branch and PR) | A PR in each that draws its origami from the pen | M | open | open |

## Other tasks

| ID | Task | Acceptance check | Size | Who | Status |
| --- | --- | --- | --- | --- | --- |
| S1 | Read-aloud voices from AND SO's fork (family F5) | Reader picks a clear voice in an accent other than the listener's | S | open | open |
| S2 | Guardian in the showcase: the pet you walk with can be the page's Guardian | Picking a pet in the pet book sets the Guardian | S | open | open |
| S3 | Taste in the docs: a "check this page" button on every docs page | Running it on the showcase lists findings with fixes | S | open | open |
| S4 | Mirror windows show Guardian and Taste states across the six devices | Screenshot | S | open | open |
