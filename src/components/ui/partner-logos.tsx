const PLACEHOLDER_COUNT = 5;

export function PartnerLogos({
    className = "flex items-center gap-4 flex-wrap partner-logos",
}: {
    className?: string;
}) {
    return (
        <div className={className}>
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
                <div
                    key={index}
                    className="bg-neutral-25 relative flex h-16 w-27.5 shrink-0 items-center justify-center rounded-md"
                >
                    <p className="text-muted font-sans text-xs font-medium whitespace-nowrap">PARTNER LOGO</p>
                </div>
            ))}
        </div>
    );
}
