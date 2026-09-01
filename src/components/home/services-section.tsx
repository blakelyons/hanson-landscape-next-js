import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionIntro } from "@/components/ui/section-intro";
import { Icon } from "@/components/ui/icon";

const SERVICES = [
    {
        title: "Design",
        description: "Professional landscape design tailored to your vision, property, and lifestyle.",
        iconName: "lucide:pencil",
        iconColor: "#1E4A25",
        iconBg: "rgba(43,103,51,0.1)",
    },
    {
        title: "Build",
        description: "Expert construction from pavers and retaining walls to water features and outdoor living.",
        iconName: "lucide:shovel",
        iconColor: "#F89C1C",
        iconBg: "rgba(248,156,28,0.1)",
    },
    {
        title: "Maintain",
        description: "Complete maintenance including mowing, seasonal cleanup, and snow removal year-round.",
        icon: "/images/home/plant-icon.svg",
        iconBg: "rgba(159,51,34,0.1)",
    },
];

function ServiceCard({
    title,
    description,
    icon,
    iconName,
    iconColor,
    iconBg,
}: (typeof SERVICES)[number] & {
    icon?: string;
    iconName?: string;
    iconColor?: string;
}) {
    return (
        <div className="border-muted flex h-auto w-full flex-col items-start justify-center gap-9 rounded-xl border bg-white p-8 transition-all duration-300 ease-in-out hover:drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.05)]">
            <div className="flex h-auto w-55 flex-1 flex-col items-start gap-4">
                <div
                    className="flex size-15 shrink-0 items-center justify-center rounded-lg p-6"
                    style={{ backgroundColor: iconBg }}
                >
                    <div className="size-6 shrink-0" style={iconColor ? { color: iconColor } : undefined}>
                        {iconName ? (
                            <Icon icon={iconName} width={24} height={24} />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img alt="" className="block size-full max-w-none" src={icon} />
                        )}
                    </div>
                </div>
                <p className="font-serif-display w-full min-w-full text-2xl leading-6 font-normal text-black not-italic">
                    {title}
                </p>
                <p className="w-full min-w-full font-sans text-sm leading-5.5 font-normal text-black">{description}</p>
            </div>
            <ArrowLink
                href="#"
                icon="lucide:arrow-right"
                iconWidth={12}
                iconHeight={14}
                textClassName="text-forrest text-sm font-normal"
                className="h-6 w-auto flex-row items-center justify-start"
            >
                Learn More
            </ArrowLink>
        </div>
    );
}

export function ServicesSection() {
    return (
        <section className="bg-neutral-25 relative flex w-full flex-col items-center justify-center py-20">
            <div className="relative container flex flex-col items-center justify-center gap-15 px-20">
                <SectionIntro
                    className="h-35 w-150"
                    eyebrow="What We Do"
                    heading="Expert Landscaping Services"
                    description="From initial design through ongoing maintenance, we create outdoor spaces that transform how you live."
                />
                <div className="flex w-full items-center justify-center gap-6">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
