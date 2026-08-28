type PageHeroProps = {
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  description: string;
};

export function PageHero({ breadcrumb, eyebrow, heading, description }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-clip bg-[#0e2113]">
      <div className="container relative">
        {/* Decorative background — fixed treatment shared across all interior pages, not parameterized */}
        <div className="pointer-events-none absolute inset-0 overflow-clip">
          <div className="absolute -left-24 -top-32 size-[600px] max-w-none">
            <div className="absolute inset-[-32.65%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow.svg" />
            </div>
          </div>
          <div className="absolute -right-10 top-0 size-[300px] max-w-none opacity-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/leaf-particles.svg" />
          </div>
          <div className="absolute right-[12%] top-[10%] h-[70px] w-[90px] max-w-none -rotate-[22deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/page-hero-leaves-1.svg" />
          </div>
          <div className="absolute right-[6%] top-[42%] h-[60px] w-[95px] max-w-none rotate-[62deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/page-hero-leaves-2.svg" />
          </div>
          <div className="absolute right-[2%] top-[55%] h-[62px] w-[98px] max-w-none -scale-x-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/page-hero-leaves-3.svg" />
          </div>
          <div className="absolute right-[16%] top-[62%] h-[46px] w-[100px] max-w-none -scale-x-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/page-hero-leaves-4.svg" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start gap-3.5 px-[120px] py-16">
          <p className="whitespace-pre-wrap font-sans text-[13px] font-normal text-[rgba(250,251,248,0.6)]">
            {breadcrumb}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 shrink-0 bg-primary" />
            <p className="whitespace-nowrap font-sans text-[13px] font-medium tracking-[2.6px] text-primary">
              {eyebrow}
            </p>
          </div>
          <h1 className="font-serif-display text-[56px] font-normal not-italic leading-[62px] text-[#fafbf8]">
            {heading}
          </h1>
          <p className="max-w-[640px] font-sans text-lg font-normal leading-[30px] text-[rgba(250,251,248,0.78)]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
