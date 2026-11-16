# Bambi — FIT audit: where the storybook lives and connects

_Audit only, 2026-11-03. Nothing here changes a repo, a site, or the registry — every
placement below is a proposal with its gate named. The artifact: "Bambi — a Storeybrook
telling" (play + listen adaptation of Salten's public-domain novel, retold in our own
words; plan `~/workspace/storeybrook-fawn/PLAN.md`). State at audit: v0.2 single file
(1,826,608 B, click-tested 18/18) staged locally; v0.3 "All Together" assembling;
nothing published anywhere. Version discipline applies throughout: 0.x until Sven's
eye calls it ship quality._

## Placements at a glance

| # | Placement | Exact path / URL shape | Gate | Verdict |
|---|---|---|---|---|
| 1 | Showcase registry + index | New registry entry; index stone on **Far Bank**, beside Piggie | Sven's listing word; index build | Studio door **ready when v0.3 lands**; public link waits on a published home (see #2) |
| 2 | Storeybrook repo (Pages) | `stevoblevo/storeybrook` → `bambi/index.html` → https://stevoblevo.github.io/storeybrook/bambi/ | Sven's word + merge; git lane for the push | **Ready when v0.3 lands** — the natural first home |
| 3 | Reignfawn keepsake door | `saelion-keepsakes-v1` (design: reignfawn PR #6 §12); stone surfaces in the Tended Acre | PR #6 merge (trunk lane) + keepsake key's first build + Acre build | Design-ready; implementation **needs X** (several) |
| 4 | Piggie leaf keepsake | Same `saelion-keepsakes-v1` key, read by a Piggie door on saelion.co | Shared key existing; any hub change takes the full Piggie gate | **Needs X** — right shape, key doesn't exist yet |
| 5 | AndSo folded paper | AndSo keepsake surface (does not exist); paw spec unblessed | Sven/Sae(lion) blessing the paw spec + an AndSo build | **Speculative** — compatible in spirit only |
| 6 | saelion.co door | `stevoblevo/saelion-relay-canary` → `bambi/` folder → https://saelion.co/bambi | Sven's ship word + PR + Sae(lion) promotion | **Needs X** — after #2 proves the book in public |

---

## 1. The showcase (REGISTRY.md + the index)

**Where it sits.** Far Bank — the long narrative destination — **beside Piggie**
(registry entry 1). The index prototype's tiering (NOTES.md) already puts Piggie on
Far Bank and the unpublished sequel as an *unlinked studio door beside it*; Bambi
takes exactly that shape: a studio door on Far Bank now, a linked stone once it has
a published home. Not First Splash (that's thirty-second toys — AndSo, Show & Tell,
the kits) and not the Long Bend (worlds and systems — Reignfawn, bespoke). It is a
book; Far Bank is where the books live. Title everywhere: **"Bambi — a Storeybrook
telling"** (the registry's same-title rule, check 5).

**Its six readiness checks, honestly scored today:**

1. **Single canonical URL** — ✗ today (no URL exists). Resolved by placement #2:
   the Pages URL becomes canonical; the saelion.co door (#6), if it ever comes, is
   a later promotion of the same entry, not a second entry (the Piggie hub pattern).
2. **No blocked assets** — ✓ by construction once published: the single file embeds
   everything (paintings as base64); no hotlinks, nothing external to expire. This
   is the one check Bambi passes *better* than most entries.
3. **Fast first view** — ? leaning weak: 1.83 MB in one file, ~1.78 MB of it embedded
   paintings decoded up front. No extra fetches, but real parse weight; never
   measured. Measure before claiming; a lazy-decode of the later plates is the
   known fix if it fails.
4. **Story in one scroll** — plausibly ✓, unassessed: the front page is natively
   title + lede + "Play this one / Read it to me" + the brook — the kit's own
   front-page grammar is this check, already built. Needs the one-scroll read the
   registry follow-on owes every entry.
5. **Linked forward and back** — ✗, like all 15 current entries: the index doesn't
   exist yet. When it does, the book's front page gains a "back to the showcase"
   link and the index links forward — same pass, same title.
6. **Measured** — ? (no analytics evidence anywhere in the estate yet; Bambi is no
   worse than the field).

**What blocks listing today:** no published home (checks 1 and 5 cannot pass), and
Sven's ship gates — his version discipline (a 0.x draft is not a listed public work
until he says so) and his standing rule that site pushes stay gated on his word.
The registry entry itself can be *drafted* now (it publishes nothing); the index
stone stays an unlinked studio door until #2 lands.

**Hard gates respected (checked, not assumed):** **Malachi** (entry 9) stays
unlisted until Sven approves release — Bambi proposes no contact with it. **The
Sixth Piggie** (entry 3) never appears on a public index — and Bambi's Rainwake
door must never route anywhere near the hidden path (the Grok index pass's
rain-door idea was already rejected on exactly this ground). **The sequel**
(entry 2) lists only when Sven's ship rule is met — Bambi claims no earlier
privilege than the sequel gets.

## 2. The Storeybrook repo — the natural first home

**Exact home:** repo `stevoblevo/storeybrook` (public), **new folder `bambi/`**
containing `index.html` (the single-file build) — live shape:
**https://stevoblevo.github.io/storeybrook/bambi/**. This follows the standing
precedent exactly: `bespoke-v5/` (a single `index.html`, 2,586,243 B) and
`show-tell/` are hosted project folders on this repo's Pages site, and the repo's
AGENTS.md blesses the pattern: hosted projects keep their own rules in their
folder, and design-system changes never mix with them in one commit.

**The PR would contain:** branch `sae/bambi-v03` (or the builder's lane prefix) →
`bambi/index.html` + `bambi/README.md` (the folder's own rules: source provenance
note per the plan's head ruling — Salten 1923, public domain, our own words, no
film expression; version note; how to update). Optionally a shelf card on the
showcase root pointing at `bambi/` — the root showcase doesn't link the other
hosted folders today, so the card is a small new courtesy, not a requirement;
keep it out of the first PR to stay inside the "one commit, one concern" rule.
Repo law kept: *never replace a published build, add a version* — when the book
next revs, the door stays `bambi/` (URL stability is registry check 1) and the
superseded build is archived under it, the way Piggie's hub keeps its doors.

**The binary problem, precisely.** The four paintings are PNGs (373–519 KB each).
As standalone repo assets they are **binaries, and the GitHub connector cannot
push binaries at any size** (push-files rejects non-UTF-8; create_or_update_file
fails/corrupts). The shipped build sidesteps this by embedding the paintings as
base64 *text* inside the single HTML file (~1.78 MB of its 1.83 MB) — text rides
the connector (proven to ~3.40 MB), and bespoke-v5's 2.59 MB single file proves
the shape serves on Pages. Two cautions: (a) headroom is thin — plan S3's baked
ElevenLabs narration MP3s are true binaries and can *never* ride the connector,
so a narration-bearing build placed as separate assets forces the lane below
regardless; (b) the durable route for anything binary is **a real git lane —
Sae(lion)'s lane** (the route Door VI and the D1 screenshot already took) or
Sven's own push. Recommendation: push v0.3's text file by whichever lane is
warm, but treat the git lane as the placement's standing route from S3 onward.

**Gate:** Sven's word that a public face may exist + a merge (his, on the PR).
**Verdict: ready when v0.3 lands.** This is also where the book most belongs
thematically — it is a Storeybrook kit child, hosted by the kit's own shelf.

## 3. The interweaves, concretely

### (a) Reignfawn — the drop-stone and Rainwake

**What exists:** the keepsake *design* lives in reignfawn **PR #6 §12** (open,
docs-only, unmerged; head `b4544e56`): two honest shapes — co-hosted on
saelion.co, a shared origin key **`saelion-keepsakes-v1`** (localStorage, plain
data, no account — the paw principle); on the github.io shelves, a **keepsake
code** in the family's existing dialect (`sae://keepsake/…`). Law: *garnish,
never power* — nothing that unbalances, nothing that makes another game a chore.
The Tended Acre (§15) is the designed receiving surface: keepsakes "can be
planted or displayed here" — a kept object on the glasshouse shelf.

**What does not exist:** the key itself (code search: zero hits for
`saelion-keepsakes` in the reignfawn repo), any reader of it, the Acre (E-slice
C, gated on PR #2/W1 landing), and **Rainwake inside the game** — code and doc
search return zero for "Rainwake" in stevoblevo/reignfawn. Rainwake Orchard
exists today only as Sae(lion)'s shared concept piece and as Bambi's spread 5.
The connection is real at the estate level and *designed* at the keepsake level;
it is not yet a place in the valley.

**A two-way door would require, per side:** *Bambi side* — on the ripple, write
the drop-stone into `saelion-keepsakes-v1` (only possible if co-hosted on
saelion.co, placement #6; from the github.io shelf it must instead *issue* a
`sae://keepsake/drop-stone` code for the reader to carry). Book-side, the stone
already lives on the keepsake shelf (plan §2; v0.3's Together assembly) — that
half is buildable now and needs no one else. *Reignfawn side* — PR #6 merged
(trunk lane's call, not Muse's), a keepsake reader in the valley, and a surface
for the stone (the Acre's shelf, or a Rainwake corner of the valley if the
programme designs one). **Verdict: design-ready, implementation needs X** —
X = PR #6 merged + the key's first implementation anywhere + a receiving
surface. Nothing about Bambi's book waits on it; the door is garnish by design.

### (b) Piggie — leaf keepsake vs "friends of the garden"

**The hub today:** `saelion.co/piggie` = hub `index.html` + `versions.json` +
version doors (v4/v5 on main; VI–IX + Tea Letters on the release branch). Its
links point only inward (home, its own doors, /ways) — no cross-world links
exist anywhere on it. Cross-book continuity already runs on same-origin local
storage (the sequel reads the OG book's save) — the rails the leaf would use
are the estate's proven ones.

**Right shape: the leaf keepsake, not the hub link.** A "friends of the garden"
link is a surface edit to a live, gated property that buys a click; the leaf —
Bambi writes it (Pipkin's tea-stained round leaf, plan §5) into
`saelion-keepsakes-v1`, a Piggie door reads and displays it — is the designed
mechanism (PR #6 §12 names Piggie garnish explicitly: "a polka-dot saddle
cloth from Piggie's feast"), it honours garnish-never-power, and it needs no
hub surgery. **Gate:** the shared key must exist first (same blocker as 3a);
any actual change to a Piggie door or hub takes the full Piggie gate —
candidate branch + PR, **Sven's merge word, Sae(lion) promotion**, served-page
verification. **Verdict: needs X** (the key); the hub link is optional garnish
for later, same gate, low value per risk.

### (c) AndSo — the folded paper and the paw

**Compatible in spirit; speculative in fact.** The paw spec
(`~/workspace/andso-paw-spec.md`) is a *proposal, sent nowhere*, waiting on
Sven's blessing, with five open questions — including whether the shared-board
service exists at all (Q1: it doesn't; someone has to run it). Its ethic is the
keepsake ethic exactly: marks and feats kept locally, never spent, never lost,
exportable as a file you carry. The folded paper — "carries the book's final
spoken line into any future book" — *is* an exportable-record shape, the most
paw-like of the four keepsakes. But AndSo 8.1 has no keepsake reader, no shelf,
and no paw; there is nothing on its side to receive a paper. **Verdict:
speculative** — the furthest door. First mover is not Bambi; it's Sven
blessing (or declining) the paw spec. Until then the paper lives on Bambi's
own shelf as a promise, which the design already allows.

## 4. saelion.co proper — a /bambi door

**Structure (verified):** `stevoblevo/saelion-relay-canary` owns the public
doorway; worlds are root folders (`piggie/`, `kk/`, `mmingson/`, `topi/`, …),
`vercel.json` carries rewrites for pretty routes, and the repo's AGENTS.md
fixes the discipline: this repo only (no new gallery/registry/site), publishing
is an **owner-authorized milestone** — publisher checks run, `index.html` and
`ways.html` kept identical where the checkpoint surface is touched, deploy only
with current owner authority, and the served page verified against the exact
deployed commit before anything is called live. (Reignfawn's own editions
follow the same law: version-scoped edition folders on candidate branches —
never this repo's main/release branches directly.)

**A /bambi door would take:** a candidate branch adding `bambi/index.html` —
recommended in Piggie's versioned shape from day one: `bambi/` hub +
`bambi/versions.json` + the build under `bambi/v0.3/` (0.x honestly labelled),
so the door never has to be re-cut when the book revs. A `vercel.json` rewrite
only if an alias beyond the folder path is wanted (the folder alone serves
https://saelion.co/bambi). Any doorway-navigation mention (index/ways) rides
the publisher route, which is Sae(lion)'s lane discipline. Then: **Sven's merge
word → Sae(lion) promotion → served-page verification** against the deployed
commit. Co-hosting here is also what upgrades interweaves 3a/3b from codes to
the shared key — the door and the keepsake system are the same decision seen
from two sides.

**Gate:** Sven's ship word, and it is a higher bar than #2: saelion.co doors
are shipped works (Piggie, Reignfawn 0.7.0, AndSo 8.1), while the github.io
shelf happily hosts prototypes (bespoke v5). **Verdict: needs X** — X = the
book proven in public at #2 and a version Sven is willing to call a door.

## Recommended sequence

1. **v0.3 lands → Sven's word → PR `bambi/` into stevoblevo/storeybrook** via the git lane; Pages URL becomes canonical. (First move.)
2. Same pass: draft Bambi's registry entry and place its **unlinked Far Bank studio door** in the index prototype, beside Piggie.
3. Book-side keepsakes only: the shelf and the drop-stone in Bambi's own save — no cross-game claims yet.
4. When reignfawn PR #6 merges and `saelion-keepsakes-v1` gets its first implementation, wire the drop-stone (code form while Bambi lives on github.io).
5. The Piggie leaf follows on the same key; a hub "friends" link only if Sven asks for it, through the full Piggie gate.
6. The AndSo paper waits for the paw spec's blessing — nothing to build before that word.
7. **saelion.co/bambi last**: when a version earns Sven's ship word, promote via candidate branch + PR + Sae(lion) promotion, verified served — and the keepsakes upgrade from codes to the shared key with it.
