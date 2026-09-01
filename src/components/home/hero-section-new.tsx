import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

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
        // tl.to(".scroll-cue", {
        //     height: 6,
        //     duration: 2.5,
        //     ease: "power2.out",
        //     repeat: -1,
        //     yoyo: true,
        // });
    }, []);

    return (
        <section className="relative h-[960px] w-full overflow-clip bg-[#0e2113]">
            <div className="relative container h-full">
                {/* Floating scroll cue — legitimate small overlay, unrelated to content column's x-axis */}
                <div className="absolute top-[876px] left-[700px] flex flex-col items-center gap-2">
                    <p className="translate-y-2 font-sans text-[10px] font-medium tracking-[2.4px] whitespace-nowrap text-[rgba(250,251,248,0.5)]">
                        SCROLL
                    </p>
                    <div className="scroll-cue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M11.25 10a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0z" />
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M18.75 9.074a6.75 6.75 0 0 0-13.5 0v5.852a6.75 6.75 0 0 0 13.5 0zm-5.931-5.186a5.25 5.25 0 0 1 4.431 5.186v5.852a5.25 5.25 0 0 1-10.5 0V9.074a5.25 5.25 0 0 1 6.069-5.186"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
