import { MAX_ATTACHMENT_BYTES, escapeHtml } from "./contact-email";

// Pure helpers for /api/careers, mirroring contact-email.ts: validate the form, check the
// resume, build the notification email. No fetch/env so it's unit-testable.

const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CareersSubmission = { name: string; email: string; phone: string; message: string };

export type CareersValidationResult = { ok: true; submission: CareersSubmission } | { ok: false; error: string };

function field(data: Record<string, unknown>, key: string): string {
    const value = data[key];
    return typeof value === "string" ? value.trim() : "";
}

export function validateCareers(data: Record<string, unknown>): CareersValidationResult {
    const name = field(data, "name");
    const email = field(data, "email");
    const phone = field(data, "phone");
    const message = field(data, "message");

    if (!name || name.length > 100) return { ok: false, error: "Please enter your name." };
    if (!EMAIL_PATTERN.test(email) || email.length > 200) return { ok: false, error: "Please enter a valid email." };
    if (phone.length > 40) return { ok: false, error: "Phone number is too long." };
    if (!message || message.length > 5000)
        return { ok: false, error: "Please tell us about yourself (5,000 characters max)." };

    return { ok: true, submission: { name, email, phone, message } };
}

export function isAllowedResume(file: { name: string; size: number }): string | null {
    if (file.size > MAX_ATTACHMENT_BYTES) return "Resume is too large (10 MB max).";
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
        return `Resume type not allowed. Use: ${ALLOWED_RESUME_EXTENSIONS.join(", ")}.`;
    }
    return null;
}

export function buildCareersEmail(submission: CareersSubmission, hasResume: boolean) {
    const { name, email, phone, message } = submission;
    const rows: [string, string][] = [
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "\u2014"],
        ["Resume attached", hasResume ? "Yes" : "No"],
    ];

    const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", "Message:", message].join("\n");
    const html =
        `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">` +
        rows
            .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
            .join("") +
        `</table><p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

    // Strip line breaks so applicant input can't inject headers into the subject.
    const subject = `New employment inquiry: ${name}`.replace(/[\r\n]+/g, " ").slice(0, 200);

    return { subject, text, html };
}
