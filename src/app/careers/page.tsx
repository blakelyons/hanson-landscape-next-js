import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { PillButton } from "@/components/ui/pill-button";
import { SITE_CONTACT } from "@/content/site";

export const metadata: Metadata = {
    title: "Careers",
    description: "Join the Hanson Landscape team. Call or email your resume to ask about employment opportunities.",
};

export default function CareersPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Careers"
                eyebrow="JOIN OUR TEAM"
                heading="Career Opportunities"
                description="Interested in working with Hanson Landscape? We'd like to hear from you."
            />
            <section className="container flex flex-col gap-12 py-12 lg:py-16">
                <div className="mx-auto flex w-full max-w-180 flex-col gap-5">
                    <h2 className="font-serif-display text-forrest text-4xl leading-tight">
                        Grow with a family-owned team
                    </h2>
                    <p className="font-sans text-lg leading-7.5 text-black/70">
                        We don&apos;t post open positions online. If you&apos;d like to work with our design,
                        construction, maintenance or snow management crews, call our main office or email us your resume
                        and tell us what you&apos;re looking for.
                    </p>
                </div>
                <div className="border-forrest/15 mx-auto flex w-full max-w-180 flex-col gap-6 rounded-xl border bg-[#f6f7f4] p-8">
                    <h3 className="font-serif-display text-forrest text-2xl">How to apply</h3>
                    <p className="font-sans text-base leading-6 text-black/70">
                        Contact our main office at{" "}
                        <a href={SITE_CONTACT.phoneHref} className="text-forrest font-medium">
                            {SITE_CONTACT.phone}
                        </a>{" "}
                        or email your resume to{" "}
                        <a
                            href={`${SITE_CONTACT.emailHref}?subject=Employment%20Inquiry`}
                            className="text-forrest font-medium"
                        >
                            {SITE_CONTACT.email}
                        </a>
                        .
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <PillButton variant="secondary" size="md" icon="lucide:phone" href={SITE_CONTACT.phoneHref}>
                            Call Us
                        </PillButton>
                        <PillButton
                            variant="outline-secondary"
                            size="md"
                            icon="lucide:mail"
                            textClassName="text-forrest"
                            href={`${SITE_CONTACT.emailHref}?subject=Employment%20Inquiry`}
                        >
                            Email Your Resume
                        </PillButton>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}
