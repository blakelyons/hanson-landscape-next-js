"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import Image from "next/image";

const LIGHTBOX_MAX_WIDTH = 1080;

export type HeroCarouselSlideProps = {
    src: string;
    alt?: string;
};

export const HeroCarouselSlideThumb = ({ src, alt = "Home Hero Carousel Slide" }: HeroCarouselSlideProps) => {
    return (
        <div className="relative size-20 shrink-0 rounded-xl shadow-lg shadow-black/40">
            <Image
                src={src}
                alt={alt}
                fill
                className="pointer-events-none absolute inset-0 size-full rounded-xl object-cover"
            />
        </div>
    );
};

export function HeroCarouselSlide({ src, alt = "Home Hero Carousel Slide" }: HeroCarouselSlideProps) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='hero-carousel']", {
            Carousel: {
                Zoomable: {
                    Panzoom: {
                        width: (panzoom) => {
                            const img = panzoom.getContent();
                            return img instanceof HTMLImageElement && img.naturalWidth
                                ? Math.min(img.naturalWidth, LIGHTBOX_MAX_WIDTH)
                                : "auto";
                        },
                        height: (panzoom) => {
                            const img = panzoom.getContent();
                            if (!(img instanceof HTMLImageElement) || !img.naturalWidth || !img.naturalHeight) {
                                return "auto";
                            }
                            const width = Math.min(img.naturalWidth, LIGHTBOX_MAX_WIDTH);
                            return (width / img.naturalWidth) * img.naturalHeight;
                        },
                    },
                },
            },
        });
    }, []);

    return (
        <div className="flex aspect-4/3 max-h-100 w-[calc(100%-32px)] flex-col items-center justify-center">
            <div className="relative h-full w-full rounded-2xl border border-[#41754b] shadow-lg shadow-black/40">
                <Image
                    data-fancybox="hero-carousel"
                    data-src={src}
                    src={src}
                    alt={alt}
                    fill
                    className="pointer-events-none absolute inset-0 z-10 size-full max-w-none rounded-2xl object-cover"
                    loading="eager"
                    preload={true}
                />
            </div>
        </div>
    );
}
