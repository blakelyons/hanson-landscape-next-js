type SectionIntroProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  eyebrowClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  heading,
  description,
  eyebrowClassName = "text-forrest",
  headingClassName = "text-black",
  descriptionClassName = "text-neutral-600",
  className = "",
}: SectionIntroProps) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      <p className={`font-mono-label text-xs uppercase ${eyebrowClassName}`}>{eyebrow}</p>
      <p className={`font-serif-display text-[40px] leading-[46px] ${headingClassName}`}>{heading}</p>
      {description ? (
        <p className={`font-sans text-lg leading-7 ${descriptionClassName}`}>{description}</p>
      ) : null}
    </div>
  );
}
