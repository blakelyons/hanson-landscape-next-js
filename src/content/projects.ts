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

export type Project = {
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

const PLACEHOLDER_CHALLENGE =
    "Placeholder: a short description of what the property needed and the constraints we worked around. Replace with the real story for this Project.";
const PLACEHOLDER_SOLUTION =
    "Placeholder: a short description of what Hanson Landscape designed and built, and the materials and plantings used. Replace with the real details for this Project.";
const PLACEHOLDER_SUMMARY = "Placeholder summary — a one-line description of this Project goes here.";

type ProjectSeed = Omit<Project, "cover" | "gallery" | "challenge" | "solution" | "summary" | "year"> &
    Partial<Pick<Project, "challenge" | "solution" | "summary" | "year" | "testimonial">>;

function seed(project: ProjectSeed, imageOffset: number): Project {
    return {
        year: 2024,
        summary: PLACEHOLDER_SUMMARY,
        challenge: PLACEHOLDER_CHALLENGE,
        solution: PLACEHOLDER_SOLUTION,
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
            summary: "A pergola-covered outdoor kitchen and stone patio framed by layered perennial beds.",
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

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}
