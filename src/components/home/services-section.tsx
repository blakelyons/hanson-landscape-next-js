import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionIntro } from "@/components/ui/section-intro";

const SERVICES = [
  {
    title: "Design",
    description: "Professional landscape design tailored to your vision, property, and lifestyle.",
    icon: "/images/home/icon-design.svg",
    iconBg: "rgba(43,103,51,0.1)",
  },
  {
    title: "Build",
    description: "Expert construction from pavers and retaining walls to water features and outdoor living.",
    icon: "/images/home/shovel-icon.svg",
    iconBg: "rgba(248,156,28,0.1)",
  },
  {
    title: "Maintain",
    description: "Complete maintenance including mowing, seasonal cleanup, and snow removal year-round.",
    icon: "/images/home/plant-icon.svg",
    iconBg: "rgba(159,51,34,0.1)",
  },
];

function ServiceCard({ title, description, icon, iconBg }: (typeof SERVICES)[number]) {
  return (
    <div className="flex h-[324px] w-[337px] flex-col items-start justify-center gap-9 rounded-xl border border-[#cad5e2] bg-white p-8 drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.05)]">
      <div className="flex h-[194px] w-[220px] flex-col items-start gap-4">
        <div
          className="flex size-[60px] shrink-0 items-center justify-center rounded-lg p-6"
          style={{ backgroundColor: iconBg }}
        >
          <div className="size-6 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={icon} />
          </div>
        </div>
        <p className="w-full min-w-full font-serif-display text-2xl font-normal not-italic leading-6 text-black">
          {title}
        </p>
        <p className="w-full min-w-full font-sans text-sm font-normal leading-[22px] text-black">{description}</p>
      </div>
      <ArrowLink
        href="#"
        icon="/images/home/arrow-icon-learn-more.svg"
        iconWidth={12}
        iconHeight={14}
        textClassName="text-forrest text-sm font-normal"
        className="h-6 w-full items-center justify-between"
      >
        Learn More
      </ArrowLink>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center bg-neutral-25 py-20">
      <div className="container relative flex flex-col items-center justify-center gap-[60px] px-20">
        <SectionIntro
          className="h-[140px] w-[600px]"
          eyebrow="What We Do"
          heading="Expert Landscaping Services"
          description="From initial design through ongoing maintenance, we create outdoor spaces that transform how you live."
        />
        <div className="flex w-full items-center justify-center gap-[22px]">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <div className="absolute inset-[74.27%_82.97%_22.41%_15.16%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/images/home/cursor-arrow.svg" />
        </div>
      </div>
    </section>
  );
}
