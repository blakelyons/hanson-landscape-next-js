type PageHeroProps = {
    breadcrumb: string;
    eyebrow: string;
    heading: string;
    description: string;
};

export function PageHero({ breadcrumb, eyebrow, heading, description }: PageHeroProps) {
    return (
        <section className="relative w-full overflow-clip bg-[#0e2113]">
            {/* Decorative background — fixed treatment shared across all interior pages, not parameterized */}
            <div className="pointer-events-none absolute inset-0 overflow-clip">
                <div className="absolute -top-32 -left-24 size-150 max-w-none">
                    <div className="absolute inset-[-32.65%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow.svg" />
                    </div>
                </div>
                <div className="absolute top-0 -right-10 size-75 max-w-none opacity-80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/images/home/leaf-particles.svg"
                    />
                </div>
                <div className="absolute top-[10%] right-[12%] h-[70px] w-[90px] max-w-none -rotate-[22deg]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/images/home/page-hero-leaves-1.svg"
                    />
                </div>
                <div className="absolute top-[42%] right-[6%] h-15 w-[95px] max-w-none rotate-[62deg]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/images/home/page-hero-leaves-2.svg"
                    />
                </div>
                <div className="absolute top-[55%] right-[2%] h-[62px] w-[98px] max-w-none -scale-x-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/images/home/page-hero-leaves-3.svg"
                    />
                </div>
                <div className="absolute top-[62%] right-[16%] h-[46px] w-25 max-w-none -scale-x-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/images/home/page-hero-leaves-4.svg"
                    />
                </div>
            </div>

            <div className="relative container">
                <div className="relative z-10 flex flex-col items-start gap-3.5 px-30 py-16">
                    <p className="font-sans text-[13px] font-normal whitespace-pre-wrap text-[rgba(250,251,248,0.6)]">
                        {breadcrumb}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 shrink-0 bg-[#f89c1c]" />
                        <p className="text-primary font-sans text-[13px] font-medium tracking-[2.6px] whitespace-nowrap">
                            {eyebrow}
                        </p>
                    </div>
                    <h1 className="font-serif-display text-[56px] leading-[62px] font-normal text-[#fafbf8] not-italic">
                        {heading}
                    </h1>
                    <p className="max-w-160 font-sans text-lg leading-[30px] font-normal text-[rgba(250,251,248,0.78)]">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
