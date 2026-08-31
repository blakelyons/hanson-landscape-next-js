Status: ready-for-agent

# Homepage Carousels

## Problem Statement

Three sections of the homepage display static, non-interactive image/content groups that the Figma design and stakeholder intent treat as interactive galleries:

- The hero section shows one large photo plus three thumbnails and a right-arrow icon, but none of it responds to clicks — the arrow is decorative and the thumbnails render upside-down (`-scale-y-100`) with no active state.
- The "Family-Owned. Passion-Driven." (About) section shows two large photos side-by-side with five decorative, non-functional dots below them — there's no way to actually browse more than the two hardcoded photos.
- The "What Our Clients Say" (Testimonials) section renders all testimonial cards in a single static flex row, which will overflow or look sparse once the number of testimonials changes from the current placeholder count of 3.

## Solution

Build a `Hero Image Switcher` component for the hero section (plain React state, no carousel library) that lets a visitor click a thumbnail or the cycle arrow to change the large photo, with a clear active-thumbnail treatment and a crossfade on the large photo.

Build a reusable `Carousel` component (Swiper.js-backed) with props for dots, arrows, slides-per-view, and loop behavior. Use it in the About section with real multi-photo content, dots, and arrows. Reuse the same component in the Testimonials section, but only render it as a carousel once there are more than 3 testimonials — 3 or fewer keeps today's `Static Row` markup and behavior unchanged.

## User Stories

1. As a homepage visitor, I want to click a hero thumbnail, so that the large photo updates to show that image.
2. As a homepage visitor, I want the hero thumbnail I'm currently viewing to look visually distinct (raised up, amber-bordered), so that I can tell which photo is active at a glance.
3. As a homepage visitor, I want to click the hero's right arrow, so that the large photo advances to the next image without me needing to pick a specific thumbnail.
4. As a homepage visitor, I want the arrow to keep working after I reach the last thumbnail, so that clicking it again wraps back around to the first image instead of doing nothing.
5. As a homepage visitor, I want the large photo to transition smoothly (crossfade) when it changes, so that the swap doesn't feel like a jarring flash.
6. As a homepage visitor, I want the hero thumbnails to render right-side-up, so that the existing upside-down rendering bug is no longer visible.
7. As a homepage visitor landing on the page, I want the first thumbnail's photo to be the one shown initially, so that the hero has a sensible default state before I interact with it.
8. As a homepage visitor, I want the Family-Owned section's two-photo display to actually be a browsable gallery of the project's photos, so that I can see more than just the two hardcoded images.
9. As a homepage visitor, I want dots below the Family-Owned gallery that reflect real pages of content, so that I know how many groups of photos there are and roughly where I am among them.
10. As a homepage visitor, I want prev/next arrows on the Family-Owned gallery, so that I have an alternative to the dots for browsing photos.
11. As a homepage visitor, I want the Family-Owned gallery to wrap around when I reach the last photo, so that clicking "next" always does something.
12. As a developer, I want the Carousel to accept a prop for hiding the dots, so that I can reuse it in contexts (like Testimonials) where dots aren't wanted.
13. As a developer, I want the Carousel to accept a prop for hiding the prev/next arrows, so that I can reuse it in contexts where only dots are wanted.
14. As a developer, I want the Carousel to accept a `slidesPerView` prop, so that the same component can show 2 photos at a time in one place and 3 cards at a time in another.
15. As a homepage visitor, I want the "What Our Clients Say" section to keep showing all testimonials in a plain row when there are 3 or fewer, so that the section doesn't gain pointless carousel controls for a handful of cards that already fit.
16. As a homepage visitor, I want the "What Our Clients Say" section to become a browsable carousel once there are more than 3 testimonials, so that additional testimonials don't overflow the page or get cut off.
17. As a homepage visitor browsing the testimonials carousel, I want to see 3 cards at a time and advance one card at a time, so that browsing feels incremental rather than jumping in large, disorienting pages.
18. As a homepage visitor browsing the testimonials carousel, I want prev/next arrows (no dots), so that I can page through testimonials without a dot indicator that would be unwieldy for a longer, growing list.
19. As a homepage visitor browsing the testimonials carousel, I want it to wrap around at the end, so that clicking "next" on the last visible set loops back to the beginning.
20. As a developer maintaining the Testimonials section, I want the switch to carousel mode to be driven purely by the testimonial count (a derived boolean, not a manually-flipped flag), so that adding a 4th testimonial to the data array is enough to trigger carousel behavior with no other code change.
21. As a developer maintaining the codebase, I want the Hero Image Switcher and Carousel to be self-contained components, so that the hero, About, and Testimonials sections stay declarative call sites rather than owning image-cycling logic themselves.

## Implementation Decisions

- **New component: Hero Image Switcher** (used only in the homepage hero section). Owns local React state for "which item is active" (index into a fixed 3-item list). No Swiper — plain state + CSS transitions.
    - Items: the 3 images currently used as hero thumbnails (`hero-thumb-1`, `hero-thumb-2`, and the third existing hero thumbnail image) — the same file is used for both the thumbnail and, when active, the large photo (no separate paired "large" asset per item). The image currently hardcoded as the large photo, unrelated to the 3 thumbnails, is dropped from rotation.
    - Initial active item: the first item in the list.
    - Clicking a thumbnail sets it active. Clicking the arrow advances to the next item in list order, wrapping from the last item back to the first.
    - Active-thumbnail styling: `translateY(-12px)` plus a 1px `#f89c1c` border, applied via a CSS transition (~150-200ms ease) rather than an instant style swap.
    - Large-photo change: CSS opacity crossfade (~200-250ms) between old and new image, not an instant swap.
    - Fixes the existing `-scale-y-100` flip on all three thumbnails — they render right-side-up in the new component.
- **New component: Carousel** (`src/components/ui/`, reusable — Swiper.js-backed). Props: a list of slide contents, `slidesPerView`, `showDots`, `showArrows`, `loop`, plus pass-through spacing/className props as needed to match each call site's existing visual spacing. All navigation (dots, arrows, looping) is delegated to Swiper's built-in modules/config — no custom paging logic is written by hand.
    - `swiper` is added as a new npm dependency.
- **About section usage of Carousel**: slides are the project's photo pool (4 images — the two currently hardcoded photos plus two more from the existing image set), `slidesPerView=2` (2 pages, matching a 2-dot indicator), both dots and arrows shown, `loop=true`. Replaces the current two hardcoded `<img>` blocks and the 5 decorative static dots.
- **Testimonials section usage of Carousel**: the section computes `isCarousel = TESTIMONIALS.length > 3` and branches its render:
    - `isCarousel === false`: renders exactly today's static flex-row markup (`TestimonialCard` list, no Carousel/Swiper involved at all).
    - `isCarousel === true`: renders the same `TestimonialCard`s as Carousel slides, `slidesPerView=3`, advancing one slide at a time, `showDots=false`, `showArrows=true`, `loop=true`.
    - Since testimonial cards are fixed-width (336px) with a 60px gap, the Carousel instance here is sized so Swiper's numeric `slidesPerView=3` computes to the same 336px-per-slide width the static row already uses, preserving today's visual sizing when the carousel is active.
- **No changes** to the `TESTIMONIALS` data shape, the `TestimonialCard` component's props/markup, or any other homepage section not named above.

## Testing Decisions

- Test type: component-level render/interaction tests via Vitest + `@testing-library/react` (jsdom), matching existing prior art (`src/components/ui/icon.test.tsx`, `src/components/ui/page-hero.test.tsx`, and `SiteHeader`'s behavioral tests from the About Us Page feature).
- Tests assert externally observable output only (which image is rendered/active, presence of active-state class/attribute, click-driven state changes) — never internal component state or unrelated class strings.
- **Hero Image Switcher** gets real behavioral tests: clicking a thumbnail makes it active and updates the large photo; clicking the arrow advances through items and wraps from the last item back to the first; the first item is active on initial render.
- **Carousel** gets prop-driven behavioral tests: `showDots`/`showArrows` toggle whether those controls render; passing more slides than `slidesPerView` and advancing past the end with `loop=true` wraps back to the first slide.
- **Testimonials section's carousel branch** is tested at the Carousel seam, not as a separate seam: rendering with ≤3 testimonials produces the static row with no Carousel/Swiper markup present; rendering with >3 testimonials produces the Carousel path.
- Swiper's own internals (touch/drag physics, transition rendering) are not tested — same treatment prior art gives other third-party runtime behavior (e.g. `Icon`'s Iconify fetch is not asserted on, only that the component mounts). Carousel tests exercise the props/behavior the app code controls (dots/arrows visibility, wrap-around), not Swiper's internal mechanics.
- No new test infrastructure (no E2E runner, no visual regression tooling) is introduced.

## Out of Scope

- Using Swiper (or any carousel library) in the Hero Image Switcher — it stays a plain-state component per explicit decision.
- Changing the `TESTIMONIALS` data source, count, or content — this spec only changes how existing/future testimonial data renders.
- Adding a CMS or data layer for hero images, About photos, or testimonials — content stays hardcoded, consistent with the rest of the site today.
- Any changes to sections other than the hero, About ("Family-Owned. Passion-Driven."), and Testimonials sections.
- Visual/pixel-perfect QA pass against Figma for the new interactive states (separate follow-up step after implementation, same process used for prior features).
- Accessibility affordances beyond what Swiper provides out of the box and what basic button/click semantics require (e.g. no bespoke ARIA carousel pattern work called out here).

## Further Notes

- This spec was produced from an interactive planning session (`/grill-with-docs` → `grilling` skill, with `domain-modeling` active) that resolved item counts, animation choices (crossfade + translate, not GSAP), Swiper scope (About + Testimonials only, not Hero), and loop-vs-stop behavior (loop) one decision at a time with the developer.
- Resolved terminology (`Hero Image Switcher`, `Active Thumbnail`, `Carousel`, `Static Row`) is recorded in the repo's root `CONTEXT.md`.
- No ADRs were written for this feature — none of the notable decisions (Swiper scope, loop-vs-stop) were judged to meet all three ADR criteria (hard-to-reverse, surprising, real trade-off) at spec time.
