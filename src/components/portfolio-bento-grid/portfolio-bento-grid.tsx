"use client";
import { useRef } from "react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PROJECTS } from "@/content/projects";
import "./portfolio-bento-grid.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioBentoGrid() {
    const [featured, project1, project2, project3] = PROJECTS;
    const featuredProjectGrid = useRef<HTMLDivElement>(null);
    const featuredProjectCardInfo = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const featuredProjectImages = document.querySelectorAll(".portfolio-bento-grid__image");

            const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });

            tl.to(featuredProjectImages, {
                opacity: 1,
                stagger: 0.12,
                scrollTrigger: {
                    trigger: featuredProjectGrid.current,
                    start: "top center",
                    end: "bottom center+=25%",
                },
            });
        },
        { scope: featuredProjectGrid },
    );

    return (
        <section
            className="featured-project-grid relative flex w-full flex-col items-center overflow-clip"
            ref={featuredProjectGrid}
        >
            <div className="container flex flex-col items-end justify-center gap-4 py-20">
                <ArrowLink
                    href="/portfolio"
                    icon="lucide:arrow-right"
                    iconSize={14}
                    textClassName="text-forrest text-base font-medium"
                    className="shrink-0 items-center justify-center rounded-full"
                >
                    View All Projects
                </ArrowLink>

                <div className="portfolio-bento-grid gap-8">
                    {/* Featured Image */}
                    <div className="portfolio-bento-grid__featured-image portfolio-bento-grid__image relative flex h-full w-full shrink-0 flex-col items-center justify-end overflow-clip rounded-xl px-7 py-8 opacity-0">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={featured.cover.alt}
                                className="absolute h-full w-full object-cover"
                                src={featured.cover.src}
                            />
                        </div>
                        <div
                            ref={featuredProjectCardInfo}
                            className="featured-project-card relative flex w-full shrink-0 flex-col items-start gap-2.5 overflow-hidden rounded-lg bg-white px-3.5 py-4 drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)]"
                        >
                            <p className="font-serif-display w-full text-xl leading-5.5 font-normal text-black not-italic">
                                {featured.title}
                            </p>
                            <p className="w-full min-w-full font-sans text-sm leading-4.5 font-normal text-black">
                                {featured.summary}
                            </p>
                            <div className="border-light-green-cta flex w-full shrink-0 items-center justify-end gap-2.5 border-t pt-3">
                                <ArrowLink
                                    href={`/portfolio/${featured.slug}`}
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
                    <div className="portfolio-bento-grid__image portfolio-bento-grid__project-1 relative h-full w-full shrink-0 rounded-xl opacity-0">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={project1.cover.alt}
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src={project1.cover.src}
                            />
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="portfolio-bento-grid__image portfolio-bento-grid__project-2 relative h-full w-full shrink-0 rounded-xl opacity-0">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={project2.cover.alt}
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src={project2.cover.src}
                            />
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className="portfolio-bento-grid__image portfolio-bento-grid__project-3 relative h-full w-full shrink-0 rounded-xl opacity-0">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={project3.cover.alt}
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover object-center"
                                src={project3.cover.src}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
