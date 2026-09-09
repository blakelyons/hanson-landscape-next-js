Status: ready-for-agent

# Tree Leaf Growth & Wind Animation

## Problem Statement

The tree Illustration in the Family-Owned (About) section renders as a static, flattened `<img src="/images/home/about-tree.svg">`. It's inert — no matter how a visitor scrolls into the section, the tree just sits there as a flat picture, which undersells the "20+ years growing landscapes" brand story the section's copy is making right next to it. There's no way to give the Illustration any life or reinforce the "grown, family-built" feeling with a static raster/vector image alone.

Separately, the site's owner wants to try this as an experiment rather than commit blind — the specific wind-motion "feel" (deterministic scroll-scrub vs. physics-driven bursts vs. a blend) is genuinely unknown until it's built and scrolled through, so the solution needs to stay cheaply tunable rather than hard-coded to one approach.

## Solution

Replace the flat `<img>` with the tree rendered as inline SVG through the existing `LargeTreeSvg` component (`src/components/ui/large-tree-svg.tsx`), so its 110 individual leaf-clump paths become independently animatable elements.

Each leaf clump starts as a tiny dot at its base (the point where it attaches toward the trunk/branches), rendered that way by default with no animation dependency. When the About section scrolls to 25% down the viewport, GSAP's MorphSVGPlugin morphs each dot into its full leaf-clump shape, staggered and randomized so the canopy fills in like it's growing rather than popping in all at once.

Once fully grown, continued scrolling drives a wind-sway effect on the leaves, anchored at each leaf's base point so it rotates like it's still attached to the branch. This sway ships as three interchangeable implementations behind one config constant (`WIND_MODE`), so the feel can be swapped without touching the animation wiring:

- `"scrub"` — deterministic, per-leaf randomized sine sway driven 1:1 by scroll position (freezes the instant scrolling stops).
- `"impulse"` — scroll-triggered random Physics2D/InertiaPlugin impulses on a subset of leaves that settle on their own over time, independent of further scrolling.
- `"hybrid"` (default) — the scrub sway as a constant base layer, with impulse-driven gusts layered on top.

The whole effect degrades gracefully: it's skipped entirely (tree renders fully-grown, static) for `prefers-reduced-motion`, and physics-heavy modes are forced down to `"scrub"` on small/mobile viewports regardless of the configured `WIND_MODE`.

## User Stories

1. As a homepage visitor scrolling to the About section, I want the tree's leaves to visibly grow in rather than being static, so that the section feels alive and reinforces the "grown over 20+ years" story.
2. As a homepage visitor, I want the leaves to grow in a staggered, randomized order (not all at once, not in a mechanical left-to-right sweep), so that the growth reads as organic rather than a scripted wipe.
3. As a homepage visitor, I want the growth to begin once the About section has scrolled to roughly 25% down my viewport, so that it triggers naturally as the section comes into view rather than firing too early or too late.
4. As a homepage visitor, I want the growth to happen once and stay grown (no reverting to dots if I scroll back up past the section), so that the tree doesn't flicker in and out as I scroll around near the boundary.
5. As a homepage visitor who continues scrolling past the About section, I want the leaves to sway as if blown by wind, so that the tree keeps feeling alive rather than freezing solid once grown.
6. As a homepage visitor, I want each leaf's sway to pivot from its base (where it meets the branch), not its center, so that the motion reads as a leaf attached to a twig rather than a floating shape.
7. As a homepage visitor on a fast, uninterrupted scroll, I want the wind effect to feel randomized across leaves (not all leaves swaying in lockstep), so that it doesn't look like a single repeating loop.
8. As a homepage visitor who stops scrolling mid-sway in the default (hybrid) mode, I want at least some leaves to keep settling briefly via their own momentum, so that the wind doesn't feel like it's rigidly tethered to my scrollbar.
9. As a homepage visitor with `prefers-reduced-motion` enabled, I want the tree to render fully grown and static with no morph or sway animation at all, so that the page respects my motion preference.
10. As a homepage visitor on a phone or small viewport, I want the wind effect to run in its cheapest form regardless of the configured default, so that the animation doesn't tax my device's battery or cause jank.
11. As a homepage visitor on a slow connection, I want the tree to already appear in its "bare, dots-only" starting state on first paint, so that I never see a flash of fully-grown leaves that then shrink back down once the animation script loads.
12. As a developer, I want `LargeTreeSvg` to be the only component that becomes a client component for this feature, so that `about-section.tsx` and the rest of the page tree stay server components with no unrelated behavior change.
13. As a developer, I want a single `WIND_MODE` constant (`"scrub" | "impulse" | "hybrid"`) that controls which sway implementation is active, so that I can compare the three approaches or roll back to the cheapest one without touching the surrounding wiring.
14. As a developer, I want a `PHYSICS_LEAF_COUNT` constant controlling how many leaves get a real Physics2D/InertiaPlugin simulation in `"impulse"`/`"hybrid"` modes, so that I can trade visual density against performance without code changes.
15. As a developer, I want each leaf's base (attachment) point computed once by a small geometry script rather than hand-placed across 110 paths, so that adding/adjusting leaves doesn't require manually eyeballing coordinates.
16. As a developer, I want the base-point geometry and the wind-mode-resolution logic (config + `prefers-reduced-motion` + viewport size → effective mode) exposed as small, pure, framework-agnostic functions, so that they're unit-testable without mounting the SVG, GSAP, or a browser.
17. As a developer, I want per-leaf `transform-origin` set at runtime from the precomputed base points (not baked into the SVG markup as wrapper groups), so that the SVG source file itself doesn't need structural changes beyond what the geometry script outputs as data.
18. As a developer maintaining the site, I want the existing 110 leaf-clump paths (`Vector` through `Vector_110`) treated as the atomic animatable unit, so that no manual re-splitting of the tree artwork into individual leaflets is required (no source vector file exists to re-export cleanly from).
19. As a developer, I want the dot-vs-grown default visual state expressed as plain inline styles in the component's JSX (not set imperatively by GSAP on mount), so that the correct starting state is guaranteed even before any script executes.
20. As a developer, I want the growth trigger to use `ScrollTrigger` with `start: "top 25%"` and `toggleActions: "play none none none"`, so that the behavior matches the "grows once, stays grown" product decision exactly.

## Implementation Decisions

- **Component boundary**: `LargeTreeSvg` (`src/components/ui/large-tree-svg.tsx`) becomes a `"use client"` component and owns all GSAP registration, refs, `ScrollTrigger` instances, and the wind-mode logic internally. `about-section.tsx` stays a server component; its only change is swapping the `<img alt="" ... src="/images/home/about-tree.svg" />` for `<LargeTreeSvg />` in the same wrapping `<div>`.
- **Leaf unit**: each of the 110 existing `Vector`/`Vector_N` paths in the tree SVG is one animatable "leaf." No splitting of clumps into individual leaflets — decided against due to no source vector file to re-export from and low expected visual payoff versus manual-authoring risk.
- **Base circle + geometry**: a small one-off Node script (dev-time tool, not part of the shipped runtime bundle) parses each leaf path's `d` and computes a base point — the bbox point nearest the trunk/branch path. Its core geometry math lives in a pure, framework-agnostic function (see Testing Decisions) so both the script and tests can call it. Output (per-leaf `{id, x, y}`) is embedded as a static data const consumed at runtime — not recomputed in the browser.
- **Runtime anchoring**: per-leaf `transform-origin` is set imperatively at runtime (in a `useGSAP`/effect) from the precomputed base-point data, applied directly to each leaf's own path/circle element. No `<g>` wrapper restructuring of the SVG.
- **Default visual state (no-flash)**: JSX renders each leaf's dot at `opacity: 1` and its full leaf shape at `opacity: 0` via inline `style`, unconditionally, before any JS runs. GSAP only ever animates forward from that baked default; no imperative `set()` needed on mount to establish the starting state.
- **Growth trigger**: one `ScrollTrigger` on the About section (or tree wrapper) with `start: "top 25%"`, `toggleActions: "play none none none"` — plays forward once the first time the trigger point is crossed, never reverses or replays.
- **Growth animation**: staggered, randomized `MorphSVGPlugin` timeline morphing each leaf's dot shape into its full clump shape; stagger amount/order randomized per leaf so growth doesn't read as a mechanical sweep.
- **Wind phase — three modes behind `WIND_MODE: "scrub" | "impulse" | "hybrid"`** (default `"hybrid"`):
  - `"scrub"`: a `ScrollTrigger` with `scrub: true` drives a deterministic per-leaf rotation (sine-based wobble), phase/amplitude randomized per leaf via seeded/randomized offsets. No physics plugins involved — motion is a pure function of scroll position and freezes instantly when scrolling stops.
  - `"impulse"`: scroll crossing thresholds (or direction changes) fires a randomized `Physics2DPlugin`/`InertiaPlugin` impulse on a leaf, which then settles under its own simulated momentum independent of further scrolling. Not scrub-driven.
  - `"hybrid"`: runs `"scrub"` as a constant base layer, with `"impulse"`-style gusts periodically layered on top of a subset of leaves.
  - Only a randomly-selected subset of leaves (size controlled by a `PHYSICS_LEAF_COUNT` constant) receive real Physics2D/Inertia simulation in `"impulse"`/`"hybrid"` modes — running all 110 simultaneously is unnecessary simulation cost for a subset-driven effect that reads the same visually.
- **Accessibility/perf fallbacks**:
  - `prefers-reduced-motion: reduce` — skip growth and wind entirely; render the tree in its fully-grown, static end-state.
  - Small/mobile viewports — force effective `WIND_MODE` to `"scrub"` regardless of the configured constant (cheapest mode, no per-frame physics ticks).
- **Plugins**: `MorphSVGPlugin`, `Physics2DPlugin`, `PhysicsPropsPlugin`, `InertiaPlugin`, and `ScrollTrigger` — all present in the installed `gsap@3.15.0` at no license cost (formerly Club GSAP-exclusive plugins, now bundled free).

## Testing Decisions

- A good test here only exercises pure input → output behavior — no DOM, no GSAP, no browser. GSAP timeline wiring, ScrollTrigger instances, and the actual morph/physics visuals are not unit-tested; they're verified by hand in a running browser (scroll through the About section, toggle `WIND_MODE`, toggle OS-level reduced-motion, resize to a mobile viewport).
- One seam, one module: a small framework-agnostic logic file (e.g. `large-tree-svg.logic.ts`, colocated with `large-tree-svg.tsx`) exporting the two pure functions the plan depends on:
  - The base-point geometry function (path `d` + trunk path `d` → nearest base point), reused by both the one-off dev script and its test.
  - The wind-mode resolution function (`{configuredMode, prefersReducedMotion, isMobileViewport}` → effective mode), reused by both the component and its test.
- No prior art in-repo: this repo has no test files yet (`vitest` and `vitest.config.mts` exist and are configured — `jsdom` environment, path alias `@` → `src` — but nothing has been written against them). This feature's logic module is the first.

## Out of Scope

- Splitting/redrawing the 110 leaf-clump paths into individual leaflet sub-paths.
- Any change to `about-section.tsx` layout, copy, stats, or the existing photo `Carousel` — only the tree `<img>` is replaced.
- Modifying or removing the existing `public/images/home/about-tree.svg` asset file itself.
- Pixel-perfect or deterministic cross-device matching of the physics-driven wind motion — it's inherently randomized/approximate by design, not a specced visual target.
- Server-rendering or SSR-streaming the animated states — the animated portion of `LargeTreeSvg` is client-only; only its default (dots-visible, leaves-hidden) markup is what SSR produces.

## Further Notes

- An external "Inspiration" folder (outside this repo, under the client's project directory) contains `hanson-tree-animation.js` and `hanson-tree-growth.svg` — an earlier, unrelated concept: a whole seedling-grows-into-a-full-tree `MorphSVGPlugin` timeline (trunk/roots/branches/canopy clusters morphing in sequence) plus a falling-leaves finale, built against a completely different SVG id scheme (`#tree-canopy-N`, `#seedling-trunk`, etc.) than this repo's `large-tree-svg.tsx`. It's not reused by this spec — flagged only as prior client-side exploration for awareness, in case "the tree animation" comes up in conversation and gets conflated with this feature.
- This is explicitly an experiment Blake wants to try rather than a committed final design — hence `WIND_MODE` and `PHYSICS_LEAF_COUNT` as tunable consts rather than inlined choices, so the feel can be adjusted or the whole wind phase disabled without a follow-up refactor.
