export function StatCard({
    value,
    label,
    className = "flex w-[135px] flex-col items-start text-forrest",
    valueClassName = "font-serif-display text-4xl",
    labelClassName = "font-mono-stat text-sm uppercase",
}: {
    value: string;
    label: string;
    className?: string;
    valueClassName?: string;
    labelClassName?: string;
}) {
    return (
        <div className={className}>
            <p className={`w-full leading-none not-italic ${valueClassName}`}>{value}</p>
            <p className={`w-full leading-none not-italic ${labelClassName}`}>{label}</p>
        </div>
    );
}
