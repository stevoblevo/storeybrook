# Show & Tell candidate checks

The candidate workflow runs only on `sae/show-tell-2026-11-01` in this public
repository, on the standard `ubuntu-24.04` hosted runner. It grants only
`contents: read`, does not persist checkout credentials, and does not deploy.
Its checkout and receipts identify the exact pushed commit.

After the existing Pages workflow succeeds on `main`, a separate read-only job
in the same workflow checks that deployment's source SHA. `live.py` requests all
tracked runtime exhibit files at the fixed public Pages URL and compares their complete
bytes with that source, including all 11 HTML pages and 31 media assets. It records
the release version and Pages run ID. This hosted check does not use or retry the
blocked local executor's Pages route and never changes deployment settings.

`python3 tests/show-tell/verify.py` checks the authored references, all JavaScript
syntax, the 31 approved assets and their recorded hashes. `--source-only` allows
the specifically declared bundle to be absent for preparation; that option is
never a release pass.

The approved media was verified before import at commit `32646a72bf45adf56f2323f80d725d577071200a`.
The supplied `show-tell-media.zip` has a 20,533,612-byte length and SHA-256
`bb98208e5e382600140f96a8ec5880b49ddd1b0d7343c281508491647c1ff284`,
and contains exactly the 31 paths in `expected-assets.json`, expanding to
21,540,736 bytes. `show-tell/media-manifest.json` records per-file hashes
independently recomputed from the verified imported Git blobs. The original
Malachi font blob IDs match all three bundled fonts; matching OFL notices and
embedded copyright statements are retained in `malachi-site/licenses/`.
No archive download is needed to run these checks.

The browser test uses the runner's installed Google Chrome, headlessly and
muted, with Playwright's `chromiumSandbox: true`. It also checks the effective
launch arguments and `chrome://sandbox`. If that sandbox cannot run, the job
must fail; do not add sandbox-disabling flags or change runner security policy.
The local cloud executor is intentionally not a supported browser-test route.

Browser checks cover hub links, the five Piggie clues and Mallow chapter, all 18
art-wall images and persisted/exported verdicts, four Malachi styles, dialogs,
three font faces, ten actual MP3 decodes, manual excerpt playback/pause/resume,
and the two bespoke prototypes. Logs and the job summary identify the candidate.
Muted automated playback is not audible review or human visual approval.

These additive review exhibits do not change the canonical Claude toolkit or
apply the separate Reader candidate. The private portrait, continuous edited
cut, cloned takes and private chapter narration remain excluded. Merge and
Pages deployment remain gated on the complete media and browser results.
