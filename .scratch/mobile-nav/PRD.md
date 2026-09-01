Status: ready-for-agent

# Responsive Mobile Nav

## Problem Statement

The main nav (`SiteHeader`) hides its links entirely below the `lg` breakpoint (`hidden lg:flex`) with no replacement — visitors on phones and small tablets have no way to reach Home, About, Our Services, Portfolio, Testimonials, or Contact Us.

## Solution

A `MobileNav` component (hamburger button + slide-in drawer) that appears only below `lg` (1024px), giving small-viewport visitors the same set of destinations as the desktop nav, including an accordion version of the desktop Our Services flyout.

## User Stories

1. As a phone visitor, I want a visible menu control, so that I know how to reach the site's other pages.
2. As a phone visitor, I want the menu control to only appear on small viewports, so that desktop visitors (who already have the full nav) aren't shown a redundant control.
3. As a phone visitor, I want the menu control to animate into view/out of view as I resize across the breakpoint (e.g. rotating a device, or resizing a browser window), so that the control doesn't pop in/out abruptly.
4. As a phone visitor, I want to tap the menu control and see a drawer slide in from the right, so that I have a familiar mobile-nav interaction.
5. As a phone visitor, I want the drawer to cover the full height of my screen, so that it reads as a dedicated navigation surface rather than a small popover.
6. As a phone visitor, I want the area behind the drawer to darken and blur, so that my attention is drawn to the drawer's contents.
7. As a phone visitor, I want the menu items to animate in (fade/rise, staggered) as the drawer opens, so that the drawer feels considered rather than static.
8. As a phone visitor, I want the same top-level destinations as desktop (Home, About, Our Services, Portfolio, Testimonials, Contact Us), so that I'm not missing any part of the site.
9. As a phone visitor, I want to expand "Our Services" into its Residential/Commercial sub-categories, so that I can find the more specific service pages without leaving the drawer.
10. As a phone visitor, I want to expand Residential/Commercial into their own items, so that I can reach the same depth of navigation available on desktop.
11. As a phone visitor, I want the expand/collapse control on each accordion row to visually match the desktop hover interaction (chevron becomes a maple leaf), so that the two surfaces feel like the same product.
12. As a phone visitor, I want the menu control to visually flip into a close ("X") icon while the drawer is open, so that I have an obvious way to close it.
13. As a phone visitor, I want to tap that same control again to close the drawer, so that closing is symmetrical with opening.
14. As a phone visitor, I want to tap outside the drawer (on the darkened backdrop) to close it, so that I have a fast, low-effort way to dismiss it.
15. As a phone visitor, I want to press Escape to close the drawer, so that keyboard users have a way to dismiss it.
16. As a phone visitor, I want tapping any nav link inside the drawer to close it, so that I don't land on the new page with the drawer still open behind it.
17. As a phone visitor, I want the page behind the drawer to stop scrolling while the drawer is open, so that I don't lose my place or get disoriented by background movement.
18. As a screen-reader user, I want the menu control and drawer to expose their open/closed state and role via ARIA, so that assistive tech announces them correctly.
19. As the site owner, I want the drawer's services list sourced from the same data the desktop dropdown uses, so that the two surfaces can't drift out of sync.
20. As the site owner, I want the mobile nav to reuse the existing `useUIStore` mobile-nav state rather than introduce a second source of truth, so that any future feature (e.g. locking the header while open) can read the same flag.

## Implementation Decisions

- **State**: drawer open/closed state lives in the existing `useUIStore` (`isMobileNavOpen`, `openMobileNav`, `closeMobileNav`, `toggleMobileNav`). No new store, no local component state for open/closed.
- **New component**: `MobileNav`, colocated with `SiteHeader` and `ServicesNavDropdown` in the layout components area. Rendered as a sibling within `SiteHeader`'s returned tree (not nested inside the `<header>` element), with its own stacking context above the header's own `z-20` / fixed-on-scroll states.
- **Hamburger/close icon**: a single custom SVG whose path morphs (via the same `MorphSVGPlugin` + `useGSAP` technique already used for the header's mail icon and the nav dropdown's chevron-to-leaf icon) between a 3-line hamburger glyph and an X glyph, driven by `isMobileNavOpen`.
- **Breakpoint visibility**: the hamburger button is fixed-positioned (top-right of viewport, independent of the header's own flex layout so it never disturbs the logo). Its visibility is not a CSS media-query display toggle — it's a GSAP-animated horizontal slide (`xPercent` 0 ↔ 100) driven by a `window.matchMedia("(min-width: 1024px)")` listener, mirroring the pattern `SiteHeader` already uses for its scroll-triggered drawer reveal (tracked boolean state + `useGSAP` effect). On mount, the initial position is set instantly from the current match (no animation); only subsequent breakpoint crossings animate.
- **Drawer geometry**: opens from the right edge, full viewport height, white background, `w-full` capped at a `max-w` around 400px (so it doesn't span the full width above the smallest phone sizes), full-width only on the smallest viewports.
- **Backdrop**: `rgba(0, 0, 0, 0.4)` tint with a light blur (Tailwind's `sm` blur step), `aria-hidden`.
- **Drawer semantics**: `role="dialog"`, `aria-modal="true"`. Hamburger button carries `aria-expanded`, `aria-controls`, `aria-label`.
- **Mount lifecycle**: backdrop and drawer are always mounted (never conditionally rendered away), so GSAP can play a close animation; a GSAP timeline driven by `isMobileNavOpen` animates the slide/fade in both directions, and `visibility`/`pointer-events` are only switched to their closed values once the close animation completes (not eagerly via a Tailwind conditional class).
- **Drawer content**: a flat list of top-level items — Home, About, Our Services, Portfolio, Testimonials, Contact Us (as a CTA styled consistently with the desktop Contact Us button) — sourced from the same `NAV_LINKS` / `NAV_LINKS_AFTER` data `SiteHeader` already defines.
- **Services accordion**: "Our Services" is not a plain link in the drawer — it's an accordion row that expands to reveal the same `SERVICES_MENU` tree the desktop `ServicesNavDropdown` uses (Residential Services / Commercial Services), each of which is itself an accordion row expanding to reveal its own items (Item 1 / Item 2 placeholders today). Two levels of nesting total, matching desktop's two levels of flyout.
- **Accordion expand/collapse icon**: the existing chevron-to-maple-leaf morph icon (currently private to `nav-dropdown.tsx`) is extracted so both the desktop dropdown and the mobile accordion can use it; same open/closed morph behavior in both places.
- **Open animation**: drawer items fade in and rise (opacity + upward translate) with a stagger across items as the drawer opens.
- **Close triggers**: tapping the hamburger/close button again, tapping the backdrop, pressing Escape, and clicking any nav link inside the drawer — all route through `closeMobileNav()`.
- **Scroll lock**: `document.body` scrolling is disabled while the drawer is open and restored on close.
- **Out of scope for this decision set**: no focus trap (Escape-to-close and the other close triggers are considered sufficient for this iteration).

## Testing Decisions

- Tests target external behavior of the `MobileNav` component through Testing Library — rendered DOM state and attributes (`aria-expanded`, drawer visibility/closed state, presence of expected links) and simulated user events (click hamburger, click backdrop, press Escape, click a nav link) — not GSAP's internal tween/animation-frame state, which isn't meaningful to assert on.
- `useUIStore`'s toggle/open/close behavior is already covered by `src/store/ui-store.test.ts`; `MobileNav` tests should exercise the component's reaction to that store rather than re-testing the store itself.
- Prior art in this repo: `src/components/ui/icon.test.tsx` (Testing Library render + assert-mounts pattern) and `src/store/ui-store.test.ts` (store behavior pattern) — both using `vitest` + `@testing-library/react`.
- The accordion's two nesting levels should each get a test asserting the chevron/leaf icon's expanded-state attribute flips and the child rows become visible/hidden accordingly.

## Out of Scope

- Any change to `ServicesNavDropdown`'s desktop hover-flyout behavior.
- Replacing the placeholder `href="#"` links or placeholder `SERVICES_MENU` content (Item 1 / Item 2) with real destinations.
- A focus trap inside the open drawer.
- Any change to the header's own scroll-triggered fixed/reveal behavior.

## Further Notes

- Default Tailwind breakpoints are in effect — no `lg` override exists in this repo's Tailwind theme, so `lg` = 1024px throughout.
- This spec was produced from an interactive design interview (grilling) rather than a prototype; no code snippets encode any decision here.
