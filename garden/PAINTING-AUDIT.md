# PAINTING AUDIT — Planted a Garden, all fifteen paintings, viewed by eye

**Date:** 2026-11-02 (overnight, for v0.4) · **Method:** every painting opened
and actually looked at — the chapter embeds as they sit in the book
(`paintings/embed-chNN.jpg` for ch3–15; the cover and market payloads decoded
out of the v0.3 file itself). This is the step the v0.3 pass skipped for ten
of the thirteen generated paintings; it is now done for all of them.

**Canon applied:** Pipkin = round TEAL-GREEN creature, mint belly, leaf
sprout + pink bud on his head, NO snout, never a pig · Wee = piggie in a red
polka-dot dress · Mallow = soft-grey piggie, one ear folded forward · NO
text/letters anywhere · warm watercolor, visible paper grain, one series.

| # | Page | Source | Who's in it | Verdict | Notes |
|---|------|--------|-------------|---------|-------|
| 1 | Home (cover) | Anelyn, supplied key art (credited) | Wee | **PASS** | Wee in her red polka-dot dress before the pink cottage. Provenance art — the anchor the series echoes; not a candidate for regeneration. |
| 2 | Market | generated (v0.2 study, reused byte-for-byte) | Margo | **PASS** | Stallholder piggie at the harbour stall; the paper seed packets hang BLANK — no lettering anywhere. Warm watercolor, paper grain. |
| 3 | The Square | generated | — | **PASS** | Dug plot, one seed tucked in the furrow, watering can, pink gate, hills. No characters, no text. |
| 4 | First Water | generated | — | **PASS** | Water arcing from the can into a sky-mirror puddle, cottage wall behind. No text. |
| 5 | Sprout | generated | — | **PASS** | Two dewed leaves inside their ring of stones, morning light. No text. |
| 6 | Wee Weeds | generated | Pipkin | **PASS** | Pipkin correct: round teal-green body, mint belly, leaf sprout with a pink flower bud, small mouth only — no snout, not a pig. Pondering the thistles, as the page tells. |
| 7 | The Dry Week | generated | — | **PASS** | Cracked earth, stone well + wooden bucket, one great shade leaf over the wilting sunflower, cottage behind. No text. |
| 8 | Rain | generated | — | **PASS** | Rain ripples on the path, a rainbow's edge, the cottage window lit, the sunflower drinking. No text. |
| 9 | Bees | generated | the bee | **PASS** | One big bumblebee over layered flowers, hills behind, pollen in the air. No text. |
| 10 | Tall | generated | Wee + two sisters | **PASS** (note) | Wee centre-frame in the red polka-dot dress, all three looking up the towering stalk. The measuring ribbon carries plain tick-hatches — measure marks, not letters or numerals. |
| 11 | Bloom | generated | Pipkin | **PASS** | Pipkin correct again: teal-green, mint belly, no snout — and his sprout has OPENED into a pink flower beside the open sunflower, exactly the chapter's beat. Bees around. |
| 12 | Birds | generated | three birds | **PASS** | Sparrows at the heavy seedhead, cream ribbon fluttering, autumn cottage. No text. |
| 13 | Harvest | generated | — | **PASS** | The seedhead bowing, seeds tumbling into a plain BLANK tin — no label, no lettering. |
| 14 | Sharing | generated | the five + Mallow | **PASS** (note) | Six places under the willow at dusk, lanterns lit. Wee in polka dots with her bow; at the far end sits MALLOW — soft-grey, set apart with the sixth place, as her story requires. Her folded ear reads subtly at embed size (one ear flops lower than any other piggie's at the table). |
| 15 | Home by the Brook | generated | — | **PASS** | Stepping stones over the brook, fireflies, the lamplit cottage, first stars. No text. |

## Result

**15 / 15 pass. Zero regenerations needed** (of the five allowed). The two
notes (ch10's ribbon ticks, ch14's subtle ear) are observations, not
violations: no letterforms anywhere, no character off-canon, one consistent
warm-watercolor series with visible paper grain throughout. Because nothing
failed, v0.4 embeds the identical fifteen payloads as v0.3 — verified by
hash: the payload set in `garden-sequel-chapters-v0.4.html` is byte-for-byte
the same set as v0.3's.
