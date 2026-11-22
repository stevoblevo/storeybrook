# The sequel next to the first book — gap review (2026-11-01, night)

Sven's judgment: *"this piggie sequel isn't good enough yet."* No defence
offered. Three diagnoses were run: my own structured comparison of
`garden-sequel-chapters.html` against Door IX (`piggie-push/piggie/v9/index.html`),
the Saedo **Claude lane** (craft/narrative — it worked from a verified evidence
brief; direct file reads were denied to the lane), and the Saedo **Grok lane**
(play/feel). They converge almost completely. Ranked by what each gap costs
the reader:

## The gaps

**1. The book is silent, and the text says it isn't.** *(all three diagnoses)*
Door IX holds a child with sound: a WebAudio music-box family (tone/plink/pop/
chime/musicBox, ~25 call sites) under every tap, pet squeaks, and baked
narration. The sequel has **zero audio** — no AudioContext anywhere — while its
own text prints "Tink." and "Plink." A pre-reader loses the narrator entirely;
every reader gets a promise the page doesn't keep, on all 15 pages.

**2. The pictures are placeholders, and the same one keeps coming back.**
*(all three)* Nine of fifteen chapters reuse one identical flat gardenbed —
a two-stop gradient box with a small plant SVG. Only three chapters have
bespoke scenes (market, birds, brook — and even those lean on emoji: 🧅🌷
produce, 🐦 birds). Chapter 14's scene is literally "🌻 🥫 🌻" in a card;
chapter 9's bee is an emoji gliding over a flat gradient. The words say a
season is passing; the eye sees the same box. The real borrowed watercolor on
the cover raises the promise the interior doesn't meet.

**3. One composition, fifteen times — nothing feels like a page turn.**
*(Claude + mine)* Every chapter stacks the same three blocks: story text,
bordered scene card, bordered play card. Door IX composes verse *into* layered
spreads. After three pages the reader knows the pattern and stops expecting
surprises — the opposite of what a page turn is for.

**4. The peaks have no stage.** *(all three)* Rain (ch8) and Bloom (ch11)
are the arc's payoffs, but they run at counting-game tempo, and every deed
completion is an **instant ✔ paragraph** — "how you file paperwork, not how a
flower opens" (Claude lane). No held beat, no dimming, no swell, no stillness.
Grok: tapping 7 ripples or 3 buds feels mechanically identical to tapping 6
weeds or 4 ribbons.

**5. Most games are one verb: tap N times, with identical press feel.**
*(Grok, sharpest here)* Rhythm-pour ×6 and bucket-trips ×4 are pure repetition
with no variation or consequence; "tap flower for 12 seeds" and "fill 6 plates"
are indistinguishable counters; share-or-shoo birds is two buttons whose choice
leaves no lasting visual state. Where feedback exists (droplets, sparkles,
ripples, the bee's glide) it's the same burst regardless of the verb.

**6. Pipkin is a voice in a header, not a creature in the world.** *(all three,
with a correction to the brief)* His *voice* is the draft's best system — 45
say() calls reacting to nearly every game event. But his body lives in a fixed
strip above the book: he never appears inside a scene, and during games he
never physically reacts (hop/hearts only when he himself is tapped). Door IX's
pets live inside the pages. (Correction to the original working assumption:
he is not absent — he is disembodied.)

**7. One generic typeface; the series doesn't recognise itself.** *(Claude +
mine)* Georgia throughout. Door IX sets IM Fell English SC for display and
Gochi Hand for handwriting, which is also how a reader tells narrator,
companion, and instructions apart at a glance. Here every line carries the
same weight and face.

## What v2 closes (this pass)

- **Sound, whole-cloth:** the book's own tone family ported verbatim and wired
  to every verb distinctly (plinks ascending as seeds count, pour arpeggios,
  tink for the harvest, a two-note blip under Pipkin's say(), chimes on deeds,
  musicBox phrase at Bloom, soft noise-drips in Rain), plus a mute toggle.
- **Voicing:** per-page Listen (baked George MP3s by relative path, falling
  back to speechSynthesis read-aloud in the book's manners), an auto-read
  toggle for newly revealed text, narrator-switchable lookup
  (`garden-narration/<narrator>/chNN.mp3`, George default/flat), and a
  six-voice audition set + page for Sven's casting.
- **Peaks staged:** Rain dims the whole book and slows; Bloom opens over
  seconds with a held beat before its done-line; every deed completion now
  lands as a 500 ms resolution (Pipkin hops with hearts at the guide, chime,
  done-line fading in after the beat) instead of an instant swap.
- **Scenes:** one real generated watercolor study for the Market (the art
  direction a full pass would take); chapter 14's emoji card replaced by a
  drawn SVG harvest table under the willow; the bee field given layered hills
  and drawn flowers; gardenbed given layered light (sky band, sun glow, soil
  shadow, foreground grass) and per-chapter sky tints; the garden squares now
  carry a tiny in-scene Pipkin at the corner of Wee's square on garden pages.
- **Type:** display stack restored to the book's faces (IM Fell English SC /
  IM Fell English with Georgia fallback), Pipkin's bubble in the hand stack
  (Gochi Hand first) — three voices distinguishable again.
- **Cover:** the missing painting restored in v1 itself (see below) and
  carried into v2.

## The v1 cover defect (found by Sven, verified)

`garden-sequel-chapters.html` as shipped had **zero** `data:image` URIs: the
cover assignment read `src = "ata:image/jpeg;base64,…"` — the leading "d" of
"data:" was missing. The full 126,042-byte JPEG payload was present and
byte-identical to the prototype's embed; the broken scheme made it
unloadable. Fixed in v1 (one character), verified: `data:image` count 1,
payload decodes as a valid JPEG, coverImg resolves. V2 inherits the verified
embed and adds the market painting (count 2).

## What remains open (honestly)

- **Painted interiors.** One generated study proves the direction; fourteen
  more painted pages (or commissioned art in Anelyn's/book manner) is an art
  programme, not a code pass. SVG craft can feel alive; it cannot *be*
  watercolor.
- **Casting.** George is baked as the safety track; the winning audition
  voice's 15 tracks bake only after Sven ranks the samples.
- **Sound and narration tuning are ears jobs.** The cues are ported and the
  tracks are baked, but whether rain drips soothe or grate on a phone speaker,
  and George's takes are clean, only listening can settle.
- **Game-loop depth.** Grok's structural charge stands for rhythm-pour and
  bucket-trips (repetition without variation) and for birds (a choice with
  no visible lasting state). V2 differentiates their feedback and gives the
  bird choice a persistent scene state, but a true re-think of those two
  loops is design work beyond one pass.
- **El Phantea** does not appear in the sequel at all — a continuity decision
  for Sven, not a defect this pass may silently repair.
- **No live render exists.** This VM's chromium remains walled; all postures
  are statically validated only. Sven's devices are still the audit.
