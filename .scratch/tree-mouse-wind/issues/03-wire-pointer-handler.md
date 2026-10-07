Status: needs-triage
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
