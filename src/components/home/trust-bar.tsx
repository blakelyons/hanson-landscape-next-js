const BADGES = [
    { color: "#22c55e", label: "CAMME Award Winner" },
    { color: "#84cc16", label: "Family Owned" },
    { color: "#0d9488", label: "100% Satisfaction" },
];

export function TrustBar() {
    return (
        <div className="flex h-auto w-full items-center border-b border-[#eee] bg-white py-4 lg:py-6 xl:h-14.25 xl:py-0">
            <div className="container flex flex-wrap items-center justify-center gap-4 lg:gap-8 xl:gap-16">
                {BADGES.map((badge) => (
                    <div key={badge.label} className="flex h-4 shrink-0 items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: badge.color }} />
                        <p className="font-sans text-[11px] font-normal whitespace-nowrap text-neutral-600">
                            {badge.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
