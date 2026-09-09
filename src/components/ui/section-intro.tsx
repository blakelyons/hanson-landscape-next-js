import { Eyebrow } from "@/components/ui/eyebrow";

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
};

const ALIGN_ITEMS: Record<NonNullable<SectionIntroProps["horizontalAlignment"]>, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
};

const JUSTIFY_CONTENT: Record<NonNullable<SectionIntroProps["verticalAlignment"]>, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
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
    textAlignment = "center",
}: SectionIntroProps) {
    return (
        <div
            className={`flex flex-col gap-4 ${className} section-intro`}
            style={{
                alignItems: ALIGN_ITEMS[horizontalAlignment],
                justifyContent: JUSTIFY_CONTENT[verticalAlignment],
                textAlign: textAlignment,
            }}
        >
            {eyebrow && <Eyebrow text={eyebrow} color={eyebrowColor} className="section-intro__eyebrow" />}
            <h2 className={`section-intro__title font-serif-display mb-4 text-[40px] leading-11.5 ${headingClassName}`}>
                {heading}
            </h2>
            {description ? (
                <p
                    className={`section-intro__description font-sans text-lg leading-7 ${descriptionClassName} text-pretty`}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}
