"use client";

import { useState, type FormEvent } from "react";
import { InputText, Label, Textarea } from "@/components/ui/form-elements";
import { Icon } from "@/components/ui/icon";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";

// Design fields are cream-filled with no border; `!` beats FIELD_BASE's defaults.
const FIELD_CLASS = "bg-light-green-cta! border-transparent! text-sm";

type Status = "idle" | "submitting" | "success" | "error";

export function CareersForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    // Tokens are single-use: bumping the key remounts the widget for a fresh one after a failed submit.
    const [turnstileKey, setTurnstileKey] = useState(0);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setStatus("submitting");

        try {
            const formData = new FormData(event.currentTarget);
            if (turnstileToken) formData.set("cf-turnstile-response", turnstileToken);
            const response = await fetch("/api/careers", { method: "POST", body: formData });
            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { error?: string } | null;
                throw new Error(body?.error ?? "Submission failed");
            }
            setStatus("success");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "");
            setStatus("error");
            setTurnstileToken(null);
            setTurnstileKey((key) => key + 1);
        }
    }

    if (status === "success") {
        return (
            <div role="status" className="flex flex-col gap-2 py-6">
                <p className="font-serif-display text-forrest text-2xl">Thanks, we received your application.</p>
                <p className="font-sans text-base text-black/70">
                    If there&apos;s a fit, someone from our team will be in touch.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
            {/* Honeypot: hidden from people, tempting to bots. The API route drops submissions that fill it. */}
            <div aria-hidden className="absolute -left-2499.75 h-0 w-0 overflow-hidden">
                <label htmlFor="careers-website">Website</label>
                <input id="careers-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="careers-name">Your Name</Label>
                    <InputText
                        id="careers-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Name"
                        className={FIELD_CLASS}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="careers-email">Email Address</Label>
                    <InputText
                        id="careers-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Email"
                        className={FIELD_CLASS}
                    />
                </div>
                <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="careers-phone">Phone Number</Label>
                    <InputText
                        id="careers-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        className={FIELD_CLASS}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="careers-message">Message</Label>
                <Textarea
                    id="careers-message"
                    name="message"
                    required
                    placeholder="Tell us about yourself and what you're looking for"
                    className={`${FIELD_CLASS} min-h-28`}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="careers-resume">Resume (optional)</Label>
                <input
                    id="careers-resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="bg-light-green-cta file:text-forrest w-full rounded-md px-3 py-2 font-sans text-sm text-black/60 file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                <p className="font-sans text-xs text-black/50">PDF, DOC or DOCX, 10 MB max.</p>
            </div>
            <TurnstileWidget
                key={turnstileKey}
                onToken={setTurnstileToken}
                onError={(code) => {
                    setErrorMessage(`Verification could not load (code ${code}). Please refresh the page`);
                    setStatus("error");
                }}
            />
            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-forrest hover:bg-forrest-light border-forrest hover:border-forrest-light inline-flex items-center justify-center gap-2.5 rounded-full border px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status === "submitting" ? "Sending..." : "Submit Application"}
                    <Icon icon="lucide:arrow-right" width={14} height={14} className="shrink-0" />
                </button>
                {status === "error" ? (
                    <p role="alert" className="font-sans text-sm text-red-700">
                        {errorMessage || "Something went wrong."} Please try again or call us.
                    </p>
                ) : null}
            </div>
        </form>
    );
}
