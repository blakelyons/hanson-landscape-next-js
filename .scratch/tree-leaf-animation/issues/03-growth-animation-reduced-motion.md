# 03: Growth animation + reduced-motion fallback

**What to build:** Scrolling the About section into view triggers the leaves growing in — each dot morphs into its full leaf shape, staggered and randomized so the canopy fills in organically rather than popping in at once or sweeping mechanically. Respects `prefers-reduced-motion`. See `.scratch/tree-leaf-animation/PRD.md` for full context.

**Blocked by:** 02

- [ ] A `ScrollTrigger` fires when the About section's top reaches 25% down the viewport (`start: "top 25%"`), with `toggleActions: "play none none none"` — plays forward exactly once; scrolling back up past the section afterward does not revert the leaves to dots, and re-entering does not replay it.
- [ ] On trigger, each leaf's dot morphs (MorphSVGPlugin) into its full leaf shape, staggered with randomized order/timing per leaf — verified visually that growth doesn't read as a single mechanical wipe across the tree.
- [ ] Under `prefers-reduced-motion: reduce` (verified via OS/browser emulation), the tree renders fully grown and static immediately — no dots, no morph timeline runs at all, no `ScrollTrigger` fires.
- [ ] Visually verified in a running browser: scrolling to the About section produces the grow-in effect; scrolling past and back up leaves the tree fully grown; toggling reduced-motion in devtools and reloading shows an immediately fully-grown static tree.
