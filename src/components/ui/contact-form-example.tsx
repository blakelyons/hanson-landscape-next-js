"use client";

import { useState, type FormEvent } from "react";

/**
 * Minimal example wiring a form to POST /api/contact (Formstack proxy).
 * Replace field names/markup once the real contact form design/fields
 * (from Formstack) are finalized.
 */
export function ContactFormExample() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder="Name" required className="border px-3 py-2" />
      <input name="email" type="email" placeholder="Email" required className="border px-3 py-2" />
      <textarea name="message" placeholder="Message" required className="border px-3 py-2" />
      <button type="submit" disabled={status === "submitting"} className="border px-4 py-2">
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
      {status === "success" && <p>Thanks — we&apos;ll be in touch.</p>}
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
