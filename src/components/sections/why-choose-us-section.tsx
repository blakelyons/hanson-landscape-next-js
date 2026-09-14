import { PillButton } from "@/components/ui/pill-button";
import { StatCard } from "@/components/ui/stat-card";
import { Icon } from "@/components/ui/icon";

const FEATURES = [
    {
        icon: "lucide:trees",
        title: "Expert Landscaping",
        description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
    },
    {
        icon: "lucide:shield-check",
        title: "Reliable Support",
        description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="relative w-full py-20">
            <div className="relative container flex flex-col-reverse gap-8 xl:block">
                <div className="grid grid-cols-1 gap-y-8">
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                        <div className="col-span-2 grid grid-cols-1 gap-8 xl:grid-cols-2">
                            <header className="col-span-2 grid gap-2.5 xl:max-w-[50%]">
                                <p className="font-mono-label text-forrest text-xs uppercase">Why Choose us</p>
                                <h2 className="font-serif-display text-5xl leading-11.5 font-normal whitespace-pre-wrap text-[#1a2e1a] not-italic">
                                    Crafting Beautiful Outdoor Spaces With Passion & Precision.
                                </h2>
                            </header>
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(min-content,1fr)_auto]">
                                <div className="block">
                                    <StatCard
                                        value="20+"
                                        label="Years Experience"
                                        className="text-forrest flex w-full shrink-0 flex-col items-start xl:w-3/4"
                                        valueClassName="font-serif-display text-7xl"
                                        labelClassName="font-mono-stat text-sm uppercase"
                                    />
                                </div>
                                <div className="block">
                                    <p className="w-full font-sans text-lg leading-7 font-normal whitespace-pre-wrap text-neutral-600 xl:max-w-104">
                                        {`Qui id id labor occaecat Lorem labore. Et consectetur oaecat nisi  voluptate cupidatat ipsum laborum eiusmod sit.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="z-4 col-span-2 flex flex-wrap items-center justify-center gap-8 md:flex-nowrap lg:items-start lg:justify-start">
                        <div className="inlie-flex order-2 gap-2.5 md:order-1">
                            <PillButton
                                variant="primary"
                                size="md"
                                textClassName="text-primary-dark-2 mt-8"
                                icon="lucide:arrow-right"
                            >
                                Discover More
                            </PillButton>
                            <div className="pointer-events-none mt-6 hidden h-25 w-43.75 md:block lg:mt-6 xl:-translate-x-10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt=""
                                    className="block size-full max-w-none"
                                    src="/images/home/plant-vector-standalone.svg"
                                />
                            </div>
                        </div>
                        <div className="bg-light-green-cta order-1 grid w-full min-w-0 gap-4 rounded-xl p-6 md:order-2 md:grid-cols-2 xl:w-auto">
                            {FEATURES.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="grid place-items-center gap-6 text-center xl:grid-cols-[48px_min-content] xl:place-items-start xl:text-left"
                                >
                                    <div className="flex size-10.25 shrink-0 items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <span className="text-forrest shrink-0 items-center justify-center text-5xl">
                                            <Icon icon={feature.icon} />
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center gap-2 text-center xl:min-w-75 xl:items-start xl:text-left">
                                        <p className="font-serif-display text-xl leading-7 font-normal whitespace-nowrap text-black not-italic">
                                            {feature.title}
                                        </p>
                                        <p className="w-full font-sans text-sm leading-4.5 font-normal text-[#6d827c]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative top-0 right-0 left-0 z-0 container grid h-full w-full grid-cols-1 gap-8 xl:absolute xl:grid-cols-2">
                    <div className="hidden xl:block"></div>
                    <div className="right-0 z-0 flex h-full w-full shrink-0 items-center rounded-xl">
                        <div className="pointer-events-none relative inset-0 mx-auto h-full max-h-64 w-full max-w-204 overflow-hidden rounded-xl xl:max-h-none xl:max-w-none">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Landscaping project"
                                className="h-full min-h-105 w-full object-cover"
                                src="/images/home/landscaping-collage.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
