"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import { Icon } from "@/components/ui/icon";

const LIGHTBOX_MAX_WIDTH = 1080;

export type AboutCarouselSlideProps = {
    src: string;
    alt?: string;
    top?: string;
    left?: string;
};

export function AboutCarouselSlide({
    src,
    alt = "Landscaping project",
    top = "0%",
    left = "0%",
}: AboutCarouselSlideProps) {
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={alt}
                    className="h-full w-full max-w-215 object-cover transition-transform duration-600 ease-in-out group-hover:scale-102"
                    style={{ top, left }}
                    src={src}
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
