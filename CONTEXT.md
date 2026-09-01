# Hanson Landscape Site

Marketing site for Hanson Landscape (hansonlandscape.com), rebuilt in Next.js. Single context — one site, no bounded sub-domains.

## Language

**Hero Image Switcher**:
The component in the homepage hero that shows one large photo plus a row of thumbnails; clicking a thumbnail or the cycle arrow changes which photo is large. Plain React state, no carousel library.
_Avoid_: Hero carousel, hero gallery, image picker

**Active Thumbnail**:
The thumbnail in the Hero Image Switcher matching the currently-displayed large photo. Rendered translated -12px on the Y axis with a 1px `#f89c1c` border.
_Avoid_: Selected thumbnail, current image

**Carousel**:
The reusable, Swiper.js-backed component for cycling through a set of slides, with optional dots and prev/next arrows. Owns its own activation decision: renders as itself only when its slide count exceeds its configured `slidesPerView`; otherwise renders as a Static Row. Used by the Family-Owned section and (conditionally) the Testimonials section.
_Avoid_: Slider, gallery

**Static Row**:
The non-carousel rendering state of the Carousel component: slides laid out in a single flex row with no Swiper involved. Used whenever a Carousel instance's slide count doesn't exceed its configured `slidesPerView` (e.g. Testimonials at 3 or fewer cards, or the Family-Owned section below its own threshold).
_Avoid_: Testimonial grid, testimonial list

**Icon**:
A single-concept, thin/flat glyph — an arrow, phone, house, building, star, shovel, cursor, pencil. Swap-eligible for an Iconify equivalent rendered through the `Icon` component, regardless of the pixel size of its current usage slot.
_Avoid_: Glyph, symbol (when the asset is actually an Illustration, see below)

**Illustration**:
A compound, multi-element, or organic/textured asset — plant/tree/leaf art, multi-shape badges, background textures and glows. Stays a custom SVG; not swap-eligible for an Iconify icon, regardless of the pixel size of its current usage slot.
_Avoid_: Icon, graphic, decoration
