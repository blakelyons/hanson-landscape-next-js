import { PartnerLogos } from "@/components/ui/partner-logos";
import { StatCard } from "@/components/ui/stat-card";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "3x", label: "camme award" },
  { value: "100%", label: "satisfaction" },
];

export function AboutSection() {
  return (
    <section className="relative w-full pt-20 pb-[112px]">
     <div className="container relative">
      {/* Decorative tree illustration — freeform overlay to the right of the text column,
          intentionally tall enough to bleed under the next (opaque) section */}
      <div className="pointer-events-none absolute left-[644px] top-[62px] h-[979px] w-[852px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src="/images/home/about-tree.svg" />
      </div>
      <div className="pointer-events-none absolute left-[487px] top-[142px] size-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src="/images/home/arrow-icon-lg-amber.svg" />
      </div>

      <div className="ml-[80px] flex w-[632px] flex-col items-start gap-4 px-4">
        <div className="flex h-[169px] w-[779px] flex-col items-center">
          <p className="w-full font-mono-label text-xs uppercase text-forrest">about us</p>
          <p className="w-full font-serif-display text-[48px] font-normal not-italic leading-[46px] text-[#333]">
            Family-Owned. Passion-Driven.
          </p>
          <div className="h-4 w-full shrink-0" />
          <p className="w-full font-sans text-[18px] font-normal leading-[28px] text-neutral-600">
            {`For over two decades, we've poured our passion into creating beautiful, custom landscapes across Chicagoland. Every project is personal to us — our job isn't finished until you're completely happy with the result.   `}
            <a href="/about" className="text-[18px] leading-[28px] text-[#3a8545] hover:underline">
              Read More
            </a>
          </p>
        </div>

        <div className="size-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/images/home/arrow-icon-lg-green.svg" />
        </div>

        <div className="flex items-start gap-8 text-forrest">
          {STATS.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <div className="flex w-full items-center gap-4 pt-8">
          <div className="relative size-[292px] shrink-0 rounded-xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Landscaping project"
                className="absolute left-[-4.45%] top-[0.05%] h-full w-[150.26%] max-w-none"
                src="/images/home/project-photo-3.jpg"
              />
            </div>
          </div>
          <div className="relative size-[292px] shrink-0 rounded-xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Landscaping project"
                className="absolute left-[-10.31%] top-[0.06%] h-full w-[150.26%] max-w-none"
                src="/images/home/about-carousel-photo-2.jpg"
              />
            </div>
          </div>
        </div>

        <div className="ml-[26px] flex items-center gap-2 py-3">
          <span className="size-2 shrink-0 rounded-full bg-forrest" />
          <span className="size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
          <span className="size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
          <span className="size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
          <span className="size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
        </div>

        <PartnerLogos className="ml-4 mt-6 flex items-center gap-4" />
      </div>
     </div>
    </section>
  );
}
