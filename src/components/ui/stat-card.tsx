export function StatCard({
    value,
    label,
    className = "flex w-auto max-w-35 flex-col items-start text-forrest",
    valueClassName = "font-serif-display text-5xl",
    labelClassName = "font-mono-stat text-sm uppercase",
    labelFirst = false,
}: {
    value: string;
    label: string;
    className?: string;
    valueClassName?: string;
    labelClassName?: string;
    labelFirst?: boolean;
}) {
    return (
        <div className={`${className} grid gap-1.5`}>
            <p className={`w-full leading-none not-italic ${valueClassName} ${labelFirst ? "order-2" : ""}`}>{value}</p>
            <p className={`w-full leading-none not-italic ${labelClassName} ${labelFirst ? "order-1" : ""}`}>{label}</p>
        </div>
    );
}
