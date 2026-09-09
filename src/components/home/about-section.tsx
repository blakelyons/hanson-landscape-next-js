import { SectionIntro } from "@/components/ui/section-intro";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PartnerLogos } from "@/components/ui/partner-logos";
import { StatCard } from "@/components/ui/stat-card";
import { Carousel } from "@/components/ui/carousel";
import { AboutCarouselSlide } from "@/components/home/about-carousel-slide";
import { LargeTreeSvg } from "@/components/ui/large-tree-svg";

const STATS = [
    { value: "20+", label: "Years Experience" },
    { value: "3x", label: "camme award" },
    { value: "100%", label: "satisfaction" },
];

const ABOUT_PHOTOS = [
    { src: "/images/home/project-photo-3.jpg", top: "0.05%", left: "-4.45%" },
    { src: "/images/home/about-carousel-photo-2.jpg", top: "0.06%", left: "-10.31%" },
    { src: "/images/home/project-photo-1.jpg" },
    { src: "/images/home/project-photo-2.jpg" },
    { src: "/images/home/project-photo-4.jpg" },
];

export function AboutSection() {
    return (
        <section className="home-about-section relative w-full xl:h-screen xl:max-h-210">
            <div className="relative container h-full overflow-x-clip">
                <div className="grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-[55%_1fr]">
                    <div className="grid place-content-start gap-4 pt-20 md:h-210">
                        <div className="relative z-2 block overflow-x-hidden">
                            <SectionIntro
                                animateEntrance
                                eyebrow="About Us"
                                horizontalAlignment="start"
                                heading="Family-Owned. Passion-Driven."
                                description={`For over two decades, we've poured our passion into creating beautiful, custom landscapes across Chicagoland. Every project is personal to us — our job isn't finished until you're completely happy with the result.   `}
                                descriptionClassName="w-full font-sans text-base leading-relaxed font-normal text-neutral-600"
                                cta={
                                    <ArrowLink
                                        href="/about"
                                        icon="ci:arrow-right-lg"
                                        className="text-forrest-light hover:text-primary ms-2 text-base leading-relaxed"
                                    >
                                        Read More
                                    </ArrowLink>
                                }
                            />
                        </div>
                        <div className="about-section__overflow-clip relative block overflow-x-hidden">
                            <div className="text-forrest about-section__stats flex flex-wrap items-start gap-x-9 gap-y-4 py-4">
                                {STATS.map((stat) => (
                                    <StatCard key={stat.label} value={stat.value} label={stat.label} />
                                ))}
                            </div>

                            <div className="about-section__carousel-wrapper w-full pt-8">
                                <Carousel
                                    slides={ABOUT_PHOTOS.map((photo) => (
                                        <AboutCarouselSlide
                                            key={photo.src}
                                            src={photo.src}
                                            top={photo.top}
                                            left={photo.left}
                                        />
                                    ))}
                                    slidesPerView={2}
                                    showArrows={true}
                                />
                            </div>

                            <PartnerLogos className="mt-6 ml-4 flex items-center gap-4" />
                        </div>
                    </div>
                    <div className="block h-full">
                        <div className="pointer-events-none absolute -right-20 -bottom-45 flex h-full w-full items-end justify-end opacity-10 transition-all duration-300 ease-in-out xl:opacity-100">
                            <LargeTreeSvg />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
