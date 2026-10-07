import { describe, expect, it } from "vitest";
import {
    blogPostingJsonLd,
    breadcrumbJsonLd,
    organizationJsonLd,
    serviceCrumbs,
    serviceJsonLd,
} from "./structured-data";
import { SERVICE_PAGES } from "@/content/services";
import { BLOG_POSTS } from "@/content/blog";

describe("structured data", () => {
    it("organization omits address/hours until they are confirmed", () => {
        const org = organizationJsonLd();
        expect(org.telephone).toBe("(630) 556-4120");
        expect(org).not.toHaveProperty("address");
        expect(org).not.toHaveProperty("openingHours");
    });

    it("breadcrumbs start at Home and number from 1 with absolute URLs", () => {
        const list = breadcrumbJsonLd(serviceCrumbs(SERVICE_PAGES[0])) as {
            itemListElement: { position: number; item: string; name: string }[];
        };
        expect(list.itemListElement.map((item) => item.name)).toEqual([
            "Home",
            "Residential Services",
            "Landscape Design",
        ]);
        expect(list.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
        expect(list.itemListElement.every((item) => item.item.startsWith("http"))).toBe(true);
    });

    it("service and blog posting link back to the organization", () => {
        expect(serviceJsonLd(SERVICE_PAGES[0]).provider).toEqual({ "@id": expect.stringContaining("#organization") });
        expect(blogPostingJsonLd(BLOG_POSTS[0]).datePublished).toBe(BLOG_POSTS[0].date);
    });
});
