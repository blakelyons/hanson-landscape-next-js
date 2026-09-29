"use client";
import { useRef } from "react";
import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const container = sectionRef.current?.querySelector<HTMLDivElement>(".cta-container");

            // Lives outside this component's DOM subtree (rendered by the
            // layout), so it's queried from the document rather than scoped.
            const header = document.querySelector<HTMLElement>(".global-header");
            if (!container) return;

            gsap.set(".cta-content", { opacity: 0, y: 100 });

            // How much longer (in the same duration units as the tweens below,
            // where defaults.duration is 1) to keep the section pinned after
            // the last real tween finishes.
            const HOLD = 1;

            const tl = gsap.timeline({
                defaults: { duration: 1, ease: "power2.inOut" },
            });

            gsap.to(".cta-content", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center+=50%",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            tl.to(header, { yPercent: -100 }, "-=2")
                .to(".cta-title", { opacity: 1, y: 0 }, "<")
                .to(".cta-subtitle", { opacity: 1, y: 0 })
                .to(
                    container,
                    {
                        width: "100%",
                        // max-w-7xl (1280px) caps the width at rest — has to be
                        // tweened to 100% too, or it keeps clamping the width
                        // tween at 1280px forever.
                        maxWidth: "100%",
                        height: "100dvh",
                        borderRadius: 0,
                    },
                    ">",
                )
                // Second reveal: only starts once the container-grow tween above
                // finishes (no "<"), so the bg fade + image reveal happen after
                // full width/height is reached, not during the grow.
                .to(container, { backgroundColor: "transparent" })
                .to(".cta-image-reveal", { opacity: 1 }, "<")
                .to(".cta-image-reveal-overlay", { opacity: 1 }, "<")
                .to([".cta-title", ".cta-subtitle"], { color: "#ffffff" }, "<")
                // Actions wait until the image reveal is showing (sequential,
                // after the overlay tween above) instead of appearing with the
                // rest of the card's copy.
                .to(".cta-actions", { opacity: 1, y: 0 }, "-=1.25")
                // Pure hold: no properties change, just reserves extra timeline
                // duration so the ScrollTrigger below keeps the section pinned
                // a bit longer once the actions are in.
                .to({}, { duration: HOLD });

            const animatedDuration = tl.duration() - HOLD;

            // Fraction of normal scroll speed applied while this section is
            // pinned — lower feels slower/heavier. Restored to 1:1 the moment
            // the pin releases in either direction.
            const SCROLL_DAMPING = 0.4;
            let lastTouchY = 0;

            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                window.scrollBy(0, e.deltaY * SCROLL_DAMPING);
            };
            const handleTouchStart = (e: TouchEvent) => {
                lastTouchY = e.touches[0].clientY;
            };
            const handleTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                const currentY = e.touches[0].clientY;
                window.scrollBy(0, (lastTouchY - currentY) * SCROLL_DAMPING);
                lastTouchY = currentY;
            };

            const enableScrollDamping = () => {
                window.addEventListener("wheel", handleWheel, { passive: false });
                window.addEventListener("touchstart", handleTouchStart, { passive: true });
                window.addEventListener("touchmove", handleTouchMove, { passive: false });
            };
            const disableScrollDamping = () => {
                window.removeEventListener("wheel", handleWheel);
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
            };

            ScrollTrigger.create({
                animation: tl,
                trigger: sectionRef.current,
                start: "center center",
                // "bottom top" was ~100% of the section's own height. Scaling
                // that by (full duration / animated-only duration) grows the
                // scroll distance by the same proportion the hold added to the
                // timeline, so every real tween above still gets mapped to the
                // same amount of scroll it had before — only the new hold
                // portion eats the extra distance, with nothing moving during it.
                end: `+=${100 * (tl.duration() / animatedDuration)}%`,
                pin: true,
                scrub: 1,
                onEnter: enableScrollDamping,
                onEnterBack: enableScrollDamping,
                onLeave: disableScrollDamping,
                onLeaveBack: disableScrollDamping,
            });

            return () => {
                disableScrollDamping();
            };
        },
        { scope: sectionRef },
    );

    return (
        <div className="relative">
            <section
                ref={sectionRef}
                className="cta-section relative flex h-dvh w-full items-center justify-center overflow-clip"
            >
                <div className="cta-content relative z-1 flex w-full items-center justify-center">
                    <div className="bg-primary-light cta-container relative flex h-160 w-full max-w-7xl shrink-0 flex-col items-center justify-center gap-8 overflow-clip rounded-xl px-8 py-10 lg:py-15">
                        <h2 className="cta-title font-serif-display w-full min-w-full translate-y-12 text-center text-6xl font-normal text-pretty text-black not-italic opacity-0">
                            Ready to Transform Your Space?
                        </h2>
                        <h3 className="cta-subtitle w-full max-w-md translate-y-8 text-center font-sans text-xl leading-7 font-normal text-[rgba(0,0,0,0.5)] opacity-0">
                            {`Get a free, no-obligation quote. We'll visit your property and bring your vision to life.`}
                        </h3>
                        <div className="cta-actions flex translate-y-6 flex-wrap items-center justify-center gap-4.5 pt-6 opacity-0">
                            <PillButton variant="secondary" size="md" textClassName="text-white">
                                Get a Free Quote
                            </PillButton>
                            <PillButton variant="primary-dark" size="md" icon="lucide:phone">
                                Call Us Today
                            </PillButton>
                        </div>
                    </div>
                </div>
                <div className="cta-image-reveal absolute top-0 left-0 z-0 h-dvh w-full opacity-0">
                    <Image src="/images/home/project-photo-1.jpg" alt="CTA Image" fill className="object-cover" />
                    <div className="cta-image-reveal-overlay absolute top-0 left-0 z-1 h-full w-full bg-black/50 opacity-0" />
                </div>
            </section>
            <div className="scroll-trigger-end" />
        </div>
    );
}
