"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionIntro } from "@/components/ui/section-intro";
import { Icon } from "@/components/ui/icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const SERVICES = [
    {
        title: "Design",
        description: "Professional landscape design tailored to your vision, property, and lifestyle.",
        iconName: "lucide:pencil",
        iconColor: "#1E4A25",
        iconBg: "rgba(43,103,51,0.1)",
    },
    {
        title: "Build",
        description: "Expert construction from pavers and retaining walls to water features and outdoor living.",
        iconName: "lucide:shovel",
        iconColor: "#F89C1C",
        iconBg: "rgba(248,156,28,0.1)",
    },
    {
        title: "Maintain",
        description: "Complete maintenance including mowing, seasonal cleanup, and snow removal year-round.",
        icon: "/images/home/plant-icon.svg",
        iconBg: "rgba(159,51,34,0.1)",
    },
];

type ServiceCardProps = {
    className?: string;
};

function ServiceCard({
    title,
    description,
    icon,
    iconName,
    iconColor,
    iconBg,
    className,
}: ServiceCardProps &
    (typeof SERVICES)[number] & {
        icon?: string;
        iconName?: string;
        iconColor?: string;
    }) {
    return (
        <div
            className={`${className ? className : ""} border-muted service-card relative flex h-auto w-full flex-col items-start justify-center gap-9 overflow-hidden rounded-xl border bg-white p-8 transition-all duration-300 ease-in-out hover:drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.05)]`}
        >
            <div
                className="service-card__icon flex shrink-0 items-center justify-center overflow-hidden rounded-lg p-6"
                style={{ backgroundColor: iconBg }}
            >
                <div
                    className="service-card__icon-icon size-6 shrink-0"
                    style={iconColor ? { color: iconColor } : undefined}
                >
                    {iconName ? (
                        <Icon icon={iconName} className="size-full" />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="" className="block size-full max-w-none" src={icon} />
                    )}
                </div>
            </div>
            <div className="service-card__content relative flex h-full w-full flex-1 flex-col items-start gap-4">
                <p className="font-serif-display relative z-0 w-full min-w-full text-2xl leading-6 font-normal text-black not-italic">
                    {title}
                </p>
                <p className="relative z-0 w-full min-w-full font-sans text-sm leading-5.5 font-normal text-pretty text-black">
                    {description}
                </p>
            </div>
            <ArrowLink
                href="#"
                icon="lucide:arrow-right"
                iconWidth={12}
                iconHeight={14}
                textClassName="text-forrest text-sm font-normal"
                className="service-card__action relative z-0 h-6 w-auto flex-row items-center justify-start"
            >
                Learn More
            </ArrowLink>
        </div>
    );
}

export function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Runs once after every service card has completed its first render.
    useGSAP(
        () => {
            const icons = gsap.utils.toArray(".service-card .service-card__icon-icon");

            gsap.set(icons, {
                y: "200%",
            });

            gsap.set(".service-card__content", {
                opacity: 0,
                y: 16,
            });

            gsap.set(".service-card__action", {
                opacity: 0,
                x: "-110%",
            });

            const tl = gsap.timeline({
                defaults: { duration: 0.8, ease: "power2.inOut", stagger: 0.12, overwrite: "auto" },
                scrollTrigger: {
                    trigger: ".services-section .section-intro__title",
                    start: "top center+=15%",
                    end: "center top",
                },
            });

            tl.to(icons, {
                y: 0,
                ease: "bounce.out",
                duration: 0.6,
            })
                .to(
                    ".service-card__content",
                    {
                        opacity: 1,
                        y: 0,
                    },
                    "<",
                )
                .to(
                    ".service-card__action",
                    {
                        opacity: 1,
                        x: 0,
                    },
                    "<",
                );
        },
        { scope: containerRef },
    );

    return (
        <section
            className="services-section bg-neutral-25 relative flex w-full flex-col items-center justify-center py-20"
            ref={containerRef}
        >
            <div className="relative container flex flex-col items-center justify-center gap-15">
                <SectionIntro
                    animateEntrance
                    eyebrowColor="text-forrest"
                    className="w-full max-w-150"
                    eyebrow="What We Do"
                    heading="Expert Landscaping Services"
                    description="From initial design through ongoing maintenance, we create outdoor spaces that transform how you live."
                />
                <div className="service-grid grid w-full grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.title} {...service} className="w-full" />
                    ))}
                </div>
            </div>
        </section>
    );
}
