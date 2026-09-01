export function FooterColumn({
    heading,
    items,
    className = "flex w-47 flex-col items-start gap-4",
}: {
    heading: string;
    items: string[];
    className?: string;
}) {
    return (
        <div className={className}>
            <p className="font-mono-label h-[45px] w-full text-base leading-[52px] font-normal text-[rgba(255,255,255,0.35)]">
                {heading}
            </p>
            <div className="flex w-full flex-col items-start gap-4 font-sans text-base leading-4 font-normal text-[rgba(255,255,255,0.5)]">
                {items.map((item) => (
                    <p key={item} className="w-full">
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
}
