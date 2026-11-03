# Malachi corrective visual QA

Baseline product source: `4976ea5b858a76cf6d65cff66b24752ab25606ec`.
The baseline capture commits change only tests/workflow, not the exhibit.

Run source checks with `python3 tests/show-tell/verify.py` and
`node tests/malachi-visual/source.mjs` from the repository root.
Browser capture runs only in the existing authorized GitHub Actions lane.
It uses installed Chrome with its sandbox retained, muted audio, read-only
repository permissions, no secrets, and a loopback-only HTTP server with
byte-range support for actual MP3 seeking. No production deployment occurs.

The matrix covers all four styles at 1280×900, 390×844, 320×740,
390×844 with 200% text-size stress, and the existing Across the room density.
Text stress doubles computed text sizes after the dynamic caption is present;
it is not a claim of native browser zoom or physical device validation.
Each case captures viewport and full-page PNGs plus caption/navigation
geometry, horizontal overflow, real caption text, and runtime errors.

Candidate checks additionally cover all 18 PNGs, both art variants, the
original gospel scene, no sound on art browsing, selecting a later cue in
the same excerpt, automatic art changes at semantic caption cues, original
source-matched personal-note export, and dialog focus restoration.
The original 12 browser checks also remain required.

Screenshots must be downloaded and visually inspected before acceptance.
Passing DOM/geometry tests is not visual acceptance, audible listening,
assistive-technology verification, or physical-device QA.

The initial two capture runs were harness failures: a non-range server
prevented reliable MP3 seeking. The next run captured six cases before an
Evidence-style discovery card intercepted Listen; later captures explicitly
dismiss that card. Keep these receipts separate from product regressions.

Independent inspection of all 44 d2b72c1 PNGs confirmed the caption separation
and found low-contrast light controls, dark header text, enlarged glyph overflow
and joined words where mobile hides line breaks. The successor checks computed
solid-surface text contrast (4.5:1), glyph/label bounds, rendered word spacing,
and nearby read-along controls. Non-solid backgrounds fail the numeric probe
instead of receiving a misleading contrast score. Saved screenshots still need
inspection. Each of the 18 approved artworks plus gospel now receives its own
actual exhibit figure capture; a separate test-only source-art contact sheet
shows all 18 together. None is a new public product page.
