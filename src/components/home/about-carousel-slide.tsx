export type AboutCarouselSlideProps = {
    src: string;
    alt?: string;
    top?: string;
    left?: string;
};

export function AboutCarouselSlide({ src, alt = "Landscaping project", top = "0%", left = "0%" }: AboutCarouselSlideProps) {
    return (
        <div className="relative size-73 shrink-0 rounded-xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={alt}
                    className="absolute h-full w-[150.26%] max-w-none"
                    style={{ top, left }}
                    src={src}
                />
            </div>
        </div>
    );
}
