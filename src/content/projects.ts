// Portfolio data. Typed file today; the shape is deliberately CMS-friendly so
// a headless CMS can replace this module later without touching components
// (they only read `Project` fields, never file paths).
//
// Real Project photos live in public/images/portfolio/{slug}/ — see
// `portfolioImage` below. Folder name === slug === URL segment.

export const SECTORS = ["residential", "commercial"] as const;
export type Sector = (typeof SECTORS)[number];

export const SERVICES = [
    "Landscape Design",
    "Landscape Construction",
    "Landscape Maintenance",
    "Landscape Enhancement",
    "Snow & Ice Management",
] as const;
export type Service = (typeof SERVICES)[number];

export const PROJECT_TYPES = [
    "Patio & Hardscape",
    "Outdoor Living",
    "Plantings",
    "Lighting & Nightscapes",
    "Water Features",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ProjectImage = { src: string; alt: string };

/** Official Hanson photos live in public/images/uploads/{construction,enhancement}/{name}.webp */
export function uploadImage(folder: "construction" | "enhancement", name: string): string {
    return `/images/uploads/${folder}/${name}.webp`;
}

/**
 * A Project we only have a photo for: no title, location or detail page yet. Shown
 * on the Portfolio as an unlinked image card; swap for a full `Project` once its
 * info is collected.
 */
export type PhotoOnlyProject = {
    slug: string;
    sector: Sector;
    cover: ProjectImage;
    photoOnly: true;
};

export type PortfolioItem = Project | PhotoOnlyProject;

export type Project = {
    photoOnly?: false;
    slug: string;
    title: string;
    location: string;
    sector: Sector;
    services: Service[];
    projectTypes: ProjectType[];
    year: number;
    summary: string;
    challenge: string;
    solution: string;
    testimonial?: { quote: string; name: string; location: string };
    cover: ProjectImage;
    gallery: ProjectImage[];
};

export const SECTOR_LABELS: Record<Sector, string> = {
    residential: "Residential",
    commercial: "Commercial",
};

/** `portfolioImage("oak-hill-residence", "cover.jpg")` -> `/images/portfolio/oak-hill-residence/cover.jpg` */
export function portfolioImage(slug: string, file: string): string {
    return `/images/portfolio/${slug}/${file}`;
}

// --- Placeholder content ---------------------------------------------------
// Project names, locations and text below are stand-ins until real Project info is
// collected. Photos are REAL (carried over from the legacy site's gallery pages in
// public/images/portfolio/legacy/{category}/) but not tied to a specific property: the
// old site only had category galleries (residential, commercial, maintenance, lighting,
// water features), so each placeholder Project borrows photos from its matching gallery.
// Swap a Project's `cover`/`gallery` for `portfolioImage(slug, "cover.jpg")` etc. once
// its own folder exists.

const LEGACY_PHOTO_FILES = {
    residential: [
        "residential3.jpg",
        "residential_2.jpg",
        "residential.jpg",
        "51.jpg",
        "31.jpg",
        "21.jpg",
        "41.jpg",
        "61.jpg",
        "11.jpg",
    ],
    commercial: [
        "img_2232.jpg",
        "2-1.jpg",
        "construction1.jpg",
        "construction2.jpg",
        "commerciallandscape.jpg",
        "commerciallandscape2.jpg",
        "download-6.jpg",
        "download-8.jpg",
        "download-7.jpg",
        "download-1.jpg",
    ],
    maintenance: [
        "logan-chicago-and-arlington-013.jpg",
        "logan-chicago-and-arlington-006.jpg",
        "droid-pics-222.jpg",
        "droid-pics-223.jpg",
        "logan-chicago-and-arlington-015.jpg",
        "logan-chicago-and-arlington-005.jpg",
    ],
    lighting: [
        "dsc_1105.jpg",
        "nightscape-11.jpg",
        "hansonlandscape_.jpg",
        "nightscape-21.jpg",
        "hansonlandscape_3.jpg",
        "nightscape-3.jpg",
        "hansonlandscape_2.jpg",
    ],
    "water-features": ["9.jpg", "7.jpg", "3.jpg", "6.jpg", "5.jpg", "2.jpg", "1.jpg", "4.jpg"],
} as const;

type LegacyGallery = keyof typeof LEGACY_PHOTO_FILES;

function galleryFor(project: { sector: Sector; services: Service[]; projectTypes: ProjectType[] }): LegacyGallery {
    if (project.projectTypes.includes("Water Features")) return "water-features";
    if (project.projectTypes.includes("Lighting & Nightscapes")) return "lighting";
    if (project.services.includes("Landscape Maintenance")) return "maintenance";
    return project.sector === "commercial" ? "commercial" : "residential";
}

function placeholderImages(title: string, offset: number, gallery: LegacyGallery) {
    const files = LEGACY_PHOTO_FILES[gallery];
    const pick = (i: number) => `/images/portfolio/legacy/${gallery}/${files[(offset + i) % files.length]}`;
    return {
        cover: { src: pick(0), alt: `${title} — featured photo` },
        gallery: [1, 2, 3, 4].map((i) => ({ src: pick(i), alt: `${title} — photo ${i}` })),
    };
}

const COMING_SOON = "More information coming soon.";

type ProjectSeed = Omit<Project, "cover" | "gallery" | "challenge" | "solution" | "summary" | "year"> &
    Partial<Pick<Project, "challenge" | "solution" | "summary" | "year" | "testimonial">>;

function seed(project: ProjectSeed, imageOffset: number): Project {
    return {
        year: 2024,
        summary: COMING_SOON,
        challenge: COMING_SOON,
        solution: COMING_SOON,
        ...project,
        ...placeholderImages(project.title, imageOffset, galleryFor(project)),
    };
}

export const PROJECTS: Project[] = [
    seed(
        {
            slug: "oak-hill-residence",
            title: "Oak Hill Residence",
            location: "Naperville",
            sector: "residential",
            services: ["Landscape Design", "Landscape Construction"],
            projectTypes: ["Patio & Hardscape", "Outdoor Living"],
            // Real client quote from the legacy testimonials page (placeholder project, real words).
            testimonial: {
                quote: "They installed beautiful flowers, an entry sidewalk and patio for our home.",
                name: "Mark Weinhold",
                location: "",
            },
        },
        0,
    ),
    seed(
        {
            slug: "willow-creek-estate",
            title: "Willow Creek Estate",
            location: "Hinsdale",
            sector: "residential",
            services: ["Landscape Design"],
            projectTypes: ["Plantings"],
        },
        1,
    ),
    seed(
        {
            slug: "lakeview-office-park",
            title: "Lakeview Office Park",
            location: "Aurora",
            sector: "commercial",
            services: ["Landscape Maintenance"],
            projectTypes: ["Water Features"],
        },
        2,
    ),
    seed(
        {
            slug: "prairie-pointe-retail",
            title: "Prairie Pointe Retail Center",
            location: "Plainfield",
            sector: "commercial",
            services: ["Landscape Enhancement", "Snow & Ice Management"],
            projectTypes: [],
        },
        3,
    ),
    seed(
        {
            slug: "maple-grove-backyard",
            title: "Maple Grove Backyard",
            location: "Wheaton",
            sector: "residential",
            services: ["Landscape Construction"],
            projectTypes: ["Patio & Hardscape"],
        },
        0,
    ),
    seed(
        {
            slug: "riverbend-residence",
            title: "Riverbend Residence",
            location: "Geneva",
            sector: "residential",
            services: ["Landscape Design", "Landscape Enhancement"],
            projectTypes: ["Lighting & Nightscapes"],
        },
        1,
    ),
    seed(
        {
            slug: "cedar-ridge-hoa",
            title: "Cedar Ridge Community",
            location: "Lisle",
            sector: "commercial",
            services: ["Landscape Maintenance", "Snow & Ice Management"],
            projectTypes: [],
        },
        2,
    ),
    seed(
        {
            slug: "stonegate-courtyard",
            title: "Stonegate Courtyard",
            location: "Oak Brook",
            sector: "commercial",
            services: ["Landscape Design", "Landscape Construction"],
            projectTypes: ["Water Features", "Outdoor Living"],
        },
        3,
    ),
    seed(
        {
            slug: "birchwood-garden",
            title: "Birchwood Garden",
            location: "Downers Grove",
            sector: "residential",
            services: ["Landscape Enhancement"],
            projectTypes: ["Plantings"],
        },
        0,
    ),
    seed(
        {
            slug: "harbor-view-residence",
            title: "Harbor View Residence",
            location: "Winnetka",
            sector: "residential",
            services: ["Landscape Design", "Landscape Construction"],
            projectTypes: ["Outdoor Living", "Lighting & Nightscapes"],
        },
        1,
    ),
    seed(
        {
            slug: "meridian-business-campus",
            title: "Meridian Business Campus",
            location: "Naperville",
            sector: "commercial",
            services: ["Landscape Maintenance"],
            projectTypes: ["Plantings"],
        },
        2,
    ),
    seed(
        {
            slug: "fox-hollow-retreat",
            title: "Fox Hollow Retreat",
            location: "St. Charles",
            sector: "residential",
            services: ["Landscape Construction", "Landscape Enhancement"],
            projectTypes: ["Water Features", "Patio & Hardscape"],
        },
        3,
    ),
];

type PhotoSeed = [folder: "construction" | "enhancement", name: string, sector: Sector, alt: string];

const PHOTO_SEEDS: PhotoSeed[] = [
    [
        "construction",
        "const_2",
        "residential",
        "Backyard patio at dusk with a fire table, lounge seating and a lit planting bed",
    ],
    [
        "construction",
        "darrens_const",
        "residential",
        "Timber-framed home surrounded by shrubs, a flowering tree and fall color",
    ],
    [
        "construction",
        "trevor_ryan_const_plant_material_and_fire_feature",
        "residential",
        "Gas fire columns set in river rock with blue and red annuals",
    ],
    ["construction", "const_1", "commercial", "Twin stone grill stations under a cedar pergola on a paver patio"],
    [
        "construction",
        "geneva_commons_const_1",
        "commercial",
        "Columned shade structure and stone seating wall at Geneva Commons",
    ],
    ["construction", "geneva_commons_const", "commercial", "Pergola plaza with outdoor seating at Geneva Commons"],
    ["construction", "snow_plows", "commercial", "Three Hanson plow trucks lined up with snow blades attached"],
    ["enhancement", "holiday_lights", "residential", "Home outlined in warm white holiday lights with lit shrubs"],
    ["enhancement", "mums_6", "residential", "Terracotta planter with ornamental cabbage, grasses and fall color"],
    [
        "enhancement",
        "winter_pots_1",
        "residential",
        "Winter porch planter with evergreen boughs, birch and red berries",
    ],
    ["enhancement", "winter_pots_2", "residential", "Winter planter with birch branches, ornaments and pine cones"],
    [
        "enhancement",
        "river_place_tulips_we",
        "commercial",
        "Tulips blooming in front of the River Place Condominiums sign",
    ],
    ["enhancement", "tulips_we_1", "commercial", "Bed of purple, white and yellow tulips"],
    ["enhancement", "tulips_we", "commercial", "Pink tulips lit by low sun"],
    ["enhancement", "geneva_commons_annuals_we", "commercial", "Geneva Commons entrance sign above a bed of annuals"],
    [
        "enhancement",
        "geneva_commons_annuals_we_1",
        "commercial",
        "Colorful annual bed with tropical foliage at Geneva Commons",
    ],
    ["enhancement", "fountain_install", "commercial", "Pond with fountain, stone wall and shoreline plantings"],
    ["enhancement", "annuals_3", "commercial", "Terrace planters of coleus, sweet potato vine and cordyline"],
    ["enhancement", "annual_bed_1", "commercial", "Storefront planter bed full of coleus, petunias and grasses"],
    ["enhancement", "annual_bed_2", "commercial", "Tall planters of palms and trailing foliage beside a glass entry"],
    ["enhancement", "annuals_pots_2", "commercial", "Large pot of palms, coleus and petunias beside a stone wall"],
    ["enhancement", "fall_1", "commercial", "Terrace planter box of mums, kale and ivy"],
    ["enhancement", "fall_display_1", "commercial", "Fall entry display with corn stalks, pumpkins, mums and cabbage"],
    ["enhancement", "fall_mums_1", "commercial", "Raised planter bed of mums, celosia and ornamental cabbage"],
    ["enhancement", "mums_2", "commercial", "Dark pergola planter with kale, ivy and ornamental grasses"],
    ["enhancement", "mums_4", "commercial", "Fall pot with sunflowers, mums and a blue cabbage"],
    ["enhancement", "mums_5", "commercial", "Concrete bowl planter of fall flowers and ornamental cabbage"],
    [
        "enhancement",
        "winter_decor_1",
        "commercial",
        "Sidewalk planter bed filled with evergreen boughs and red accents",
    ],
];

export const PHOTO_ONLY_PROJECTS: PhotoOnlyProject[] = PHOTO_SEEDS.map(([folder, name, sector, alt]) => ({
    slug: name,
    sector,
    cover: { src: uploadImage(folder, name), alt },
    photoOnly: true,
}));

export const PORTFOLIO_ITEMS: PortfolioItem[] = [...PROJECTS, ...PHOTO_ONLY_PROJECTS];

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}
