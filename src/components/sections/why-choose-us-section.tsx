import { PillButton } from "@/components/ui/pill-button";
import { StatCard } from "@/components/ui/stat-card";

const FEATURES = [
  {
    icon: "/images/home/icon-expert-landscaping.svg",
    title: "Expert Landscaping",
    description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
  },
  {
    icon: "/images/home/icon-reliable-support.svg",
    title: "Reliable Support",
    description: "Enim do contur adipisicing consecrer magna anim proident in velit commodo.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative w-full py-20">
     <div className="container px-20">
      <div className="grid grid-cols-[minmax(0,1fr)_495px] items-start gap-8 px-8">
        <div className="flex min-w-0 flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-2.5">
            <p className="font-mono-label text-xs uppercase text-forrest">Why Choose us</p>
            <p className="whitespace-pre-wrap font-serif-display text-[40px] font-normal not-italic leading-[46px] text-[#1a2e1a]">
              {`Crafting Beautiful Outdoor `}
              <br aria-hidden />
              {`Spaces With Passion & `}
              <br aria-hidden />
              Precision.
            </p>
          </div>

          <div className="flex min-w-0 items-start gap-[90px]">
            <StatCard
              value="20+"
              label="Years Experience"
              className="flex shrink-0 flex-col items-start text-forrest"
              valueClassName="font-serif-display text-7xl"
              labelClassName="font-mono-stat text-sm uppercase"
            />
            <div className="flex min-w-0 flex-col items-start gap-10">
              <p className="w-full max-w-[416px] whitespace-pre-wrap font-sans text-lg font-normal leading-7 text-neutral-600">
                {`Qui id id labor occaecat Lorem labore. Et consectetur oaecat nisi  voluptate cupidatat ipsum laborum eiusmod sit.`}
              </p>
              <div className="flex w-full min-w-0 items-start gap-4 rounded-xl bg-light-green-cta p-6">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="flex min-w-0 flex-1 items-start gap-4 overflow-clip">
                    <div className="flex size-[41px] shrink-0 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" className="block size-full max-w-none" src={feature.icon} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                      <p className="whitespace-nowrap font-serif-display text-xl font-normal not-italic leading-7 text-black">
                        {feature.title}
                      </p>
                      <p className="w-full font-sans text-sm font-normal leading-[18px] text-[#6d827c]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PillButton
            variant="amber"
            size="md"
            textClassName="text-amber-dark-2"
            icon="/images/home/arrow-icon-discover-more.svg"
          >
            Discover More
          </PillButton>
        </div>

        <div className="relative mt-[50px] h-[484px] w-[495px] shrink-0 rounded-xl">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Landscaping project"
              className="absolute left-[-71.83%] top-[0.07%] h-[110.26%] w-[181.5%] max-w-none"
              src="/images/home/landscaping-collage.jpg"
            />
          </div>
        </div>
      </div>
     </div>
    </section>
  );
}
