# What’s Going On? — corrective candidate 1.0.1

This is an update to the existing public Malachi exhibit. It is not a new
sermon experience, a canonical Storeybrook toolkit release, or a publication
receipt. The source baseline is Storeybrook main
`4976ea5b858a76cf6d65cff66b24752ab25606ec`.

## Changes and source

Captions and chapter navigation now occupy separate rows in normal document
flow. Art is displayed whole, with descriptive alternatives. The five existing
chapters, source passages, ten native original-audio players, notes, reflection,
four-style settings and stored appearance preferences remain available.

The approved art wall's original 16 briefs and 18 image bytes are reused.
`../malachi-art/moments.js` is the shared brief table for the wall and sermon;
its cue metadata maps each illustration to the existing excerpt timeline.
The opening picture is editorial cover art, with no invented audio cue.
The gospel interlude keeps `art/morning.svg` between power and trust because
the wall contains no dedicated gospel brief. Both dent and crown variants
remain selectable. No TGC revivalism chapters are substituted.

Art browsing pauses playback; audio starts only with a user action. Playing
an original excerpt follows semantic moment cues. Caption text and original
recording timecodes still come from `episode-data.js`. No media bytes, font
licenses, voice preferences, vendor files or canonical toolkit files change.

The former pending-clone workshop becomes Passage notes: read the original
excerpt, play it and download personal notes with source timecodes. It neither
submits feedback nor attributes user notes to Malachi. The new local download
format is `passage-notes-v1`. Existing reflection state is preserved. The
`paperWorld` inspection API is retained with an additive `moment` state field.

## Integrating with the existing Malachi project

The original `stevoblevo/malachi-sermon-experience` remains the upstream
experience, observed at `c36cd631e269034cd2da38f0586420f5395c789b`.
Its CONTRIBUTING contract requires isolated scene contributions and rendered
proof, preserves original art, caption/source provenance and Christian claims,
and keeps voice work with the existing integration owner.

For Muse and that owner: port the host layout (`readalong.css`), matching DOM
changes and moment-selection logic into the existing `index.html`/`world.js`.
Carry the shared brief/cue table and the already approved 18 image files;
resolve their relative paths in that project's build. Compare the original
project's current source before applying, since it has a different private
media and build contract. Do not overwrite its whole tree or immutable v0.1
baseline. Re-run its build/browser checks after the port. This repository's
tests can be adapted to those same source cues.

The separate protected Revivalism listening room is owner-verified live at
`https://listen.saelion.co/listen/`, v0.5.0, source
`9aeeb87b3314d539207d486d9730a2d7575da379`. A plain sign-in link clearly
identifies it as another talk, not synthetic What’s Going On? narration.
Its owner reported Access enforcement for the page, catalogue and all 17
chapter URLs, and muted playback checks. Those are relayed owner evidence,
not tests performed by this public candidate. No private full cut, portrait, 17-chapter
narration or provider call is added. No canonical Claude artifact edit is
part of this candidate. Any later reusable toolkit change needs its own
source-sync handoff to that artifact.

## Acceptance and rollback

Use the exact candidate commit and its Actions receipt. Inspect saved desktop,
mobile, narrow, enlarged-text and TV-density screenshots for all four styles;
check visible art and variants, complete captions, safe areas, scrolling and
focus. Geometry checks supplement this inspection. Muted decoding is not
audible verification. Physical safe areas, browser zoom, screen readers and
devices remain separate checks.

This candidate is not deployed. A release requires the bounded candidate's
approval and verified Pages/public-file receipts. Existing 1.0.0 exact-head
approval does not authorize a broader redesign. If accepted, revert this
candidate's product change to roll it back; preserve newer unrelated main
commits. Do not reset the entire branch to an older release.
