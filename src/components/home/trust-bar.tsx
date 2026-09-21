const BADGES = [
    { color: "var(--color-primary)", label: "CAMME Award Winner", icon: "lucide:trophy" },
    { color: "var(--color-forrest-light)", label: "Family Owned", icon: "lucide:user-group" },
    { color: "var(--color-autumn-red-light)", label: "100% Satisfaction", icon: "lucide:smile" },
];

export function TrustBar() {
    return (
        <div className="flex h-auto w-full items-center border-b border-[#eee] bg-white py-4 lg:py-6 xl:h-14.25 xl:py-0">
            <div className="container flex flex-wrap items-center justify-center gap-4 lg:gap-8 xl:gap-16">
                {BADGES.map((badge) => (
                    <div
                        key={badge.label}
                        className="flex h-4 shrink-0 items-center gap-3"
                        style={{ color: badge.color }}
                    >
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: badge.color }} />
                        <p className="font-sans text-base font-normal whitespace-nowrap text-neutral-600">
                            {badge.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
