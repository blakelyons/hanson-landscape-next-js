import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Logo } from "@/components/ui/logo";
import { Carousel } from "@/components/ui/carousel";
import { HeroCarouselSlide, HeroCarouselSlideThumb } from "@/components/home/hero-carousel-slide";
import { GreenPlantSvg } from "@/components/ui/green-plant-leaf-svg";
import { HEADER_SLIDE_DURATION } from "@/components/layout/site-header";

gsap.registerPlugin(DrawSVGPlugin);

import { PillButton } from "@/components/ui/pill-button";

const HERO_STATS = [
    { value: "25+", label: "Years of craftsmanship" },
    { value: "500+", label: "Projects delivered" },
    { value: "100%", label: "Satisfaction rating" },
];

const SHOW_THUMBNAILS = true;
const MAX_VISIBLE_THUMBNAILS = 3;
const THUMBNAIL_SIZE_PX = 80; // matches size-20 on HeroCarouselSlideThumb
const THUMBNAIL_GAP_PX = 16;

const HERO_SLIDES = [
    { src: "/images/home/project-photo-1.webp", alt: "Home Hero Carousel Slide 1" },
    { src: "/images/home/project-photo-2.jpg", alt: "Home Hero Carousel Slide 2" },
    { src: "/images/home/project-photo-3.jpg", alt: "Home Hero Carousel Slide 3" },
    { src: "/images/home/project-photo-4.jpg", alt: "Home Hero Carousel Slide 4" },
];

const visibleThumbnailCount = Math.min(MAX_VISIBLE_THUMBNAILS, HERO_SLIDES.length);
const THUMBNAILS_MAX_WIDTH =
    visibleThumbnailCount * THUMBNAIL_SIZE_PX + (visibleThumbnailCount - 1) * THUMBNAIL_GAP_PX + 16;

export function HeroSection({ playIntro = true }: { playIntro?: boolean }) {
    useGSAP(() => {
        if (!playIntro) {
            gsap.set(
                [
                    ".hero-eyebrow",
                    ".hero-title-wrapper",
                    ".hero-subtitle",
                    ".hero-actions",
                    ".hero-stats-item",
                    ".hero-carousel-wrapper",
                    ".hero-carousel-actions",
                    ".hero-carousel-actions .btn",
                    ".scroll-cue",
                ],
                { x: 0, y: 0, opacity: 1 },
            );
            gsap.set(".hero-title-highlight", { backgroundPositionX: "0%" });
            gsap.set(".green-plant-svg", { opacity: 1, display: "block", scale: 1 });
            gsap.to("#mouse-icon .mouse-scroll-button", {
                y: 4,
                duration: 2,
                ease: "power1.out",
                repeat: -1,
                opacity: 0.1,
            });
            return;
        }

        const t = 1.8; // timeline duration
        const staggerDelay = t * 0.1;

        const scrollTimeilne = gsap.timeline({ defaults: { duration: 2, ease: "power1.out" } });
        // Delayed so the hero's own entrance starts right as the header
        // finishes its slide-down (see site-header.tsx's HEADER_SLIDE_DURATION).
        const heroMainTimeline = gsap.timeline({ defaults: { duration: t, ease: "power3.out" } });

        gsap.set(".green-plant-svg", { opacity: 0, display: "block", scale: 0, transformOrigin: "bottom center" });

        scrollTimeilne
            .to(
                ".scroll-cue",
                {
                    opacity: 1,
                    duration: t,
                    ease: "power3.out",
                },
                "<",
            )
            .to(
                "#mouse-icon .mouse-scroll-button",
                {
                    y: 4,
                    duration: 2,
                    ease: "power1.out",
                    repeat: -1,
                    opacity: 0.1,
                },
                "<",
            );

        const heroStatsItems = gsap.utils.toArray(".hero-stats-item");

        gsap.set(heroStatsItems, {
            opacity: 0,
            x: "-6rem",
        });

        heroMainTimeline
            .to(
                [".hero-eyebrow", ".hero-title-wrapper", ".hero-subtitle"],
                {
                    y: 0,
                    opacity: 1,
                    duration: t,
                    stagger: staggerDelay,
                    ease: "expo.inOut",
                },
                "<",
            )
            .to(
                ".hero-title-highlight",
                {
                    backgroundPositionX: "0%",
                    ease: "expo.inOut",
                },
                "<+=0.4",
            )
            .to(
                ".hero-actions",
                {
                    y: 0,
                    opacity: 1,
                    duration: t,
                    ease: "expo.inOut",
                },
                "<+=0.12",
            )
            .to(
                heroStatsItems,
                {
                    x: 0,
                    opacity: 1,
                    stagger: staggerDelay,
                },
                "<",
            )
            .to(
                ".hero-carousel-wrapper",
                {
                    opacity: 1,
                    duration: t,
                    ease: "expo.inOut",
                },
                "<",
            )
            .to(
                ".hero-carousel-actions",
                {
                    opacity: 1,
                    duration: t,
                    ease: "expo.inOut",
                },
                "<",
            )
            .to(
                ".green-plant-svg",
                {
                    opacity: 1,
                    scale: 1,
                    duration: t * 0.45,
                    ease: "bounce.out",
                },
                ">-=0.5",
            )
            .to(
                ".hero-carousel-actions .btn",
                {
                    opacity: 1,
                    duration: t * 0.45,
                    ease: "power3.inOut",
                    stagger: staggerDelay,
                },
                "<-=1.2",
            )
            .add(scrollTimeilne, ">+=1.5");
    }, [playIntro]);

    return (
        <section className="relative grid h-auto w-full overflow-clip bg-[#0e2113] pb-12 xl:h-screen xl:max-h-245">
            <div className="relative container h-full lg:pt-[calc(var(--header-height)+1.25rem)] xl:pt-[calc(var(--header-height)*1.1)]">
                <div className="grid h-full grid-cols-1 items-center gap-8 xl:grid-cols-2 xl:gap-12">
                    <div className="col z-1 grid place-items-center gap-8 text-center xl:place-items-start xl:gap-12 xl:text-left">
                        <Logo size="lg" className="mt-10 transition-all duration-300 ease-in-out lg:mt-0 lg:hidden" />
                        <div className="hero-eyebrow -mb-8 flex translate-y-10 flex-row flex-wrap items-center justify-center gap-3 opacity-0 lg:justify-start">
                            <div className="bg-primary h-0.5 w-9 shrink-0" />
                            <p className="text-primary font-sans text-sm font-medium tracking-[2.6px]">
                                {`CHICAGOLAND'S LANDSCAPE ARCHITECTS — EST. 2001`}
                            </p>
                        </div>
                        <div className="hero-title-wrapper translate-y-10 opacity-0">
                            <h1 className="font-serif-display hero-title relative -mb-1.5 overflow-hidden font-normal not-italic">
                                <span className="hero-section-title-wrapper inline-flex flex-row flex-wrap items-center justify-center gap-x-[0.5ch] gap-y-[0.25ch] xl:justify-start">
                                    <span className="hero-section-title-item">From</span> <span>blueprint</span>
                                    <span>to</span>
                                    <span className="hero-section-title-item hero-title-highlight font-serif-display relative inline-block font-normal italic">
                                        backyard.
                                    </span>
                                </span>
                            </h1>
                        </div>
                        <p className="hero-subtitle max-w-180 translate-y-10 text-center font-sans text-base font-normal text-pretty text-[rgba(250,251,248,0.78)] opacity-0 lg:text-lg lg:leading-7.5 xl:text-left">
                            Award-winning landscape design, construction, and year-round care for residential and
                            commercial properties across Chicagoland.
                        </p>
                        <div className="hero-actions flex translate-y-10 items-start gap-4 opacity-0">
                            <PillButton
                                variant="primary"
                                size="lg"
                                textClassName="text-forrest-dark-2"
                                icon="lucide:move-right"
                                animateIconOnHover={true}
                            >
                                {`Start Your Project`}
                            </PillButton>
                            <PillButton
                                variant="outline-white"
                                size="lg"
                                textClassName="text-[#fafbf8] hover:text-white font-medium"
                            >
                                View Our Work
                            </PillButton>
                        </div>
                        <div className="hero-stats mt-4 flex items-center justify-center gap-8 lg:mt-13.5 xl:justify-start">
                            {HERO_STATS.map((stat, index) => (
                                <div key={stat.value} className="contents">
                                    <div className="hero-stats-item flex -translate-x-24 flex-col items-center gap-1 text-center opacity-0 xl:items-start xl:text-left">
                                        <p className="font-serif-display text-4xl font-normal text-[#fafbf8] not-italic">
                                            {stat.value}
                                        </p>
                                        <p className="text-center font-sans text-sm font-normal text-[rgba(250,251,248,0.55)] xl:text-left">
                                            {stat.label}
                                        </p>
                                    </div>
                                    {index < HERO_STATS.length - 1 ? (
                                        <div className="hero-stats-item h-11 w-px shrink-0 -translate-x-24 bg-[rgba(250,251,248,0.18)] opacity-0" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col relative z-1 hidden items-center justify-center xl:flex">
                        <div className="grid w-full grid-cols-1 place-items-center gap-4">
                            <div className="w-full px-10">
                                <div className="overflow-x-hidden">
                                    <Carousel
                                        slides={HERO_SLIDES.map((photo) => (
                                            <HeroCarouselSlide key={photo.src} src={photo.src} alt={photo.alt} />
                                        ))}
                                        slidesPerView={1}
                                        showArrows={false}
                                        showDots={false}
                                        thumbnailsMaxWidth={THUMBNAILS_MAX_WIDTH}
                                        loop={true}
                                        effect="fade"
                                        fadeCrossFade={true}
                                        className="hero-carousel-wrapper w-full opacity-0"
                                        thumbnails={
                                            SHOW_THUMBNAILS
                                                ? HERO_SLIDES.map((photo) => (
                                                      <HeroCarouselSlideThumb
                                                          key={photo.src}
                                                          src={photo.src}
                                                          alt={photo.alt}
                                                      />
                                                  ))
                                                : undefined
                                        }
                                    />
                                </div>

                                <div className="absolute -right-10 bottom-30 z-9 -scale-x-100">
                                    <div className="green-plant-svg hidden">
                                        <GreenPlantSvg />
                                    </div>
                                </div>
                            </div>
                            <div className="hero-carousel-actions flex items-center justify-center gap-x-4 pt-8">
                                <PillButton
                                    variant="forrest-deep"
                                    size="sm"
                                    textClassName="text-white/50 hover:text-white uppercase !text-sm tracking-[2px] opacity-0"
                                    icon="lucide:building-complex"
                                    iconPosition="left"
                                    iconSize={16}
                                    animateIconOnHover={false}
                                >
                                    {`Commercial Landscaping`}
                                </PillButton>
                                <PillButton
                                    variant="forrest-deep"
                                    size="sm"
                                    textClassName="text-white/50 hover:text-white uppercase !text-sm tracking-[2px] opacity-0"
                                    icon="lucide:house"
                                    iconPosition="left"
                                    iconSize={16}
                                    animateIconOnHover={false}
                                >
                                    {`Residential Landscaping`}
                                </PillButton>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center">
                        {/* Decorative background layers — legitimately absolute, scoped to this section's 1440 column */}
                        <div className="absolute -top-15 -right-16 size-245">
                            <div className="absolute inset-[-32.65%]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow.svg" />
                            </div>
                        </div>
                        <div className="absolute top-140 -left-65 size-175">
                            <div className="absolute inset-[-42.86%]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt=""
                                    className="block size-full max-w-none"
                                    src="/images/home/bg-glow-amber.svg"
                                />
                            </div>
                        </div>
                        <div className="absolute top-0 -right-16 h-240 w-360">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt=""
                                className="absolute inset-0 block size-full max-w-none"
                                src="/images/home/bg-topo-contours.svg"
                            />
                        </div>
                        <div className="absolute right-0 size-175">
                            <svg
                                preserveAspectRatio="none"
                                overflow="visible"
                                style={{ display: "block" }}
                                width="700"
                                height="700"
                                viewBox="0 0 700 700"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                id="orbit-dots"
                            >
                                <g id="orbit-dot-particles">
                                    <circle id="particle" cx="302" cy="125" r="5" fill="#F89C1C" fillOpacity="0.9" />
                                    <circle id="particle_2" cx="163" cy="63" r="3" fill="#61A229" fillOpacity="0.8" />
                                    <circle id="particle_3" cx="566" cy="96" r="6" fill="#FAFBF8" fillOpacity="0.5" />
                                    <circle id="particle_4" cx="18" cy="485" r="6" fill="#FAFBF8" fillOpacity="0.5" />
                                    <circle
                                        id="particle_5"
                                        cx="643.5"
                                        cy="203.5"
                                        r="3.5"
                                        fill="#F89C1C"
                                        fillOpacity="0.7"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_6"
                                        cx="624.5"
                                        cy="424.5"
                                        r="4.5"
                                        fill="#61A229"
                                        fillOpacity="0.9"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_7"
                                        cx="92.5"
                                        cy="422.5"
                                        r="2.5"
                                        fill="#FAFBF8"
                                        fillOpacity="0.6"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_8"
                                        cx="192"
                                        cy="573"
                                        r="4"
                                        fill="#F89C1C"
                                        fillOpacity="0.6"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_9"
                                        cx="543"
                                        cy="583"
                                        r="3"
                                        fill="#61A229"
                                        fillOpacity="0.7"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_10"
                                        cx="422.5"
                                        cy="42.5"
                                        r="2.5"
                                        fill="#FBBD5E"
                                        fillOpacity="0.8"
                                        className="orbit-dot-particle"
                                    />
                                    <circle id="particle_11" cx="302" cy="92" r="2" fill="#FAFBF8" fillOpacity="0.4" />
                                    <circle
                                        id="particle_12"
                                        cx="63.5"
                                        cy="263.5"
                                        r="3.5"
                                        fill="#61A229"
                                        fillOpacity="0.5"
                                        className="orbit-dot-particle"
                                    />
                                    <circle
                                        id="particle_13"
                                        cx="662"
                                        cy="322"
                                        r="2"
                                        fill="#FBBD5E"
                                        fillOpacity="0.9"
                                        className="orbit-dot-particle"
                                    />
                                    <g id="Frame 33"></g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Floating scroll cue — legitimate small overlay, unrelated to content column's x-axis */}
                <div className="scroll-cue absolute -bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 opacity-0">
                    <div className="mouse text-muted flex items-center justify-center">
                        <svg
                            id="mouse-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8em"
                            height="1.8em"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                className="mouse-scroll-button"
                                fill="currentColor"
                                d="M11.25 10a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0z"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M18.75 9.074a6.75 6.75 0 0 0-13.5 0v5.852a6.75 6.75 0 0 0 13.5 0zm-5.931-5.186a5.25 5.25 0 0 1 4.431 5.186v5.852a5.25 5.25 0 0 1-10.5 0V9.074a5.25 5.25 0 0 1 6.069-5.186"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
