import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { StorySection } from "@/components/about/story-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Family-owned and passion-driven for over two decades. Meet the Hanson Landscape team serving residential and commercial clients across Chicagoland.",
};

export default function AboutPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  About Us"
                eyebrow="OUR STORY"
                heading="Family-Owned. Passion-Driven."
                description="For over two decades, we've poured our passion into creating beautiful, custom landscapes across Chicagoland."
            />
            <StorySection />
            <WhyChooseUsSection />
            <CtaSection />
            <SiteFooter />
        </div>
    );
}
