const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side. Env: TURNSTILE_SECRET_KEY (server-only).
 * With no secret configured, verification is skipped (local dev, or before the keys exist);
 * once the secret is set every submission must carry a valid token.
 */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.warn("[turnstile] TURNSTILE_SECRET_KEY not set; skipping verification");
        return true;
    }
    if (typeof token !== "string" || !token) return false;

    try {
        const body = new URLSearchParams({ secret, response: token });
        if (ip !== "unknown") body.set("remoteip", ip);
        const response = await fetch(VERIFY_URL, { method: "POST", body });
        const result = (await response.json()) as { success?: boolean };
        return result.success === true;
    } catch (error) {
        console.error("Turnstile verification error:", error);
        return false;
    }
}
