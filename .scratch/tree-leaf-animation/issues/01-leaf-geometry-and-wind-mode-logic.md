# 01: Leaf base-point geometry + wind-mode resolution (pure logic + tests)

**What to build:** A small, framework-agnostic logic module that the rest of this feature depends on, plus a one-off dev script that uses it to produce the committed leaf base-point dataset. No visible behavior change on the site yet — this is the prefactor that unblocks everything else in the spec (`.scratch/tree-leaf-animation/PRD.md`).

**Blocked by:** None (can start immediately)

- [ ] A pure function computes, for a given leaf path's `d` string plus the trunk/branch path's `d` string, the leaf's "base point" — the bbox point on the leaf nearest the trunk path.
- [ ] A pure function `resolveWindMode({configuredMode, prefersReducedMotion, isMobileViewport})` returns the effective wind mode: `prefersReducedMotion` overrides everything (animation should be skipped entirely downstream), otherwise `isMobileViewport` forces `"scrub"` regardless of `configuredMode`, otherwise `configuredMode` passes through unchanged.
- [ ] Both functions are colocated in one module, imported (not duplicated) by whatever consumes them.
- [ ] A one-off Node script calls the geometry function once for each of the tree SVG's 110 leaf paths (`Vector` through `Vector_110`) against the trunk/branch path, and writes/commits the resulting `{id, x, y}` list as a static dataset for later tickets to import.
- [ ] Unit tests (vitest) cover the geometry function against a few known/hand-checked path shapes, and the wind-mode resolution function against all combinations of its three inputs — no DOM, no GSAP, no browser involved in these tests.
