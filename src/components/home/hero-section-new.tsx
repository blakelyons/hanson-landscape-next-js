import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

import "./hero-section.scss";

// import { PillButton } from "@/components/ui/pill-button";
// import { Icon } from "@/components/ui/icon";

// const STATS = [
//     { value: "25+", label: "Years of craftsmanship" },
//     { value: "500+", label: "Projects delivered" },
//     { value: "100%", label: "Satisfaction rating" },
// ];

export function HeroSection() {
    useGSAP(() => {
        const tl = gsap.timeline();

        const scrollCueItems = gsap.utils.toArray(".scroll-cue-item");

        tl.to(scrollCueItems, {
            opacity: 1,
            y: 0,
            duration: 2.5,
            ease: "power2.out",
            stagger: 0.12,
            color: "var(--color-white)",
        }).to(
            "#mouse-icon .mouse-scroll-button",
            {
                y: 4,
                duration: 2,
                ease: "power1.out",
                repeat: -1,
                opacity: 0.1,
            },
            "<",
        );
    }, []);

    return (
        <section className="relative h-240 w-full overflow-clip bg-[#0e2113]">
            <div className="absolute inset-0 h-full w-full">
                {/* Decorative background layers — legitimately absolute, scoped to this section's 1440 column */}
                <div className="absolute top-140 -left-65 size-175">
                    <div className="absolute inset-[-42.86%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="block size-full max-w-none" src="/images/home/bg-glow-amber.svg" />
                    </div>
                </div>
            </div>
            <div className="relative container h-full pt-(--header-height)">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col">Left</div>
                    <div className="col">Right</div>
                </div>

                {/* Floating scroll cue — legitimate small overlay, unrelated to content column's x-axis */}
                <div className="scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2">
                    <p className="scroll-cue-item text-muted translate-y-4 text-center font-sans text-xs font-bold tracking-[2.4px] whitespace-nowrap opacity-0">
                        SCROLL
                    </p>
                    <div className="scroll-cue-item mouse text-muted flex translate-y-6 items-center justify-center opacity-0">
                        <svg
                            id="mouse-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8em"
                            height="1.8em"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                className="mouse-scroll-button"
                                fill="currentColor"
                                d="M11.25 10a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0z"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M18.75 9.074a6.75 6.75 0 0 0-13.5 0v5.852a6.75 6.75 0 0 0 13.5 0zm-5.931-5.186a5.25 5.25 0 0 1 4.431 5.186v5.852a5.25 5.25 0 0 1-10.5 0V9.074a5.25 5.25 0 0 1 6.069-5.186"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
