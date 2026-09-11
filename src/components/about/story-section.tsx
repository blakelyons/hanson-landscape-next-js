import { StatCard } from "@/components/ui/stat-card";
import Image from "next/image";

const STATS = [
    { value: "25+", label: "Years of craftsmanship" },
    { value: "500+", label: "Projects delivered" },
    { value: "100%", label: "Satisfaction rating" },
];

export function StorySection() {
    return (
        <section className="w-full bg-white py-20">
            <div className="container grid grid-cols-2 items-center gap-20">
                <div className="min-w-0 overflow-hidden rounded-2xl">
                    <Image
                        alt="Hanson Landscape crew working on a stone garden path"
                        className="aspect-29/28 size-full object-cover"
                        src="/images/about/story-photo.jpg"
                        priority
                        width={750}
                        height={500}
                    />
                </div>
                <div className="flex min-w-0 flex-col items-start gap-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary h-0.5 w-8 shrink-0" />
                        <p className="text-primary font-sans text-sm font-medium tracking-[2.6px] whitespace-nowrap">
                            EST. 2001
                        </p>
                    </div>
                    <h2 className="font-serif-display text-4xl leading-12 font-normal text-[#1a2e1a] not-italic">
                        How a small crew became Chicagoland&apos;s trusted name in outdoor living.
                    </h2>
                    <p className="font-sans text-base leading-6.75 font-normal text-[#6b7b6b]">
                        Hanson Landscape started in 2001 with a single truck and a belief that outdoor spaces deserve
                        the same care as the homes and buildings they surround. A quarter century later, that belief
                        hasn&apos;t changed — only the scale of what we can build has. Every project, residential or
                        commercial, still gets the same hands-on attention from design through year-round care.
                    </p>
                    <div className="flex flex-wrap items-start gap-8">
                        {STATS.map((stat) => (
                            <StatCard key={stat.label} value={stat.value} label={stat.label} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
