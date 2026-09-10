import { FooterColumn } from "./footer-column";
import { PartnerLogos } from "@/components/ui/partner-logos";

const MENU_COLUMNS = [
    {
        heading: "COMPANY",
        items: ["About Us", "Portfolio", "Testimonials", "Careers"],
    },
    {
        heading: "COMMERCIAL SERVICES",
        items: ["Landscape Maintenance", "Landscape Construction", "Landscape Enhancement", "Snow & Ice Management"],
    },
    {
        heading: "RESIDENTIAL SERVICES",
        items: ["Landscape Design", "Landscape Construction"],
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
                        <div className="flex w-full flex-col items-center gap-6 xl:w-1/3 xl:items-start">
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

                        <div className="grid w-auto flex-1 grid-cols-1 gap-x-10 xl:grid-cols-[repeat(4,minmax(max-content,1fr))]">
                            {MENU_COLUMNS.map((column) => (
                                <FooterColumn
                                    key={column.heading}
                                    heading={column.heading}
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
                                        <p className="mb-0 leading-4">(630) 556-4120</p>
                                        <p className="mb-0 leading-4">&#8203;</p>
                                        <p className="text-forrest mb-0 leading-4">info@hansonlandscape.com</p>
                                        <p className="mb-0 leading-4">&#8203;</p>
                                        <p className="leading-4">Chicagoland Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PartnerLogos className="mt-10 flex flex-wrap items-center gap-4 self-end" />

                    <div className="mt-10 flex w-full items-center justify-between border-t border-[rgba(255,255,255,0.5)] pt-8 font-sans text-base leading-4 font-normal text-[rgba(255,255,255,0.5)]">
                        <p className="shrink-0 whitespace-nowrap">© 2026 Hanson Landscape. All rights reserved.</p>
                        <p className="shrink-0 whitespace-pre">{`Privacy Policy   |   Site Map`}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
