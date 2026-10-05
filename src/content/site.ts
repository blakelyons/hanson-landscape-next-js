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
