# Bespoke v5 quality candidate — held for browser acceptance

The active product source is `bespoke-v5/index.html` in `stevoblevo/storeybrook`, main `a11682d3ba4749f6db4a228f8c657ba28b5d744b`. Its full 2,586,243 bytes were read with the authorized GitHub blob connector and independently reproduce Git blob `38fbbf92623d870e9de0cc369be90ca4deba2db9`. A large-file Contents response was empty; the file itself is not empty.

The source was added by Sven bRinly/stevoblevo in commit `9d13874a0356ae2556978cf5d519665ce90e36b4` (“bespoke.gig v5 — the sheets made real (showcase)”). This establishes published Git source custody, not a separate Muse authoring endpoint. The source mentions MASTER-PLAN and PLAN-V5 documents absent from the repository.

Expected route: https://stevoblevo.github.io/storeybrook/bespoke-v5/
Pages run https://github.com/stevoblevo/storeybrook/actions/runs/41715013750 succeeded at current main; deploy logs identify the Storeybrook Pages root. Direct web.open of v5 returned “URL … is not accessible via this tool. Internal Error.” No direct live page, screenshot, real browser interaction, original-art match, or physical-device acceptance is claimed.

## Product outcome

This candidate keeps v5's existing character artwork, six arches, cast, local persistent board, proposal room, and fee rehearsal. It improves the complete brief-to-rehearsal path: invalid budgets cannot silently become $120; the draft stays available; users can download it or copy it when download support fails; pinning and storage failures state what really happened; family selection and board focus lead to the new brief. A raised concern actually pauses acceptance through reload, and explicit resume continues the rehearsal. Escalation clearly sends no human case. Completing the dance no longer points to an imaginary seventh arch.

No new application shell, provider, account, payment system, canonical kit edit, or replacement art was introduced. All 41 embedded image-data occurrences are byte-identical in the reconstructed candidate. No image bytes are in this patch or handoff.

## Files and applicability

- `candidate.patch`: 24 unified-diff hunks, +153/-46 lines, applies only to `bespoke-v5/index.html`.
- `v5-regressions.mjs`: actual inline-script synthetic regression fixture and 37 checks.
- `baseline-results.json`, `candidate-results.json`: executed V8 results.
- `receipt.json`: exact source/candidate/patch hashes, deployment evidence, limits.
- `BROWSER-ACCEPTANCE.md`: pending acceptance work.
- `SHA256SUMS`: handoff payload hashes.

Patch SHA-256: `b39f81bced42c1abc6d7747bee25b1f03eb83db2167f4c5e1e2c244f728612c1`
Reconstructed candidate SHA-256: `e7faa73f4e4aa7e7ec0d58f8c188d25a7e1189610a27b7c4654aecbb538d088e`
Reconstructed candidate Git blob: `23fce0655952b4b99d0da62d29fee7ec2ce663c8`

The patch was replayed against the exact connector bytes and its result matched the reconstructed candidate. No git-apply shell command was run. Full v5 source remains in session memory; this handoff stores a text patch only, to avoid repackaging embedded art. This handoff-only branch adds evidence files; it does not apply the patch to live source. No PR, merge or deployment is part of this custody step.

An authorized future integrator should first re-read main and compare the target blob. If unchanged, apply this patch to a separate existing-product checkout, verify the reconstructed SHA-256 above, and run `node v5-regressions.mjs PATH/TO/bespoke-v5/index.html`. Keep the exact source and local-storage key `bespoke-gig-v5-state`; accepted old snapshots remain supported. If the blob differs, reconcile edits explicitly instead of overwriting newer work.

## Verification and limits

Executed in the functions V8 environment, with synthetic DOM, storage, clock, downloads and media-query state:
- Baseline: 10 pass / 27 fail.
- Candidate: 37 pass / 0 fail.

The 27 failures include newly required export/accessibility behavior, not 27 independently discovered production regressions. The five initial reproduced defects were budget substitution; storage-loss false confirmation; malformed-entry startup crash; nonexistent seventh arch; and acceptance despite frozen-dispute copy. Follow-up probes also caught transient storage-warning recovery and author-name collisions with Object.prototype; these are corrected and covered.

The fixture verifies script state and declared focus/ARIA changes. It does not lay out the page, run a browser, prove screen-reader output, verify real disk downloads, decode images, or supply screenshots. Fee numbers are unchanged simulation arithmetic, not a financial recommendation or a production payment service.

Further acceptance/review gaps remain: room snapshot schema validation, unsent proposal persistence, no-JS visibility, lightbox focus containment, responsive geometry and all embedded art in an actual browser. Do not call the candidate ready for publication until source custody and browser acceptance are reconciled.

## Durable review custody

Branch: `sae/bespoke-v5-handoff-b39f81bc`, based on freshly verified main `a11682d3ba4749f6db4a228f8c657ba28b5d744b`.
Artifact directory: `handoffs/bespoke-v5-quality-rc1/`.

This branch preserves only the new v5 patch, regression source and evidence. It contains no prior legacy patch/ZIP and no embedded artwork. Existing site source and workflow triggers remain unchanged. The existing workflow's push target is `sae/show-tell-2026-11-01`; it does not target this handoff branch.

### Exact reconstruction in an authorized review checkout

After obtaining this handoff branch through the integrator's existing authorized Git access, create an isolated review checkout from it. Do not run these commands in a live serving directory or an unrelated worktree.

```sh
git hash-object bespoke-v5/index.html
# Must be: 38fbbf92623d870e9de0cc369be90ca4deba2db9
cd handoffs/bespoke-v5-quality-rc1
sha256sum -c SHA256SUMS
cd ../..
# The manifest checks seven payloads; it excludes itself.

# From the repository root:
git apply --check handoffs/bespoke-v5-quality-rc1/candidate.patch
git apply handoffs/bespoke-v5-quality-rc1/candidate.patch
sha256sum bespoke-v5/index.html
# Must be: e7faa73f4e4aa7e7ec0d58f8c188d25a7e1189610a27b7c4654aecbb538d088e
node handoffs/bespoke-v5-quality-rc1/v5-regressions.mjs bespoke-v5/index.html
# Expected: 37 pass, 0 fail; synthetic logic checks only.
```

The manifest lists seven payloads; the eighth file is the manifest itself. Reconcile any source-blob difference before applying. The full candidate is reconstructed from the repository's existing source, so no image bytes need to be transferred with this handoff. Browser acceptance remains separately required; no instruction here authorizes release or an otherwise denied execution environment.
