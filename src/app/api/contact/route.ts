import { NextResponse } from "next/server";
import { submitToFormstack } from "@/lib/formstack";

/**
 * Proxies contact-form submissions to Formstack so the API key never
 * reaches the client. Requires a live Node server (this route won't work
 * under `next export`/static export) — consistent with the PM2/droplet
 * deployment target.
 *
 * TODO: once the real Formstack form + field names are finalized, replace
 * the generic pass-through below with explicit field mapping and
 * validation (e.g. zod).
 */
export async function POST(request: Request) {
    const formId = process.env.FORMSTACK_CONTACT_FORM_ID;
    if (!formId) {
        return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const fields = Object.entries(body).map(([field, value]) => ({
        field,
        value: String(value),
    }));

    try {
        const result = await submitToFormstack(formId, fields);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Formstack submission error:", error);
        return NextResponse.json({ error: "Something went wrong submitting the form." }, { status: 502 });
    }
}
