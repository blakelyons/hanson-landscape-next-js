import { PillButton } from "@/components/ui/pill-button";

const STATS = [
  { value: "25+", label: "Years of craftsmanship" },
  { value: "500+", label: "Projects delivered" },
  { value: "100%", label: "Satisfaction rating" },
];

export function HeroSection() {
  return (
    <section className="relative h-[960px] w-full overflow-clip bg-[#0e2113]">
     <div className="container relative h-full">
      {/* Decorative background layers — legitimately absolute, scoped to this section's 1440 column */}
      <div className="absolute left-[620px] top-[-60px] size-[980px]">
        <div className="absolute inset-[-32.65%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow.svg" />
        </div>
      </div>
      <div className="absolute left-[-260px] top-[560px] size-[700px]">
        <div className="absolute inset-[-42.86%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow-amber.svg" />
        </div>
      </div>
      <div className="absolute left-0 top-0 h-[960px] w-[1440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/bg-topo-contours.svg" />
      </div>

      {/* Content column — real flex flow instead of independently-pinned blocks */}
      <div className="relative z-10 flex flex-col items-start pt-[257px]">
        <div className="ml-[84px] flex items-center gap-3">
          <div className="h-[2px] w-[36px] shrink-0 bg-[#f89c1c]" />
          <p className="whitespace-nowrap font-sans text-[13px] font-medium tracking-[2.6px] text-[#f89c1c]">
            {`CHICAGOLAND'S LANDSCAPE ARCHITECTS — EST. 2001`}
          </p>
        </div>

        <div className="ml-[80px] mt-[22px] flex flex-col items-start whitespace-nowrap text-[96px] leading-[102px]">
          <p className="mb-[-6px] font-serif-display font-normal not-italic text-[#fafbf8]">From blueprint</p>
          <div className="flex items-baseline gap-6">
            <p className="font-serif-display font-normal not-italic text-[#fafbf8]">to</p>
            <p className="font-serif-display font-normal italic text-[#f89c1c]">backyard.</p>
          </div>
        </div>

        <p className="ml-[84px] mt-[38px] w-[480px] font-sans text-lg font-normal leading-[30px] text-[rgba(250,251,248,0.78)]">
          Award-winning landscape design, construction, and year-round care for residential and
          commercial properties across Chicagoland.
        </p>

        <div className="ml-[84px] mt-14 flex items-start gap-4">
          <PillButton variant="amber" size="lg" textClassName="text-[#15240f]">
            {`Start Your Project  →`}
          </PillButton>
          <PillButton variant="outline" size="lg" textClassName="text-[#fafbf8] font-medium">
            View Our Work
          </PillButton>
        </div>

        <div className="ml-[84px] mt-[54px] flex items-center gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.value} className="contents">
              <div className="flex flex-col items-start gap-1 whitespace-nowrap">
                <p className="font-serif-display text-[34px] font-normal not-italic text-[#fafbf8]">{stat.value}</p>
                <p className="font-sans text-[13px] font-normal text-[rgba(250,251,248,0.55)]">{stat.label}</p>
              </div>
              {index < STATS.length - 1 ? <div className="h-[44px] w-px shrink-0 bg-[rgba(250,251,248,0.18)]" /> : null}
            </div>
          ))}
        </div>
      </div>

      {/* Floating scroll cue — legitimate small overlay, unrelated to content column's x-axis */}
      <div className="absolute left-[700px] top-[876px] flex flex-col items-center gap-2">
        <p className="whitespace-nowrap font-sans text-[10px] font-medium tracking-[2.4px] text-[rgba(250,251,248,0.5)]">
          SCROLL
        </p>
        <div className="h-[36px] w-[2px] shrink-0 bg-[#f89c1c]" />
      </div>

      {/* Freeform decorative graphic cluster — genuinely overlapping composition, kept as a scoped absolute cluster */}
      <div className="absolute left-[690px] top-[120px] size-[700px]">
        <div className="absolute left-[71px] top-[470px] h-[110px] w-[558px]">
          <div className="absolute inset-[-63.64%_-12.54%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src="/images/home/island-shadow.svg" />
          </div>
        </div>
        <div className="absolute left-[18px] top-[296px] h-[357px] w-[585px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" height={357} width={585} src="/images/home/orbit-ring-1.png" />
        </div>
        <div className="absolute left-[144px] top-[102.91px] flex h-[595.687px] w-[456.245px] items-center justify-center">
          <div className="flex-none rotate-[91.41deg]">
            <div className="relative h-[442px] w-[585px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 block size-full max-w-none" height={442} width={585} src="/images/home/orbit-ring-2.png" />
            </div>
          </div>
        </div>
        <div className="absolute left-[97px] top-[182px] h-[347px] w-[522px] rounded-[18px] border border-[#41754b] shadow-[0px_4px_13.7px_6px_rgba(0,0,0,0.15)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Hanson Landscape project"
            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[18px] object-cover"
            src="/images/home/project-photo-1.jpg"
          />
        </div>
        <div className="absolute left-0 top-0 size-[700px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/leaf-particles.svg" />
        </div>
        <div className="absolute left-[130px] top-[627px] flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-2 rounded-[999px] border border-[rgba(250,251,248,0.14)] bg-[#29462f] py-2 pl-3 pr-3.5">
            <div className="flex size-3 shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/images/home/icon-building.svg" />
            </div>
            <p className="whitespace-nowrap font-sans text-[10px] font-medium tracking-[1.8px] text-[rgba(250,251,248,0.65)]">
              COMMERCIAL LANDSCAPING
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-[999px] border border-[rgba(250,251,248,0.14)] bg-[#29462f] py-2 pl-3 pr-3.5">
            <div className="flex size-3 shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/images/home/icon-house.svg" />
            </div>
            <p className="whitespace-nowrap font-sans text-[10px] font-medium tracking-[1.8px] text-[rgba(250,251,248,0.65)]">
              RESIDENTIAL LANDSCAPING
            </p>
          </div>
        </div>
        <div className="absolute left-[200px] top-[507px] flex w-[169px] items-center gap-2">
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[50px] rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[4px] object-cover" src="/images/home/hero-thumb-1.png" />
              </div>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative h-[50px] w-[53px] rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[4px] object-cover" src="/images/home/hero-thumb-2.jpg" />
              </div>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[50px] rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[4px] object-cover" src="/images/home/project-photo-3.jpg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[514px] top-[449px] flex h-[100px] w-[175px] items-center justify-center">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="relative h-[100px] w-[175px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/plant-vector-hero.svg" />
            </div>
          </div>
        </div>
        <div className="absolute inset-[66.57%_72.94%_18.77%_7.43%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/home/leaves.svg" />
        </div>
      </div>

      <div className="absolute left-[1066px] top-[657px] flex size-3 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src="/images/home/arrow-icon-lg-hero.svg" />
      </div>
     </div>
    </section>
  );
}
