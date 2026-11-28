# Storeybrook multi-touch capacity review

Status: proposed technical contract, not a release or a hardware claim. Reviewed against `9a295ecfeaaca541e626f1dc7008bc2e08cf6dc4`.

Add the adapter after `project/components/bundle.js` in an opt-in paper canvas. Render contact rings or stamps through `Storeybrook.pen(look)` when appropriate; Ink Blot can stay static. `Carousel` and Guardian currently arbitrate one swipe or drag; keep that behavior and leave Reader, links, and buttons outside the touch surface.

## Input contract

- Keep separate pointer state per `pointerId`, sample coordinates relative to the opted-in surface, and batch repaint at most once per animation frame. Mouse and pen remain distinct; retain pen pressure and tilt when supplied. Do not require any input device identifier beyond the transient pointer ID.
- Release only the affected contact on up, cancel, or lost capture; make duplicate terminal events harmless. Clear all contacts on blur, page hide, hidden document, app pause, or teardown. Test capture loss and pointer ID reuse.
- Reserve `touch-action: none` for the opted-in raw-contact surface. Preserve scrolling and zoom elsewhere. Keep keyboard/mouse alternatives and honor reduced motion without disabling useful controls.
- Keep all tracking in memory. No network, telemetry, new global, or changes to shared `crossing:pets` or other toolkit persistence. Keep the adapter separately loaded; do not rewrite pinned `v/1.5.1/` or older releases.

## Acceptance and evidence

1. Exercise 10 simultaneous software contacts as the baseline, followed by independent 20- and 50-contact synthetic runs. Test that overflow is deterministic and does not evict active pointers. Simulated counts are not claims about any touchscreen.
2. Interleave movement, release/cancel, duplicate events and ID reuse; test mixed touch/pen, blur, orientation/viewport changes, page visibility, app pause, and teardown. Confirm scroll, keyboard equivalents, reduced motion, and existing save tests.
3. Record `navigator.maxTouchPoints` and the observed simultaneous contact count separately on each physical device. A browser value is capability metadata, not proof of observed touches. For multiple digitizers do not add their maximums. See the [W3C Pointer Events definition](https://w3c.github.io/pointerevents/#dom-navigator-maxtouchpoints).
4. Keep browser emulation, event simulation, and physical-device results distinct. No implementation or release is included by this review branch.
