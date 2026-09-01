# 01: Mobile nav shell (hamburger + drawer + backdrop)

**What to build:** A `MobileNav` control visible only below the `lg` breakpoint: a fixed hamburger button that morphs into a close ("X") icon and opens a full-height drawer sliding in from the right, over a tinted/blurred backdrop, listing the same top-level destinations as the desktop nav (Home, About, Our Services as a plain link, Portfolio, Testimonials, Contact Us). The drawer opens/closes from any of: tapping the button again, tapping the backdrop, pressing Escape, or tapping a nav link.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Hamburger button is fixed top-right; below `lg` (1024px) it's visible, at/above `lg` it's slid out of the viewport via a GSAP `xPercent` animation driven by a `matchMedia("(min-width: 1024px)")` listener (instant on initial mount, animated only on breakpoint crossings).
- [ ] Button icon is a single custom SVG that morphs (via `MorphSVGPlugin`) between a 3-line hamburger glyph and an X glyph as `useUIStore`'s `isMobileNavOpen` toggles.
- [ ] Button carries `aria-expanded`, `aria-controls`, and `aria-label` reflecting open/closed state.
- [ ] Drawer: right-aligned, full viewport height, white background, `w-full` capped near 400px (full width only on the smallest viewports).
- [ ] Backdrop: `rgba(0, 0, 0, 0.4)` tint + light blur, `aria-hidden`.
- [ ] Drawer has `role="dialog"` and `aria-modal="true"`.
- [ ] Backdrop and drawer are always mounted; a GSAP timeline (driven by `isMobileNavOpen`) animates the open/close slide and the backdrop fade in both directions; `visibility`/`pointer-events` switch to closed only once the close animation finishes.
- [ ] On open, drawer nav items fade in and rise with a stagger.
- [ ] Drawer content is a flat list sourced from `SiteHeader`'s existing `NAV_LINKS`/`NAV_LINKS_AFTER` data plus a Contact Us CTA styled consistently with the desktop one; "Our Services" appears as a plain link (no accordion yet — that's ticket 02).
- [ ] All four close triggers (button toggle, backdrop click, Escape key, clicking any nav link) call `useUIStore`'s `closeMobileNav()`.
- [ ] `document.body` scroll is locked while the drawer is open and restored on close.
- [ ] Drawer open/closed state reads from and writes to the existing `useUIStore` (`isMobileNavOpen`/`openMobileNav`/`closeMobileNav`/`toggleMobileNav`) — no new store, no local open/closed state.
- [ ] `MobileNav` is rendered as a sibling within `SiteHeader`'s returned tree (not nested inside the `<header>` element), stacked above the header's own `z-20`/fixed states.
- [ ] Tests (Testing Library, mirroring `icon.test.tsx`/`ui-store.test.ts` conventions): clicking the button toggles `aria-expanded` and the drawer's open state; clicking the backdrop, pressing Escape, and clicking a nav link each close the drawer; expected links are present in the rendered drawer.
