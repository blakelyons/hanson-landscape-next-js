import { useRef } from "react";
import { SectionIntro } from "@/components/ui/section-intro";
import { PillButton } from "@/components/ui/pill-button";
import { Icon } from "@/components/ui/icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const STEPS = [
    {
        iconName: "lucide:glasses",
        iconColor: "#2B6733",
        title: "Share Your Vision",
        number: "01",
        description: "Tell us about your outdoor space, ideas, and goals. We listen carefully",
    },
    {
        iconName: "lucide:list-todo",
        iconColor: "#2B6733",
        title: "Get a Custom Plan",
        number: "02",
        description: "Our team designs a personalized landscaping plan tailored",
    },
    {
        iconName: "lucide:construction",
        iconColor: "#2B6733",
        title: "On-Site Execution",
        number: "03",
        description: "We bring the design to life using quality plants, materials, and expert",
    },
    {
        iconName: "lucide:hand-heart",
        iconColor: "#2B6733",
        title: "Maintain",
        number: "04",
        description: "We refine every detail and ensure the result meets our quality standards.",
    },
];

export function ProcessSection() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const stepHeaders = gsap.utils.toArray<SVGGeometryElement>(
                ".process-steps__step-header svg path, .process-steps__step-header svg circle, .process-steps__step-header svg rect",
            );

            gsap.set(stepHeaders, { drawSVG: "0%" });

            const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power1.out" } });
            tl.to(stepHeaders, {
                drawSVG: "100%",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center+=20%",
                    end: "top center-=20%",
                    scrub: true,
                    markers: true,
                },
            });
        },
        { scope: container },
    );

    return (
        <section
            ref={container}
            className="our-process-section bg-neutral-25 relative hidden w-full flex-col items-center justify-center py-20 xl:flex"
        >
            <div className="relative container flex flex-col items-center justify-center gap-12">
                <SectionIntro className="w-170" eyebrow="Our process" heading="How We Bring Your Project to Life" />

                <div className="process-steps w-285 rounded-xl border border-neutral-200 bg-white px-12 py-10">
                    <div className="grid grid-cols-4 items-end gap-x-8">
                        {STEPS.map((step) => (
                            <div
                                key={`${step.number}-title`}
                                className="process-steps__step-header flex flex-col items-center gap-2 text-center"
                            >
                                <div
                                    className="size-12 shrink-0"
                                    style={step.iconColor ? { color: step.iconColor } : undefined}
                                >
                                    <Icon icon={step.iconName} width={48} height={48} ssr />
                                </div>
                                <p className="process-steps__step-title font-sans text-lg leading-7 font-bold whitespace-nowrap text-black">
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
