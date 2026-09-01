Status: ready-for-agent
Blocked by: None — can start immediately

# Reusable Carousel component

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

A new reusable `Carousel` component under `components/ui/`, backed by Swiper.js, not yet wired into any page section (that happens in the tickets that follow, which both depend on this one).

- Adds `swiper` as a new npm dependency.
- Props: `slides: ReactNode[]`, `slidesPerView: number`, `showDots?: boolean` (default `true`), `showArrows?: boolean` (default `true`), `loop?: boolean` (default `false`), `autoplay?: boolean | number` (default `false`), `spaceBetween?: number` (default `16`).
- The component owns the carousel-vs-Static-Row decision itself: renders as a Swiper carousel only when `slides.length > slidesPerView`; otherwise renders a plain static flex row — no Swiper mounted, no dots, no arrows. Callers never compute this themselves.
- Advancing always moves one slide at a time (`slidesPerGroup: 1`, fixed, not a prop).
- Dots are rendered via Swiper's custom `renderBullet`, reproducing the site's existing bullet styling exactly (`size-2 rounded-full`, active `bg-forrest`, inactive `bg-[#d9d9d9]`) rather than reskinning Swiper's default bullet CSS.
- Prev/next arrows are custom nav elements built from the existing `Icon` component (`ci:arrow-right-lg`, prev rotated 180°) in a round button matching nearby button chrome (e.g. `PillButton`) — not Swiper's default arrow CSS.
- `showDots`/`showArrows` independently control whether those controls render at all (only relevant when the carousel is active — the Static Row never shows either).
- `loop=true` wraps around at both ends (advancing past the last slide returns to the first, and vice versa).

## Acceptance criteria

- [ ] `Carousel` component exists under `src/components/ui/`
- [ ] Accepts `slides`, `slidesPerView`, `showDots`, `showArrows`, `loop`, `autoplay`, `spaceBetween` props, with the defaults listed above
- [ ] Renders a Static Row (plain flex row, no Swiper, no dots/arrows) when `slides.length <= slidesPerView`
- [ ] Renders as a Swiper carousel when `slides.length > slidesPerView`, spaced by `spaceBetween`, advancing one slide at a time
- [ ] `showDots={false}` renders no dot controls; `showArrows={false}` renders no prev/next arrows (when the carousel is active)
- [ ] Dots use the exact existing bullet styling classes; arrows use the `Icon` component with `ci:arrow-right-lg`
- [ ] With `loop=true`, advancing past the last slide wraps to the first (and reverse for prev)
- [ ] `swiper` added to `package.json` dependencies
- [ ] Behavioral tests: Static Row vs carousel rendering by slide count; dots/arrows visibility toggles correctly per props; wrap-around behavior with `loop=true`
- [ ] Not yet imported/used by any homepage section (that's the next tickets)

## Blocked by

None — can start immediately.
