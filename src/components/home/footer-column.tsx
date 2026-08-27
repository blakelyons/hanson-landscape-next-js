export function FooterColumn({
  heading,
  items,
  className = "flex w-[188px] flex-col items-start gap-4",
}: {
  heading: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="h-[45px] w-full font-mono-label text-base font-normal leading-[52px] text-[rgba(255,255,255,0.35)]">
        {heading}
      </p>
      <div className="flex w-full flex-col items-start gap-4 font-sans text-base font-normal leading-4 text-[rgba(255,255,255,0.5)]">
        {items.map((item) => (
          <p key={item} className="w-full">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
