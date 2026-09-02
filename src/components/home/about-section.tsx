import Link from "next/link";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PartnerLogos } from "@/components/ui/partner-logos";
import { StatCard } from "@/components/ui/stat-card";
import { Icon } from "@/components/ui/icon";
import { Carousel } from "@/components/ui/carousel";
import { AboutCarouselSlide } from "@/components/home/about-carousel-slide";

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
        <section className="relative w-full pt-20 pb-28">
            <div className="relative container overflow-x-clip">
                {/* Decorative tree illustration — freeform overlay to the right of the text column,
          intentionally tall enough to bleed under the next (opaque) section */}
                <div className="pointer-events-none absolute top-[62px] left-161 h-[979px] w-213">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="block size-full max-w-none" src="/images/home/about-tree.svg" />
                </div>

                <div className="ml-20 flex w-158 flex-col items-start gap-4 px-4">
                    <div className="flex h-42.5 w-[779px] flex-col items-center">
                        <p className="font-mono-label text-forrest w-full text-xs uppercase">about us</p>
                        <p className="font-serif-display w-full text-[48px] leading-[46px] font-normal text-[#333] not-italic">
                            Family-Owned. Passion-Driven.
                        </p>
                        <div className="h-4 w-full shrink-0" />
                        <p className="w-full font-sans text-[18px] leading-[28px] font-normal text-neutral-600">
                            {`For over two decades, we've poured our passion into creating beautiful, custom landscapes across Chicagoland. Every project is personal to us — our job isn't finished until you're completely happy with the result.   `}
                            <ArrowLink
                                href="/about"
                                icon="ci:arrow-right-lg"
                                className="text-[18px] leading-[28px] text-[#3a8545] hover:underline"
                            >
                                Read More
                            </ArrowLink>
                        </p>
                    </div>

                    <div className="text-forrest flex items-start gap-8">
                        {STATS.map((stat) => (
                            <StatCard key={stat.label} value={stat.value} label={stat.label} />
                        ))}
                    </div>

                    <div className="pt-8">
                        <Carousel
                            slides={ABOUT_PHOTOS.map((photo) => (
                                <AboutCarouselSlide key={photo.src} src={photo.src} top={photo.top} left={photo.left} />
                            ))}
                            slidesPerView={2}
                            loop
                        />
                    </div>

                    <PartnerLogos className="mt-6 ml-4 flex items-center gap-4" />
                </div>
            </div>
        </section>
    );
}
