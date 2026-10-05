import { FooterColumn, type FooterItem } from "./footer-column";
import { servicePath } from "@/content/services";
import { PartnerLogos } from "@/components/ui/partner-logos";
import Link from "next/link";
import { SITE_CONTACT } from "@/content/site";

const MENU_COLUMNS: { heading: string; href?: string; items: FooterItem[] }[] = [
    {
        heading: "COMPANY",
        items: [
            { label: "About Us", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Careers", href: "/careers" },
        ],
    },
    {
        heading: "COMMERCIAL SERVICES",
        href: "/commercial-services",
        items: [
            { label: "Landscape Maintenance", href: servicePath("commercial-landscape-maintenance") },
            { label: "Landscape Construction", href: servicePath("commercial-landscape-construction") },
            { label: "Landscape Enhancement", href: servicePath("commercial-landscape-enhancement") },
            { label: "Snow & Ice Management", href: servicePath("snow-and-ice-management") },
        ],
    },
    {
        heading: "RESIDENTIAL SERVICES",
        href: "/residential-services",
        items: [
            { label: "Landscape Design", href: servicePath("residential-landscape-design") },
            { label: "Landscape Construction", href: servicePath("residential-landscape-construction") },
        ],
    },
];

export function SiteFooter() {
    return (
        <footer className="relative w-full">
            <div
                className="h-0.75 w-full"
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, rgb(34, 197, 94) 0%, rgb(248, 156, 28) 25%, rgb(159, 51, 34) 75%, rgb(34, 197, 94) 100%)",
                }}
            />
            <div className="flex w-full flex-col items-center bg-neutral-700 py-20">
                <div className="container flex flex-col items-start">
                    <div className="flex w-full flex-row flex-wrap gap-x-10 gap-y-10 xl:gap-y-0">
                        <div className="flex w-full flex-col items-center gap-6 lg:w-1/2 lg:items-start xl:w-1/3">
                            <div className="relative h-22 w-30 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Hanson Landscape"
                                    className="absolute inset-0 size-full max-w-none object-cover"
                                    src="/images/home/logo.png"
                                />
                            </div>
                            <p className="font-serif-display w-full min-w-full text-4xl leading-11 font-normal text-white not-italic">
                                Our Mission
                            </p>
                            <p className="w-full min-w-full font-sans text-lg leading-7 font-normal text-[rgba(255,255,255,0.5)]">
                                {`Dolore sit laboris veniam aliquip. Cupidatat officia veniam adipisicing. Nisi aliqua duis ut nostrud aliquip sit. `}
                            </p>
                        </div>

                        <div className="grid w-auto flex-1 grid-cols-1 gap-x-10 gap-y-10 lg:w-1/2 lg:grid-cols-2 xl:grid-cols-[repeat(4,minmax(max-content,1fr))]">
                            {MENU_COLUMNS.map((column) => (
                                <FooterColumn
                                    key={column.heading}
                                    heading={column.heading}
                                    headingHref={column.href}
                                    items={column.items}
                                    className="flex w-full flex-col items-start gap-4"
                                />
                            ))}
                            <div className="flex w-full flex-col items-start gap-4">
                                <p className="font-mono-label w-full text-base font-normal text-[rgba(255,255,255,0.35)]">
                                    Contact
                                </p>
                                <div className="flex w-full flex-col items-start gap-4">
                                    <div className="w-full font-sans text-base leading-none font-normal whitespace-pre-wrap text-[rgba(255,255,255,0.5)]">
                                        <p className="mb-0 leading-4">
                                            <Link href="tel:6305564120">(630) 556-4120</Link>
                                        </p>
                                        <p className="mb-0 leading-4">&#8203;</p>
                                        <p className="text-forrest mb-0 leading-4">
                                            <Link href={SITE_CONTACT.emailHref}>{SITE_CONTACT.email}</Link>
                                        </p>
                                        <p className="mb-0 leading-4">&#8203;</p>
                                        <p className="leading-4">Chicagoland Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PartnerLogos className="mt-10 flex flex-wrap items-center justify-center gap-4 self-end lg:justify-start" />

                    <div className="mt-10 flex w-full flex-wrap items-center justify-between border-t border-[rgba(255,255,255,0.5)] pt-8 font-sans text-base leading-4 font-normal text-[rgba(255,255,255,0.5)]">
                        <p className="shrink-0 whitespace-nowrap">© 2026 Hanson Landscape. All rights reserved.</p>
                        <p className="shrink-0 whitespace-pre">
                            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            {"   |   "}
                            <Link href="/site-map" className="hover:text-primary transition-colors">
                                Site Map
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
