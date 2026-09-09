# 04: Wind sway — scrub mode + mobile override

**What to build:** After the leaves have grown, continued scrolling sways them like wind, pivoting from each leaf's base. This ticket establishes the `WIND_MODE` switch scaffold and implements the `"scrub"` mode plus the mobile-viewport override. See `.scratch/tree-leaf-animation/PRD.md` for full context.

**Blocked by:** 03

- [ ] A `WIND_MODE` constant (`"scrub" | "impulse" | "hybrid"`) controls which wind implementation is active; only `"scrub"` needs a working implementation in this ticket (the other two branches can be stubs that later tickets fill in).
- [ ] Each leaf's `transform-origin` is set at runtime (not baked into SVG markup) from ticket 01's base-point dataset, so rotation pivots at the leaf's base rather than its center.
- [ ] `"scrub"` mode: a `scrub: true` `ScrollTrigger` drives a deterministic per-leaf rotational sway (sine-based), with amplitude/phase randomized per leaf so leaves don't move in lockstep. Motion is purely a function of scroll position — no Physics2D/InertiaPlugin involved in this mode.
- [ ] Scrolling stops → sway freezes instantly at its current position; scrolling back up reverses the sway (scrub behavior, not one-shot).
- [ ] `resolveWindMode` (ticket 01) is wired in: on a small/mobile viewport, the effective mode is forced to `"scrub"` regardless of the configured `WIND_MODE` constant.
- [ ] Visually verified in a running browser: past the grown tree, continued scrolling sways the leaves around their bases with visibly randomized per-leaf motion; resizing to a mobile viewport width with `WIND_MODE` set to something else still shows scrub-only behavior.
