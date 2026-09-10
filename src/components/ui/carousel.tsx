"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
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

const BULLET_CLASS = "size-2 shrink-0 rounded-full bg-[#d9d9d9] cursor-pointer transition-all duration-300 ease-in-out";
const BULLET_ACTIVE_CLASS = "!bg-forrest size-2.5";

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
    const [thumbsSwiper, setThumbsSwiper] = useState<typeof Swiper | null>(null);

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
        <div className="flex w-full flex-col items-start gap-2">
            <div className="relative flex w-full items-center gap-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, Thumbs]}
                    observer
                    observeParents
                    slidesPerView={slidesPerView}
                    slidesPerGroup={1}
                    spaceBetween={spaceBetween}
                    loop={loop}
                    autoplay={autoplay === false ? false : { delay: autoplay === true ? 3000 : autoplay }}
                    navigation={showArrows ? { prevEl, nextEl } : false}
                    thumbs={{ swiper: thumbsSwiper }}
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
        </div>
    );
}
