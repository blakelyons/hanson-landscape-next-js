# 05: Wind sway — impulse mode

**What to build:** An alternate wind implementation where scrolling triggers physics-driven gusts that settle on their own, rather than being tethered 1:1 to scroll position. Selectable via the `WIND_MODE` scaffold from ticket 04. See `.scratch/tree-leaf-animation/PRD.md` for full context.

**Blocked by:** 04

- [ ] A `PHYSICS_LEAF_COUNT` constant controls how many leaves (a randomly-selected subset of the 110) receive real Physics2D/InertiaPlugin simulation — not all 110 run physics simultaneously.
- [ ] `"impulse"` mode: crossing scroll thresholds (or scroll-direction changes) fires a randomized Physics2D/InertiaPlugin impulse on leaves in the selected subset, each pivoting at its base point (reusing ticket 04's transform-origin wiring).
- [ ] Impulsed leaves settle under their own simulated momentum independent of further scrolling — motion continues briefly after the user stops scrolling, unlike scrub mode.
- [ ] Setting `WIND_MODE` to `"impulse"` fully disables the scrub-based sway from ticket 04 (the two modes are mutually exclusive when selected individually).
- [ ] Visually verified in a running browser with `WIND_MODE = "impulse"`: scrolling produces randomized leaf impulses among the subset that visibly continue settling for a moment after scrolling stops.
