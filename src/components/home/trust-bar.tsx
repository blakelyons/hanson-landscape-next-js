const BADGES = [
    { color: "#22c55e", label: "CAMME Award Winner" },
    { color: "#84cc16", label: "Family Owned" },
    { color: "#0d9488", label: "100% Satisfaction" },
];

export function TrustBar() {
    return (
        <div className="flex h-[57px] w-full items-center border-b border-[#eee] bg-white">
            <div className="container flex items-center justify-center gap-16">
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
