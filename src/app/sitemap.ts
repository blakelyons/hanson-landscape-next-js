import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";
import { SECTOR_HUBS, SERVICE_PAGES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansonlandscape.com";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...["testimonials", "careers", "privacy-policy", "site-map"].map((path) => ({
            url: `${baseUrl}/${path}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.5,
        })),
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...Object.values(SECTOR_HUBS).map((hub) => ({
            url: `${baseUrl}/${hub.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        ...SERVICE_PAGES.map((page) => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...PROJECTS.map((project) => ({
            url: `${baseUrl}/portfolio/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
