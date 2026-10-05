import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { SERVICE_PAGES } from "@/content/services";
import { SITE_CONTACT } from "@/content/site";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Request a free quote or book a consultation with Hanson Landscape. Call (630) 556-4120 or send us a message. Serving Chicagoland.",
};

const SERVICE_OPTIONS = [
    ...SERVICE_PAGES.map((page) => ({ value: page.slug, label: page.title })),
    { value: "other", label: "Other / Not sure yet" },
];

const INFO = [
    { label: "CALL US", value: SITE_CONTACT.phone, href: SITE_CONTACT.phoneHref, valueClass: "text-[#1a2e1a]" },
    { label: "EMAIL US", value: SITE_CONTACT.email, href: SITE_CONTACT.emailHref, valueClass: "text-[#61a229]" },
    { label: "SERVICE AREA", value: SITE_CONTACT.serviceArea, valueClass: "text-[#1a2e1a]" },
];

type ContactPageProps = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const { service } = await searchParams;
    const defaultService = SERVICE_OPTIONS.some((option) => option.value === service) ? service : undefined;

    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Contact"
                eyebrow="GET IN TOUCH"
                heading="Let’s Talk About Your Project"
                description="Tell us a bit about your property and we'll follow up within one business day."
            />

            <section className="relative flex w-full items-start overflow-clip py-10 md:py-20">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute size-full max-w-none object-cover"
                        src="/images/home/consultation-bg.jpg"
                    />
                    <div className="from-neutral-25 absolute inset-0 bg-linear-to-b to-[rgba(242,242,242,0)] to-[50.481%]" />
                </div>
                <div className="relative container flex justify-center lg:justify-end">
                    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-8 lg:max-w-161.75">
                        <h2 className="font-serif-display text-3xl leading-10.5 font-normal text-black not-italic">
                            Book a Consultation Today
                        </h2>
                        <ContactForm serviceOptions={SERVICE_OPTIONS} defaultService={defaultService} />
                    </div>
                </div>
            </section>

            <section className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-3 lg:gap-16 lg:py-20">
                {INFO.map((item) => (
                    <div key={item.label} className="flex flex-col gap-4">
                        <p className="font-sans text-xs font-medium tracking-[1.5px] text-[#6b7b6b]">{item.label}</p>
                        {item.href ? (
                            <a
                                href={item.href}
                                className={`font-serif-display text-[22px] break-words ${item.valueClass}`}
                            >
                                {item.value}
                            </a>
                        ) : (
                            <p className={`font-serif-display text-[22px] ${item.valueClass}`}>{item.value}</p>
                        )}
                    </div>
                ))}
            </section>
            <SiteFooter />
        </div>
    );
}
