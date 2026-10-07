Status: resolved

# Tree Mouse Wind

## Problem Statement

After Growth completes, the Tree only moves when the visitor scrolls (Scroll Sway, Scroll Gust). Desktop visitors moving the cursor across the Tree get no response, so it feels inert once grown. A viewer suggested the cursor act like wind: pass slowly and nearby Leaves stir a little; sweep fast and they move more.

## Solution

Add **Mouse Wind** (see `CONTEXT.md`): once Growth is complete, the cursor passing near Leaves rocks them about their attachment point. Only Leaves within a set distance move; faster cursor means stronger Wind; nearer Leaves move more. Leaves swing away from the cursor and settle with a small wobble.

## Decisions

1. Mouse Wind is a third independent transform layer per Leaf, beside Scroll Sway and Scroll Gust. All three stack; none are removed. Revisit whether Scroll Gust is redundant on desktop after tuning.
2. Activates when Growth completes. Also active on load if Growth is already complete (page loaded scrolled past the Tree).
3. All Leaves can respond, not just the Scroll Gust pool.
4. Strength: eased speed curve (e.g. sqrt / power2) with a cap (~±14deg, matching Scroll Gust), small dead-zone near zero speed so a resting cursor is still, and falloff with distance from the Leaf's base point. Direction: away from the cursor.
5. Radius is in viewBox units (start ~90, ~10% of Tree width), with the pointer converted to viewBox space via the SVG's screen CTM, so coverage is the same at every screen size.
6. Runs only when `(hover: hover) and (pointer: fine)` matches and reduced-motion is off. No touch support, regardless of width.
7. Hit: inertia kick, then `elastic.out` return to 0deg with a wobble. `overwrite: "auto"` handles a Leaf hit again mid-swing.
8. Rename `physicsLeafIndexes` to `scrollGustPool` (it is the Scroll Gust pool, not a general physics pool).
9. No new dependencies. GSAP `InertiaPlugin` is already registered in `large-tree-svg.tsx`.

## Out of scope

- Touch / drag Wind.
- Removing or retuning Scroll Sway / Scroll Gust.
- Wind sound, trunk movement, Leaves detaching.

## Testing

Pure logic (pointer to viewBox, falloff, speed curve, direction) gets unit tests in `large-tree-svg.logic.test.ts`. Feel and visual behavior are verified by Blake in the browser; no automated browser testing.

## Tickets

See `issues/01` to `issues/05`.
