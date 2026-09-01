import { ArrowLink } from "@/components/ui/arrow-link";

export function PortfolioBento() {
    return (
        <section className="relative flex w-full flex-col items-center overflow-clip">
            <div className="container flex flex-col items-end justify-center gap-4 px-20 pt-12 pb-20">
                <ArrowLink
                    href="#"
                    icon="lucide:arrow-right"
                    iconSize={14}
                    textClassName="text-forrest text-base font-medium"
                    className="shrink-0 items-center justify-center rounded-full"
                >
                    View All Projects
                </ArrowLink>

                <div className="relative h-[500px] w-[1280px] shrink-0 overflow-clip">
                    <div className="absolute top-0 left-0 flex w-[1280px] items-center justify-between">
                        <div className="relative flex h-[500px] w-[388px] shrink-0 flex-col items-center justify-end overflow-clip rounded-xl px-[25px] py-8">
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Hanson Landscape project"
                                    className="absolute top-[0.01%] left-[-78.31%] h-full w-[193.28%] max-w-none"
                                    src="/images/home/project-photo-1.jpg"
                                />
                            </div>
                            <div className="relative flex w-full shrink-0 flex-col items-start gap-2.5 rounded-[9px] bg-white px-3.5 py-4 drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)]">
                                <p className="font-serif-display w-[119px] text-xl leading-[22px] font-normal text-black not-italic">
                                    Project Name
                                </p>
                                <p className="w-full min-w-full font-sans text-sm leading-[18px] font-normal text-black">
                                    Non officia ullamco aute sit nulla ea magna ullamco.
                                </p>
                                <div className="border-light-green-cta flex w-full shrink-0 items-center justify-end gap-2.5 border-t pt-3">
                                    <ArrowLink
                                        href="#"
                                        icon="lucide:arrow-right"
                                        iconSize={14}
                                        textClassName="text-forrest text-xs font-medium"
                                    >
                                        View Project
                                    </ArrowLink>
                                </div>
                            </div>
                        </div>

                        <div className="grid h-[500px] w-[857px] shrink-0 grid-cols-2 grid-rows-2 gap-8">
                            <div className="col-span-2 grid grid-cols-2 grid-rows-1 gap-8 self-start">
                                <div className="relative h-[234px] w-full shrink-0 rounded-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="Hanson Landscape project"
                                        className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover"
                                        src="/images/home/project-photo-2.jpg"
                                    />
                                </div>
                                <div className="relative h-[234px] w-full shrink-0 rounded-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="Hanson Landscape project"
                                        className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xl object-cover"
                                        src="/images/home/project-photo-4.jpg"
                                    />
                                </div>
                            </div>
                            <div className="relative col-span-2 self-stretch justify-self-stretch rounded-xl">
                                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="Hanson Landscape project"
                                        className="absolute top-[-59.63%] left-[-0.05%] h-[242.49%] w-full max-w-none"
                                        src="/images/home/project-photo-3.jpg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
