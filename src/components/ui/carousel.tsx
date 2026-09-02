"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Icon } from "@/components/ui/icon";

export type CarouselProps = {
    slides: ReactNode[];
    slidesPerView: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    autoplay?: boolean | number;
    spaceBetween?: number;
};

const BULLET_CLASS = "size-2 shrink-0 rounded-full bg-[#d9d9d9] cursor-pointer";
const BULLET_ACTIVE_CLASS = "!bg-forrest";

export function Carousel({
    slides,
    slidesPerView,
    showDots = true,
    showArrows = true,
    loop = false,
    autoplay = false,
    spaceBetween = 16,
}: CarouselProps) {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

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
        <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center gap-4">
                {showArrows && (
                    <button
                        ref={setPrevEl}
                        type="button"
                        aria-label="Previous slide"
                        className="bg-forrest hover:bg-forrest-light flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out"
                    >
                        <Icon icon="ci:arrow-right-lg" className="rotate-180" />
                    </button>
                )}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={1}
                    spaceBetween={spaceBetween}
                    loop={loop}
                    autoplay={autoplay === false ? false : { delay: autoplay === true ? 3000 : autoplay }}
                    navigation={showArrows ? { prevEl, nextEl } : false}
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
                    className="w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>{slide}</SwiperSlide>
                    ))}
                </Swiper>
                {showArrows && (
                    <button
                        ref={setNextEl}
                        type="button"
                        aria-label="Next slide"
                        className="bg-forrest hover:bg-forrest-light flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out"
                    >
                        <Icon icon="ci:arrow-right-lg" />
                    </button>
                )}
            </div>
            {showDots && <div ref={setPaginationEl} className="swiper-pagination ml-6.5 flex items-center gap-2 py-3" />}
        </div>
    );
}
