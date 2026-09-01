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
- **New component: Carousel** (`src/components/ui/carousel.tsx`, reusable — Swiper.js-backed). Props: `slides: ReactNode[]`, `slidesPerView: number`, `showDots?: boolean` (default `true`), `showArrows?: boolean` (default `true`), `loop?: boolean` (default `false`), `autoplay?: boolean | number` (default `false`), `spaceBetween?: number` (default `16`, matching the About section's existing `gap-4`; Testimonials overrides to `60` to match its existing card gap).
    - The component owns the carousel-vs-Static-Row decision itself: it renders as a Swiper carousel only when `slides.length > slidesPerView`; otherwise it renders a plain static flex row (no Swiper mounted, no dots/arrows, no JS cost). This replaces the Testimonials section computing its own `isCarousel` boolean — passing `slides` + `slidesPerView=3` to Carousel produces the identical behavior (`slides.length > slidesPerView` ⇔ `TESTIMONIALS.length > 3`) with the logic centralized in one place.
    - Advancing always moves one slide at a time (`slidesPerGroup: 1`, not exposed as a prop — no caller needs anything else).
    - Dots are rendered via Swiper's custom `renderBullet`, reproducing the exact existing bullet styling (`size-2 rounded-full`, active `bg-forrest`, inactive `bg-[#d9d9d9]`) rather than reskinning Swiper's default bullet CSS.
    - Prev/next arrows are custom nav elements (not Swiper's default arrow CSS), built from the existing `Icon` component (`ci:arrow-right-lg`, prev rotated 180°) in a round button matching nearby button chrome (e.g. `PillButton`).
    - `swiper` is added as a new npm dependency.
- **New component: AboutCarouselSlide** (scoped to the About section only, file lives next to `about-section.tsx` — not generalized into `components/ui/` since there's no second confirmed caller yet). Owns the per-photo crop/pan markup (the `absolute`-positioned, oversized `<img>` with percentage top/left offsets) that today's two hardcoded blocks each do slightly differently; each slide passed into Carousel is one `AboutCarouselSlide` instance with its own offset props.
- **About section usage of Carousel**: slides are all 5 currently-available photos in `public/images/home/` — `project-photo-1.jpg`, `project-photo-2.jpg`, `project-photo-3.jpg`, `project-photo-4.jpg`, `about-carousel-photo-2.jpg` — each wrapped in an `AboutCarouselSlide`. `slidesPerView=2` (5 > 2, so the carousel activates rather than falling back to a Static Row), both dots and arrows shown, `loop=true`. Replaces the current two hardcoded `<img>` blocks and the 5 decorative static dots.
    - **Flag for implementation**: `project-photo-1.jpg` is 12.1MB — an order of magnitude larger than the other 4 photos (317KB–1.7MB) and almost certainly not web-optimized. Compress/re-export it before wiring it in, or confirm with Blake whether it should be swapped for a lighter source image.
- **Testimonials section usage of Carousel**: pass `TESTIMONIALS` (rendered as `TestimonialCard`s) as slides, `slidesPerView=3`, `spaceBetween=60`, `showDots=false`, `showArrows=true`, `loop=true`. Carousel's own `slides.length > slidesPerView` check reproduces the previous "more than 3 testimonials" threshold with no separate boolean needed in the section itself.
    - Since testimonial cards are fixed-width (336px), the Carousel instance here is sized so Swiper's numeric `slidesPerView=3` computes to the same 336px-per-slide width the static row already uses, preserving today's visual sizing when the carousel is active.
- **No changes** to the `TESTIMONIALS` data shape, the `TestimonialCard` component's props/markup, or any other homepage section not named above.

## Testing Decisions

- Test type: component-level render/interaction tests via Vitest + `@testing-library/react` (jsdom), matching existing prior art (`src/components/ui/icon.test.tsx`, `src/components/ui/page-hero.test.tsx`, and `SiteHeader`'s behavioral tests from the About Us Page feature).
- Tests assert externally observable output only (which image is rendered/active, presence of active-state class/attribute, click-driven state changes) — never internal component state or unrelated class strings.
- **Hero Image Switcher** gets real behavioral tests: clicking a thumbnail makes it active and updates the large photo; clicking the arrow advances through items and wraps from the last item back to the first; the first item is active on initial render.
- **Carousel** gets prop-driven behavioral tests: `showDots`/`showArrows` toggle whether those controls render; passing `slides.length <= slidesPerView` renders the Static Row (no Swiper markup, no dots/arrows) and passing more slides than `slidesPerView` renders the carousel; advancing past the end with `loop=true` wraps back to the first slide.
- **Testimonials section's carousel branch** is tested at the Carousel seam, not as a separate seam: rendering with ≤3 testimonials produces the Static Row with no Carousel/Swiper markup present; rendering with >3 testimonials produces the Carousel path. No separate `isCarousel` logic exists in the Testimonials section to test directly — it's exercised entirely through Carousel's own threshold behavior.
- **About section's Carousel usage** is tested at the Carousel seam plus a thin check that `AboutSection` passes all 5 photos through — not by re-testing Carousel's internals a second time.
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
- A follow-up `/grill-with-docs` session re-specified the About section's Carousel usage in more depth (component split into `AboutCarouselSlide`, exact photo list, dots/arrows implementation, spacing defaults) and, in doing so, surfaced three reconciliations against the original pass, all resolved above: the About photo count (4 → 5, with a flag on `project-photo-1.jpg`'s oversized file size), `spaceBetween` becoming a configurable prop (default 16) rather than a hardcoded value, so Testimonials' 60px gap still works, and Carousel owning the carousel-vs-Static-Row decision internally rather than each call site computing its own boolean.
- Resolved terminology (`Hero Image Switcher`, `Active Thumbnail`, `Carousel`, `Static Row`) is recorded in the repo's root `CONTEXT.md`; `Static Row`'s definition was generalized in that follow-up session from Testimonials-specific wording to Carousel's general fallback state.
- No ADRs were written for this feature — none of the notable decisions (Swiper scope, loop-vs-stop, Carousel owning its own threshold check) were judged to meet all three ADR criteria (hard-to-reverse, surprising, real trade-off) at spec time.
