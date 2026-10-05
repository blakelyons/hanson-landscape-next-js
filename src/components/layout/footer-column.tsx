import Link from "next/link";

export type FooterItem = string | { label: string; href: string };

export function FooterColumn({
    heading,
    headingHref,
    items,
    className = "flex w-47 flex-col items-start gap-4",
}: {
    heading: string;
    headingHref?: string;
    items: FooterItem[];
    className?: string;
}) {
    return (
        <div className={className}>
            <p className="font-mono-label w-full text-base font-normal text-nowrap text-[rgba(255,255,255,0.35)]">
                {headingHref ? (
                    <Link href={headingHref} className="hover:text-primary transition-colors">
                        {heading}
                    </Link>
                ) : (
                    heading
                )}
            </p>
            <div className="flex w-full flex-col items-start gap-4 font-sans text-base leading-4 font-normal text-[rgba(255,255,255,0.5)]">
                {items.map((item) => {
                    const { label, href } = typeof item === "string" ? { label: item, href: undefined } : item;
                    return (
                        <p key={label} className="w-full">
                            {href ? (
                                <Link href={href} className="hover:text-primary transition-colors">
                                    {label}
                                </Link>
                            ) : (
                                label
                            )}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
