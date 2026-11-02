# Show & Tell 1.0.0

Public release of the Show & Tell hub, Sixth Piggie clues and Mallow chapter,
Malachi four-style review experience, sixteen-moment art wall, and both
bespoke.gig prototypes. The bundle contains 18 PNGs, ten original-sermon MP3
excerpts and three unmodified OFL font files.

The release uses existing public vector scenery and individual original audio
excerpts. Private portrait art, the continuous edited cut, cloned takes and
private chapter narration are excluded. Reflections and review verdicts remain
local to the visitor's browser as described by each exhibit.

`release.json` identifies the version. `media-manifest.json` records the approved
media hashes and import commit. GitHub's PR, CI and Pages run record the exact
tested and deployed source commits, without a self-referential commit field.

Validation covers JavaScript syntax and local references, every media hash,
sandboxed muted browser interactions, images/fonts/audio decoding, and public
response-byte verification after the existing Pages deployment succeeds.
Muted playback checks do not claim audible review or human visual approval.
Mallow's moving thought buttons are tested with native keyboard activation;
their reduced-motion styling remains unchanged in this bounded release.

These are additive exhibits. Storeybrook's canonical Claude toolkit and its
voice preferences are unchanged.

Rollback after promotion: revert this release's merge commit with an ordinary
commit and let the existing Pages workflow redeploy. Preserve unrelated later
changes; do not reset main. The pre-release base is
`e86f20ea6198c2cb702c1d3314c2ab7afb92ad9a`.
