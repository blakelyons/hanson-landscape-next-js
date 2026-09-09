# 06: Wind sway — hybrid mode (default)

**What to build:** The default wind experience — a constant scrub-driven base sway with physics-driven gusts layered on top, combining tickets 04 and 05. See `.scratch/tree-leaf-animation/PRD.md` for full context.

**Blocked by:** 04, 05

- [ ] `"hybrid"` mode runs the `"scrub"` sway (ticket 04) as a constant base layer across all leaves.
- [ ] `"hybrid"` mode additionally layers `"impulse"`-style physics gusts (ticket 05) periodically on top of the `PHYSICS_LEAF_COUNT` subset, composing with (not replacing) the base scrub sway on those leaves.
- [ ] `WIND_MODE`'s default value is set to `"hybrid"`.
- [ ] Mobile override (ticket 04) still forces effective mode down to `"scrub"` when `WIND_MODE` is `"hybrid"`.
- [ ] Visually verified in a running browser with the default config: all leaves show continuous scrub sway while scrolling, with a visibly distinct extra gust effect on a subset of leaves layered on top; resizing to mobile still falls back to scrub-only.
