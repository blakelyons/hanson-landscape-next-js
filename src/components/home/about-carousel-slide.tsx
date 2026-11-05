"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import { Icon } from "@/components/ui/icon";

const LIGHTBOX_MAX_WIDTH = 1080;

export type AboutCarouselSlideProps = {
    src: string;
    alt?: string;
};

export function AboutCarouselSlide({ src, alt = "Landscaping project" }: AboutCarouselSlideProps) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='about-carousel']", {
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
        <div className="group relative size-73 w-full shrink-0 rounded-xl">
            <div
                className="absolute inset-0 cursor-pointer overflow-hidden rounded-xl"
                data-fancybox="about-carousel"
                data-src={src}
            >
                <Image
                    alt={alt}
                    className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-102"
                    src={src}
                    fill
                    sizes="(min-width: 1280px) 24vw, 80vw"
                />
            </div>
            <button
                type="button"
                aria-label="Enlarge image"
                className="bg-primary pointer-events-none absolute top-3 left-3 z-10 flex size-9 items-center justify-center overflow-hidden rounded-lg text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            >
                <Icon
                    icon="lucide:expand"
                    className="transition-translate -translate-x-10 text-lg delay-150 duration-300 ease-in-out group-hover:translate-x-0"
                />
            </button>
        </div>
    );
}
