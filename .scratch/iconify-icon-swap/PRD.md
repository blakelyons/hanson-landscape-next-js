Status: ready-for-agent

# Iconify Icon Swap

## Problem Statement

The homepage ships a large number of individually-exported SVG files under `public/images/home/` for small UI glyphs (arrows, phone, house, building, star, shovel, cursor). Several of these are literal 1:1 exports of existing Iconify icons — their `<g id>` attributes still carry the original set/icon name (e.g. `mingcute--building-6-line`, `proicons--phone`, `ci--arrow-right-lg`) — so the site is shipping and maintaining static duplicates of icons that already exist in a registry it has runtime access to via `@iconify/react`. Every future style tweak (stroke width, weight) to one of these glyphs means re-exporting and re-committing a file instead of changing one line of config. Two of the exported files (`icon-phone.svg`, `cursor-pointer.svg`) aren't even referenced anywhere in the codebase — dead weight from a past export pass.

## Solution

Swap every homepage SVG that is a genuine single-concept glyph (an arrow, a phone, a house, a building, a star, a shovel, a cursor, a pencil) for an Iconify icon rendered through the existing `Icon` component (`src/components/ui/icon.tsx`) and its icon-set registry (`src/lib/icon-config.ts`), which today only enables the `lucide` set. `icon-config.ts` gains additional set entries (`mingcute`, `streamline-ultimate`, `proicons`, `ci`) so icons with a recovered exact provenance render pixel-identical to today, with `lucide` used for glyphs picked fresh.

Compound, multi-element, or heavily-illustrated SVGs (badges, plant/tree/leaf art, background textures and glows) are explicitly left as custom SVG assets — there is no honest single-glyph Iconify equivalent for them, and forcing one would be a visual downgrade, not a like-for-like swap. This Icon/Illustration boundary is recorded as a new glossary term in `CONTEXT.md` so future work applies the same test without re-litigating it.

`ArrowLink` and `PillButton` — the two shared components that currently accept an `icon: string` image-URL prop and render `<img src={icon}>` — are the only components gaining real logic: their `icon` prop is replaced with `iconName: string` plus an optional `iconSet?: IconSet` (defaulting to `lucide`), rendering `<Icon name={iconName} set={iconSet} />` internally. Every other touched file is a literal `<img src="...">` → `<Icon ... />` swap with no branching.

Two unreferenced files (`icon-phone.svg`, `cursor-pointer.svg`) are deleted as dead assets. Every swapped SVG's source file is deleted once its Iconify replacement is verified visually in the browser.

## User Stories

1. As a site visitor, I want the small arrow, phone, house, building, star, shovel, cursor, and pencil glyphs across the homepage to look the same as before, so that the swap is invisible to me.
2. As a site visitor on a slow connection, I want the icon glyphs to keep rendering correctly, so that swapping their delivery mechanism doesn't introduce broken images.
3. As a developer maintaining the icon system, I want simple single-concept glyphs (arrows, phone, house, building, star, shovel, cursor, pencil) sourced from Iconify via the existing `Icon` component, so that changing an icon's weight or style is a config change, not an asset re-export.
4. As a developer maintaining the icon system, I want icons with a recoverable exact Iconify origin (baked into the original SVG's `<g id>`) to render from their original set (`mingcute`, `streamline-ultimate`, `proicons`, `ci`), so that the swap doesn't silently change any icon's appearance.
5. As a developer maintaining the icon system, I want icons with no recoverable origin to fall back to the `lucide` set (the only set already enabled), so that new/unresolved glyphs don't require guessing a set that may not exist.
6. As a developer maintaining the icon system, I want `icon-config.ts` to keep its existing one-line-per-set structure when new sets are added, so that enabling a set stays a trivial, well-precedented change.
7. As a developer maintaining `ArrowLink` and `PillButton`, I want their `icon` prop replaced by `iconName` + optional `iconSet`, so that these shared components speak the same Icon-component vocabulary as every direct `<Icon />` usage elsewhere, instead of a special-cased image-URL string.
8. As a developer maintaining `ArrowLink` and `PillButton`, I want every existing call site of these components updated in the same change, so that there is no in-between state where some call sites pass a URL and others pass an icon name.
9. As a developer working on any section that uses a compound/illustrated icon (plant, tree, leaf, badge, background texture/glow), I want those assets left alone as custom SVGs, so that the site doesn't ship a visually degraded generic-glyph stand-in for art that has no equivalent in a line-icon set.
10. As a developer extending the site, I want the Icon-vs-Illustration boundary (single-concept glyph vs. compound/decorative art) recorded as a glossary term in `CONTEXT.md`, so that the next person adding an icon doesn't have to re-derive the same judgment call from scratch.
11. As a developer maintaining the codebase, I want the two dead, unreferenced SVGs (`icon-phone.svg`, `cursor-pointer.svg`) deleted, so that `public/images/home/` doesn't accumulate assets nothing points to.
12. As a developer maintaining the codebase, I want every swapped-out SVG file deleted from `public/images/home/` once its Iconify replacement is verified, so that the asset folder doesn't carry duplicate, unused copies of icons now rendered from Iconify.
13. As a developer reviewing this change, I want git history (not files left on disk) to be the rollback mechanism for swapped icons, so that `public/images/home/` reflects only what the site actually still uses.
14. As a developer maintaining `ArrowLink`/`PillButton`, I want a render test asserting each renders an `<Icon>` with the given `set`/`name` (not an `<img>`) given the new props, so that a future refactor can't silently regress the prop contract without a failing test.

## Implementation Decisions

- **`icon-config.ts`**: add `mingcute`, `streamlineUltimate` (→ prefix `streamline-ultimate`), `proicons`, and `ci` entries to `ICON_SETS`, alongside the existing `lucide`. `DEFAULT_ICON_SET` stays `lucide`.
- **`ArrowLink`**: replace the `icon: string` prop with `iconName: string` and an optional `iconSet?: IconSet` (default `lucide`). Internally renders `<Icon name={iconName} set={iconSet} />` in place of the current `<img src={icon} />`. `iconSize`/`iconWidth`/`iconHeight` props are unchanged and continue to control the rendered dimensions.
- **`PillButton`**: same change as `ArrowLink` — `icon: string` → `iconName: string` + optional `iconSet?: IconSet`, rendering `<Icon>` instead of `<img>`. `iconSize` unchanged.
- **Direct `<img>` → `<Icon>` swaps** (no component API change, just the element and its wrapper sizing): `icon-building.svg`, `icon-house.svg`, `arrow-icon-lg-hero.svg`/`arrow-icon-lg-amber.svg`/`arrow-icon-lg-green.svg`, `icon-arrow-diagonal.svg`, `icon-design.svg`, `shovel-icon.svg`, `cursor-arrow.svg`, `star-icon.svg` (×5 in the testimonials star row).
- **`ArrowLink`/`PillButton` call-site swaps** (from a URL string to `iconName`/`iconSet`): the `arrow-icon-learn-more.svg`, `arrow-icon-view-all.svg`, `arrow-icon-view-project.svg`, `arrow-icon-discover-more.svg`, and `arrow-icon-cta.svg` call sites.
- **Set/name assignment**:
    - `icon-building.svg` → `mingcute:building-6-line` (exact provenance recovered from the source SVG's group id).
    - `icon-house.svg` → `streamline-ultimate:house-1` (exact provenance recovered).
    - `arrow-icon-lg-hero.svg`, `arrow-icon-lg-amber.svg`, `arrow-icon-lg-green.svg` → `ci:arrow-right-lg` (exact provenance recovered; same glyph, three call sites/colors).
    - `icon-arrow-diagonal.svg`, `icon-design.svg`, `shovel-icon.svg`, `cursor-arrow.svg`, `star-icon.svg`, and the plain-`arrow-right`-shaped call sites (`arrow-icon-learn-more.svg`, `arrow-icon-view-all.svg`, `arrow-icon-view-project.svg`, `arrow-icon-discover-more.svg`) and the phone/call glyph (`arrow-icon-cta.svg`) have no recoverable provenance; each gets the closest available glyph (`lucide` by default, or one of the newly-enabled sets if it produces a materially closer visual match), picked and visually verified against the current design during implementation rather than guessed in advance.
    - Existing color treatment (each icon's current fixed stroke/fill color per call site, e.g. amber vs. green arrow variants) is preserved via CSS `color` (since Iconify icons default to `currentColor`) matching each call site's current hardcoded hex.
- **Left as custom SVG, unchanged** — compound/illustrated assets excluded from this swap: `about-tree.svg`, `bg-glow.svg`, `bg-glow-amber.svg`, `bg-topo-contours.svg`, `island-shadow.svg`, `leaf-particles.svg`, `leaves.svg`, `page-hero-leaves-1.svg`…`page-hero-leaves-4.svg`, `plant-icon.svg`, `plant-03-group.svg`, `plant-04-icon.svg`, `plant-vector-hero.svg`, `plant-vector-standalone.svg`, `process-line.svg`, `tree-02-icon.svg`, `icon-expert-landscaping.svg`, `icon-reliable-support.svg`.
- **Deletions**: `icon-phone.svg` and `cursor-pointer.svg` are deleted immediately (confirmed dead, referenced nowhere in `src/`). Every other swapped SVG (the "Direct `<img>` → `<Icon>`" and "`ArrowLink`/`PillButton` call-site" lists above) is deleted from `public/images/home/` once its Iconify replacement is confirmed rendering correctly in the browser.
- **Domain glossary**: `CONTEXT.md` gains an "Icon" / "Illustration" (or equivalent naming) glossary entry under `## Language` capturing the boundary rule used throughout this spec: a single-concept, thin/flat glyph counts as an Icon (swap-eligible); a compound, multi-element, or organic/textured asset counts as an Illustration (stays a custom SVG), regardless of the pixel size of its current usage slot.

## Testing Decisions

- Good tests here assert externally observable rendered output (which `Icon` `set`/`name` gets rendered, whether an `<img>` is absent) — never internal component state.
- `ArrowLink` and `PillButton` are the only components gaining real conditional/parametric logic in this feature (a new prop shape driving which `Icon` renders) and are the one test seam for this spec: update/add render tests (Vitest + `@testing-library/react`, jsdom — the established seam in this codebase, prior art: `src/components/ui/icon.test.tsx`) asserting each component renders an `Icon` with the passed `iconName`/`iconSet` rather than an `<img>`.
- Every other touched file (hero-section, services-section, process-section, about-section, why-choose-us-section, cta-section, testimonials-section, portfolio-bento) is a literal element swap with no branching — consistent with this repo's precedent of not adding tests to moved-but-unmodified section components (see the About Us Page spec's treatment of `WhyChooseUsSection`/`CtaSection`), these are not newly tested.
- `Icon` (`icon.tsx`) itself is unchanged in behavior by this feature (only `icon-config.ts`'s registry grows) — its existing smoke test is not expected to need changes.
- No new test infrastructure is introduced.

## Out of Scope

- Any icon set beyond `lucide`, `mingcute`, `streamline-ultimate`, `proicons`, and `ci` — no other sets are enabled unless a glyph pick during implementation genuinely requires one.
- Re-illustrating or replacing any compound/illustrated asset (plant, tree, leaf, badge, background texture/glow) with an Iconify equivalent — explicitly excluded per the Icon/Illustration boundary above.
- Any visual redesign of icon sizing, spacing, or color beyond preserving the current look.
- Any page other than the homepage — this spec only covers `public/images/home/` and the homepage components that reference it.
- Introducing local/bundled icon packages — the existing `Icon` component resolves icons through Iconify's runtime API, and this spec doesn't change that architecture.
- A general audit or cleanup of every asset under `public/images/home/` beyond the specific dead files identified (`icon-phone.svg`, `cursor-pointer.svg`) and the files this swap directly replaces.

## Further Notes

- This spec was produced from an interactive planning session (`/grill-with-docs` → `grilling` skill) that inspected every candidate SVG's markup (group ids, path shapes, fill/stroke usage) to establish provenance and complexity, confirmed the Icon-vs-Illustration scope boundary, the multi-set-vs-lucide-only tradeoff, the `ArrowLink`/`PillButton` API shape, and the dead-asset/file-deletion policy with the developer one decision at a time.
- Exact `set:name` picks for glyphs without recovered provenance are a during-implementation verification step (visual comparison in the browser), not a spec-time guess — the spec fixes the *decision process*, not a hardcoded final icon name that risks being wrong.
- The recovered-provenance icon ids (`mingcute--building-6-line`, `streamline-ultimate--house-1`, `proicons--phone`, `ci--arrow-right-lg`) are strong evidence the original design file was assembled by exporting Iconify icons directly into Figma — worth keeping in mind for any future asset audit on other pages (About, Portfolio, Contact) built from the same design file.
