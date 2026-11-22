# The Whole Garden — a living plan

*This Little Piggie Had Roast Meef* is live at [saelion.co/piggie](https://saelion.co/piggie).
This plan grows everything around it. No deadline. Sven's mandate: plan, design,
tinker, play — saedo fungi.

## Key art

**Autumn cottage** (`autumn-cottage.png`, supplied by Sven with the commission):
a pink cottage under autumn dot-mosaic trees, one small piggie in a red polka-dot
dress at the garden gate, the sea behind. Anchor painting for whatever grows next —
sequel cover candidate, or the home chapter's new face. Unassigned on purpose.

## Strand 1 — Bring saelion current (doors VI, VII, VIII)

Three finished builds exist that no public door serves yet:

- **VI · The Listening Fix** — read-along word glow timed from the recordings;
  every spoken line printed on the page.
- **VII · The Narrator Shelf** — George, Wikitoria Maree, Campbell and Lexi,
  each with sample previews and her own glow timings.
- **VIII · Room to Breathe** — the mobile de-crowding: a tall market on phones,
  staggered stalls, no clipped labels.

Work: export each build, verify, add doors + hub entries + versions.json notes,
branch + PR on saelion-relay-canary, merge, Sae(lion) promotes on Sven's word.
Also fold in the tiny nit: top-bar buttons back to a full 40px on phones.

**STAGED 2026-11-01 evening (Sven's go):** all three builds exported from the
artifact (v8 restored as the artifact's live build afterwards), verified, and
staged in `~/workspace/piggie-push/piggie/` — `v6/` (single self-contained
file, George's tracks inlined, sha fb934611…), `v7/` and `v8/` (index +
`assets/narration/` — 44 mp3s each; these builds load narration from relative
paths, so the folder must ship with the door), hub + versions.json updated in
place (Latest → VIII). Full details, the Saelion-dressing note (live v5's
head/lantern-radio additions change the sha — re-hash after dressing, as v5's
entry does), and loose ends live in `piggie-push/piggie/STAGING-NOTES-v678.md`.
Remaining: branch + PR via Sae(lion)'s git lane, Sven's merge, promotion.

**LIVE (verified 2026-11-17 by fetch of the served versions.json):** doors
VI–IX are all live on saelion.co — latest is `/piggie/v9/`, with VI The
Listening Fix, VII The Narrator Shelf, VIII Room to Breathe and IX
Everfallen each pathed and sha'd. The live shas differ from the staged
ones (v6 staged fb934611… vs live d26a2e9a…; v9 staged 60cd33de… vs live
6c04a328…), exactly as the Saelion-dressing note predicted — dressing
changes the hash; nothing to chase. The "Remaining" above is therefore
done; the open item for this strand is now Sven's play-through of the
live doors, not the shipping.

**Served-v6 content check (2026-11-17 heartbeat — the last open
verification item):** the question was whether the SERVED v6 file still
carries the `voiceEpoch`/`manualVoice` narration-ownership layer the
transplant never had. **Still unverified — but now precisely bounded.**
(1) The served source cannot be read through any sanctioned browser
route: `browser.open` returns rendered text only (the inline scripts are
excluded), and the live browser cannot reach view-source (the tool
rejects `view-source:` URLs; Ctrl+U, DevTools, browser menu and
right-click are all no-ops in the headless window) — the browser task
(19:41–19:50 MST) reported blocked, having loaded the live cover fine
without clicking anything. (2) The staged transplant is grep-proven to
lack the layer: `~/workspace/piggie-push/piggie/v6/index.html`
(9,027,756 B) contains zero `voiceEpoch`, zero `manualVoice`, zero
`Epoch` at all. (3) The repo cannot stand in for the served file: on
`stevoblevo/saelion-relay-canary`'s default branch there is NO
`piggie/v6/` (nor v7–v9) and the repo's `piggie/versions.json` still says
latest `/piggie/v5/` — the live doors VI–IX exist only on the
production host. GitHub code search returns zero hits for both strings
across the repo, but that proves nothing about the 9 MB v6 file (search
skips files that large; results marked incomplete). (4) The one live
lead: PR #28, open and unmerged since 2026-11-03 — "Door VI — repo↔live
reconciliation: adopt the served narration-ownership layer" — whose head
branch DOES hold `piggie/v6/index.html` at 9,030,556 B (blob
`bbda54ec…`), 2,800 B larger than the staged transplant (9,027,756 B,
blob `f1bc0aab…`) — the size of the missing layer, near as makes no
difference, but not grep-proven (a 9 MB file cannot be read through the
connector). Tensions to carry, not smooth over: PR #15 ("Publish Piggie
VI–IX", merged 2026-11-02) and PR #25 ("Door VI — El Phantea's voice,
transplanted onto dressed live file", merged 2026-11-03) both concern
Door VI, yet no v6 is on the default branch — either their base was not
the default branch or the files were later removed; the connector would
not return PR details (the MCP server does not currently advertise
`get_pull_request` / `get_pull_request_files`), so the base is
unchecked. Loose end: the staged sha recorded above (`fb934611…`)
matches neither the staged file's sha256 (`06be15eb…`) nor its git blob
sha (`f1bc0aab…`) as measured tonight — the staged file (mtime Nov 2
19:18) may have been re-exported after the note. **Next attempt:** raw
served bytes — Sven's own browser view-source, or Sae(lion)'s lane
reading the production file; until then the served file is the sole
carrier of the layer (if it still has it), and PR #28 is the standing
proposal to bring it into the repo. Full evidence in
`hidden_files/door-vi-served-check-2026-11-17.md`.

## Strand 2 — The Sixth Piggie (hidden path + gentle ARG)

The rhyme counts five piggies. The book never explains the hoofprints by the
well, the sixth place set at the feast, or why Pipkin stares at an empty
stepping stone.

Design seeds:

- Five quiet clues, one per chapter: a shadow that doesn't belong on the cover;
  a name half-heard in one narration track; a sixth chair at the tea party;
  a stone in the brook that is warm; a rhyme line with one word missing.
- The clues also live outside the book — one letter of her name hidden on the
  hub, one in the directory card, one where only version-hunters look — so the
  hunt walks a reader through every door on saelion.co.
- Finding all five unlocks a hidden chapter: *This Little Piggie Was Never
  Counted*. The keepsake prints differently for finders.
- Gentle by design: no timers, no accounts, nothing punishing. A secret, not a
  gate.
- **First planted easter egg (Sven, 2026-11-01 evening):** the YouTube video
  「た鼻立ちの日に」 by はるか2号[準備中] (@haruka_2go) —
  https://www.youtube.com/watch?v=FmOtrCRrlDA — a graduation song built on a
  nose pun (卒業おめでとう🌸👃). Directed into the v9 (Everfallen) build as a
  hidden unlock: a tiny 🌸/👃 hotspot on the keepsake page, appearing once the
  book is beaten (and from the start for returning finishers), opening a
  keepsake card with the standard YouTube embed plus title/creator credits
  linked to the watch page and channel. No autoplay with sound; Dreamwalk
  passes it by quietly.
- **Refined same evening — credits score + both doors (Sven):** the song
  becomes the book's **credits score**: gentle rolling credits after the
  keepsake play it **audio-only**; only a reader who stays to the **end of
  the credits** gets to **see** the video, revealed on the final credits card
  with attribution. And per Sven's "also do your idea(s) too tho", the
  keepsake 🌸/👃 hotspot stays as the **revisit door**: once earned, it
  reopens the video card, and returning finishers have it from the start.
  One song, two doors — patience discovers it, friendship revisits it.
- **First clue prototyped (2026-11-01 pulse):** `sixth-piggie-01-feast.html` —
  Sae's pick from the design seeds, the feast's sixth place: five plates at
  the table and one more tucked at the far end behind the bread basket, a
  small plate, a folded blue napkin, and a pear cut into thin moons. Tap a
  moon and one quietly disappears — nobody names it, nobody counts — and
  lifting the napkin's hem reveals the stitching *"Leave a little room."*
  Both together light the unlock: the sixth place is kept, for someone the
  pictures have always known, with a kettle already on beneath a willow.
  Laying the table again begins it anew.
- **Second clue prototyped (2026-11-01 pulse):** `sixth-piggie-02-market.html` —
  the market-well clue from the design seeds: beneath the stallholder's
  hanging apron, six small prints cross the damp patch — five to market,
  one turning aside toward a clump of thyme. Lift the apron to find them,
  tap the print that turns, and Pipkin, mid-shopping, glances after it;
  the blue thread caught on the well's lowest stone glints the same blue
  as the feast napkin, quietly tying the two clues together. Walking the
  market again begins it anew.
- **Third clue prototyped (2026-11-01 pulse):** `sixth-piggie-03-cottage.html` —
  Hazel's cottage clue from the design seeds: behind the mending basket,
  the window-seat cushion keeps one shallow hollow, as if someone small
  sat there a little while. Set the basket aside, touch the cushion and
  its corner settles, the curtain lifts, and a little ear-shaped shadow
  passes the window — while the blue thread trailing from the unfinished
  embroidered pear glints the same blue as the feast napkin and the well
  stone, tying all three clues together. Sitting at the window again
  begins it anew.
- **Fourth clue prototyped (2026-11-01 pulse):** `sixth-piggie-04-tea.html` —
  the tea party's sixth chair from the design seeds: five cups poured at
  the table under the willow, and a tablecloth hem that hangs a little
  longer on one side than it should. Lift the hem to find the small chair
  tucked behind it; draw it out and a tiny cup, already poured and still
  warm, is waiting — while the blue ribbon tied to its leg glints the
  same blue as the feast napkin, the well stone, and Hazel's unfinished
  pear, tying all four clues together. Laying the table again begins it
  anew.
- **Fifth clue prototyped (2026-11-01 heartbeat):** `sixth-piggie-05-brook.html` —
  the brook door from the design seeds, and the set is now complete at
  five: five stones home on the route, and one stone apart beneath the
  willow, dry, with a blue ribbon and two close-set hoofmarks. Touch the
  apart stone and its reflection warms into a little doorway, with the
  handwritten line *"There was room beside the rhyme."* Touch the line
  and the door opens on the hidden chapter's threshold — Mallow's willow
  room at dusk, kettle on a flat pebble, six mismatched cups, and her
  first words, *"You can sit down while I think."* Walking home still
  finishes the familiar journey; nothing is taken away. Crossing the
  brook again begins it anew. One lane variant remains unprototyped, for
  a possible sixth bonus: the sharing chapter's hanging cloth, with the
  embroidered piggie and her basket of a feather and a fallen blossom.
- **Hidden chapter prototyped (2026-11-01 evening):** `sixth-piggie-06-mallows-little-while.html` —
  the payoff the five clues were keeping: through the brook door into
  Mallow's willow room at dusk (roots, leafy ceiling with the stones still
  visible through it, kettle on a flat pebble, six mismatched cups).
  Mallow — soft-grey, one ear folded forward — opens with her seeded first
  line, *"You can sit down while I think."* The reader sits, places a cup
  beside either piggie (nobody needs unlocking to receive tea), and her
  thoughts arrive as six tappable fireflies — unhurried, un-ordered, no
  fail state; midway a moth lands on the kettle and the sentence is
  happily lost. The feast clue pays off kindly: the sixth place was
  *room, left on purpose*, for whoever is still thinking. It closes on the
  seeded narration — *"And home they went, with room between them for the
  evening"* — and the keepsake reverse, *"For whenever you have a little
  while."* A localStorage flag remembers that you've found Mallow (the
  door stays open for returners); folding it into Everfallen's veteran
  unlocks is noted in a code comment, not built. Static validation clean;
  staged only, unpublished.
- **Bonus clue prototyped (2026-11-02 heartbeat):** `sixth-piggie-bonus-sharing-cloth.html` —
  the last unprototyped lane variant, now built: the sharing chapter's
  hanging cloth, with the embroidered piggie stitched small at its edge
  (not painted, not printed), and her basket beside the line holding a
  feather and a fallen blossom. Touch all three, in any order, and the
  hem's stitching appears — *"Room for one more, always."* — in the same
  small careful hand as the brook's line, the blue corner thread glinting
  the same blue as all five clues. A bonus, not a sixth clue: the
  five-clue door already stands open, and this cloth folds into a pocket
  square for the keepsake. Hanging the cloth again begins it anew.
  Static validation clean (tags balanced, JS `node --check` OK, all
  `getElementById` refs resolve, zero external refs); staged only,
  unpublished.

## Strand 3 — El Phantea's Tea Letters (side story)

Postcards from a pocket elephant. Between the chapters, El Phantea delivers
letters — each one an image-comms card in Sven's ic.lov style, designed to be
saved and shared. Who writes to a pocket elephant? Rocco, about seasoning.
Hazel, about the garden. Someone whose handwriting is hoofprints.

Seeds: six letters for the first bundle; each letter unlocks a tiny interaction
in the book (a recipe margin-note, a seed packet, a song). Letters also live on
saelion as their own little shelf, linked from the hub.

- **First letter prototyped (2026-11-01 pulse):** `tea-letter-01-margo.html` —
  Margo's dusk-rose note as a tap-to-unfold ic.lov postcard: striped awning,
  three tappable baskets (saffron, plum, teal), a brass-stapled paper twist
  that unfolds her warning about the good tablecloth, and the tea-party unlock
  (dusk-rose and oat-straw, measured into the porcelain trunk) that lights up
  once the twist is opened. Nothing spillable; refolds on a second tap.
- **Second letter prototyped (2026-11-01 pulse):** `tea-letter-02-wee.html` —
  Wee's hoofprint letter as a pale river-blue postcard: six neat trot marks
  and one smudged extra, a winding brook with six white stepping stones, and
  Wee herself hopping stone to stone in order — the fourth stone splishes
  one sock wet, giggled at, never scolded — until the crossing unlocks the
  skipping rhyme (*"One stone, two stone, three stone, four — mind the sock
  and mind the door"*) that the narration will hum later. Hop again resets
  the brook, dry socks and all.
- **Third letter prototyped (2026-11-01 pulse):** `tea-letter-03-rocco.html` —
  Rocco's feast note as a thick cream card in copper ink: the quiet end of
  the roast-meef bone on a plate, which one tap turns into a spoon (the
  gravy dab kept, not scrubbed) and a second tap stirs El Phantea's tea —
  the steam curling, just for a moment, into the shape of a tiny cup — and
  lights the feast-page margin note (*"bone spoons keep tea warm two
  minutes longer — useful for pocket elephants"*). Back to the bone resets
  the table.
- **Fifth letter prototyped (2026-11-01 pulse):** `tea-letter-05-clove.html` —
  Clove the goat's lavender bell card: three silver bells hung on a string
  (the third wearing its little gold thread loop), each tap ringing softer
  than the last — bright, softer, softest — until the teapot's steam stands
  up straight and the three-note pouring hum is learned, the sound the
  narration will hum whenever El Phantea pours. Ring again resets the lane.
- **Fourth letter prototyped (2026-11-01 pulse):** `tea-letter-04-hazel.html` —
  Hazel's cottage letter as a linen card edged with pressed thyme: tap the
  half-open door and it swings wide, lamplight spilling onto the moss-green
  steps while the kettle sings, revealing three thyme seeds tucked behind
  the card — one for the sill, one for the soup, one to keep — and tucking
  all three lights the window-box packet that will still be growing when
  the sequel's garden opens. Closing the door begins it again.
- **Seventh letter prototyped (2026-11-19 heartbeat):** `tea-letter-07-mallow.html` —
  a **reward letter** from Mallow herself, the first letter that crosses
  Strand 2 into Strand 3 — designed by the Grok lane (dispatch
  `dsp_a69bc1c0a448495d`, result_ref `da299181…`, brief in
  `hidden_files/grok-brief-tea-letter-07-mallow-2026-11-19.md`) and built
  with Sae's flags applied. The willow room at dusk: the kettle on a flat
  pebble, six mismatched cups (the chipped one with its length of string),
  and the moth settled on the lid — tap it gently and its wings flutter
  once, the steam rises, three fireflies light, and the whisper lands
  (*"It stays until the steam cools."*). Her note, in the lane's words,
  keeps the canon straight (six cups, the string, the moth, the reader who
  sat down while she thought) and closes on the keepsake line, *"For
  whenever you have a little while."* The unlock lights the keepsake
  reverse's seventh cup with the margin note *"Mallow left this one for
  you."* **Sae's flags on the lane's answer, not relayed raw:** (1) the
  lane's "soft grey paper with a faint crinkle" repeats Letter № 6's
  river-grey crinkled paper, so Mallow's paper is warmed — dusk
  willow-grey, violet dusk in the scene, willow-green accents,
  pebble-beige ink, the pressed pear-slice (not a leaf) at the corner;
  (2) the lane's "tap anywhere else to fade the line" hides behaviour
  where a reader cannot see it, so the reset is a dedicated button and
  the moth tap is the only tap that matters; (3) the lane's risk is
  **built, not just noted** — the page gates on the hidden chapter's own
  flag (`piggie-sixth-mallow-found`): without it a veiled state shows
  (*"This letter is still on its way…"*) and the letter stays hidden, so
  a reader who stumbles here early learns nothing about the willow room.
  One eye-check fix from the proof: the moth first floated above the
  kettle; it now sits on the lid, steam curling around it. **Proof:
  static validation 23/23** (`hidden_files/validate-tea-letter-07.js`,
  including the gate key matching the hidden chapter's `FOUND_KEY`
  exactly); **headless Chromium, real mouse clicks via CDP** (harness
  `hidden_files/cdp-harness-tea-letter-07.js`): **40/40, zero JS
  errors** at phone 412×915 and desktop 1280×900 — veiled by default,
  letter shown once the flag is set, moth tap → steam + fireflies +
  whisper + unlock lit, second tap harmless, reset restores. Screenshots
  read by eye in `files/tea-letter-07-shots/` (shot-veiled-phone.png —
  a kind closed door, not an error; shot-letter-phone.png; shot-moth-
  phone.png — moth on the lid, steam up, chipped cup's note showing).
  The letter is on the garden shelf as its 40th card (Letters section,
  marked Quiet — "arrives only after Mallow is found"). Staged only,
  unpublished. Honest note: a standalone `file://` preview may not
  share storage with the hidden chapter, so the veil can show on a first
  direct open — on saelion.co the flag carries across pages, and the
  proof shots show both states either way.
- **Eighth letter prototyped (2026-11-20 heartbeat):** `tea-letter-08-elphantea.html` —
  **El Phantea writes back** — the turn the strand has been waiting for: the
  postmistress who delivered every letter writes one of her own, to the reader
  who keeps them. Designed by the Grok lane (dispatch
  `dsp_4a28749c48c94b2d`, result_ref `cd205122…`, brief in
  `hidden_files/grok-brief-tea-letter-08-elphantea-2026-11-20.md`) and built
  with Sae's flags applied. Warm ivory paper with a faint rose-gold
  porcelain rim, a brass teapot, the smallest cup front and centre, and the
  lane's miniature trunk with its steam curl in rose-gold line at the corner.
  Her letter, the lane's words kept (first paragraph verbatim): the dusk-rose
  blend travelled safely in her trunk with every letter the reader opened;
  she pours for the smallest cup first, always — *"One lump, or two? Tea
  makes everything better — and a second lump never hurt a friend."*
  **Sae's flags on the lane's answer, not relayed raw:** (1) the lane's
  interaction only showed the question and reset, so the reader now
  *answers* it — tap the sugar bowl and one lump drops in (*"One lump —
  for friends."*), a second tap drops the second (*"Two lumps — for
  family."*), a third stirs and the steam curls into the shape of a tiny
  cup, the Rocco echo, lighting the unlock; a fourth tap is harmless, and
  the reset is a dedicated button, not a hidden tap; (2) the lane's paper
  is kept but held apart from Rocco's cream card in copper ink by the
  porcelain rim, the brass teapot and the trunk motif; (3) the lane's risk
  is **built, not just noted** — the letter is deliberately **ungated** (no
  veil, no flag, no localStorage at all) and its wording never implies the
  other letters were hidden or earned, the footnote saying so plainly.
  The unlock is the lane's, verbatim: a margin note on the tea-party page,
  in her hand — *"Pour for the smallest cup first."* **Proof: static
  validation 28/28** (`hidden_files/validate-tea-letter-08.js`);
  **headless Chromium, real mouse clicks via CDP** (harness
  `hidden_files/cdp-harness-tea-letter-08.js`): **60/60, zero JS errors**
  at phone 412×915 and desktop 1280×900 — open by default, all three
  beats in order, fourth tap harmless, reset restores, bowl target ≥44px.
  (One first-run fail, a harness artefact: the unlock check compared
  textContent raw, and the source line-breaks inside the quoted margin
  note — the rendered text is correct; the check now normalises
  whitespace, and the validator's matching check was strengthened the
  same way.) Screenshots read by eye in `files/tea-letter-08-shots/`
  (shot-letter-phone.png — teapot, smallest cup, bowl with its two lumps;
  shot-poured-phone.png — lumps in, tea poured, spoon stirring, the steam
  curling into a tiny cup, "Pour again ↺" waiting). The letter is on the
  garden shelf as its 41st card. Staged only, unpublished. Next step: Sven
  reads it — one lump, or two, is his to answer.
- **Ninth letter prototyped (2026-11-21 heartbeat):** `tea-letter-09-pipkin.html` —
  **Pipkin writes — in footprints** — the guide himself writes back, the
  turn the strand has been waiting for after the postmistress did. Designed
  by the Grok lane (dispatch `dsp_133d8d81a9c64c84`, result_ref
  `ef798246…`, brief in
  `hidden_files/grok-brief-tea-letter-09-pipkin-2026-11-21.md`) and built
  with Sae's flags applied. Eight small teal footprints hop across a
  morning-light wash to one pressed sprout, lower right, its pink bud still
  tightly closed; beneath, his two lines in teal ink — *"I grew again, did
  you see? / Wee!"* — signed with two small footprints, no written name.
  His body is not drawn on the card, on purpose: the footprints and the
  sprout ARE Pipkin here, and no stand-in is risked. **Sae's flags on the
  lane's answer, not relayed raw:** (1) the lane's "appears for a breath
  then fades" hides the whisper on a timer, so each tap's line persists
  until the next tap, per the family's rule since № 7; (2) the lane's
  "sequence simply restarts after any pause" is vague, so the cycle is
  explicit — taps run 1 → 2 → 3 → 1, the third quivers the bud (closed,
  never opening — the lane's own risk, built in) and lights the unlock, a
  fourth tap starts the cycle again harmlessly, and the reset is a
  dedicated button; (3) the lane's "growth in spacing" contradicts its own
  risk note (footprints child-sized, bud closed — do not place him at his
  sequel stage), so the spacing stays even and the growth lives in the
  words, not the prints; (4) the unlock is grounded — the lane said "the
  garden square in the book", but the first book has no sunflower square,
  so it is the sequel's garden square (Wee's Own Square, ch3), and the
  footnote says so; (5) the pressed sprout is close kin to № 6's pressed
  leaf, held apart by the pink bud (his own), the mint leaf-border and the
  teal wash. No invented words anywhere: the tap whispers are his other
  two lines ("That tickles!", "Again! Again!"), and the third tap re-uses
  "I grew again, did you see?" — all four of his lines, kept whole. The
  unlock is the lane's, verbatim: on a later visit to the sequel's garden
  square, the sprout beside the sunflower carries one very faint pink bud
  that was not there on first reading — only a margin detail, no text, no
  new scene. **Proof: static validation 28/28**
  (`hidden_files/validate-tea-letter-09.js`); **headless Chromium, real
  mouse clicks via CDP** (harness `hidden_files/cdp-harness-tea-letter-09.js`):
  **56/56, zero JS errors** at phone 412×915 and desktop 1280×900 — open
  by default, eight footprints drawn, all three beats in order, fourth tap
  cycles harmlessly with the unlock still lit, reset restores, sprout
  target ≥44px. (One eye-check fix from the proof: the scene label first
  sat at bottom-left and collided with the first footprint; it now sits
  top-left, clear of the trail, and the run was re-proven.) Screenshots
  read by eye in `files/tea-letter-09-shots/` (shot-letter-phone.png —
  footprints hopping to the sprout, his two lines, the two-footprint
  signature; shot-quiver-phone.png — hearts drifting, "I grew again, did
  you see?", the unlock lit). The letter is on the garden shelf as its
  42nd card. Staged only, unpublished. Next step: Sven reads it — and
  answers whether the bud should ever open.
- **Bundle staged shareable (2026-11-01 evening, Sven's direction):** all six
  letters packaged in `~/workspace/piggie-push/piggie/tea/` with a shelf page
  (`index.html`, Saelion hub styling), a bot-readable `manifest.json` (order,
  senders, sha256, interactions, unlocks) and a `README.md` for collaborators —
  each letter is a single self-contained HTML file, no build step. The staged
  hub now links the shelf. Ships with doors VI–VIII; live home will be
  https://saelion.co/piggie/tea/.

## Strand 4 — The sequel

Working title: *This Little Piggie Planted a Garden*. The same five toes,
counted again across a growing season: market for seeds, home to plant, a
drought chapter, a sharing harvest, and home by the brook as the light fails.
The autumn cottage painting opens it — fall first, then the year turns.

- **First playable prototype (2026-11-01 night):** `garden-sequel-proto.html` —
  Wee's Own Square, playable end to end in one self-contained file (the
  autumn cottage painting embedded as the home scene). Six garden squares;
  in Wee's, the visitor names a sunflower (Sunny, Goldie, or Tallulah),
  plants it, and tends it through five stages by the house rhythm — water
  (droplets, soil darkens, the plant stretches), one slow breath, growth —
  watering as affection, never upkeep; no timers, no thirst, no fail state.
  Pipkin guides from a speech bubble (tappable for extra lines, and at the
  bloom his bow tie briefly becomes a matching flower — a Grok-lane idea,
  along with the stretch-and-quiver watering response and the "rain
  remembered" sparkle shower at bloom; dispatch `dsp_13e0a587fc8246f8`).
  The payoff: the bloom shakes seeds, three *tinks* into a named seed tin.
  A "How tall?" measure gives the lane's ribbon lines ("Up to Wee's knee!"
  → "Taller than Wee's ears!"). The garden remembers: localStorage keeps
  the plant, stage, seed tin, and visit count; a returning visitor away
  more than ~45 seconds (prototype kindness; the real book will use real
  time) finds the plant grown a stage and a volunteer sprout in the Rain's
  Square — *"the rain looked after it while you were busy."* A simple
  Dreamwalk toggle auto-tends one full cycle, plant to bloom to tin.
  Teaser squares keep the season's promises: garlic asleep till chapter
  two, Hazel's thyme from her letter, the Late Square left bare on purpose.
  Static validation clean (tags balanced, JS checked, no external refs).
- **Continuity restored (2026-11-01, Sven's catch):** the prototype first
  shipped Pipkin as a generic pig in a bow tie; Sven flagged it — Pipkin is
  not a pig. He is now the canonical Pipkin, sourced verbatim from
  `critterSVG()` in the book's own source (round teal-green creature,
  #79b8a6, mint belly, leaf sprout with pink bud, side ears, cheek spots),
  presented at his grown size, with the book's hop/hearts tap reactions and
  his canonical lines ("Wee!", "That tickles!", "Again! Again!", "I grew
  again, did you see?") in rotation. The bow tie is gone; at the sunflower's
  bloom, the pink bud on Pipkin's own sprout opens instead. Future sequel
  art derives from critterSVG(), never from a stand-in.
- **Home art provenance:** the autumn-cottage home painting is © Anelyn
  (@AnetteElbeck on X, ko-fi.com/anelyn), borrowed from X and credited
  in-file — the credit renders under the home scene and again in the
  colophon, both driven by the single `HOME_ART_CREDIT` constant in the
  prototype's script.
- **Playing shape (2026-11-01, Sven's format rule):** the prototype now
  follows the first book's shape — stacked single page when narrow/folded,
  a two-page spread (home scene left, guide + garden + controls right) when
  wide, with a dedicated unfolded-foldable posture (wide gutter over the
  centre crease, primary controls entirely on the right page), safe-area
  insets respected, ≥44px targets, and reduced-motion honoured.

- **Full-season draft built (2026-11-01 night, Sven's "13–17 pages" ruling):**
  `garden-sequel-chapters.html` — the prototype grown into a paged book of
  **15 page-chapters**, one growing season, turned like the first book
  (buttons, edge zones, and a swipe that refuses any touch born inside a
  game — separation is structural, asserted in the script's header comment).
  Pipkin is verbatim `critterSVG()`; the cover is Anelyn's painting, credited
  in-file via the same `HOME_ART_CREDIT` constant; the prototype file is
  untouched and Strand 4's planting loop is now chapter 3's heart. The
  sunflower grows between pages (sprout by p5, leaves by p7, bud by p10) —
  growth tied to turning the page, watering as affection, never upkeep.
  Chapter map:
  1. **Home** — cover; Anelyn's painting, the gate, Dreamwalk's front door.
  2. **The Market** — choose two packets beside the pre-chosen sunflower
     (Margo kind about every one), then count five seeds into the packet.
  3. **The Square** — name her (Sunny/Goldie/Tallulah), tuck in, water +
     one slow breath: the prototype's loop, as a chapter.
  4. **First Water** — pour six times along Pipkin's rhythm ring; any
     moment is the right moment; the puddle grows.
  5. **Sprout** — hunt the two leaves under six tufts (stones are napping).
  6. **Wee Weeds** — sort six newcomers, weed-to-fence or friend-to-keep;
     Pipkin advises truly, weeds get rain at the fence, nobody is scolded.
  7. **The Dry Week** — four bucket trips from the well + unfold the shade
     leaf; the last trip raises the week's first cloud.
  8. **Rain** — a calm page: watch it fall, tap seven ripples, a rainbow
     signs the page; the classic line lands hardest if the reader never
     watered — *the rain looked after it while you were busy*.
  9. **Bees** — tap five flowers in any order; the bee visits each, pockets
     filling with next year.
  10. **Tall** — the ribbon returns: unroll four measures, knee → shoulder
      → ears → *taller than the garden gate*.
  11. **Bloom** — three gentle taps on the bud; she opens, sparkles fall,
      and the pink bud on Pipkin's own sprout opens with her.
  12. **Birds** — share a few seeds, or wave the ribbon gently; both are
      kind, both complete, the choice is remembered.
  13. **Harvest** — tap the flower head; seeds fall *tink* into the named
      tin until twelve are kept.
  14. **Sharing** — two seeds each round six plates: Margo, Hazel, Rocco,
      the fourth piggie (who had none), Wee — and the small sixth place at
      the far end, Mallow's, room left on purpose, filled too.
  15. **Home by the Brook** — dusk, stones, fireflies; the season's rhyme
      as a copyable keepsake; the finished flag is set on arrival.
  Memory: localStorage (`piggie-garden-sequel-chapters-v1`) keeps chapter
  reached, page, name, stage, deeds, bird choice, tin and plates, and the
  finished flag — a returning finisher starts with the garden gate open and
  every page unlocked. Dreamwalk auto-plays the entire book end to end
  (it performs each game as a reader would) and yields to any page turn.
  Read-aloud-ready narration text on every page (no audio baked in this
  pass). Form factors follow the standard: folded/stacked, tablet portrait
  as a generous sheet, unfolded-foldable spread with the 52px crease gutter
  and play on the right page, tablet-landscape touch tuning, desktop spread.
  Static validation clean (tags balanced, JS `node --check`, 15/15
  chapters, all 90 `$()` refs resolve, zero external refs). No live render:
  this VM's chromium is still walled by the WebGL domain policy, so postures
  are reasoned, not seen — Sven's devices remain the audit.

Open design questions for the Saedo lanes: the sequel's new mechanic (growing
things over real chapter-time? a season wheel?), whether Wee narrates, and how
Pipkin — grown, now — changes the games.

**Grok lane consulted on "should Wee narrate?" (2026-11-05 heartbeat,
dispatch `dsp_66617ece764b416d`, result_ref `5b400630…`):** recommends
**(b) third-person narrator throughout** — one steady voice keeps the season
calm and predictable at bedtime, where Wee's excited counting voice would
raise energy and fragment pacing; dialogue (Margo, Hazel, Rocco, Clove, and
Wee's own short lines) stays inside that one narrator's voice with light
warmth/speed differentiation, no separate baked tracks per character; the
six-voice audition is kept and ranked for the single narrator role only;
speechSynthesis fallback untouched. Its risk note is sound: test one full
chapter with the winner before baking the other fourteen, and listen for
George-closeness when Sven ranks. **Sae's flags on the lane's answer, not
relayed raw:** (1) the lane misreads the George tracks — they were baked for
*this sequel's own page text*, not "the prior book's style", so "retire"
is premature; George stays the working fallback until a winner is baked,
and retirement is a post-bake decision, not a now-decision (only ch4/ch7
read old game text). (2) Its "restrict the pool to non-British voices" is
uncheckable — the lane never heard the six staged voices; the usable form
is: rank by ear, watch for George-closeness. (3) Unweighed counterpoint:
first-person Wee would deepen "reader IS Wee" identification for small
readers; the lane dismissed it on pacing alone, so Sven's ear still gets
both sides. The decision itself is Sven's; this is lane input, not a call.
Still open: the sequel's new mechanic, and how grown Pipkin changes the games.


**V2 upgrade pass (2026-11-01, night — after Sven's "isn't good enough yet"):** Full diagnosis in `sequel-gap-review.md` (own comparison + Claude lane craft + Grok lane play/feel; they converge). Top gaps: total silence in a book whose text says "Tink"; nine chapters sharing one flat gardenbed; one stacked composition ×15; peaks (Rain, Bloom) at counting-game tempo with instant ✔ endings; most games a single tap-N verb; Pipkin a voice without a body in the scenes; Georgia everywhere. **v2 built alongside (`garden-sequel-chapters-v2.html`, 539,373 B; v1 untouched except the cover repair below):** the book's own WebAudio tone family ported and wired per-verb, deed completions now land as a staged beat (Pipkin hops with hearts, chime, done-line fades in), Rain dims the whole book with ambient drips, Bloom swells with a music-box phrase, series type restored (Fell display stack, hand stack for Pipkin), layered gardenbed with per-chapter skies, one real generated watercolor study for the Market (proof of the art direction), ch14's emoji card replaced by a drawn harvest-table SVG, birds' choice now marks the scene, a small Pipkin stands in every garden square. **Voicing (Sven: "needs voicing too"):** per-page Listen with baked George tracks by relative path + speechSynthesis read-aloud fallback in the book's manners, auto-read toggle, narrator-switchable lookup (`garden-narration/<narrator>/chNN.mp3`); George set baked: 15 tracks, 4,868,193 B in `garden-narration/`. **Casting:** six-voice audition (Wikitoria as control + Bill, Lily, Megan, Thomas, Brian — fresh, varied) at `garden-narration/auditions.html` with `auditions/manifest.json`; the winner's 15 tracks bake after Sven ranks. **V1 cover defect (Sven caught it):** the shipped chapters file had ZERO working image data — the cover assignment read `"ata:image…"` (missing "d"); payload intact. Fixed in v1 and verified (data:image count 1; v2 count 2 — cover + market). **Still open:** painted interiors beyond the one study; winner's bake; sound/narration tuning by ear; rhythm-pour and bucket-trip loops want a design re-think, not polish; El Phantea's absence is Sven's continuity call; no live render exists on this VM — Sven's devices remain the audit.

**V3 — a painting for every page + the open book (2026-11-01, late night — Sven's two rulings: "a great picture like that for each page obv" and "essentially dual screen book-ish," iPhone Fold distinguished):** `garden-sequel-chapters-v3.html` (3,442,362 B; v1/v2 untouched). **Paintings:** 13 new watercolor studies generated for ch3–ch15 (in `files/paintings/`, embedded as 1024px JPEG data URIs, 120–204 KB each), in one series style (warm washes, paper grain, golden light, no text anywhere); canonical cast only — Wee in her red polka-dot dress, Mallow soft-grey with one ear folded forward at the far end of the ch14 table, Pipkin in ch6/ch11 as the round teal-green creature with mint belly and sprout (ch11: his bud opened into a flower beside the open sunflower — spot-checked by eye). Cover remains Anelyn's © painting and ch2 reuses v2's market painting byte-for-byte; colophon now credits pages 2–15 as AI-generated watercolor studies painted for this book. **Grep-verified: data:image count = 15**, all payloads decode as valid JPEGs, all 15 unique. **The open book:** every chapter is rebuilt as a facing-page pair — painting full-bleed-ish in a page frame on the LEFT page (folio 2n), running head + verse + Pipkin's guidance + the game (including the relocated interactive garden/bee/bird/table/brook scenes) on the RIGHT page (folio 2n+1), centre spine with gutter shadow, page-edge stacks at the outer edges. Turning moves by pair (same showChapter system; a leaf-turn overlay animation fires on every pair change, Dreamwalk included, and is disabled under reduced-motion; swipe/edge-zone refusal inside [data-game] untouched). **Postures, distinguished:** open book (grid pair, spine centred — on the crease by design, nothing interactive crosses the gutter) at ≥680px landscape aspect ≥1/1 (unfolded foldable, tablet landscape, desktop); tablet portrait = a tall book — painting leaf stacked over text leaf, joined with a dashed fold line and edge stacks; folded/phone = single page with the painting as a headed plate. All v2 systems intact (sound director, voicing tiers + switchable narrator, Dreamwalk, same localStorage key `piggie-garden-sequel-chapters-v1`, no fail states, ≥44/48px targets, safe areas). **Validation (static, all passing):** tags balanced (parser, zero errors), both script blocks `node --check` OK, all 96 `$()` id refs resolve, no duplicate ids, zero external refs, word-diff vs v2 loses only the rewritten colophon line. **Still open:** no live render on this VM (chromium still walled) — postures are reasoned, not seen, Sven's Fold/iPad remain the audit; paintings are AI studies, not commissioned art; winner's narration bake and El Phantea still await Sven.
**V0.4 — two games rethought + the full painting audit (2026-11-02, overnight — Sven's "go further, go all wow, work all night"):** `garden-sequel-chapters-v0.4.html` (3,451,051 chars; v0.1–v0.3 untouched). **Painting canon audit — the step v0.3 skipped, now done:** all fifteen paintings actually VIEWED (chapter embeds + cover/market payloads decoded from the file) and logged in `PAINTING-AUDIT.md`. **Result: 15/15 pass, zero regenerations used** — Pipkin canon-true in ch6/ch11 (teal-green, mint belly, sprout/bud, no snout; ch11 his bud is opened into a flower, matching the beat), Wee in her polka-dot dress (cover, ch10, ch14), Mallow soft-grey at the far end of the ch14 table, no letterforms anywhere (the market packets and the harvest tin are blank; ch10's ribbon bears measure-ticks, not numerals), one warm-watercolor series throughout. v0.4's fifteen image payloads are hash-verified byte-identical to v0.3's. **Game rework 1 — First Water (ch4): the swelling-ring catch.** The old tap-×6 rhythm ring is now a timing catch: the ring swells like a held breath (rAF-driven, brisker with each success); tip the can (or tap the ring; Enter/Space works too) while it glows inside a dashed golden band and the pour is TRUE — one note of the can's three-note song (♪ slots fill, notes ascend 660→784→988 Hz, puddle grows per true pour). Outside the band it is the spec's kind miss, verbatim in Pipkin's voice: "a splash for the stones — they were thirsty too." No fail state; reduced motion stills the ring and makes every pour true. **Game rework 2 — The Dry Week (ch7): the stepping-stone journey.** The four identical fill/carry trips are gone. Five stones now cross a drawn brook to the well; at each stone the reader chooses Hop 🦘 / Tiptoe 🩰 / Splash 💦 — every way over is right, each with its own sound (pop / high plink + stone wobble / swish + drips), its own Pipkin line, and a footprint left on the stone. Then fill the bucket at the well and carry it home in one steady pour; the shade leaf still completes the deed. Old saves migrate (trips already made → stones already crossed; `S.trips` is still set to 4 on completion for continuity). **Dreamwalk updated to play both new games** (sets `truePours`/`stones` state, repaints via `songPaint()`/`dryRender()`, new dream lines: "three true pours — the can's whole song, caught in the gold" / "five stones to the well — a hop, a tiptoe, a splash"). Sound director re-pointed (`#fillBtn`/`#pourHomeBtn`; the ring stage sounds itself). Everything else carried over intact: dual-page open book + all postures (media-query set identical, plus one reduced-motion guard for the stones), spine/folios/leaf-turn, baked-George fallback + switchable narrator, Pipkin's TTS lift (pitch 1.35 / rate 1.12 — verified present), Anelyn credit, same localStorage key `piggie-garden-sequel-chapters-v1`. **Validation:** grep data:image = 15; tags balanced (parser, zero errors); both script blocks `node --check` OK; 101 `$()` refs + all selector `#id` refs resolve, no duplicate ids (128); zero external refs; PLUS a Node DOM-stub smoke test the earlier passes didn't have — the whole main script executes end-to-end, and old-save/finished-save migrations run correctly (trips 3 → stones 3; finished save → stones 5, carriedHome true, deeds intact). **Honest gaps:** the baked George narration for ch4/ch7 still reads the OLD game text ("pour six times" / "four trips") until those two tracks are re-baked — page text and the read-aloud fallback are current; the ring catch and stone journey are code-verified and stub-executed, not yet played on a device (no live render on this VM — Sven's Fold remains the first true playtest); the swell timing (band = scale 0.90–1.12 of a ~1.7 s swell, quickening per note) is tuned by arithmetic, not by thumb.

**V0.5 — El Phantea crosses over (2026-11-02 — Sven's continuity rule: "she also needs to be in the sequel(s) from the start if she was found in the first game — save local cache stuff"):** `garden-sequel-chapters-v0.5.html` (v0.1–v0.4 untouched; v0.5's fifteen image payloads verified byte-identical to v0.4's — her art is SVG, not a painting). **The veteran handshake:** before first render, the sequel reads the first book's local save — OG key `piggie-roast-meef-save-v1` (Roast Meef v9, SAVE_KEY at its line 2254) — and takes her as found if the direct record `state.phantea.unlocked` is true, corroborated by the OG feat ledger (`feats.phanteaFromStart`, set by its computeFeats whenever she was ever unlocked; `feats.finished`, which the OG veteran rule treats the same). If found there, she is present **from the cover**: fixed companion bottom-left (mirroring Pipkin in the first book), the OG `elPhanteaArt`/`elPhanteaSVG` generator transplanted programmatically byte-for-byte with the `EL_PHANTEA_IMG` swap hook intact, her four book lines verbatim on tap ("Mind the china, darling." / "Toot. That is all." / "Tea makes everything better." / "One lump, or two?") — spoken, when auto-read is on, in her own voice (the sequel's `speak()` gains a phantea mode: pitch 0.92 / rate 0.90; Pipkin's 1.35 / 1.12 untouched) — and she is seated at the Sharing table's sixth place. The sequel records `phantea:"og"` in its own save (`piggie-garden-sequel-chapters-v1`), so she persists even if the OG save is later cleared. **New readers** find her the sequel's own way: asleep in Margo's spare teacup at the Market (the first book's joke), a tappable spot on the right-hand page; the wake is a garden-true variant of the OG `PHANTEA_LINE` ("A garden without tea … is merely weeding, darling. But this — this is a garden. I shall pour."), she joins as companion from then on, takes her seat at the table (the scene now redraws on her waking), and the save records `phantea:"found"`. Before discovery she does not appear — no spoilers. Dreamwalk wakes her too, as the first book's dreamwalk does. The handshake runs once per load and **never overrides a 'found'**; old sequel saves (no `phantea` field) migrate cleanly to `""`. **Proof (Node DOM-stub, the v0.4 method — full main script executed per scenario):** (a) seeded OG save with her unlocked ⇒ present from cover, sequel save records 'og', seat at the table ✓; (b) no OG save ⇒ absent, teacup spot showing; tap ⇒ 'found', companion appears, wake text shown, seat taken ✓; (c) sequel 'found' + OG save absent ⇒ still present ✓; plus migration (no field ⇒ `""`, clean run) and a no-hair-trigger check (OG save with her seen-but-not-unlocked ⇒ absent). Static validation: both script blocks `node --check` OK; 133 HTML ids, no duplicates; all 105 `$()` id refs resolve; grep `data:image` = 15. **Standing caveat:** separate `file://` previews have separate storage, so the live handshake is exercised for real only when both books share the saelion.co origin (or a seeded key) — the stub proof stands in until then. Not yet played on a device, as with every telling so far.

**Dreamwalk look-and-photo experiment (2026-11-03, recorded 2026-11-05):**
`garden-v0.5-experiment-lookphoto.html` — a v0.5 copy with exactly two
additions, diff-verified (+1,423 bytes, identical ids and paintings): while
Dreamwalk runs, the open page's painting slowly leans in (a 7 s gentle zoom,
stilled under reduced-motion), because the book has no look-picker and its
nearest "look" is the paintings themselves; and at the keepsake page the
dream presses Copy on the rhyme itself, so a lean-back reader ends the walk
with the season already kept, then rests a little longer (2.6 s) so the
keepsake can be looked at. Staged only, unpublished; folding either touch
into the sequel proper is a later design call, not assumed.

**Next Year's Square prototyped (2026-11-03 heartbeat):** `garden-sequel-next-year.html` —
a small standalone answer to the Claude lane's open question (1): what a second
playthrough does with last year's seed tin. The tin on the gate holds 12 seeds;
tuck up to three into a new square, tend them with water + one slow breath
through sprout → leaves → bud → bloom, and each bloom shakes three seeds back
into the tin — so the tin is never spent, only lent forward, and a cleared save
never feels like loss (with no garden-book save on the device it simply starts
with Sunny). It borrows only a name and El Phantea's presence from the sequel's
own save (`piggie-garden-sequel-chapters-v1`, read-only, never written), keeps
its own save (`piggie-garden-next-year-v1`), and returning visitors find the
rain has advanced their planting one stage. Pipkin is the verbatim `critterSVG()`;
El Phantea pours at the bloom for veterans. Static validation clean (tags
balanced, JS `node --check` OK, all `$()` refs resolve, zero external refs) plus
a stubbed load proving the name-borrow. Staged only, unpublished; folding it
into the sequel proper is a later design call, not assumed.

**Grok lane consulted (2026-11-04 heartbeat, dispatch `dsp_24950bd2eb1749ff`,
result_ref `1bef8416…`):** on whether Next Year's Square should fold into
the sequel, stay standalone, or become a keepsake card, the lane recommends
**B — stay standalone, linked from chapter 15's keepsake page** (one button,
one-way read of the sequel save at launch, return link; lowest build cost,
both saves untouched), over A (a 16th chapter: porting + save-schema +
Dreamwalk decisions, high cost) and C (a printable card: loses the tending
loop entirely). **Sae's flags on the lane's answer, not relayed raw:** the
lane misstates the tin's home — the prototype's tin lives in its own save
(`piggie-garden-next-year-v1`, starting at 12), not in the sequel save; only
the sunflower name and El Phantea's presence are borrowed, read-only. So
the first build step, if B is ever taken, is a keepsake link that passes
those two borrowed values, not the tin count. The decision itself still
awaits Sven's eye after a Fold playthrough; this is lane input, not a call.

**Grok lane consulted (2026-11-06 heartbeat, dispatch `dsp_3dfc110362b24bef`,
result_ref `d96fa284…`):** on how grown Pipkin changes the games, the lane
offers three play-meanings of "grown" — **remembers** (carries one prior
choice forward), **reaches** (can touch what Wee can't), **guides by
demonstration** (shows a move once, then waits) — and would build the
remembering mechanic first. Its risk note is sound: keep every new action
inside his cheerful loop ("Again! Again!"), never corrective text, memory
shown as quiet visual reuse, never a spoken rule; and its "what must not
change" list is canon-true (verbatim critterSVG, hop/hearts/squeak, four
lines, 1.35/1.12 lift, optional extra never required actor).
**Sae's flags on the lane's answer, not relayed raw:** the lane's chapter
map is invented — ch3 is The Square (naming/planting), not a "seed sort";
ch6 is Wee Weeds, not "stringing peas" (no peas or trellis in the book);
ch8 is Rain, not "row labels" (no label grid exists). Its three mechanics
therefore need re-grounding in the real chapters before any build:
remembering could ride ch3's chosen name into ch13's named seed tin, or
ch2's two packets into ch6's sort; reaching fits ch10 Tall (Pipkin holding
the ribbon's top at "taller than the garden gate") or ch9's highest flower;
demonstration fits ch4's ring catch (one true pour shown first, then the
reader's turn). The decision itself is Sven's; this is lane input, not a
call.

**Grok lane consulted (2026-11-11 heartbeat, dispatch `dsp_14dcb730532c471d`,
result_ref `2d009b59…`):** on the bolder book-level mechanic — the follow-up
to the 2026-11-07 answer, asking what makes the sequel feel different in
the hands beyond Pipkin's behaviour. The lane's answer: **the sunflower's
persistent stage** (sprout → leaves → bud → bloom, advancing only at chapter
boundaries and remaining visible on every later page), illustrated at ch7
The Dry Week (the plant at its leaf stage behind the stones) and ch14
Sharing (the tin already holding ch13's exact seed count).
**Sae's flags on the lane's answer, not relayed raw:** (1) this is not a new
mechanic — it is the book's existing page-growth, restated; the brief itself
told the lane the sunflower grows between pages, so the honest harvest of
the "yes" is really "no new book-level mechanic is needed — page-growth
already does the job." (2) Its ch7 return-visit example is wrong on the
book's own terms: showing the ch10 bud on a return to ch7 would break the
season's order (ch7 comes before Bloom); the book's stage is tied to chapter
position, not visit history. The ch14 tin point is already true in the save
(the tin count carries from ch13). (3) Its "must not change" list is sound
and agrees with the book's contract. (4) Its risk note is sound (growth
never advances between sessions; absence carries no penalty) and matches
the mild return-growth already in place. The mechanic question is now
effectively closed at lane level: two rounds found no bolder book-level
mechanic that survives scrutiny — page-growth, the carried choice, and the
tin lent forward are the book's answer. The ruling itself is still Sven's;
this is lane input, not a call.

**Grown Pipkin — ALL THREE built (2026-11-08, Sven's "do all"):**
`garden-sequel-grown-pipkin-v0.1.html` (3,475,089 B; a copy of v0.5, which
is untouched — the diff is purely additive, +176 lines, 0 removed). The
chapter map was **rechecked in the v0.5 source** before grounding (ch2 The
Market, ch4 First Water, ch6 Wee Weeds, ch10 Tall — the Grok lane's
invented map was not trusted). Three small, separable, optional slices —
no deed waits on any of them, and the save gains only additive fields
(`remembered[]`, `reachHeld`, `reached`, `sawDemo`; old saves migrate):
- **GUIDES · ch4 First Water** — a "Watch Pipkin pour once" button: he
  swells the ring into the golden band and holds it there, pours one true
  note (♪, plink 660) with droplets, hops with hearts, and says his own
  "Again! Again!" — then the ring is released and it is the reader's turn.
  The demo **never counts** toward the reader's three true pours (proven:
  pour count still 0/3 after the demo). Re-watchable; yields while he pours.
- **REMEMBERS · ch6 Wee Weeds** — "From the Market — already here, in the
  square": the two packets the reader actually chose at ch2 appear as
  chips already placed in the sorting page, waiting for a confirming tap.
  A tap settles one (hearts, his hop, "Again! Again!"); both settled shows
  🌼🌼 and "Settled 2/2". Memory is quiet and visual only — no spoken rule,
  nothing explains the remembering. Whichever two packets were chosen are
  the ones that return; with no market picks yet, the box simply hides.
- **REACHES · ch10 Tall** — "The very top": a golden seed shines above a
  dashed garden-gate line. It cannot be taken alone (a tap gets a shake
  and "Again! Again!"). Once the ribbon is fully unrolled — taller than
  the gate — "Pipkin, hold the ribbon high" wakes: he rises at the ribbon,
  the ribbon stretches up past the gate to the seed, and the seed can be
  tapped and kept; both beats speak his own line, "I grew again, did you
  see?" Canon held throughout: verbatim critterSVG, hop/hearts/squeak,
  his lines only, TTS lift untouched in `speak()` (1.35 / 1.12), nothing
  corrective or teacher-like. El Phantea's handshake and seat are
  untouched, and Dreamwalk now plays all three slices too.
**Proof (headless Chromium on this VM, real clicks via CDP — rAF does not
advance under --virtual-time-budget here, so the runs were real-time):**
a full-flow harness drove the whole book — market (Sweet Pea + Marigold
chosen), teacup wake, planting, the demo, three true pours, sprout hunt,
both remembers confirmed (and re-rendered confirmed after leaving and
returning to ch6), the sort, the stone journey, rain, bees, the reach
sequence in order (locked → seed alone fails → ribbon → hold → reach),
bloom, birds, harvest, sharing, finish — **40/40 assertions, zero JS
errors**; a separate Dreamwalk run finished with **13/13 deeds** and all
three slice states set (`sawDemo`, `remembered=[sweetpea, marigold]`,
`reached`). Screenshots of each slice were read by eye and are filed in
`files/grown-pipkin-shots/` (shot-demo.png — ring held gold mid-demo,
0/3 true; shot-remember.png — both packets settled 2/2; shot-reach.png —
ribbon stretched past the gate, seed glowing, "in reach now"). Static
validation: both script blocks `node --check` OK, no duplicate ids, all
`$()` refs resolve, `data:image` still 15. **Not yet done:** no device
playtest (Sven's Fold remains the first true touch audit, as with every
telling); a real-browser reload/restore of the new save fields is proven
only in-session (chapter round-trip re-render), the standard file://
caveat. Staged only — nothing published, pushed, or merged. Next step:
Sven plays the three slices; whichever he loves can fold into the sequel
proper as its own versioned pass.

**V0.6 — Pipkin Remembers, folded in (2026-11-08 heartbeat — Sven's pick):**
Sven tapped **Remembers — carry a choice forward** (2026-11-08 "none left
behind" sweep), so his pick folds into the sequel proper as its own
versioned pass: `garden-sequel-chapters-v0.6.html` (3,469,206 B; v0.5
untouched, the grown-pipkin experiment file untouched). The transplant is
the Remembers slice only, taken verbatim from the experiment file — the
ch6 box ("From the Market — already here, in the square"), its two packet
chips with confirming taps, the additive `remembered[]` save field, the
chapter-show and Dreamwalk hooks — plus a cover line and a colophon
credit naming the sixth telling. GUIDES (ch4) and REACHES (ch10) stay in
the experiment file, unfolded.
**Proof:** diff v0.5 → v0.6 is purely additive (+65 lines, 0 removed);
zero identifiers from the other two slices; static validation clean
(tags balanced, both script blocks `node --check` OK, 137 ids no
duplicates, all 109 `$()` refs resolve, zero external refs,
`data:image` still 15). **Headless Chromium, real mouse clicks via CDP:**
market (Sweet Pea + Marigold chosen, five seeds counted), both packets
confirmed on ch6 ("Settled 2 / 2 🌼🌼"), still settled after leaving and
returning to ch6, save survives reload and the book re-opens on the saved
chapter, box hidden when no Market picks exist yet, Dreamwalk finishes
with **13/13 deeds** and the packets remembered — **22/22 assertions,
zero JS errors**. Screenshots read by eye and filed in `files/v06-shots/`
(shot-remember.png — both chips gold-confirmed, 2/2; shot-cover.png —
the new cover line in the open book). Staged only — nothing published,
pushed, or merged. Next step: Sven's Fold playtest of v0.6; his narration
ranking and the mechanic ruling remain his open calls.

**Grown Pipkin v0.2 — BLOOMS WITH, the fourth slice (2026-11-09 heartbeat):**
`garden-sequel-grown-pipkin-v0.2.html` (3,478,582 B; v0.1 untouched).
The 2026-11-07 lane's demonstration carry, built at its proposed home,
ch11 Bloom, with Sae's flags applied: the save already carries
`bloomTaps`, so the return-visit flourish needs only one small additive
flag (`bloomCarried`), and his opening tap stays optional flourish,
absent on first play, never required. **MIRROR:** every reader tap on the
bud also makes the small Pipkin in that square tap the pink bud on his own
sprout in the same rhythm — hop + hearts on the guide, a brief quiver of
his bud, a soft parallel note rising with the taps (740 → 900 → 1060 Hz);
when the third tap opens the sunflower, his bud opens with her, as before.
**CARRY:** arriving at Bloom with taps already made but the flower unopened
(1 or 2 taps banked), he taps once himself ~0.9 s after arrival — count
advances, the carry line shows (*"🌱 Pipkin kept the rhythm while you were
away — one of the three taps is his."*), his line speaks (*"I kept the
rhythm while you were away — your turn now, gardener."*); if his tap is
the third, the bloom completes through the same finish. Once per bloom;
never on first play; Dreamwalk sets the flag too. The opening itself is
shared by reader taps and his carry (`bloomFinish()`); all other slices,
El Phantea's handshake, and the save schema are untouched.
**Proof (headless Chromium, real mouse clicks via CDP — the book's script
runs inside an IIFE, so state was read from the DOM + the book's own
localStorage save, the way a reader would see it):** first play — no
carry, mirror fires (quiver seen), three taps bloom; return visit — taps
1 → 2 by his carry alone, line visible, still unbloomed while he waits,
no second carry, reader's last tap blooms; Dreamwalk — **13/13 deeds**,
flag set — **33/33 assertions, zero JS errors**. Screenshots read by eye
and filed in `files/grown-pipkin-shots/` (shot-bloom.png — 1/3, bud
stirring, his mini-Pipkin in the square; shot-bloom-carry.png — 2/3 with
the carry line showing, and the updated v0.2 colophon line). Static
validation: both script blocks `node --check` OK, tags balanced, 148 ids
no duplicates, all 118 `$()` refs resolve, zero external refs,
`data:image` still 15. Staged only — nothing published, pushed, or merged.
**The Bloom decision is still Sven's** (his ruling on the mechanic, with
the lane's answer and Sae's three flags): v0.2 makes it playable — the
fourth slice sits beside Guides, Remembers and Reaches in the one
experiment file, ready for his Fold playtest; nothing folds into the
sequel proper until he picks. Next step: Sven plays all four slices;
whichever he loves folds in as its own versioned pass, as Remembers did.
**Proof (2026-11-10 heartbeat, harness `hidden_files/cdp-harness-v02.js`,
log in `hidden_files/v02-proof-run-2026-11-10.log`):** headless Chromium,
real mouse clicks via CDP — **33/33 assertions, zero JS errors**. First
play: no carry, mirror fires (his bud quivers, first-tap line), three taps
bloom with his bud opening beside her. Return visit: one banked tap, he
carries exactly one (1 → 2, carry line shown, waits unbloomed), then the
reader's last tap blooms. Dreamwalk: whole book finishes, **13/13 deeds**,
`bloomCarried` set. Screenshots read by eye and filed in
`files/grown-pipkin-shots/` (shot-bloom.png — 1/3, "The bud stirs…";
shot-bloom-carry.png — 2/3 with the carry line showing). v0.2 is now at
the v0.1 standard of evidence: built, click-proven, and ready for Sven's
Fold playtest — the Bloom yes/no is still his, unchanged.

**V0.7 — Pipkin Blooms With, folded in (2026-11-12 — Sven's "Work more
on the piggie series"):** `garden-sequel-chapters-v0.7.html` (3,472,885 B;
v0.6 untouched, both grown-Pipkin experiment files untouched). The
transplant is the Bloom slice only, taken verbatim from the v0.2
experiment build — `hidden_files/build-v07.py` mirrors build-v02.py's
functional replacements one for one (quiver CSS + reduced-motion still,
carry-line element, bloomRender carry display, the sq11 opening extracted
into `bloomFinish()` shared by reader taps and his carry, `bloomMirror()`
+ `bloomCarryCheck()`, the ch11 renderChapter hook, the Dreamwalk flag) —
and the labelling follows the v0.6 fold-in precedent (a ✦ cover line, the
seventh-telling colophon credit, a v0.7 migration comment, a slice header
in the v0.6 style). Diff v0.6 → v0.7: **+57 lines, 6 changed** — the five
opening lines inside the sq11 handler move byte-identical into
`bloomFinish()`, and the Dreamwalk ch11 line gains `S.bloomCarried =
true;`. Nothing else moves. Save: same key, one additive field
(`bloomCarried`); v0.6 saves load and migrate — proven by seeding
deliberately v0.6-shaped saves (no `bloomCarried` key at all) throughout
the harness. GUIDES (ch4) and REACHES (ch10) stay in the experiment file,
unfolded; zero of their identifiers appear in v0.7.
**Proof:** static validation clean (both script blocks `node --check`
OK, tags balanced, 138 ids no duplicates — v0.6's 137 + `bloomCarryLine`,
all 110 `$()` refs resolve, zero external refs, `data:image` still 15).
**Headless Chromium, real mouse clicks via CDP, real-time** (harness
`hidden_files/cdp-harness-v07.js`, log
`hidden_files/v07-proof-run-2026-11-12.log`): **49/49 assertions, zero JS
errors** — first play (no carry, mirror quiver seen, exactly one tap
counted per reader tap, three taps bloom, his bud opens with her);
return visit (his carry advances 1 → 2, carry line shown, he waits
unbloomed, **no second carry after leaving and re-entering ch11**, the
reader's last tap blooms); Remembers regression (both Market packets
settle on ch6, still settled after a ch6 → ch7 → ch6 round-trip);
Dreamwalk finishes with **13/13 deeds**, `bloomCarried` set and the
packets remembered. Screenshots read by eye in `files/v07-shots/`
(shot-cover.png — the two ✦ cover lines in the open book;
shot-bloom.png — 1/3, "The bud stirs…", the mini Pipkin in Wee's Own
Square; shot-bloom-carry.png — 2/3 with the carry line showing and the
seventh-telling colophon; shot-remember.png). **One honest note:** the
book has no settings surface anywhere, so the carry's "optional" is
realised exactly as proven in v0.2 — a state-gated flourish (absent on
first play, once per bloom, never required, no deed gated on it), not a
settings switch. Staged only — nothing published, pushed, or merged.
Next step: Sven's Fold playtest of v0.7; his narration ranking remains
his open call.

**Grok lane consulted (2026-11-13 heartbeat, dispatch `dsp_cf13e753f9ea4c91`,
result_ref `682f05ae…`, brief in `hidden_files/grok-brief-lookphoto-2026-11-13.md`):**
on whether the two Dreamwalk touches in the look-and-photo experiment
file should fold into the sequel proper, the lane answers **neither**:
LOOK (the 7 s painting lean-in) turns Dreamwalk from a still frame the
reader inhabits into a film that runs on its own, undercutting the book's
calm and drawing focus from Pipkin's discrete gestures; PHOTO (the dream
pressing Copy on the keepsake rhyme) has the book act without a touch.
If forced, it would allow PHOTO only silently, only when Dreamwalk
reaches ch15 unaided, never on manual navigation; LOOK must halt and
reset instantly on any input, with cumulative timing drift across
variable page-turn durations as the risk to watch. It would consider a
fold only as a separate micro-pass after v0.8, and only on real-use data
showing readers requesting the behaviours. Its "must not change" list is
sound (single-button start, immediate yield, visible Copy button as the
sole manual path, localStorage and facing-page layout untouched).
**Sae's flags on the lane's answer, not relayed raw:** (1) the lane's
"only if real-use data shows readers requesting" trigger can never fire
as stated — the book is a static staged file with no analytics, so the
honest form, as with the 11-12 GUIDES flag, is that both touches stay in
the experiment file until Sven plays them and asks for them. (2) The
lane overstates the book's rule on PHOTO: Dreamwalk already acts without
further touches — the reader's one button press authorises the whole
walk (pages turn, games complete, narration reads), so the dream pressing
Copy is the same logic as every other dream action, not a new violation.
The real objection is practical, not principled: clipboard.writeText
from autoplay without a user gesture is refused in many browsers, and
the experiment's handler calls done either way — a refused write is
invisible, so the touch may simply do nothing on Sven's devices. That
needs a real-browser check before any fold, not a principle debate.
(3) The LOOK drift risk is real and matches the construction: the zoom
runs on wall-clock (7 s) while page turns run on narration/game
completion, so a slow chapter can leave a painting mid-zoom at the turn;
the lane's instant-halt-and-reset guard is right, but it must also reset
on page turn, not only on dream end. (4) The lane's "no timers or loops"
slightly misstates Dreamwalk — the walk paces itself with waits
internally; the contract is no punishing timers, no countdowns. The
decision itself is Sven's; this is lane input, not a call. Next step:
Sven's Fold playtest of v0.7; the look-and-photo touches stay in the
experiment file unless he asks for them.

**Grok lane consulted (2026-11-12 heartbeat, dispatch `dsp_05933a6fced64bc3`,
result_ref `78837392…`, brief in `hidden_files/grok-brief-guides-reaches-2026-11-12.md`):**
on which of the two remaining grown-Pipkin slices folds next — GUIDES (ch4
First Water demo) or REACHES (ch10 Tall) — the lane recommends **REACHES
next, as v0.8**: it is a moment of wonder after the chapter's deed is
already complete, without touching the timing mechanic that defines ch4,
while a demo inside the book's trickiest catch risks flattening the exact
tension ch4 is built around. GUIDES waits, in the lane's view, until click
data shows a drop in first-time completion of the three-pour sequence.
For the REACHES fold it names one must-get-right (the golden seed stays
unreachable until the fourth ribbon is fully unrolled; the "hold the
ribbon high" prompt appears only after that state) and one click-proof
risk (the seed tap must register exactly once per save, and not re-trigger
on Dreamwalk replay or after a localStorage migration). Its "must not
change" list is sound and agrees with the book's contract.
**Sae's flags on the lane's answer, not relayed raw:** (1) the lane's
v0.9 trigger for GUIDES can never fire as stated — the book is a static
staged file with no analytics, so there is no instrument that will ever
produce "a measurable drop in first-time completion rates"; the honest
form is that GUIDES stays in the experiment file until Sven plays it and
asks for it, or a playtest shows a reader stuck on the ring. Its "wait"
is therefore effectively "wait for Sven", not "wait for data". (2) The
REACHES click-proof risk is real but already guarded in the code — the
seed handler returns at once when `S.reached` is set, so a second tap is
a no-op; the proof run should assert that guard explicitly (tap twice,
Dreamwalk replay, migrated save) rather than discovering it. (3) The
lane's pick is also the smaller transplant, which it doesn't name:
REACHES is a self-contained stage element, while GUIDES threads a
`demoHold` flag through the ring-catch state machine — one more reason
the pick is right. The decision itself is Sven's; this is lane input,
not a call. Next step: Sven plays v0.7; when he picks the next slice,
the lane's recommendation is REACHES as v0.8, GUIDES staying in the
experiment file until he asks for it.

**V0.8 — Pipkin Reaches, folded in (2026-11-14 heartbeat — the Grok
lane's pick, Sven's standing "Work more on the piggie series"):**
`garden-sequel-chapters-v0.8.html` (3,478,900 B; v0.7 untouched, both
grown-Pipkin experiment files untouched). The transplant is the REACHES
slice only, taken verbatim from the v0.1 experiment build —
`hidden_files/build-v08.py` mirrors build-v07.py's replacements one for
one (reach CSS + reduced-motion still, cover line, eighth-telling
colophon credit, two additive save fields `reachHeld`/`reached`, the
reachBox in ch10, the `ribbonRender` hook, the slice functions, the
renderChapter hook, the Dreamwalk line) — and the labelling follows the
v0.6/v0.7 fold-in precedent. Diff v0.7 → v0.8: **+91 lines, 0 removed**
— purely additive; zero GUIDES identifiers appear in v0.8.
**Proof:** static validation clean (both script blocks `node --check`
OK, tags balanced, 146 ids no duplicates — v0.7's 138 + the 8 reach
ids, all 116 `$()` refs resolve, zero external refs — the one `http://`
is the pre-existing SVG namespace string, `data:image` still 15).
**Headless Chromium, real mouse clicks via CDP, real-time** (harness
`hidden_files/cdp-harness-v08.js`, log
`hidden_files/v08-proof-run-2026-11-14.log`): **57/57 assertions, zero
JS errors** — first play (the seed alone shakes and the hold button
stays disabled until the ribbon is fully unrolled, four unrolls set the
tall deed, the hold stretches the ribbon past the gate, the seed taps
and keeps, and the exactly-once guard holds even when the seed is
re-enabled in the DOM and clicked again — leaving and returning
re-disables it on re-render); return visit (held and reached both
survive reload, on v0.7-shaped seeded saves — migration proven); Bloom
+ Remembers regressions (three taps bloom, both Market packets settle
2/2); Dreamwalk finishes with **13/13 deeds**, `reached` and `reachHeld`
set, packets remembered, `bloomCarried` set. Screenshots read by eye in
`files/v08-shots/` (shot-reach-before.png — the seed above the gate,
short ribbon, hold button waiting; shot-reach.png — the ribbon stretched
past the gate to the glowing seed, "Held high — and reached ✓";
shot-bloom.png; shot-remember.png). Staged only — nothing published,
pushed, or merged. Next step: Sven's Fold playtest of v0.8; GUIDES stays
in the experiment file until he asks for it; his narration ranking
remains his open call.

**Reconciliation (2026-11-08 sweep) — the v0.4 "stale George tracks" gap is
CLOSED, and was a false alarm in this plan, not in the audio:** the v0.4
entry above warns that the baked George tracks for ch4/ch7 still read the
old game text ("pour six times" / "four trips"). File evidence says
otherwise: `garden-sequel-chapters-v0.4.html` was written 2026-11-02
09:28:44 and `garden-narration/ch04.mp3` + `ch07.mp3` were written
2026-11-02 09:30:42 — two minutes later, in one bake run, three hours
after the other thirteen tracks (06:28). Duration cross-check agrees:
actual 31.9 s / 36.7 s sit far from the old-text predictions (~19 s /
~23 s at the other tracks' rate) and close to the v0.4-text predictions.
So the two tracks were re-baked with the new ring-catch / stepping-stone
text in the same pass that built v0.4; only this plan's warning went
un-updated. No re-bake is owed. (The winner's full bake after Sven's
narration ranking is unaffected — George remains the working fallback.)

## Strand 5 — Play styles (Sven, 2026-11-01)

- **Origami play style.** Storeybrook names Origami among its six looks; try it
  as play, not just dress: pages that fold, a paper piggie you fold by playing —
  creases as progress, unfolding as the rhyme completes. Paper-craft palette,
  soft shadows, one red thread.
- **Minimal view.** A quiet reading view in the Storeybrook manner: one
  painting, the words, nothing else — for bedtime and small readers.
- **sae://on.** Experiments get a playground on saelion.co, so friends can
  touch the drafts, not just the finished doors.
- **First playable experiment (2026-11-01 pulse):** `origami-fold-play.html`
  — a tap-to-fold paper piggie in the Origami manner: ear fold
  (*went to market*), blanket fold (*stayed home*), snout pinch
  (*had roast meef*), tail twist (*had none*), each with a paper rustle,
  then the unfolding payoff — the sheet lies flat again and every crease
  glows gold as a map of the journey home. Failure-free by construction:
  no fold can be broken, only peeked under.
- **Second playable experiment (2026-11-01 pulse):** `minimal-view.html`
  — the bedtime view, built to the Zero-Prompt Rule: Sven's autumn cottage
  painting full-bleed, one verse at a time in quiet serif type (max 32ch),
  a soft-amber word glow flowing as the verse is read softly aloud, any tap
  cross-fades to the next page, and the single faded crescent moon is the
  only way out — to a goodnight page, never a menu. No arrows, no titles,
  no progress bars, no pop-ups, nothing to fiddle with at bedtime.
- **Third playable experiment (2026-11-15 heartbeat):** `origami-sunflower-fold-play.html`
  — the sequel's sunflower as origami, from a Grok-lane fold design
  (dispatch `dsp_1afd409ee11345c7`, result_ref `e242b54e…`, brief in
  `hidden_files/grok-brief-origami-sunflower-2026-11-15.md`). Four folds in
  the first experiment's grammar: Tuck (sprout — corner valley-fold, "Wee!"),
  Water (leaves — side edges to the midline, "That tickles!"), Breathe (bud —
  top flap down, "Again! Again!"), Tap ×3 (bloom — three gentle taps on the
  bud, petals opening one tap at a time, "I grew again, did you see?"). The
  reader names her first (Sunny / Goldie / Tallulah, the book's ch3 names);
  Pipkin guides from a speech bubble, his lines only; one red thread stitched
  along the sheet's bottom. Unfolding lays the sheet flat and the four creases
  glow gold as a radial sunflower with the keepsake line *"And the garden
  grew, with room between the petals for the light."* **Sae's flags on the
  lane's answer, not relayed raw:** (1) the lane wanted taps "only on the
  next unmarked crease in fixed order" — that contradicts the first
  experiment's grammar, so jumping to any fold is kept, and jumping back
  resets the bloom; (2) the keepsake line is the lane's own writing in the
  book's cadence, not book canon — labelled as such in the file's footer;
  (3) the lane's centre-density risk is answered by construction: tap
  targets are the ≥44px step buttons and the whole sheet, never the creases
  themselves. One design fix from the proof: the first sheet tap at the bud
  now counts as the bloom's first tap, so the bloom is the book's three
  gentle taps, not four. **Proof (headless Chromium, real mouse clicks via
  CDP, harness `hidden_files/cdp-harness-origami-sunflower.js`, log
  `hidden_files/origami-sunflower-proof-run-2026-11-15.log`): 29/29
  assertions, zero JS errors** — naming, all four folds, the three-tap
  bloom, unfold with the keepsake line, reset, out-of-order jump and
  jump-back reset. Screenshots read by eye in `files/origami-sunflower-shots/`
  (shot-bloom.png — Goldie open, all four steps done; shot-unfolded.png —
  gold creases with the season map). Static validation clean (tags balanced,
  JS `node --check` OK, all `getElementById` refs resolve, zero external
  refs). Staged only, unpublished; folding it into the sequel proper is a
  later design call, not assumed. Next step: Sven's eye on the new fold-play;
  his Fold playtest of v0.8 and his narration ranking remain his open calls.
- **Kit rebuild of the third experiment (2026-11-16, Sven's word: "What's
  better and best? You tell me. Then do the best practice eh"):**
  `origami-sunflower-fold-play-kit.html` (55,140 B; the hand-rolled original
  untouched) — the same page, same copy and behaviour, rebuilt on a **pinned
  snapshot of the real Storeybrook kit, v1.1.0**: `project/tokens.css`
  inlined whole and the used `bundle.css` sections (look hooks/base, washes,
  sheets, buttons, caption/balloon, chip) inlined by build script
  `hidden_files/build-origami-kit.py`, with the version stamped in a top
  comment and a footer colophon. The practice is written down in
  `files/KIT-PRACTICE.md` (four rules: kit repo is the source of truth;
  builds inline a pinned snapshot; the colophon stamps the version;
  book-specific scenes stay hand-made) with the full audit table. Audit in
  brief: the page's ink hex was already the kit's Origami `--ink` copied by
  hand; its buttons, bubble, tag, washes and fold timing were hand-rolled
  impressions of Button, Balloon, Chip, Washes and `--dur-turn`/
  `--ease-paper`, now the real components; the 3D flaps, the sunflower, the
  season map and Pipkin stay page-made (the kit's Fold is a view transition,
  not a scene; the kit Creature is a different character). No bundle.js —
  no kit JS component is genuinely used. The font `@import` is deliberately
  not carried (zero external refs; the kit stacks fall back to local faces).
  **Proof: static validation 23/23 (`hidden_files/validate-single-file.js`);
  the original's CDP harness re-run against the kit file
  (`hidden_files/cdp-harness-origami-sunflower-kit.js`, log
  `hidden_files/origami-sunflower-kit-proof-run-2026-11-16.log`): 29/29,
  zero JS errors.** Screenshots read by eye
  (`files/origami-sunflower-shots/shot-bloom-kit.png`, `shot-unfolded-kit.png`):
  the scene is faithful — sunflower, folds, creases, thread, Pipkin
  unchanged — and the chrome is now the true Origami look, which is cooler
  than the hand-rolled impression (cutting-mat grid ground, squared ink
  buttons, rounded display face). Named as a mood change, not a defect;
  which ground suits the garden is Sven's eye. Next step: Sven judges the
  kit look on this page; if it holds, the sequel builds adopt the snapshot
  recipe (KIT-PRACTICE.md §"How a future book build applies it").
- **Mobile pass on the kit build (2026-11-16, Sven played v1 on his
  OnePlus 13 and ruled: "Mobile sunflower can look a lot better"):**
  `origami-sunflower-fold-play-kit-v2.html` (58,236 B; kit v1 file and the
  hand-rolled original untouched) — same pinned kit v1.1.0 snapshot
  (verified byte-identical), same markup, copy and JS; only the page
  layer was redesigned, form-factor first per FORM-FACTOR-STANDARD.md,
  by `hidden_files/build-origami-kit-v2.py` (the scene CSS — flaps,
  garden, creases, season map — spliced verbatim from v1). **Phone is
  now the designed default:** the sheet is a full-bleed hero (412px wide
  at phone size, square), the header is compact (chip, title, intro at
  phone sizes — copy untouched), name chips share one full-width row at
  48px, the fold steps are full-width rows at 52px, and the action
  cluster is ordered ahead of the steps so the next fold sits low in
  the hand (footer ordered last); Pipkin's balloon docks under the
  scene at full width; safe-area insets and `viewport-fit=cover` are
  in. **Wider postures layer the composed sheet back on:** ≥561px
  restores v1's centred column (430px sheet, wrapped chip rows);
  tablet portrait grows the scene to 560px; an unfolded-foldable block
  (680–1024px landscape, aspect ≥ 1/1) docks the whole play to the
  right page of the spread, clear of the crease; `pointer: coarse`
  widens control gaps. Nothing essential sits under ~15px on phone;
  no horizontal scroll at either proof size; nothing is hover-gated.
  **Proof: static validation 23/23; the CDP harness re-run against v2
  at BOTH sizes (`hidden_files/cdp-harness-origami-sunflower-kit-v2.js`,
  logs `hidden_files/origami-sunflower-kit-v2-phone-proof-run-2026-11-16.log`
  and `...-desktop-proof-run-2026-11-16.log`): phone 412×915 with touch
  taps — 29/29 behaviour + 5/5 layout probes (scene ≥400px wide,
  targets ≥48–52px, no h-scroll), zero JS errors; desktop 1280×900 —
  29/29 + 2/2, zero JS errors.** Screenshots read by eye
  (`files/origami-sunflower-shots/shot-start-kit-v2-mobile.png`,
  `shot-bloom-kit-v2-mobile.png`, `shot-bloom-kit-v2-desktop.png`): on
  phone the scene fills the width edge to edge, Goldie picked, Pipkin
  and his balloon sit legible under the scene, and the primary button
  is a full-width bar low on the first screen; the desktop bloom shot
  matches v1's composed kit look — no regression. **Honest flags:**
  the kit's type tokens fight phone sizes a little — the Chip rides at
  the kit's .9rem and the Balloon's text at its 1.1rem shorthand, so
  the page layer has to nudge both up on phone rather than the kit
  offering a phone scale; and the kit's `--size-root` clamp bottoms out
  at 16px, so phone type sizing is done in the page layer, not by the
  root. Sven's word (2026-11-16): the piece also goes in the
  Storeybrook repo (branch `sae/origami-sunflower-kit-v2`,
  `experiments/origami-sunflower/`) and merged + hosted on Sven's
  further word — see the repo note below. Next
  step: Sven's eye on v2 on the OP13 itself — the headless shots are
  reasoned renders, his phone is the audit.
- **Repo placement + merge + live (2026-11-16, Sven: "are they in a
  repo? They should be" → "Go ahead and get them links and hosted gh
  io site"):** v2 + KIT-PRACTICE.md pushed via the GitHub connector to
  `stevoblevo/storeybrook`, branch `sae/origami-sunflower-kit-v2`
  (commit `5f794956`), as `experiments/origami-sunflower/`; read-back
  sizes match local exactly (58,236 / 10,660 B). PR #4 opened, then
  merged to main on Sven's word (merge commit `b905415e`). **Live and
  verified by fetch (HTTP 200, page content present):**
  https://stevoblevo.github.io/storeybrook/experiments/origami-sunflower/origami-sunflower-fold-play-kit-v2.html
  — the first fetch 404'd on Pages deploy lag; the file was confirmed
  on main meanwhile and the re-fetch serves the page. Screenshots stay
  local-only (binaries cannot ride the connector).
- **Fourth playable experiment (2026-11-16 heartbeat):**
  `minimal-view-garden.html` (1,576,009 B) — the sequel's own bedtime
  view, in the first book's minimal-view grammar (Zero-Prompt Rule: one
  painting, one verse, any tap turns the page, the faded crescent moon
  is the only way out, to a goodnight page). Six quiet pages, one
  season: the cover (Anelyn's cottage, re-encoded to a 1024px JPEG so
  the file stays small), then ch3 planting, ch8 rain, ch11 bloom, ch14
  sharing, ch15 home by the brook — each with its own book painting
  (the five chapter studies from `files/paintings/`) and the sequel's
  own story text, verbatim or near-verbatim, nothing invented. The
  amber word-glow and soft device read-aloud (after the first tap —
  the tap is the consent) carry over from the first book's view; new
  here, the reduced-motion guard the sequel's standard requires (the
  slow breathe stills, turns go instant). Built by
  `hidden_files/build-minimal-view-garden.py` from
  `hidden_files/minimal-view-garden-template.html`, so the six data-URI
  paintings stay reproducible. **Proof: static validation 26/26
  (`hidden_files/validate-minimal-view-garden.js`); headless Chromium,
  real mouse clicks via CDP, harness
  `hidden_files/cdp-harness-minimal-view-garden.js` (log
  `hidden_files/minimal-view-garden-proof-run-2026-11-16.log`):
  23/23, zero JS errors** — all six turns, verse + painting change
  per page, the glow lighting, moon exit and restart, keyboard Enter
  turn (one first-run fail, a harness-focus artefact: the key goes to
  the focused element, so the check now focuses the page first, as a
  real keyboard reader would). Screenshots read by eye in
  `files/minimal-view-garden-shots/` (shot-cover.png — cottage, verse
  legible; shot-bloom.png — sunflower with canon-true Pipkin;
  shot-goodnight.png — brook at dusk, fireflies, "The garden
  sleeps."). Staged only, unpublished; folding it into the sequel
  proper (or a sae://on shelf) is a later design call, not assumed.
  Next step: Sven's eye at bedtime — his phone is the audit, as ever.
- **The garden shelf — the sae://on playground, first door (2026-11-18 heartbeat):**
  `garden-shelf.html` (18,728 B) — one self-contained index page gathering
  every staged piece into a single door Sven can open: the live book and
  v0.8 up front, then the sequel's tellings v0.1–v0.8, the grown-Pipkin
  experiments, Next Year's Square, the bedtime view and the narrator
  auditions; the Sixth Piggie's five clues, hidden chapter and bonus cloth
  under a "quiet corner" heading; all six Tea Letters; the four origami
  plays and both minimal views; and the gardener's notes (PLAN,
  DESIGN-SEEDS, KIT-PRACTICE, PAINTING-AUDIT, gap review) — **42 link
  cards in 7 sections** (39 at first build, 2026-11-18; the 40th is Tea
  Letter № 7 from Mallow, added 2026-11-19; the 41st is Tea Letter № 8
  from El Phantea, added 2026-11-20; the 42nd is Tea Letter № 9 from
  Pipkin, added 2026-11-21), Pipkin guiding from the header in canon-true
  SVG, status chips (Live / Latest / Staged / Experiment / Quiet /
  Letter), and a footer naming what's still open for his eye and ear.
  The Sixth Piggie clues are listed plainly because the shelf is Sven's;
  the page itself notes a public shelf would veil them. No scripts, no
  outside calls — it only opens doors already here. **Proof: static
  validation 11/11** (`hidden_files/validate-garden-shelf.py` — tags
  balanced, all 39 links resolve, zero fetched external refs; the one
  `https://` is a plain anchor to saelion.co); **headless Chromium via
  CDP** (`hidden_files/cdp-harness-garden-shelf.js`, log
  `hidden_files/garden-shelf-proof-run-2026-11-18.log`): **14/14, zero
  JS errors** at phone 412×915 and desktop 1280×900 — no horizontal
  scroll, cards full-width ≥44px on phone, and a real click on the v0.8
  card navigates to the v0.8 file. Screenshots read by eye in
  `files/garden-shelf-shots/` (phone: Pipkin, title, Start here cards
  legible; desktop: composed two-column start row). Staged only,
  unpublished; the shelf is the sae://on playground's first door, and
  the next step is Sven opening it — one page instead of twenty-five
  files — then his Fold playtest of v0.8 and his narration ranking,
  which remain his open calls.

## Strand 6 — Dreamwalk & the remembering book (Sven, 2026-11-01 evening)

Sven's direction, for these games generally (Piggie first, Malachi's ride in
mind too):

- **Dreamwalk / autoplay / "everfallen" mode:** one button, and the book
  plays itself through everything — pages turn, narration reads, the little
  games complete themselves gently, cover to keepsake, unattended. A way to
  watch the whole telling like a film, and to show it to someone without
  handing them the controls.
- **The site remembers:** local storage/cache so a reader's place is kept
  between visits — current page, chapters completed, jar and Pipkin's
  growth, narrator and look choices, and **what is unlocked**.
- **Beaten it before? It shows:** a returning reader who has finished the
  book previously starts with those unlocks already open — **El Phantea
  from the start**, for instance — the book remembers its friends.

Build state: **landed and staged 2026-11-01 evening** — artifact v9
"Everfallen" (Dreamwalk, localStorage memory, veteran unlocks, credits-score
egg with both doors), builder source-verified, exported and staged as
**Door IX** in piggie-push (index sha 60cd33de…, narration folder alongside),
hub + versions.json updated (Latest → IX). Same shipping route as VI–VIII.
Not yet runtime-driven in a live browser; Sven's play-through is the check.

**LIVE (verified 2026-11-17 by fetch of the served versions.json):** Door IX
Everfallen is live at `/piggie/v9/` (live sha 6c04a328… vs staged
60cd33de… — Saelion dressing, as predicted). The shipping is done; the
play-through remains Sven's.

## Rhythm

A daily heartbeat advances one bounded step: a design seed grown, a door
prepared, a lane consulted. Milestones are reported when there is something to
see; silence means the garden is growing, not forgotten.
