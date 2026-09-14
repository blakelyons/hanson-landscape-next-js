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
            <div className="relative container">
                <div className="grid grid-cols-[minmax(0,1fr)_1/3] items-start gap-8 px-8">
                    <div className="z-4 flex w-full flex-col items-start gap-9 xl:w-120">
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="font-mono-label text-forrest text-xs uppercase">Why Choose us</p>
                            <p className="font-serif-display text-5xl leading-11.5 font-normal whitespace-pre-wrap text-[#1a2e1a] not-italic">
                                {`Crafting Beautiful Outdoor `}
                                <br aria-hidden />
                                {`Spaces With Passion & `}
                                <br aria-hidden />
                                Precision.
                            </p>
                        </div>

                        <div className="flex min-w-0 items-start gap-22">
                            <div className="grid gap-4">
                                <StatCard
                                    value="20+"
                                    label="Years Experience"
                                    className="text-forrest flex shrink-0 flex-col items-start"
                                    valueClassName="font-serif-display text-7xl"
                                    labelClassName="font-mono-stat text-sm uppercase"
                                />
                                <PillButton
                                    variant="primary"
                                    size="md"
                                    textClassName="text-primary-dark-2 mt-8"
                                    icon="lucide:arrow-right"
                                >
                                    Discover More
                                </PillButton>
                                <div className="pointer-events-none mt-6 h-25 w-43.75 lg:mt-6 lg:-translate-x-10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt=""
                                        className="block size-full max-w-none"
                                        src="/images/home/plant-vector-standalone.svg"
                                    />
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col items-start gap-10">
                                <p className="w-full max-w-104 font-sans text-lg leading-7 font-normal whitespace-pre-wrap text-neutral-600">
                                    {`Qui id id labor occaecat Lorem labore. Et consectetur oaecat nisi  voluptate cupidatat ipsum laborum eiusmod sit.`}
                                </p>
                                <div className="bg-light-green-cta flex w-full min-w-0 items-start gap-4 rounded-xl p-6">
                                    {FEATURES.map((feature) => (
                                        <div key={feature.title} className="flex min-w-0 flex-1 items-start gap-6">
                                            <div className="flex size-10.25 shrink-0 items-center justify-center">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <span className="text-forrest shrink-0 items-center justify-center text-5xl">
                                                    <Icon icon={feature.icon} />
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col items-start gap-2 xl:min-w-75">
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
                    </div>

                    <div className="right-0 z-0 order-first flex h-full w-full shrink-0 items-center rounded-xl xl:absolute xl:order-last xl:w-1/2 xl:px-10">
                        <div className="pointer-events-none relative inset-0 h-full w-full overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Landscaping project"
                                className="h-full w-full object-cover"
                                src="/images/home/landscaping-collage.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
