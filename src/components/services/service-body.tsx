import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PillButton } from "@/components/ui/pill-button";
import type { ServicePage } from "@/content/services";
import { contactPath } from "@/content/site";

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-col gap-3">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-base leading-6 text-black/70">
                    <span className="bg-forrest size-1.5 shrink-0 rounded-full" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export function ServiceBody({ page }: { page: ServicePage }) {
    return (
        <section className="container flex flex-col gap-12 py-12 lg:gap-16 lg:py-16">
            <div className="relative aspect-3/1 min-h-64 w-full overflow-hidden rounded-2xl">
                <Image
                    src={page.image.src}
                    alt={page.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="mx-auto flex w-full max-w-180 flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h2 className="font-serif-display text-forrest text-4xl leading-tight">{page.introHeading}</h2>
                    <p className="font-sans text-lg leading-7.5 text-black/70">{page.intro}</p>
                </div>

                <div className="flex flex-col gap-5">
                    <h3 className="font-serif-display text-forrest text-2xl">What&apos;s included</h3>
                    {page.includedLead ? (
                        <p className="font-sans text-base leading-6 text-black/70">{page.includedLead}</p>
                    ) : null}
                    <BulletList items={page.included} />
                </div>

                {page.extraLists?.map((list) => (
                    <div key={list.title} className="flex flex-col gap-5">
                        <h3 className="font-serif-display text-forrest text-2xl">{list.title}</h3>
                        <BulletList items={list.items} />
                    </div>
                ))}

                {page.feature ? (
                    <div className="bg-light-green-cta flex flex-col gap-3 rounded-xl p-8">
                        <span className="bg-forrest flex size-10 items-center justify-center rounded-full text-white">
                            <Icon icon="lucide:flower-2" width={20} height={20} />
                        </span>
                        <h3 className="font-serif-display text-forrest text-2xl">{page.feature.title}</h3>
                        <p className="font-sans text-base leading-6 text-black/70">{page.feature.body}</p>
                    </div>
                ) : null}
            </div>

            <div className="border-forrest/15 mx-auto flex w-full max-w-240 flex-col items-start justify-between gap-6 rounded-xl border bg-[#f6f7f4] p-8 sm:flex-row sm:items-center">
                <p className="font-serif-display text-forrest text-2xl leading-8">{page.ctaHeading}</p>
                <PillButton
                    variant="secondary"
                    size="md"
                    icon="lucide:arrow-right"
                    animateIconOnHover
                    href={contactPath(page.slug)}
                >
                    Get a Free Quote
                </PillButton>
            </div>
        </section>
    );
}
