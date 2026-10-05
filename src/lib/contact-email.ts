import { SERVICE_OPTIONS } from "@/content/services";

// Pure helpers for the /api/contact route: parse + validate the form, build the
// notification email. Kept free of fetch/env so it's unit-testable.

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp", "heic", "doc", "docx"];

export type ContactSubmission = {
    name: string;
    email: string;
    phone: string;
    service: string;
    serviceLabel: string;
    message: string;
};

export type ValidationResult = { ok: true; submission: ContactSubmission } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: string): string {
    const value = data[key];
    return typeof value === "string" ? value.trim() : "";
}

export function validateContact(data: Record<string, unknown>): ValidationResult {
    const name = field(data, "name");
    const email = field(data, "email");
    const phone = field(data, "phone");
    const service = field(data, "service");
    const message = field(data, "message");

    if (!name || name.length > 100) return { ok: false, error: "Please enter your name." };
    if (!EMAIL_PATTERN.test(email) || email.length > 200) return { ok: false, error: "Please enter a valid email." };
    if (phone.length > 40) return { ok: false, error: "Phone number is too long." };
    if (!message || message.length > 5000)
        return { ok: false, error: "Please enter a message (5,000 characters max)." };

    const serviceLabel = SERVICE_OPTIONS.find((option) => option.value === service)?.label ?? "Not specified";
    return { ok: true, submission: { name, email, phone, service, serviceLabel, message } };
}

export function isAllowedAttachment(file: { name: string; size: number }): string | null {
    if (file.size > MAX_ATTACHMENT_BYTES) return "Attachment is too large (10 MB max).";
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
        return `Attachment type not allowed. Use: ${ALLOWED_ATTACHMENT_EXTENSIONS.join(", ")}.`;
    }
    return null;
}

const escapeHtml = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildContactEmail(submission: ContactSubmission) {
    const { name, email, phone, serviceLabel, message } = submission;
    const rows: [string, string][] = [
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "—"],
        ["Service", serviceLabel],
    ];

    const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", "Message:", message].join("\n");
    const html =
        `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">` +
        rows
            .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
            .join("") +
        `</table><p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

    // Strip line breaks so visitor input can't inject headers into the subject.
    const subject = `New website inquiry: ${serviceLabel} — ${name}`.replace(/[\r\n]+/g, " ").slice(0, 200);

    return { subject, text, html };
}
