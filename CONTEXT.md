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

**Project**:
One finished property Hanson Landscape worked on (e.g. a single backyard patio build). The unit shown on the Portfolio page; each Project has its own detail page and may be tagged with one or more Services.
_Avoid_: Portfolio item, case study, gallery item

**Sector**:
Whether a Project is Residential or Commercial. Exactly one per Project. The only Portfolio filter chips (plus "All Projects").
_Avoid_: Category, market

**Service**:
A kind of work Hanson Landscape performs, as listed in the site nav/footer (e.g. Landscape Design, Landscape Construction, Landscape Maintenance, Landscape Enhancement, Snow & Ice Management). A Project is tagged with one or more Services. Shown on the Project card; searchable; not a filter chip.
_Avoid_: Category, offering

**Project Type**:
A finer description of what a Project physically is (e.g. Lighting & Nightscapes, Water Features, Patio & Hardscape). A Project has zero or more. Searchable; not a filter chip.
_Avoid_: Category, tag (when Service is meant)

**Icon**:
A single-concept, thin/flat glyph — an arrow, phone, house, building, star, shovel, cursor, pencil. Swap-eligible for an Iconify equivalent rendered through the `Icon` component, regardless of the pixel size of its current usage slot.
_Avoid_: Glyph, symbol (when the asset is actually an Illustration, see below)

**Illustration**:
A compound, multi-element, or organic/textured asset — plant/tree/leaf art, multi-shape badges, background textures and glows. Stays a custom SVG; not swap-eligible for an Iconify icon, regardless of the pixel size of its current usage slot.
_Avoid_: Icon, graphic, decoration

**Tree**:
The large tree Illustration on the home page, made of a trunk and many Leaves.
_Avoid_: Plant, graphic

**Leaf**:
One leaf shape on the Tree. Starts as a dot and becomes its leaf shape during Growth. Every Leaf can be moved by Wind.
_Avoid_: Foliage, petal

**Growth**:
The one-time, scroll-driven change of every Leaf from a dot into its leaf shape. Once complete it stays complete, even if the visitor scrolls back up.
_Avoid_: Grow animation, intro animation

**Wind**:
Any motion that rocks a Leaf back and forth about where it attaches to the Tree. Three kinds: Scroll Sway, Scroll Gust, Mouse Wind.
_Avoid_: Breeze, physics, interaction

**Scroll Sway**:
Continuous Wind driven by scroll position; every Leaf rocks a little as the visitor scrolls past the Tree.

**Scroll Gust**:
A one-off Wind kick to a few random Leaves when scroll direction flips.

**Mouse Wind**:
Wind caused by the cursor passing near Leaves, active only after Growth completes and only for visitors with a hovering pointer (mouse or trackpad, not touch). Only Leaves within a set distance of the cursor move; faster cursor movement makes stronger Wind, and Leaves nearer the cursor move more. Leaves swing away from the cursor and settle back with a small wobble.
_Avoid_: Hover effect, cursor interaction
