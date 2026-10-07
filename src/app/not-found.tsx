import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { CONTACT_PATH } from "@/content/site";
import { SECTOR_HUBS, servicePath } from "@/content/services";

export const metadata: Metadata = {
    title: "Page Not Found",
    robots: { index: false },
    // Don't inherit the site-wide canonical, which would resolve to a bogus "/_not-found" URL.
    alternates: {},
};

export default function NotFound() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  404"
                eyebrow="PAGE NOT FOUND"
                heading="We couldn't find that page"
                description="The link may be out of date or the page may have moved. Try one of these instead."
            />
            <section className="container flex flex-col items-start gap-8 py-12 lg:py-16">
                <div className="flex flex-wrap gap-4">
                    <PillButton variant="secondary" size="md" href="/">
                        Back to Home
                    </PillButton>
                    <PillButton variant="outline-secondary" size="md" textClassName="text-forrest" href={CONTACT_PATH}>
                        Contact Us
                    </PillButton>
                </div>
                <ul className="flex flex-col gap-3">
                    {[
                        { label: SECTOR_HUBS.residential.title, href: servicePath(SECTOR_HUBS.residential.slug) },
                        { label: SECTOR_HUBS.commercial.title, href: servicePath(SECTOR_HUBS.commercial.slug) },
                        { label: "Portfolio", href: "/portfolio" },
                        { label: "Blog", href: "/blog" },
                        { label: "Site Map", href: "/site-map" },
                    ].map((link) => (
                        <li key={link.href}>
                            <ArrowLink href={link.href} icon="lucide:arrow-right" iconSize={14}>
                                {link.label}
                            </ArrowLink>
                        </li>
                    ))}
                </ul>
            </section>
            <SiteFooter />
        </div>
    );
}
