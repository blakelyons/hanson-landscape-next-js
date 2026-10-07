// Service page data. Typed file today; shape is CMS-friendly (components only
// read `ServicePage` fields). Slugs match the legacy hansonlandscape.com URLs
// 1:1 so no redirects are needed. Source copy: .scratch/services-pages/AUDIT.md

import type { Sector, Service } from "@/content/projects";

export type ServiceImage = { src: string; alt: string };

export type ServicePage = {
    /** URL segment, e.g. `/residential-landscape-design` */
    slug: string;
    sector: Sector;
    service: Service;
    /** Page H1 + breadcrumb leaf */
    title: string;
    /** Hero subtitle */
    tagline: string;
    /** SEO meta description */
    description: string;
    image: ServiceImage;
    introHeading: string;
    intro: string;
    /** Optional lead-in sentence above the "What's included" list */
    includedLead?: string;
    included: string[];
    /** Extra titled lists (e.g. property types served) */
    extraLists?: { title: string; items: string[] }[];
    /** Optional highlighted program block (e.g. Pots Program) */
    feature?: { title: string; body: string };
    ctaHeading: string;
};

const POTS_RESIDENTIAL = {
    title: "The Residential Pots Program",
    body: "Colorful potted flowers make a house feel like home. Our award-winning Pots Program delivers fully bloomed seasonal containers to your door, with three or four color changes through the year to match the season.",
};

export const SERVICE_PAGES: ServicePage[] = [
    {
        slug: "residential-landscape-design",
        sector: "residential",
        service: "Landscape Design",
        title: "Residential Landscape Design",
        tagline: "Outdoor spaces that feel welcoming and serene, like an extension of your home's interior.",
        description:
            "Residential landscape design across Chicagoland: planting, outdoor lighting, irrigation, drainage solutions and seasonal pots from Hanson Landscape.",
        image: { src: "/images/home/project-photo-1.jpg", alt: "Residential landscape design by Hanson Landscape" },
        introHeading: "Design that makes your home feel complete",
        intro: "Your outdoor space should feel as welcoming as the rooms inside. We design every planting bed, light and pathway around how you live, so the result looks beautiful and works for your property in every season.",
        included: [
            "Irrigation system design",
            "Plant selection and planting plans",
            "Outdoor lighting",
            "Drainage solutions",
            "Holiday décor",
        ],
        feature: POTS_RESIDENTIAL,
        ctaHeading: "Ready to design your outdoor space?",
    },
    {
        slug: "residential-landscape-construction",
        sector: "residential",
        service: "Landscape Construction",
        title: "Residential Landscape Construction",
        tagline: "Hardscapes and outdoor living spaces built to add value and curb appeal to your home.",
        description:
            "Patios, driveways, retaining walls, fire pits, outdoor kitchens, pergolas and more. Residential landscape construction across Chicagoland by Hanson Landscape.",
        image: {
            src: "/images/home/project-photo-2.jpg",
            alt: "Residential landscape construction by Hanson Landscape",
        },
        introHeading: "Built with precision, made to last",
        intro: "From driveways and sidewalks to pergolas and fireplaces, our crews build the outdoor features that add value and curb appeal to your home. We use only premium materials for hardscapes and water features, and we build each one to stand up to Chicagoland weather.",
        included: [
            "Patios",
            "Driveways",
            "Sidewalks",
            "Retaining walls",
            "Fire pits",
            "Fireplaces",
            "Outdoor kitchens",
            "Pergolas",
        ],
        ctaHeading: "Ready to build your outdoor living space?",
    },
    {
        slug: "commercial-landscape-maintenance",
        sector: "commercial",
        service: "Landscape Maintenance",
        title: "Commercial Landscape Maintenance",
        tagline: "Year-round care that keeps your property engaging and inviting to clients, residents and customers.",
        description:
            "Full-service commercial landscape maintenance across Chicagoland: mowing, pruning, edging, fertilization and seasonal property care from Hanson Landscape.",
        image: { src: "/images/home/project-photo-3.jpg", alt: "Commercial landscape maintenance by Hanson Landscape" },
        introHeading: "Consistent care, tailored to your property",
        intro: "Landscaping is an investment, and well-kept grounds are often the first impression your property makes. Our crews handle seasonal property care throughout Chicagoland so your site stays engaging and inviting for the people who visit, live and work there.",
        included: [
            "Mowing",
            "Pruning",
            "Tree removal",
            "Edging",
            "Cultivation",
            "Fertilization and broadleaf weed control",
        ],
        extraLists: [
            {
                title: "Properties we serve",
                items: [
                    "Commercial buildings",
                    "Industrial parks",
                    "Office parks",
                    "Apartment complexes",
                    "Homeowner associations",
                    "Multi-family and residential communities",
                    "Municipalities",
                ],
            },
        ],
        ctaHeading: "Ready to set up a maintenance plan?",
    },
    {
        slug: "commercial-landscape-enhancement",
        sector: "commercial",
        service: "Landscape Enhancement",
        title: "Commercial Landscape Enhancement",
        tagline: "Seasonal color, fresh plantings and curb appeal that keep your property manicured all year.",
        description:
            "Commercial landscape enhancement in Chicagoland: mulch, seasonal color, plantings, irrigation, aeration and the Commercial Pots Program from Hanson Landscape.",
        image: { src: "/images/home/project-photo-4.jpg", alt: "Commercial landscape enhancement by Hanson Landscape" },
        introHeading: "Keep your property looking its best, every season",
        intro: "Our highly trained technicians refresh your grounds as the seasons change, and we shape one-of-a-kind outdoor spaces your employees, clients and residents will enjoy.",
        included: [
            "Mulch installation",
            "Seasonal color",
            "Holiday décor",
            "Plant, tree and shrub installation",
            "Irrigation installation and maintenance",
            "Curb appeal enhancement",
            "Aeration",
            "Deep root fertilization",
        ],
        feature: {
            title: "The Commercial Pots Program",
            body: "Our award-winning Pots Program delivers specially cultivated flowers in full bloom for immediate, vivid color. Choose three or four seasonal color changes to suit your property.",
        },
        ctaHeading: "Ready to enhance your property?",
    },
    {
        slug: "commercial-landscape-construction",
        sector: "commercial",
        service: "Landscape Construction",
        title: "Commercial Landscape Construction",
        tagline: "From concept to construction, an exterior design you will value for years to come.",
        description:
            "Commercial landscape architecture, design and construction across Chicagoland: brick pavers, patios, retaining walls and water features from Hanson Landscape.",
        image: {
            src: "/images/home/project-photo-1.jpg",
            alt: "Commercial landscape construction by Hanson Landscape",
        },
        introHeading: "One team from first sketch to final stone",
        intro: "Our professionally trained team handles every detail of your landscape project, from concept through construction. Hardscapes and water features are built with premium materials so they hold up for years.",
        included: ["Landscape architecture and design", "Brick pavers", "Patios", "Retaining walls", "Water features"],
        ctaHeading: "Ready to start your project?",
    },
    {
        slug: "snow-and-ice-management",
        sector: "commercial",
        service: "Snow & Ice Management",
        title: "Snow & Ice Management",
        tagline: "Prompt, thorough and consistent snow and ice removal to keep your property safe all winter.",
        description:
            "Commercial snow and ice management across Chicagoland: plowing, sidewalk shoveling, salting, hauling and a winter maintenance program from Hanson Landscape.",
        image: { src: "/images/home/project-photo-2.jpg", alt: "Snow and ice management by Hanson Landscape" },
        introHeading: "Ready for Chicagoland winters",
        intro: "We are a full-service snow and ice management firm. Our goal is simple: keep your property safe with prompt, thorough and consistent removal, storm after storm.",
        included: ["Snow removal", "Sidewalk shoveling", "Surface salting", "Snow hauling, when necessary"],
        extraLists: [
            {
                title: "Winter maintenance program",
                items: [
                    "Biweekly debris cleanup",
                    "Weekly litter cleanup",
                    "Parking lot sweeping",
                    "Dormant pruning of shrubs and bushes",
                    "Gutter cleaning",
                    "Mulch cultivation",
                    "Winter shrub fertilization",
                    "Winter turf fertilization",
                ],
            },
        ],
        ctaHeading: "Ready to plan for winter?",
    },
];

export type SectorHub = {
    sector: Sector;
    /** URL segment, e.g. `/residential-services` */
    slug: string;
    title: string;
    tagline: string;
    description: string;
    introHeading: string;
    intro: string;
    ctaHeading: string;
};

export const SECTOR_HUBS: Record<Sector, SectorHub> = {
    residential: {
        sector: "residential",
        slug: "residential-services",
        title: "Residential Services",
        tagline: "Design it, build it, enjoy it. One Chicagoland team for your whole outdoor space.",
        description:
            "Residential landscape design and construction across Chicagoland. Hanson Landscape designs and builds outdoor spaces with a 100% customer satisfaction rating.",
        introHeading: "Your professional landscape source",
        intro: "Hanson Landscape is a full-service firm serving Chicagoland homeowners. From the first sketch to the final stone, our trained team designs and builds your project with the care and service you deserve, and our 100% customer satisfaction rating shows it.",
        ctaHeading: "Ready to start your residential project?",
    },
    commercial: {
        sector: "commercial",
        slug: "commercial-services",
        title: "Commercial Services",
        tagline: "Year-round landscape care, construction and snow management for Chicagoland properties.",
        description:
            "Commercial landscape maintenance, enhancement, construction and snow and ice management across Chicagoland from Hanson Landscape.",
        introHeading: "One partner for your property, all year",
        intro: "Hanson Landscape is a full-service firm serving commercial properties across Chicagoland. We design, build and maintain your grounds, and plow them in winter, with expertly trained staff and a 100% customer satisfaction rating.",
        ctaHeading: "Ready to talk about your property?",
    },
};

export function getServicePagesBySector(sector: Sector): ServicePage[] {
    return SERVICE_PAGES.filter((page) => page.sector === sector);
}

/** Options for the contact/consultation form's service dropdown. */
export const SERVICE_OPTIONS = [
    ...SERVICE_PAGES.map((page) => ({ value: page.slug, label: page.title })),
    { value: "other", label: "Other / Not sure yet" },
];

export const servicePath = (slug: string) => `/${slug}`;

export function getServicePageBySlug(slug: string): ServicePage | undefined {
    return SERVICE_PAGES.find((page) => page.slug === slug);
}
