type PageHeroProps = {
    breadcrumb: string;
    eyebrow: string;
    heading: string;
    description: string;
};

export function PageHero({ breadcrumb, eyebrow, heading, description }: PageHeroProps) {
    return (
        <section className="relative w-full overflow-clip bg-[#0e2113]">
            <div className="relative container">
                {/* Decorative background — fixed treatment shared across all interior pages, not parameterized */}
                <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-end overflow-clip">
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
                <div className="relative z-10 flex flex-col items-start gap-3.5 py-16">
                    <p className="font-sans text-sm font-normal whitespace-pre-wrap text-[rgba(250,251,248,0.6)]">
                        {breadcrumb}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary h-0.5 w-8 shrink-0" />
                        <p className="text-primary font-sans text-sm font-medium tracking-[2.6px] whitespace-nowrap">
                            {eyebrow}
                        </p>
                    </div>
                    <h1 className="font-serif-display text-6xl leading-15.5 font-normal text-[#fafbf8] not-italic">
                        {heading}
                    </h1>
                    <p className="max-w-160 font-sans text-lg leading-7.5 font-normal text-[rgba(250,251,248,0.78)]">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
