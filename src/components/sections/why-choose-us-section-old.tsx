import { PillButton } from "@/components/ui/pill-button";
import { StatCard } from "@/components/ui/stat-card";

const FEATURES = [
    {
        icon: "/images/home/icon-expert-landscaping.svg",
        title: "Expert Landscaping",
        description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
    },
    {
        icon: "/images/home/icon-reliable-support.svg",
        title: "Reliable Support",
        description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="relative w-full py-20">
            <div className="container px-20">
                <div className="grid grid-cols-[minmax(0,1fr)_495px] items-start gap-8 px-8">
                    <div className="flex min-w-0 flex-col items-start gap-9">
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="font-mono-label text-forrest text-xs uppercase">Why Choose us</p>
                            <p className="font-serif-display text-[40px] leading-[46px] font-normal whitespace-pre-wrap text-[#1a2e1a] not-italic">
                                {`Crafting Beautiful Outdoor `}
                                <br aria-hidden />
                                {`Spaces With Passion & `}
                                <br aria-hidden />
                                Precision.
                            </p>
                        </div>

                        <div className="flex min-w-0 items-start gap-[90px]">
                            <StatCard
                                value="20+"
                                label="Years Experience"
                                className="text-forrest flex shrink-0 flex-col items-start"
                                valueClassName="font-serif-display text-7xl"
                                labelClassName="font-mono-stat text-sm uppercase"
                            />
                            <div className="flex min-w-0 flex-col items-start gap-10">
                                <p className="w-full max-w-104 font-sans text-lg leading-7 font-normal whitespace-pre-wrap text-neutral-600">
                                    {`Qui id id labor occaecat Lorem labore. Et consectetur oaecat nisi  voluptate cupidatat ipsum laborum eiusmod sit.`}
                                </p>
                                <div className="bg-light-green-cta flex w-full min-w-0 items-start gap-4 rounded-xl p-6">
                                    {FEATURES.map((feature) => (
                                        <div
                                            key={feature.title}
                                            className="flex min-w-0 flex-1 items-start gap-4 overflow-clip"
                                        >
                                            <div className="flex size-[41px] shrink-0 items-center justify-center">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img alt="" className="block size-full max-w-none" src={feature.icon} />
                                            </div>
                                            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                                                <p className="font-serif-display text-xl leading-7 font-normal whitespace-nowrap text-black not-italic">
                                                    {feature.title}
                                                </p>
                                                <p className="w-full font-sans text-sm leading-[18px] font-normal text-[#6d827c]">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <PillButton
                            variant="primary"
                            size="md"
                            textClassName="text-primary-dark-2"
                            icon="lucide:arrow-right"
                        >
                            Discover More
                        </PillButton>
                    </div>

                    <div className="relative mt-[50px] h-121 w-[495px] shrink-0 rounded-xl">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Landscaping project"
                                className="absolute top-[0.07%] left-[-71.83%] h-[110.26%] w-[181.5%] max-w-none"
                                src="/images/home/landscaping-collage.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
