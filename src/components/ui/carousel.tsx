"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper/types";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Icon } from "@/components/ui/icon";

export type CarouselProps = {
    slides: ReactNode[];
    slidesPerView: number;
    showDots?: boolean;
    showArrows?: boolean;
    thumbnails?: ReactNode[];
    thumbnailsSpaceBetween?: number;
    thumbnailsMaxWidth?: number;
    className?: string;
    loop?: boolean;
    autoplay?: boolean | number;
    spaceBetween?: number;
    effect?: "slide" | "fade";
    fadeCrossFade?: boolean;
};

const BULLET_CLASS = "size-2 shrink-0 rounded-full bg-[#d9d9d9] cursor-pointer transition-all duration-300 ease-in-out";
const BULLET_ACTIVE_CLASS = "!bg-forrest size-2.5";

export function Carousel({
    className = "",
    slides,
    slidesPerView,
    showDots = true,
    showArrows = true,
    thumbnails,
    thumbnailsSpaceBetween = 16,
    thumbnailsMaxWidth,
    loop = false,
    autoplay = false,
    spaceBetween = 16,
    effect = "slide",
    fadeCrossFade = false,
}: CarouselProps) {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollThumbsNext, setCanScrollThumbsNext] = useState(false);
    const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const updateCanScrollThumbsNext = () => {
        const el = thumbsContainerRef.current;
        if (!el) return;
        setCanScrollThumbsNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        if (!thumbnails) return;
        updateCanScrollThumbsNext();
        window.addEventListener("resize", updateCanScrollThumbsNext);
        return () => window.removeEventListener("resize", updateCanScrollThumbsNext);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thumbnails?.length, thumbnailsMaxWidth]);

    useEffect(() => {
        thumbRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, [activeIndex]);

    if (slides.length <= slidesPerView) {
        return (
            <div className="flex w-full items-center" style={{ gap: spaceBetween }}>
                {slides.map((slide, index) => (
                    <div key={index} className="shrink-0">
                        {slide}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex w-full flex-col items-start gap-2 ${className}`}>
            <div className="relative flex w-full items-center gap-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    observer
                    observeParents
                    slidesPerView={slidesPerView}
                    slidesPerGroup={1}
                    spaceBetween={spaceBetween}
                    loop={loop}
                    autoplay={autoplay === false ? false : { delay: autoplay === true ? 3000 : autoplay }}
                    navigation={showArrows ? { prevEl, nextEl } : false}
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    effect={effect}
                    fadeEffect={{ crossFade: fadeCrossFade }}
                    pagination={
                        showDots && paginationEl
                            ? {
                                  el: paginationEl,
                                  clickable: true,
                                  bulletClass: BULLET_CLASS,
                                  bulletActiveClass: BULLET_ACTIVE_CLASS,
                                  renderBullet: (_index, className) => `<span class="${className}"></span>`,
                              }
                            : false
                    }
                    className="w-full min-w-0"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>{slide}</SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {!thumbnails && (
                <div className="jusfity-between flex w-full items-center gap-4">
                    <div className="flex flex-1 items-center justify-start gap-2">
                        {showDots && (
                            <div ref={setPaginationEl} className="swiper-pagination flex items-center gap-2 py-1" />
                        )}
                    </div>

                    {showArrows && (
                        <div className="flex items-center justify-end gap-2">
                            <button
                                id="btn-prev"
                                ref={setPrevEl}
                                type="button"
                                aria-label="Prev slide"
                                className="text-forrest [&.swiper-button-disabled]:text-muted flex flex-1 cursor-pointer items-center rounded-full bg-transparent text-3xl transition-all duration-300 ease-in-out [&.swiper-button-disabled]:cursor-not-allowed"
                            >
                                <Icon icon="akar-icons:chevron-left-small" className="size-6" />
                            </button>
                            <button
                                id="btn-next"
                                ref={setNextEl}
                                type="button"
                                aria-label="Next slide"
                                className="text-forrest [&.swiper-button-disabled]:text-muted flex flex-1 cursor-pointer items-center rounded-full bg-transparent text-3xl transition-all duration-300 ease-in-out [&.swiper-button-disabled]:cursor-not-allowed"
                            >
                                <Icon icon="akar-icons:chevron-right-small" className="size-6" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {thumbnails && (
                <div className="z-10 ms-6 -mt-12 flex w-full items-center gap-2">
                    <div
                        ref={thumbsContainerRef}
                        onScroll={updateCanScrollThumbsNext}
                        style={thumbnailsMaxWidth ? { maxWidth: thumbnailsMaxWidth } : undefined}
                        className="flex scrollbar-none items-center overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {thumbnails.map((thumbnail, index) => (
                            <button
                                key={index}
                                ref={(el) => {
                                    thumbRefs.current[index] = el;
                                }}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => mainSwiper?.slideTo(index)}
                                style={{
                                    marginRight: index < thumbnails.length - 1 ? thumbnailsSpaceBetween : 0,
                                }}
                                className={`border-forrest hover:border-primary bg-forrest shrink-0 cursor-pointer rounded-xl border-2 transition-all duration-300 ease-in-out ${
                                    index === activeIndex ? "border-primary border-2" : ""
                                }`}
                            >
                                <span
                                    className={`h-full w-full ${index === activeIndex ? "" : "opacity-70 hover:opacity-100"}`}
                                >
                                    {thumbnail}
                                </span>
                            </button>
                        ))}
                    </div>
                    {(loop || canScrollThumbsNext) && (
                        <button
                            type="button"
                            aria-label="Next thumbnails"
                            onClick={() => mainSwiper?.slideNext()}
                            className="text-primary group mb-4 flex size-10 shrink-0 cursor-pointer items-center justify-center self-end rounded-full transition-all duration-300 ease-in-out active:translate-x-1"
                        >
                            <Icon icon="lucide:move-right" className="size-5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
