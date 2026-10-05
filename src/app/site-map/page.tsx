import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { SECTOR_HUBS, getServicePagesBySector, servicePath } from "@/content/services";

export const metadata: Metadata = {
    title: "Site Map",
    description: "A list of every page on hansonlandscape.com.",
};

type MapLink = { label: string; href: string };
type MapGroup = { heading: string; href?: string; links: MapLink[] };

const GROUPS: MapGroup[] = [
    {
        heading: "Company",
        links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
        ],
    },
    ...Object.values(SECTOR_HUBS).map((hub) => ({
        heading: hub.title,
        href: servicePath(hub.slug),
        links: getServicePagesBySector(hub.sector).map((page) => ({
            label: page.title,
            href: servicePath(page.slug),
        })),
    })),
    { heading: "Legal", links: [{ label: "Privacy Policy", href: "/privacy-policy" }] },
];

export default function SiteMapPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Site Map"
                eyebrow="FIND YOUR WAY"
                heading="Site Map"
                description="Every page on hansonlandscape.com in one place."
            />
            <section className="container grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
                {GROUPS.map((group) => (
                    <div key={group.heading} className="flex flex-col gap-4">
                        <h2 className="font-serif-display text-forrest text-2xl">
                            {group.href ? <Link href={group.href}>{group.heading}</Link> : group.heading}
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {group.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-forrest font-sans text-base text-black/70 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <SiteFooter />
        </div>
    );
}
