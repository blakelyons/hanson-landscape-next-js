"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import type { ProjectImage } from "@/content/projects";

const GROUP = "project-gallery";

export function ProjectGallery({ cover, gallery }: { cover: ProjectImage; gallery: ProjectImage[] }) {
    useEffect(() => {
        Fancybox.bind(`[data-fancybox='${GROUP}']`, {});
        return () => Fancybox.unbind(`[data-fancybox='${GROUP}']`);
    }, []);

    const thumbs = gallery.filter((image) => image.src !== cover.src).slice(0, 3);

    return (
        <div className="grid gap-4 lg:h-150 lg:grid-cols-3 lg:grid-rows-3">
            <a
                href={cover.src}
                data-fancybox={GROUP}
                data-caption={cover.alt}
                className="relative block aspect-video overflow-hidden rounded-xl lg:col-span-2 lg:row-span-3 lg:aspect-auto"
            >
                <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1280px) 800px, 100vw"
                    className="object-cover"
                />
            </a>
            {thumbs.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 lg:col-start-3 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-3">
                    {thumbs.map((image) => (
                        <a
                            key={image.src}
                            href={image.src}
                            data-fancybox={GROUP}
                            data-caption={image.alt}
                            className="relative block aspect-4/3 overflow-hidden rounded-xl lg:aspect-auto"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, 33vw"
                                className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
