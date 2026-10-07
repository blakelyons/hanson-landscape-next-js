import { describe, expect, it } from "vitest";
import { SECTOR_HUBS, SERVICE_PAGES } from "@/content/services";
import { BLOG_POSTS } from "@/content/blog";

// Google truncates meta descriptions around 155-160 characters and titles around 60.
const MAX_DESCRIPTION = 160;
const MAX_TITLE = 48; // leaves room for the " | Hanson Landscape" suffix

describe("SEO text lengths", () => {
    it("service and hub descriptions fit in a search snippet", () => {
        for (const item of [...SERVICE_PAGES, ...Object.values(SECTOR_HUBS)]) {
            expect(item.description.length, item.title).toBeLessThanOrEqual(MAX_DESCRIPTION);
        }
    });

    it("service and hub titles fit before the site-name suffix", () => {
        for (const item of [...SERVICE_PAGES, ...Object.values(SECTOR_HUBS)]) {
            expect(item.title.length, item.title).toBeLessThanOrEqual(MAX_TITLE);
        }
    });

    it("blog excerpts (used as descriptions) fit in a snippet and titles are unique", () => {
        for (const post of BLOG_POSTS) {
            expect(post.excerpt.length, post.slug).toBeLessThanOrEqual(MAX_DESCRIPTION);
        }
        const titles = BLOG_POSTS.map((post) => post.title.toLowerCase());
        expect(new Set(titles).size).toBe(titles.length);
    });
});
