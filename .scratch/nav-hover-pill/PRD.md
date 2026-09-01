Status: ready-for-agent

# Global Nav Pill-Follow Hover

## Problem Statement

The main global nav (`SiteHeader`) currently signals hover on a link by changing its text color only (`hover:text-primary`). This is a subtle, low-affordance hover state that doesn't match the more tactile, pill-based visual language already established elsewhere in the header — the active page indicator and the Contact Us button both use a solid primary-color pill background, but a hovered (not yet active) link gets no equivalent treatment.

## Solution

Replace the plain text-color hover on the top-level nav links with a single shared "pill" element that visually follows the cursor: when a link is hovered, a primary-color, rounded-full background animates (slides and resizes) to sit exactly behind that link, and the link's text turns white for contrast — the same visual treatment already used for the active-page pill and the Contact Us button, but now triggered by hover and animated between targets instead of being static.

## User Stories

1. As a site visitor on an interior page, I want the nav link I'm hovering to get a moving pill background, so that I get clear, tactile feedback about which link I'm about to click.
2. As a site visitor on the homepage (transparent overlay header, over the hero photo), I want the same pill-follow hover behavior as interior pages, so that the nav feels consistent no matter which page I land on.
3. As a site visitor moving my cursor from one nav link to another, I want the pill to slide/resize smoothly from the old link's position to the new one, so that the transition feels connected rather than an abrupt swap.
4. As a site visitor hovering the "Our Services" dropdown trigger, I want it to receive the same pill treatment as the plain text links, so that the whole top-level nav feels like one consistent set of controls.
5. As a site visitor on an interior page currently viewing a page with an active nav link (e.g. `/about`), I want that active link's permanent pill to stay visible even while I hover a different link, so that I don't lose track of which page I'm on while exploring the nav.
6. As a site visitor who moves my cursor off the nav entirely, I want the hover pill to fade away rather than jump or snap, so that the exit feels as polished as the entry.
7. As a site visitor hovering a link, I want its text to stay legible against the new pill background, so that the hover state doesn't hurt readability.
8. As a developer maintaining this nav, I want the pill-position math isolated in a pure, unit-testable function, so that the trickiest part of the logic (rect math) has a regression safety net independent of animation timing or DOM layout quirks.
9. As a site visitor interacting with the "Our Services" submenu panel (Residential Services, Commercial Services, etc.), I want its existing hover style to stay exactly as it is today, so that this change doesn't unexpectedly alter a part of the nav that wasn't in scope.

## Implementation Decisions

- **Scope**: the pill-follow hover applies to the top-level nav row only — `Home`, `About`, the `Our Services` dropdown trigger, `Portfolio`, `Testimonials` — in both `SiteHeaderVariant` values (`transparent` and `solid`). The Contact Us button is unaffected (it's already permanently pilled). The `Our Services` submenu dropdown panel's internal items keep their current hover style (dark-green rectangle background) unchanged.
- **Shared pill element**: one absolutely-positioned pill element lives inside the nav's relative-positioned container. Its size and position are driven by refs collected from each top-level nav item (the plain links and the `Our Services` trigger). On hover of any tracked item, the pill animates its `x`/`width` (and implicitly height, matching the target's padding box) to match that item's bounding box, computed relative to the nav container.
- **Animation**: implemented with gsap (already a project dependency, already used for the dropdown's fade-in in `nav-dropdown.tsx`), at `0.2s` duration with a `power2.out` ease — matching the existing gsap animation's timing in this same nav for consistency.
- **Hover text color**: while the pill is positioned behind a link, that link's text renders white, matching the same white-on-primary contrast rule used by the active-page pill and the Contact Us button. This replaces the current `hover:text-primary` text-color-only hover.
- **Active-page pill (solid variant) coexistence**: the existing permanent active-link pill (`active ? "bg-primary text-white" : ...`) is untouched and independent of the new floating hover pill. Both can be visible simultaneously — hovering a non-active link shows two pills at once (the static active one, and the floating hover one over the hovered link). Hovering the active link itself is a no-op visually (the hover pill would land exactly on top of the already-pilled active link).
- **Mouse-leave behavior**: when the cursor leaves the nav container entirely (no tracked item hovered), the pill animates its opacity to 0 in place — it does not reposition or reset before fading. The next hover fades it back in already positioned at the new target (no stale "flight" across the nav on re-entry).
- **Pill sizing/shape**: the pill matches the visual footprint the active-page pill already uses on the solid variant (`rounded-full`, same horizontal/vertical padding proportions as the existing `px-5 py-2` treatment), applied consistently across both variants so the transparent variant's links get the same pill shape as the solid variant's, not a differently-proportioned one.
- **Components touched**: `SiteHeader` (`src/components/layout/site-header.tsx`) gains the shared pill element, ref collection, and hover handlers for `Home`/`About`/`Portfolio`/`Testimonials`. `ServicesNavDropdown` (`src/components/layout/nav-dropdown.tsx`) exposes its trigger element (via ref/callback) so it can be tracked by the same shared pill, without changing its own submenu-open/close behavior.

## Testing Decisions

- Good tests here exercise external, observable behavior — not gsap internals or DOM layout timing — so the one seam worth unit-testing is the pure rect-math function that decides where the pill should sit.
- **New pure function**: something like `getPillTargetRect(containerRect, targetRect) → { x, width }`, taking plain rect-shaped objects (not real DOM elements) and returning the pill's position/size relative to the container. This is unit-tested directly with synthetic input objects — no `jsdom`, no mocked `getBoundingClientRect`, no rendering.
- **Prior art**: `src/store/ui-store.test.ts` is the only existing test in the repo — a plain `vitest` unit test with no rendering, which this follows the same spirit of (test the logic, not the DOM).
- **Explicitly not unit-tested**: the gsap animation itself, the hover-event wiring in `SiteHeader`/`ServicesNavDropdown`, and the visual pill appearance. These are verified manually in-browser (both variants, all five tracked items, active+hover coexistence, mouse-leave fade) per this repo's existing rule that UI changes get checked in a running browser, not just through test suites.

## Out of Scope

- Any change to the Contact Us button's styling or behavior.
- Any change to the `Our Services` submenu dropdown panel's internal item hover style.
- Mobile/touch nav — this is a hover-only affordance; no touch-equivalent interaction is being designed here.
- Any change to which link is marked "active" or how that's determined (`pathname === link.href`).
- A component-level (RTL) test of the hover interaction — deferred per the testing decision above.

## Further Notes

- Design reference: user described the desired feel as "like the Contact Us button" pill, but following the hovered link instead of being static — no external mockup/example was ultimately provided; a standard sliding/resizing shared-pill pattern was agreed on instead.
- Colors: `--color-primary: #f89c1c` for the pill background, matching `PillButton`'s `primary` variant and the existing active-link pill — no new color token needed.
