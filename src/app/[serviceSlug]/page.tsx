import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { ServiceBody } from "@/components/services/service-body";
import { SERVICE_PAGES, getServicePageBySlug } from "@/content/services";
import { SECTOR_LABELS } from "@/content/projects";

type ServicePageProps = { params: Promise<{ serviceSlug: string }> };

// Unknown top-level slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
    return SERVICE_PAGES.map((page) => ({ serviceSlug: page.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { serviceSlug } = await params;
    const page = getServicePageBySlug(serviceSlug);
    if (!page) return {};
    return { title: page.title, description: page.description };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { serviceSlug } = await params;
    const page = getServicePageBySlug(serviceSlug);
    if (!page) notFound();

    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb={`Home  /  ${SECTOR_LABELS[page.sector]} Services  /  ${page.service}`}
                eyebrow="OUR SERVICES"
                heading={page.title}
                description={page.tagline}
            />
            <ServiceBody page={page} />
            <SiteFooter />
        </div>
    );
}
