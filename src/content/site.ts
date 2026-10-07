// Site-wide contact details. Single source for header/footer/CTA/contact page.

export const CONTACT_PATH = "/contact";

export const SITE_CONTACT = {
    phone: "(630) 556-4120",
    phoneHref: "tel:6305564120",
    email: "info@hansonlandscape.com",
    emailHref: "mailto:info@hansonlandscape.com",
    serviceArea: "Chicagoland Area",
} as const;

/** `/contact` optionally preselecting a service in the form's dropdown. */
export function contactPath(service?: string) {
    return service ? `${CONTACT_PATH}?service=${encodeURIComponent(service)}` : CONTACT_PATH;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansonlandscape.com";

/**
 * Business facts used for structured data (JSON-LD). `address` and `openingHours` are left
 * unset on purpose: they appear in search results only once confirmed with Hanson.
 * (Legacy SIMA certificate listed "Hanson Landscape Inc, Big Rock, IL" — unconfirmed.)
 */
export const BUSINESS: {
    name: string;
    description: string;
    address?: { streetAddress?: string; addressLocality: string; addressRegion: string; postalCode?: string };
    /** schema.org format, e.g. "Mo-Fr 07:00-17:00" */
    openingHours?: string[];
} = {
    name: "Hanson Landscape",
    description:
        "Landscape design, construction, maintenance, enhancement and snow and ice management for residential and commercial properties across Chicagoland.",
};
