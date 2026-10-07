import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteCard } from "@/components/ui/quote-card";
import { TransitionLink } from "@/components/transitions/transition-link";
import { getServicePagesBySector, servicePath, type SectorHub } from "@/content/services";

export function ServiceHub({ hub }: { hub: SectorHub }) {
    const pages = getServicePagesBySector(hub.sector);

    return (
        <div className="flex w-full flex-col bg-white">
            <JsonLd data={breadcrumbJsonLd([{ name: hub.title, path: servicePath(hub.slug) }])} />
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb={`Home  /  ${hub.title}`}
                eyebrow="OUR SERVICES"
                heading={hub.title}
                description={hub.tagline}
            />
            <section className="container flex flex-col gap-12 py-12 lg:gap-16 lg:py-16">
                <div className="mx-auto flex w-full max-w-180 flex-col gap-5">
                    <h2 className="font-serif-display text-forrest text-4xl leading-tight">{hub.introHeading}</h2>
                    <p className="font-sans text-lg leading-7.5 text-black/70">{hub.intro}</p>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                    {pages.map((page) => (
                        <TransitionLink
                            key={page.slug}
                            href={servicePath(page.slug)}
                            className="group flex w-full flex-col gap-4"
                        >
                            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
                                <Image
                                    src={page.image.src}
                                    alt={page.image.alt}
                                    fill
                                    sizes="(min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex min-w-0 flex-col gap-1.5">
                                    <h3 className="font-serif-display text-2xl leading-7 font-normal text-black not-italic">
                                        {page.service}
                                    </h3>
                                    <p className="font-sans text-sm text-black/60">{page.tagline}</p>
                                </div>
                                <span className="bg-primary group-hover:bg-primary-light shrink-0 rounded-full px-4 py-2 text-xs font-medium text-white transition-colors duration-300">
                                    Learn More
                                </span>
                            </div>
                        </TransitionLink>
                    ))}
                </div>

                <QuoteCard heading={hub.ctaHeading} />
            </section>
            <SiteFooter />
        </div>
    );
}
