Status: ready-for-agent
Blocked by: 01-reorganize-shared-components

# SiteHeader solid/transparent variant + active-link nav

## Parent

.scratch/about-us-page/PRD.md

## What to build

`SiteHeader` gains a `variant` prop and route-aware active-link highlighting, so it can serve both the homepage's transparent overlay look and interior pages' solid light-background look:

- New `variant` prop: `"transparent"` (current homepage look — overlay nav, no solid background) or `"solid"` (opaque light background, matching the Figma "Interior Global Header").
- Active-link state is derived from the current route via `usePathname`, not passed in as a prop — this is the one piece of real conditional logic in the About Us page feature.
- The nav link list stays a single source of truth shared between variants; only the container's background/color treatment and the active-link highlight (amber pill background behind the current page's label, per Figma) differ by variant.
- `Home` (`/`) and `About` (`/about`) nav links get real `href`s. `Our Services` (dropdown), `Portfolio`, `Testimonials`, and `Contact Us` remain `href="#"` placeholders.
- Homepage's usage of `SiteHeader` is updated to pass `variant="transparent"` explicitly — homepage visual output is unchanged.

## Acceptance criteria

- [x] `SiteHeader` accepts a `variant` prop with `"transparent"` and `"solid"` values
- [x] Rendering at route `/` marks "Home" active and no other link
- [x] Rendering at route `/about` marks "About" active and no other link
- [x] `variant="solid"` renders the opaque/light-background treatment; `variant="transparent"` renders the current homepage overlay treatment
- [x] "Home" link has `href="/"`, "About" link has `href="/about"`; other nav links remain `href="#"`
- [x] Homepage passes `variant="transparent"` and renders with no visual regression
- [x] New tests cover: variant switch changes rendered output; active-link derivation marks the correct link for a given route; Home/About hrefs are correct

## Blocked by

- 01-reorganize-shared-components — `SiteHeader` must already live at its new `components/layout/` location before this ticket edits it.

## Comments

Implemented — all acceptance criteria above verified (typecheck, test suite, and a live browser check on /about and /). Ready to merge.
