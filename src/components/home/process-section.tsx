import { SectionIntro } from "@/components/ui/section-intro";
import { PillButton } from "@/components/ui/pill-button";
import { Icon } from "@/components/ui/icon";

const STEPS = [
    {
        iconName: "lucide:arrow-up-right",
        iconColor: "#2B6733",
        title: "Share Your Vision",
        number: "01",
        description: "Tell us about your outdoor space, ideas, and goals. We listen carefully",
    },
    {
        icon: "/images/home/plant-04-icon.svg",
        title: "Get a Custom Plan",
        number: "02",
        description: "Our team designs a personalized landscaping plan tailored",
    },
    {
        icon: "/images/home/plant-03-group.svg",
        title: "On-Site Execution",
        number: "03",
        description: "We bring the design to life using quality plants, materials, and expert",
    },
    {
        icon: "/images/home/tree-02-icon.svg",
        title: "On-Site Execution",
        number: "04",
        description: "We refine every detail and ensure the result meets our quality standards.",
    },
];

export function ProcessSection() {
    return (
        <section className="bg-neutral-25 relative flex w-full flex-col items-center justify-center py-20">
            <div className="relative container flex flex-col items-center justify-center gap-12 px-20">
                {/* Decorative plant illustration accenting the section's top-left corner */}
                <div className="pointer-events-none absolute -top-16 left-6 h-25 w-[175px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="block size-full max-w-none" src="/images/home/plant-vector-standalone.svg" />
                </div>

                <SectionIntro className="w-170" eyebrow="Our process" heading="How We Bring Your Project to Life" />

                <div className="w-285 rounded-xl border border-neutral-200 bg-white px-12 py-10">
                    <div className="grid grid-cols-4 items-end gap-x-8">
                        {STEPS.map((step) => (
                            <div key={`${step.number}-title`} className="flex flex-col items-center gap-2 text-center">
                                <div
                                    className="size-12 shrink-0"
                                    style={step.iconColor ? { color: step.iconColor } : undefined}
                                >
                                    {step.iconName ? (
                                        <Icon icon={step.iconName} width={48} height={48} />
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img alt="" className="block size-full max-w-none" src={step.icon} />
                                    )}
                                </div>
                                <p className="font-sans text-lg leading-7 font-bold whitespace-nowrap text-black">
                                    {step.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-10 grid grid-cols-4 items-center gap-x-8">
                        <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
                        {STEPS.map((step) => (
                            <div
                                key={`${step.number}-bullet`}
                                className="bg-light-green-cta relative z-10 mx-auto flex size-12 shrink-0 flex-col items-center justify-center rounded-full"
                            >
                                <p className="w-full text-center font-sans text-lg leading-7 font-bold text-black">
                                    {step.number}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-x-8 text-center font-sans text-sm leading-[18px] font-normal text-black">
                        {STEPS.map((step) => (
                            <p key={`${step.number}-desc`} className="mx-auto w-[183px]">
                                {step.description}
                            </p>
                        ))}
                    </div>

                    <div className="bg-primary-light mt-10 flex w-full items-center justify-between gap-8 rounded-xl px-12 py-[18px]">
                        <p className="font-sans text-sm leading-[18px] font-semibold whitespace-nowrap text-black">
                            Are You Prepared to Get Started on a Gorgeous Outdoor Area?
                        </p>
                        <PillButton
                            variant="primary"
                            size="sm"
                            textClassName="text-[#1a2e1a]"
                            icon="ci:arrow-right-lg"
                            iconSize={12}
                        >
                            Get In Touch
                        </PillButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
