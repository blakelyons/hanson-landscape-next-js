import type { NextConfig } from "next";
import { BLOG_POSTS, BLOG_SLUG_ALIASES } from "./src/content/blog";

// Legacy WordPress posts lived at /{slug}/ (and /yyyy/mm/{slug}/).
const legacyBlogRedirects = [...BLOG_POSTS.map((post) => post.slug), ...Object.keys(BLOG_SLUG_ALIASES)].map((slug) => ({
    source: `/${slug}`,
    // Duplicates go straight to the canonical post (no double redirect).
    destination: `/blog/${BLOG_SLUG_ALIASES[slug] ?? slug}`,
    permanent: true,
}));

const nextConfig: NextConfig = {
    // Legacy WordPress URLs kept alive for SEO — see .scratch/PAGES-CHECKLIST.md
    async redirects() {
        return [
            ...legacyBlogRedirects,
            { source: "/hello-world", destination: "/blog", permanent: true },
            { source: "/category/seasonal-news", destination: "/blog", permanent: true },
            { source: "/:year(\\d{4})/:month(\\d{2})/:slug", destination: "/blog/:slug", permanent: true },
            { source: "/contact/request-a-quote", destination: "/contact", permanent: true },
            { source: "/career-oppurtonities", destination: "/careers", permanent: true },
            { source: "/portfolio/residential", destination: "/portfolio?sector=residential", permanent: true },
            { source: "/portfolio/commercial-2", destination: "/portfolio?sector=commercial", permanent: true },
            {
                source: "/portfolio/:category(landscape-maintenance|lighting-nightscapes|water-features)",
                destination: "/portfolio",
                permanent: true,
            },
        ];
    },
    webpack: (config) => {
        config.watchOptions = {
            poll: 800,
            aggregateTimeout: 300,
        };
        return config;
    },
};

export default nextConfig;
