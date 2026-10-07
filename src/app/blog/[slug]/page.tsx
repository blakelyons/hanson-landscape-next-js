import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { QuoteCard } from "@/components/ui/quote-card";
import { PostBody } from "@/components/blog/post-body";
import { BLOG_POSTS, BLOG_SLUG_ALIASES, formatPostDate, getAdjacentPosts, getBlogPostBySlug } from "@/content/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, blogPostingJsonLd } from "@/lib/structured-data";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return {};
    const image = post.blocks.find((block) => block.type === "image");
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            type: "article",
            publishedTime: post.date,
            title: post.title,
            description: post.excerpt,
            ...(image?.type === "image"
                ? {
                      images: [
                          { url: image.src, width: image.width, height: image.height, alt: image.alt || post.title },
                      ],
                  }
                : {}),
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const canonical = BLOG_SLUG_ALIASES[slug];
    if (canonical) permanentRedirect(`/blog/${canonical}`);

    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    const { newer, older } = getAdjacentPosts(post.slug);

    return (
        <div className="flex w-full flex-col bg-white">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path: `/blog/${post.slug}` },
                    ]),
                    blogPostingJsonLd(post),
                ]}
            />
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb={`Home  /  Blog  /  ${post.title}`}
                eyebrow={formatPostDate(post.date).toUpperCase()}
                heading={post.title}
                description="Seasonal news and tips from Hanson Landscape."
            />
            <section className="container flex flex-col gap-12 py-12 lg:gap-16 lg:py-16">
                <ArrowLink href="/blog" icon="lucide:arrow-left" iconSize={14} iconPosition="left" className="w-fit">
                    Back to Blog
                </ArrowLink>
                <PostBody blocks={post.blocks} fallbackAlt={post.title} />
                <nav
                    aria-label="More posts"
                    className="border-forrest/15 mx-auto flex w-full max-w-180 flex-col justify-between gap-4 border-y py-6 sm:flex-row"
                >
                    {newer ? (
                        <ArrowLink
                            href={`/blog/${newer.slug}`}
                            icon="lucide:arrow-left"
                            iconSize={14}
                            iconPosition="left"
                            className="min-w-0"
                            textClassName="text-forrest text-sm font-medium truncate whitespace-normal"
                        >
                            {newer.title}
                        </ArrowLink>
                    ) : (
                        <span />
                    )}
                    {older ? (
                        <ArrowLink
                            href={`/blog/${older.slug}`}
                            icon="lucide:arrow-right"
                            iconSize={14}
                            className="min-w-0 sm:text-right"
                            textClassName="text-forrest text-sm font-medium truncate whitespace-normal"
                        >
                            {older.title}
                        </ArrowLink>
                    ) : null}
                </nav>
                <QuoteCard heading="Need help with your property?" />
            </section>
            <SiteFooter />
        </div>
    );
}
