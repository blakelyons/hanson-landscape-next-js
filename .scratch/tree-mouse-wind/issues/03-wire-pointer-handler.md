Status: resolved
Type: task
Blocked by: 01, 02

# Wire pointer handler for Mouse Wind

Track pointer position and speed over the Tree, convert to viewBox space via `getScreenCTM().inverse()`, and apply Wind to Leaves in range using ticket 02's logic. Enable only after Growth completes (growth trigger `onLeave`), or on setup if Growth progress is already 1. Gate on `(hover: hover) and (pointer: fine)` and reduced-motion off. Clean up listeners with the existing `useGSAP` context.

## Acceptance criteria
- [ ] No Mouse Wind before Growth completes
- [ ] Mouse Wind active on load when page starts scrolled past the Tree
- [ ] Disabled on touch-only devices and with reduced-motion
- [ ] Listeners removed on unmount
- [ ] Only in-range Leaves are tweened

## Answer
Wired in `large-tree-svg.tsx`. A window `pointermove` listener converts the cursor to viewBox space (`clientToViewBox`, `VIEWBOX` constant now also drives the SVG `viewBox`), derives speed in viewBox units/ms, and tweens only Leaves where `mouseWindRotation` is non-zero. Starts from the growth trigger's `onLeave`, or immediately if `growthTrigger.progress === 1` at setup. Gated on `(hover: hover) and (pointer: fine)`; reduced-motion already returns before any of this. Listener removed in the `useGSAP` cleanup.
Placeholder return-to-rest is a short yoyo tween; ticket 04 replaces it with inertia kick + elastic settle. Not browser-verified (Blake).
