Status: ready-for-agent
Blocked by: 01-prefactor-icon-sets-and-dead-assets

# Services + Process direct-glyph swap

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Swap the plain `<img>`-rendered glyphs in the services and process sections for `<Icon>`, with no component API change.

- Services section: the "Design" service card's pencil/edit glyph (`icon-design.svg`), the "Build" service card's shovel glyph (`shovel-icon.svg`), and the decorative cursor glyph near the service cards (`cursor-arrow.svg`).
- Process section: the diagonal-arrow step glyph (`icon-arrow-diagonal.svg`).

None of these four glyphs has recoverable exact Iconify provenance (their source SVGs carry generic group ids, not a set-prefixed name) — pick the closest available glyph (default `lucide`, or one of the other newly-enabled sets if it's a materially closer match) and verify each visually against the current design in the browser before finalizing.

Note: the "Maintain" service card's plant glyph (`plant-icon.svg`) and the process section's plant/tree step glyphs (`plant-04-icon.svg`, `plant-03-group.svg`, `tree-02-icon.svg`) are explicitly out of scope — they're compound/illustrated assets per the Icon/Illustration boundary and stay custom SVGs.

## Acceptance criteria

- [ ] Services section's "Design" card glyph renders via `Icon`, visually a clear pencil/edit icon at current size and color
- [ ] Services section's "Build" card glyph renders via `Icon`, visually a clear shovel icon at current size and color
- [ ] Services section's decorative cursor glyph renders via `Icon`, visually a clear pointer/cursor icon at current size
- [ ] Process section's diagonal-arrow step glyph renders via `Icon`, visually a clear diagonal arrow at current size and color
- [ ] `plant-icon.svg`, `plant-04-icon.svg`, `plant-03-group.svg`, and `tree-02-icon.svg` are untouched
- [ ] No `<img>` tags remain pointing at `icon-design.svg`, `shovel-icon.svg`, `cursor-arrow.svg`, or `icon-arrow-diagonal.svg`
- [ ] Visual check in the browser confirms no regression on the homepage services or process section

## Blocked by

- 01-prefactor-icon-sets-and-dead-assets — needs the icon-set registry available for whichever set the picked glyphs come from.
