import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Residential and commercial landscape projects across Chicagoland by Hanson Landscape.",
};

export default function PortfolioPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Portfolio"
                eyebrow="OUR WORK"
                heading="Portfolio"
                description="500+ Residential & Commercial Projects Across Chicagoland"
            />
            <section className="container py-16 lg:py-20">
                <Suspense fallback={null}>
                    <PortfolioGrid projects={PROJECTS} />
                </Suspense>
            </section>
            <CtaSection />
            <SiteFooter />
        </div>
    );
}
