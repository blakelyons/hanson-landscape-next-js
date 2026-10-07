import { BUSINESS, SITE_CONTACT, SITE_URL } from "@/content/site";
import { SECTOR_LABELS } from "@/content/projects";
import { SECTOR_HUBS, servicePath, type ServicePage } from "@/content/services";
import type { BlogPost } from "@/content/blog";

// Pure builders for schema.org JSON-LD. Rendered by components/seo/json-ld.tsx.
type JsonLd = Record<string, unknown>;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": ORGANIZATION_ID,
        name: BUSINESS.name,
        description: BUSINESS.description,
        url: SITE_URL,
        logo: abs("/android-chrome-512x512.png"),
        image: abs("/opengraph-image"),
        telephone: SITE_CONTACT.phone,
        email: SITE_CONTACT.email,
        areaServed: { "@type": "AdministrativeArea", name: "Chicagoland, Illinois" },
        ...(BUSINESS.address
            ? { address: { "@type": "PostalAddress", addressCountry: "US", ...BUSINESS.address } }
            : {}),
        ...(BUSINESS.openingHours ? { openingHours: BUSINESS.openingHours } : {}),
    };
}

export function websiteJsonLd(): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { "@id": ORGANIZATION_ID },
    };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: abs(crumb.path),
        })),
    };
}

/** Crumbs for a service page: Residential/Commercial Services > page. */
export function serviceCrumbs(page: ServicePage): Crumb[] {
    const hub = SECTOR_HUBS[page.sector];
    return [
        { name: hub.title, path: servicePath(hub.slug) },
        { name: page.service, path: servicePath(page.slug) },
    ];
}

export function serviceJsonLd(page: ServicePage): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        description: page.description,
        serviceType: page.service,
        url: abs(servicePath(page.slug)),
        image: abs(page.image.src),
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "AdministrativeArea", name: "Chicagoland, Illinois" },
        audience: { "@type": "Audience", audienceType: SECTOR_LABELS[page.sector] },
        offers: { "@type": "Offer", description: "Free quote", url: abs("/contact") },
    };
}

export function blogPostingJsonLd(post: BlogPost): JsonLd {
    const image = post.blocks.find((block) => block.type === "image");
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: abs(`/blog/${post.slug}`),
        ...(image?.type === "image" ? { image: abs(image.src) } : {}),
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
    };
}
