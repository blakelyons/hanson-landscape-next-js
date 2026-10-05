import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { SITE_CONTACT } from "@/content/site";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Hanson Landscape collects, uses and protects information submitted through hansonlandscape.com.",
};

// DRAFT: generic policy written from what the site actually does (contact form -> email via Resend).
// Needs client / legal review before launch. Update the date below when approved.
const LAST_UPDATED = "October 2026";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb="Home  /  Privacy Policy"
                eyebrow="LEGAL"
                heading="Privacy Policy"
                description={`Last updated ${LAST_UPDATED}`}
            />
            <section className="container flex flex-col gap-10 py-12 lg:py-16">
                <div className="mx-auto flex w-full max-w-180 flex-col gap-8">
                    <p className="font-sans text-lg leading-7.5 text-black/70">
                        Hanson Landscape (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy
                        explains what information we collect through hansonlandscape.com and how we use it.
                    </p>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Information we collect</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            When you use our contact or quote form, we collect the details you give us: your name, email
                            address, phone number, the service you are interested in, your message, and any file you
                            choose to attach. We may also receive standard technical information from your browser, such
                            as IP address, device and pages visited.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">How we use it</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            We use your information to respond to your request, prepare quotes, schedule and perform
                            work, and improve our website and services. We do not sell your personal information.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Who we share it with</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            We share information only with service providers that help us run the site and handle your
                            requests, such as our email delivery provider (Resend) and hosting and analytics providers,
                            and only as needed to provide those services. We may also disclose information when required
                            by law.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Cookies and analytics</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            This site may use cookies or similar technologies to keep it working and to understand how
                            it is used. You can control cookies through your browser settings.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Data retention and security</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            We keep your information for as long as needed to respond to you, provide services and meet
                            legal or business requirements. We take reasonable steps to protect it, but no method of
                            transmission over the internet is completely secure.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Your choices</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            You can ask us to access, correct or delete the personal information we hold about you by
                            contacting us using the details below.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Children</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            Our website is not directed to children under 13, and we do not knowingly collect their
                            personal information.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Changes to this policy</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            We may update this policy from time to time. The date at the top of this page shows when it
                            was last changed.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-serif-display text-forrest text-2xl">Contact us</h2>
                        <p className="font-sans text-base leading-7 text-black/70">
                            Questions about this policy? Call{" "}
                            <a href={SITE_CONTACT.phoneHref} className="text-forrest font-medium">
                                {SITE_CONTACT.phone}
                            </a>{" "}
                            or email{" "}
                            <a href={SITE_CONTACT.emailHref} className="text-forrest font-medium">
                                {SITE_CONTACT.email}
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}
