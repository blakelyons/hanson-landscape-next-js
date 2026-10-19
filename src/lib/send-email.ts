export type EmailAttachment = { filename: string; content: string };

export type OutgoingEmail = {
    /** One address, or several separated by commas. */
    to: string;
    from: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
    attachments?: EmailAttachment[];
};

/**
 * Sends one email through Resend's HTTP API (no SDK dependency). Shared by every form
 * route; swap this body to change provider. Server-only: needs RESEND_API_KEY.
 * With no key and NODE_ENV !== "production" it logs the email instead of sending.
 */
export async function sendEmail({ attachments = [], ...email }: OutgoingEmail) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY is not set");
        console.info("[email] RESEND_API_KEY not set; would send:", { ...email, attachments });
        return;
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from: email.from,
            to: email.to
                .split(",")
                .map((address) => address.trim())
                .filter(Boolean),
            reply_to: email.replyTo,
            subject: email.subject,
            text: email.text,
            html: email.html,
            attachments: attachments.length ? attachments : undefined,
        }),
    });

    if (!response.ok) {
        throw new Error(`Resend failed (${response.status}): ${await response.text()}`);
    }
}
