import { NextResponse } from "next/server";
import { buildContactEmail, isAllowedAttachment, validateContact } from "@/lib/contact-email";

/**
 * Contact form -> email, via Resend's HTTP API (no SDK dependency). Swap the `sendEmail`
 * body to change provider (Postmark, SES, SMTP...); the rest of the route is provider-agnostic.
 * Needs a live Node server (consistent with the PM2/droplet deployment).
 *
 * Env (server-only): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL. See .env.example.
 */

// Best-effort per-process limiter (resets on restart/reload). Enough to blunt casual spam;
// add Cloudflare Turnstile if abuse shows up.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

type Attachment = { filename: string; content: string };

async function sendEmail(options: {
    replyTo: string;
    subject: string;
    text: string;
    html: string;
    attachments: Attachment[];
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL ?? "Hanson Landscape Website <onboarding@resend.dev>";

    if (!to) throw new Error("CONTACT_TO_EMAIL is not set");

    if (!apiKey) {
        if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY is not set");
        // Local dev without a key: show what would have been sent.
        console.info("[contact] RESEND_API_KEY not set; would send:", { to, from, ...options });
        return;
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from,
            to: [to],
            reply_to: options.replyTo,
            subject: options.subject,
            text: options.text,
            html: options.html,
            attachments: options.attachments.length ? options.attachments : undefined,
        }),
    });

    if (!response.ok) {
        throw new Error(`Resend failed (${response.status}): ${await response.text()}`);
    }
}

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let data: Record<string, unknown>;
    let file: File | null = null;
    try {
        if (request.headers.get("content-type")?.includes("multipart/form-data")) {
            const formData = await request.formData();
            data = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
            const upload = formData.get("attachment");
            if (upload instanceof File && upload.size > 0) file = upload;
        } else {
            data = await request.json();
        }
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot: the form has a hidden "website" field humans never fill. Pretend success to bots.
    if (typeof data.website === "string" && data.website.trim() !== "") {
        return NextResponse.json({ ok: true });
    }

    const result = validateContact(data);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

    const attachments: Attachment[] = [];
    if (file) {
        const problem = isAllowedAttachment(file);
        if (problem) return NextResponse.json({ error: problem }, { status: 400 });
        attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") });
    }

    const email = buildContactEmail(result.submission);

    try {
        await sendEmail({ replyTo: result.submission.email, ...email, attachments });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Contact email error:", error);
        return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 502 });
    }
}
