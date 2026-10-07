import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { PostCard } from "@/components/blog/post-card";
import { CtaSection } from "@/components/sections/cta-section";
import { BLOG_POSTS } from "@/content/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
    title: "Blog",
    description: "Seasonal news, landscaping tips and company updates from Hanson Landscape in Chicagoland.",
};

export default function BlogPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])]} />
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Blog"
                eyebrow="SEASONAL NEWS"
                heading="Blog & Seasonal Tips"
                description="Stay informed about the latest and greatest in all things landscaping, straight from the Hanson Landscape team."
            />
            <section className="container py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </section>
            <CtaSection />
            <SiteFooter />
        </div>
    );
}
