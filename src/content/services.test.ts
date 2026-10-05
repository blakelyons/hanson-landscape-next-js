import { describe, expect, it } from "vitest";
import { SERVICE_PAGES, getServicePageBySlug } from "./services";

describe("service pages", () => {
    it("has unique slugs", () => {
        const slugs = SERVICE_PAGES.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("looks up by slug", () => {
        expect(getServicePageBySlug("residential-landscape-design")?.title).toBe("Residential Landscape Design");
        expect(getServicePageBySlug("nope")).toBeUndefined();
    });
});
