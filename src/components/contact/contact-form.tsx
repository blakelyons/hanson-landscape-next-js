"use client";

import { useState, type FormEvent } from "react";
import { InputText, Label, Select, Textarea, type SelectOption } from "@/components/ui/form-elements";
import { Icon } from "@/components/ui/icon";

// Design fields are cream-filled with no border; `!` beats FIELD_BASE's defaults.
const FIELD_CLASS = "bg-light-green-cta! border-transparent! text-sm";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
    serviceOptions,
    defaultService,
    showAttachment = true,
}: {
    serviceOptions: SelectOption[];
    defaultService?: string;
    showAttachment?: boolean;
}) {
    const [status, setStatus] = useState<Status>("idle");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("/api/contact", { method: "POST", body: new FormData(event.currentTarget) });
            if (!response.ok) throw new Error("Submission failed");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div role="status" className="flex flex-col gap-2 py-6">
                <p className="font-serif-display text-forrest text-2xl">Thanks, we got your message.</p>
                <p className="font-sans text-base text-black/70">We&apos;ll follow up within one business day.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <InputText
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Name"
                        className={FIELD_CLASS}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <InputText
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Email"
                        className={FIELD_CLASS}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <InputText
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        className={FIELD_CLASS}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="service">Select Service</Label>
                    <Select
                        id="service"
                        name="service"
                        options={serviceOptions}
                        defaultValue={defaultService}
                        placeholder="Select Service"
                        triggerClassName={FIELD_CLASS}
                    />
                </div>
            </div>
            {showAttachment ? (
                <div className="grid gap-2">
                    <Label htmlFor="attachment">Attach File</Label>
                    <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        className="bg-light-green-cta file:text-forrest w-full rounded-md px-3 py-2 font-sans text-sm text-black/60 file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium"
                    />
                </div>
            ) : null}
            <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Describe your project"
                    className={`${FIELD_CLASS} min-h-28`}
                />
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-forrest hover:bg-forrest-light border-forrest hover:border-forrest-light inline-flex items-center justify-center gap-2.5 rounded-full border px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <Icon icon="lucide:arrow-right" width={14} height={14} className="shrink-0" />
                </button>
                {status === "error" ? (
                    <p role="alert" className="font-sans text-sm text-red-700">
                        Something went wrong. Please try again or call us.
                    </p>
                ) : null}
            </div>
        </form>
    );
}
