import { useRef } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type SectionIntroProps = {
    eyebrow: string;
    eyebrowColor?: string;
    heading: string;
    description?: string;
    eyebrowClassName?: string;
    headingClassName?: string;
    descriptionClassName?: string;
    className?: string;
    horizontalAlignment?: "start" | "center" | "end";
    verticalAlignment?: "start" | "center" | "end";
    textAlignment?: "left" | "center" | "right";
    ref?: React.RefObject<HTMLDivElement>;
    /** Fade/slide the eyebrow, title, and description in on scroll. */
    animateEntrance?: boolean;
    /** Custom `scrollTrigger.trigger` selector/element. Defaults to this component's title. */
    triggerEl?: gsap.DOMTarget;
    cta?: React.ReactElement;
};

const JUSTIFY_CONTENT: Record<NonNullable<SectionIntroProps["verticalAlignment"]>, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
};

const TEXT_ALIGN_FOR_HORIZONTAL: Record<
    NonNullable<SectionIntroProps["horizontalAlignment"]>,
    NonNullable<SectionIntroProps["textAlignment"]>
> = {
    start: "left",
    center: "center",
    end: "right",
};

// Always centered below `md`; real alignment only kicks in at `md` and up.
const ALIGN_ITEMS_CLASS: Record<NonNullable<SectionIntroProps["horizontalAlignment"]>, string> = {
    start: "md:items-start",
    center: "md:items-center",
    end: "md:items-end",
};

const TEXT_ALIGN_CLASS: Record<NonNullable<SectionIntroProps["textAlignment"]>, string> = {
    left: "md:text-left",
    center: "md:text-center",
    right: "md:text-right",
};

export function SectionIntro({
    eyebrow,
    eyebrowColor,
    heading,
    description,
    headingClassName = "text-black",
    descriptionClassName = "text-neutral-600",
    className = "",
    horizontalAlignment = "center",
    verticalAlignment = "center",
    textAlignment,
    ref,
    animateEntrance = false,
    triggerEl,
    cta,
}: SectionIntroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const resolvedTextAlignment = textAlignment ?? TEXT_ALIGN_FOR_HORIZONTAL[horizontalAlignment];

    useGSAP(
        () => {
            if (!animateEntrance) return;

            gsap.from(".section-intro__eyebrow, .section-intro__title, .section-intro__description", {
                opacity: 0,
                y: 16,
                stagger: 0.12,
                duration: 0.8,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: triggerEl ?? ".section-intro__title",
                    start: "top bottom-=20%",
                    end: "center top",
                },
            });
        },
        { scope: containerRef, dependencies: [animateEntrance, triggerEl] },
    );

    return (
        <div
            className={`flex flex-col items-center gap-2 overflow-hidden text-center ${ALIGN_ITEMS_CLASS[horizontalAlignment]} ${TEXT_ALIGN_CLASS[resolvedTextAlignment]} ${className} section-intro`}
            style={{
                justifyContent: JUSTIFY_CONTENT[verticalAlignment],
            }}
            ref={(node) => {
                containerRef.current = node;
                if (ref) ref.current = node as HTMLDivElement;
            }}
        >
            {eyebrow && <Eyebrow text={eyebrow} color={eyebrowColor} className="section-intro__eyebrow" />}
            <h2 className={`section-intro__title font-serif-display mb-2 text-[40px] leading-11.5 ${headingClassName}`}>
                {heading}
            </h2>
            {description ? (
                <p
                    className={`section-intro__description font-sans ${descriptionClassName ? descriptionClassName : "text-lg leading-7"} text-pretty`}
                >
                    {description}
                    {cta ? cta : null}
                </p>
            ) : null}
        </div>
    );
}
