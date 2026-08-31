Status: ready-for-agent
Blocked by: None — can start immediately

# Icon/Illustration glossary entry

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Add a glossary entry to `CONTEXT.md`'s `## Language` section recording the Icon-vs-Illustration boundary established during this feature's planning, so future work applying an Iconify swap doesn't have to re-derive the same judgment call.

The rule: a single-concept, thin/flat glyph (an arrow, a phone, a house, a building, a star, a shovel, a cursor, a pencil) counts as an **Icon** and is swap-eligible for Iconify. A compound, multi-element, or organic/textured asset (plant/tree/leaf illustrations, multi-shape badges, background textures and glows) counts as an **Illustration** and stays a custom SVG — regardless of the pixel size of its current usage slot. Follow the existing glossary entry format in `CONTEXT.md` (term, definition, "_Avoid_" line for terms not to use).

## Acceptance criteria

- [ ] `CONTEXT.md`'s `## Language` section includes an "Icon" and/or "Illustration" glossary entry matching the existing entry format (bold term, definition, `_Avoid_` line)
- [ ] The entry captures the boundary rule (single-concept glyph vs. compound/organic/textured asset) and notes that usage-slot size doesn't override it
- [ ] No other content in `CONTEXT.md` is altered

## Blocked by

None — can start immediately.
