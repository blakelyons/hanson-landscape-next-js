"use client";

import Script from "next/script";

declare global {
    interface Window {
        turnstile?: { reset: (widget?: string | HTMLElement) => void };
    }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Turnstile tokens are single-use: call after a failed submit so the next try gets a fresh one. */
export function resetTurnstile() {
    window.turnstile?.reset();
}

/**
 * Cloudflare Turnstile, implicit rendering: the script injects a hidden
 * `cf-turnstile-response` input into the enclosing <form>, which FormData picks up.
 * "interaction-only" keeps it invisible unless Cloudflare wants a challenge.
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
 */
export function TurnstileWidget() {
    if (!SITE_KEY) return null;

    return (
        <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
            <div className="cf-turnstile" data-sitekey={SITE_KEY} data-appearance="interaction-only" />
        </>
    );
}
