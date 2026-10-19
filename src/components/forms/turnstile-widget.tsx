"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type TurnstileApi = {
    render: (
        container: HTMLElement,
        options: {
            sitekey: string;
            appearance?: "always" | "execute" | "interaction-only";
            callback?: (token: string) => void;
            "expired-callback"?: () => void;
            "timeout-callback"?: () => void;
            "error-callback"?: (code: string) => void;
        },
    ) => string;
    remove: (widgetId: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile, explicit rendering. The widget is created in an effect (after hydration)
 * into a div React never gives children, and removed on unmount, so React can't wipe it out.
 * The token is handed to the form through `onToken` (null when it expires or errors) and
 * appended to the request by the form's submit handler. To get a fresh token after a failed
 * submit (tokens are single-use), change the `key` prop to remount the widget.
 * "interaction-only" keeps it invisible unless Cloudflare wants a challenge.
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
 */
export function TurnstileWidget({
    onToken,
    onError,
}: {
    onToken: (token: string | null) => void;
    onError?: (code: string) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacksRef = useRef({ onToken, onError });
    useEffect(() => {
        callbacksRef.current = { onToken, onError };
    });

    const renderWidget = () => {
        const container = containerRef.current;
        if (!SITE_KEY || !container || !window.turnstile || widgetIdRef.current) return;

        widgetIdRef.current = window.turnstile.render(container, {
            sitekey: SITE_KEY,
            appearance: "interaction-only",
            callback: (token) => callbacksRef.current.onToken(token),
            "expired-callback": () => callbacksRef.current.onToken(null),
            "timeout-callback": () => callbacksRef.current.onToken(null),
            "error-callback": (code) => {
                callbacksRef.current.onToken(null);
                callbacksRef.current.onError?.(code);
            },
        });
    };

    // Covers the script already being loaded (client-side navigation to another form page);
    // <Script onReady> below covers the first load.
    useEffect(() => {
        renderWidget();
        return () => {
            if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
        };
    }, []);

    if (!SITE_KEY) return null;

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onReady={renderWidget}
            />
            <div ref={containerRef} />
        </>
    );
}
