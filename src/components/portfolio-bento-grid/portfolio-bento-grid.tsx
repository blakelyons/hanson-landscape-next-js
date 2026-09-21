"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import "./portfolio-bento-grid.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioBentoGrid() {
    useEffect(() => {
        const featuredProjectCard = document.querySelector(".featured-project-card");
        if (featuredProjectCard) {
            gsap.set(featuredProjectCard, { yPercent: 150 });

            gsap.to(featuredProjectCard, {
                yPercent: 0,
                duration: 0.5,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: featuredProjectCard,
                    start: "top bottom-=32px",
                    end: "top center-=5%",
                },
            });
        }
    }, []);

    return (
        <section className="relative flex w-full flex-col items-center overflow-clip">
            <div className="container flex flex-col items-end justify-center gap-4 pt-12 pb-20">
                <ArrowLink
                    href="#"
                    icon="lucide:arrow-right"
                    iconSize={14}
                    textClassName="text-forrest text-base font-medium"
                    className="shrink-0 items-center justify-center rounded-full"
                >
                    View All Projects
                </ArrowLink>

                <div className="portfolio-bento-grid gap-8">
                    {/* Featured Image */}
                    <div className="portfolio-bento-grid__featured-image relative flex h-full w-full shrink-0 flex-col items-center justify-end overflow-clip rounded-xl px-7 py-8">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Hanson Landscape featured project"
                                className="absolute h-full w-full object-cover"
                                src="/images/home/project-photo-1.jpg"
                            />
                        </div>
                        <div className="featured-project-card relative flex w-full shrink-0 flex-col items-start gap-2.5 overflow-hidden rounded-lg bg-white px-3.5 py-4 drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)]">
                            <p className="font-serif-display w-full text-xl leading-5.5 font-normal text-black not-italic">
                                Project Name
                            </p>
                            <p className="w-full min-w-full font-sans text-sm leading-4.5 font-normal text-black">
                                Non officia ullamco aute sit nulla ea magna ullamco.
                            </p>
                            <div className="border-light-green-cta flex w-full shrink-0 items-center justify-end gap-2.5 border-t pt-3">
                                <ArrowLink
                                    href="#"
                                    icon="lucide:arrow-right"
                                    iconSize={14}
                                    textClassName="text-forrest text-xs font-medium"
                                >
                                    View Project
                                </ArrowLink>
                            </div>
                        </div>
                    </div>

                    {/* Project 1 */}
                    <div className="portfolio-bento-grid__project-1 relative h-full w-full shrink-0 rounded-xl">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Hanson Landscape project 2"
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src="/images/home/project-photo-2.jpg"
                            />
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="portfolio-bento-grid__project-2 relative h-full w-full shrink-0 rounded-xl">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Hanson Landscape project 3"
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src="/images/home/project-photo-4.jpg"
                            />
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className="portfolio-bento-grid__project-3 relative h-full w-full shrink-0 rounded-xl">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Hanson Landscape project 4"
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src="/images/home/project-photo-3.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
