import { ContactForm } from "@/components/contact/contact-form";
import { SERVICE_OPTIONS } from "@/content/services";

export function ConsultationSection() {
    return (
        <section className="relative flex w-full items-start overflow-clip py-10 md:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt=""
                    className="absolute size-full max-w-none object-cover"
                    src="/images/home/consultation-bg.jpg"
                />
                <div className="from-neutral-25 absolute inset-0 bg-linear-to-b to-[rgba(242,242,242,0)] to-[50.481%]" />
            </div>
            <div className="relative container flex h-full items-center justify-center md:justify-end">
                <div className="relative flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 lg:max-w-161.75">
                    <h2 className="font-serif-display w-full text-3xl leading-10.5 font-normal text-black not-italic">
                        Book a Consultation Today
                    </h2>
                    <ContactForm serviceOptions={SERVICE_OPTIONS} showAttachment={false} />
                </div>
            </div>
        </section>
    );
}
