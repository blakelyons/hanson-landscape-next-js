import { NextResponse } from "next/server";
import { buildCareersEmail, isAllowedResume, validateCareers } from "@/lib/careers-email";
import { createRateLimiter } from "@/lib/rate-limit";
import { sendEmail, type EmailAttachment } from "@/lib/send-email";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Careers application -> email (optional resume) to the hiring inbox, via the shared mailer.
 *
 * Env (server-only): RESEND_API_KEY, CAREERS_TO_EMAIL, CAREERS_FROM_EMAIL (falls back to
 * CONTACT_FROM_EMAIL), TURNSTILE_SECRET_KEY. See .env.example.
 */

const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let data: Record<string, unknown>;
    let file: File | null = null;
    try {
        if (request.headers.get("content-type")?.includes("multipart/form-data")) {
            const formData = await request.formData();
            data = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
            const upload = formData.get("resume");
            if (upload instanceof File && upload.size > 0) file = upload;
        } else {
            data = await request.json();
        }
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot: hidden "website" field humans never fill. Pretend success to bots.
    if (typeof data.website === "string" && data.website.trim() !== "") {
        return NextResponse.json({ ok: true });
    }

    if (!(await verifyTurnstile(data["cf-turnstile-response"], ip))) {
        return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const result = validateCareers(data);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

    const attachments: EmailAttachment[] = [];
    if (file) {
        const problem = isAllowedResume(file);
        if (problem) return NextResponse.json({ error: problem }, { status: 400 });
        attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") });
    }

    const to = process.env.CAREERS_TO_EMAIL;
    if (!to) {
        console.error("Careers email error: CAREERS_TO_EMAIL is not set");
        return NextResponse.json({ error: "Something went wrong sending your application." }, { status: 502 });
    }
    const from =
        process.env.CAREERS_FROM_EMAIL ??
        process.env.CONTACT_FROM_EMAIL ??
        "Hanson Landscape Website <onboarding@resend.dev>";

    try {
        await sendEmail({
            to,
            from,
            replyTo: result.submission.email,
            ...buildCareersEmail(result.submission, attachments.length > 0),
            attachments,
        });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Careers email error:", error);
        return NextResponse.json({ error: "Something went wrong sending your application." }, { status: 502 });
    }
}
