type PageHeroProps = {
    breadcrumb: string;
    eyebrow: string;
    heading: string;
    description: string;
};

export function PageHero({ breadcrumb, eyebrow, heading, description }: PageHeroProps) {
    return (
        <section className="page-hero relative flex min-h-90 w-full items-center overflow-clip bg-[#0e2113]">
            <div className="relative container">
                {/* Decorative background — fixed treatment shared across all interior pages, not parameterized */}
                <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-end overflow-clip opacity-60 md:opacity-100">
                    <div className="jusfity-end absolute top-0 right-0 z-1 flex h-full items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="Heaer Background Dots"
                            className="block size-full max-w-none py-1"
                            src="/images/leaf-particles.svg"
                        />
                    </div>
                    <div className="absolute top-0 right-0 z-2 flex h-full items-center justify-end">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="Heaer Background Leaves"
                            className="block size-full max-w-none py-2"
                            src="/images/Leaves.svg"
                        />
                    </div>
                </div>
                <div className="relative z-10 flex flex-col items-start gap-3.5 py-10 md:py-16">
                    <p className="font-sans text-xs font-normal whitespace-pre-wrap text-[rgba(250,251,248,0.6)] sm:text-sm">
                        {breadcrumb}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary h-0.5 w-8 shrink-0" />
                        <p className="text-primary font-sans text-sm font-medium tracking-[2.6px] whitespace-nowrap">
                            {eyebrow}
                        </p>
                    </div>
                    <h1 className="font-serif-display text-4xl leading-tight font-normal text-[#fafbf8] not-italic sm:text-5xl lg:text-6xl lg:leading-15.5">
                        {heading}
                    </h1>
                    <p className="max-w-160 font-sans text-base leading-7 font-normal text-[rgba(250,251,248,0.78)] sm:text-lg sm:leading-7.5">
                        {description}
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 z-0 h-full w-full">
                <svg width="1418" height="402" viewBox="0 0 1418 402" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_982_32)">
                        <ellipse cx="515" cy="402" rx="583" ry="490" fill="#3A8545" fill-opacity="0.35" />
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_982_32"
                            x="-388"
                            y="-408"
                            width="1806"
                            height="1620"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="160" result="effect1_foregroundBlur_982_32" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </section>
    );
}
