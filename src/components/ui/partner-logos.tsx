import Image from "next/image";

// Affiliation / supplier logos carried over from the legacy hansonlandscape.com site.
// Source files are small (150-300px wide); they're shown at tile size, so they stay sharp.
// Confirm with Hanson that each brand's logo may still be displayed before launch.
// SIMA (Snow & Ice Management Association) is intentionally absent: the legacy site only had a
// membership certificate that expired in 2016. Add the current SIMA logo here if still a member.
export const PARTNERS = [
    { name: "Unilock Authorized Contractor", file: "unilock.png", width: 200, height: 77 },
    { name: "Belgard", file: "belgard.jpg", width: 221, height: 87 },
    { name: "Aquascape Certified Contractor", file: "aquascape-certified-contractor.png", width: 150, height: 132 },
    { name: "Easy Pro Pond Products", file: "easy-pro-pond-products.png", width: 302, height: 121 },
    { name: "Unique Lighting Systems", file: "unique-lighting.png", width: 200, height: 97 },
    { name: "Illinois Landscape Contractors Association (ILCA)", file: "ilca.gif", width: 171, height: 78 },
    { name: "NFIB — The Voice of Small Business", file: "nfib.jpg", width: 240, height: 148 },
] as const;

export function PartnerLogos({
    className = "flex items-center gap-4 flex-wrap partner-logos",
}: {
    className?: string;
}) {
    return (
        <ul className={className} aria-label="Affiliations and partners">
            {PARTNERS.map((partner) => (
                <li
                    key={partner.file}
                    className="relative flex h-16 w-27.5 shrink-0 items-center justify-center rounded-md bg-white p-2"
                >
                    <Image
                        src={`/images/partners/${partner.file}`}
                        alt={partner.name}
                        width={partner.width}
                        height={partner.height}
                        sizes="110px"
                        className="max-h-full w-auto max-w-full object-contain"
                    />
                </li>
            ))}
        </ul>
    );
}
