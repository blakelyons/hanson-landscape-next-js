import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { TestimonialCard } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { CLIENT_TESTIMONIALS } from "@/content/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
    title: "Testimonials",
    description:
        "What homeowners, property managers and HOAs across Chicagoland say about working with Hanson Landscape.",
};

export default function TestimonialsPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Testimonials", path: "/testimonials" }])]} />
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Testimonials"
                eyebrow="CLIENT STORIES"
                heading="What Our Clients Say"
                description="A 100% customer satisfaction rating means we treat every property like our own."
            />
            <section className="container py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {CLIENT_TESTIMONIALS.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </div>
            </section>
            <CtaSection />
            <SiteFooter />
        </div>
    );
}
