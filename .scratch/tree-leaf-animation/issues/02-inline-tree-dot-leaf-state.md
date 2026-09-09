# 02: Inline tree SVG with dot/leaf default state

**What to build:** Replace the About section's flat `<img src="/images/home/about-tree.svg">` with the tree rendered as inline SVG via `LargeTreeSvg`, with every leaf in its "not yet grown" default state (tiny dot visible, full leaf hidden) — correct on first paint, no animation wired up yet. See `.scratch/tree-leaf-animation/PRD.md` for full context.

**Blocked by:** 01

- [ ] `about-section.tsx`'s tree `<img>` is replaced with `<LargeTreeSvg />` in the same wrapping container; `about-section.tsx` itself remains a server component with no other changes.
- [ ] `LargeTreeSvg` becomes a client component (owns all future GSAP/ScrollTrigger setup internally — none of it needs to exist yet for this ticket).
- [ ] Each of the 110 leaves renders both its tiny base dot (visible, `opacity: 1`) and its full leaf shape (hidden, `opacity: 0`) simultaneously, positioned using ticket 01's base-point dataset — expressed as plain inline styles in JSX, not set imperatively after mount.
- [ ] Viewing page source / disabling JS shows the tree already in the correct "bare, dots-only" state — no flash of fully-grown leaves while JS loads, no dependency on a script running to reach the correct starting appearance.
- [ ] Visually verified in a running browser: the tree renders at the correct size/position in the About section with 110 small dots scattered across it and no visible full leaf shapes.
