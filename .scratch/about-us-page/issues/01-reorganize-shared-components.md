Status: ready-for-agent
Blocked by: None — can start immediately

# Prefactor: reorganize shared components into layout/, sections/, ui/

## Parent

.scratch/about-us-page/PRD.md

## What to build

A pure reorganization of existing components so folder location reflects actual reuse scope, with no behavior or visual change to the homepage:

- `SiteHeader`, `ServicesNavDropdown`, `SiteFooter`, `FooterColumn` move from `components/home/` to `components/layout/` (site-wide chrome).
- `WhyChooseUsSection`, `CtaSection` move from `components/home/` to `components/sections/` (full sections reused verbatim across multiple pages).
- `StatCard`, `PartnerLogos` move from `components/home/` to `components/ui/` (reusable presentational primitives, joining `PillButton`, `ArrowLink`, `SectionIntro`, `Icon`).
- All import paths across the codebase (including the homepage's `page.tsx` and any component that imports these) are updated to the new locations.
- No markup, styling, props, or content changes to any moved component — this is a location-only change.

## Acceptance criteria

- [x] `SiteHeader`, `ServicesNavDropdown`, `SiteFooter`, `FooterColumn` live under `src/components/layout/`
- [x] `WhyChooseUsSection`, `CtaSection` live under `src/components/sections/`
- [x] `StatCard`, `PartnerLogos` live under `src/components/ui/`
- [x] `src/components/home/` retains only homepage-only sections (`HeroSection`, `TrustBar`, `ServicesSection`, `AboutSection`, `TestimonialsSection`, `PortfolioBento`, `ProcessSection`, `ConsultationSection`)
- [x] Homepage renders identically to before (visual no-op)
- [x] Existing test suite (`icon.test.tsx`) still passes
- [x] No leftover imports pointing at the old `components/home/` paths for the moved components

## Blocked by

None — can start immediately.

## Comments

Implemented — all acceptance criteria above verified (typecheck, test suite, and a live browser check on /about and /). Ready to merge.
