# Show & Tell candidate checks

The candidate workflow runs only on `sae/show-tell-2026-11-01` in this public
repository, on the standard `ubuntu-24.04` hosted runner. It grants only
`contents: read`, does not persist checkout credentials, and does not deploy.
Its checkout and receipts identify the exact pushed commit.

`python3 tests/show-tell/verify.py` checks the authored references, all JavaScript
syntax, the 31 approved assets and their recorded hashes. `--source-only` allows
the specifically declared bundle to be absent for preparation; that option is
never a release pass.

Before the release audit can pass, obtain the supplied `show-tell-media.zip`,
verify its 20,533,612-byte length and SHA-256
`bb98208e5e382600140f96a8ec5880b49ddd1b0d7343c281508491647c1ff284`,
and safely extract only the 31 paths in `expected-assets.json`. The ZIP expands
to 21,540,736 bytes. Reject unsafe paths, symlinks, duplicates or any other entry.
Inspect the fonts and retain their required licenses before publishing them.
Write `show-tell/media-manifest.json` with `archive_sha256` and an `assets` array
of `{path, bytes, sha256}` derived from those verified bytes. Paths are relative
to `show-tell/`. Do not create a manifest from substitute files.

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
