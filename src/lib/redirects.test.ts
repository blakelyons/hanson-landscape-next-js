import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { BLOG_POSTS, BLOG_SLUG_ALIASES } from "@/content/blog";

describe("legacy redirects (next.config.ts)", () => {
    it("never chains: no destination is itself a redirect source", async () => {
        const redirects = (await nextConfig.redirects?.()) ?? [];
        const sources = new Set(redirects.map((redirect) => redirect.source));

        for (const redirect of redirects) {
            expect(sources.has(redirect.destination.split("?")[0]), `${redirect.source} chains`).toBe(false);
        }
    });

    it("sends duplicate blog slugs straight to the canonical post, and every post has a legacy redirect", async () => {
        const redirects = (await nextConfig.redirects?.()) ?? [];
        const byBlogSource = new Map(redirects.map((redirect) => [redirect.source, redirect.destination]));

        for (const [alias, canonical] of Object.entries(BLOG_SLUG_ALIASES)) {
            expect(byBlogSource.get(`/${alias}`)).toBe(`/blog/${canonical}`);
        }
        for (const post of BLOG_POSTS) {
            expect(byBlogSource.get(`/${post.slug}`)).toBe(`/blog/${post.slug}`);
        }
    });
});
