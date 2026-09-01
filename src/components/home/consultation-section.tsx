export function ConsultationSection() {
    return (
        <section className="relative flex h-[773px] w-full items-start overflow-clip">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt=""
                    className="absolute size-full max-w-none object-cover"
                    src="/images/home/consultation-bg.jpg"
                />
                <div className="from-neutral-25 absolute inset-0 bg-gradient-to-b to-[rgba(242,242,242,0)] to-[50.481%]" />
            </div>
            <div className="relative container flex h-full items-start pt-20 pl-[643px]">
                <div className="relative flex w-[647px] flex-col items-center justify-center gap-2.5 overflow-clip rounded-xl bg-white p-8">
                    <p className="font-serif-display h-15 w-full text-[32px] leading-[42px] font-normal text-black not-italic">
                        Book a Consultation Today
                    </p>
                    <div className="relative w-full shrink-0" style={{ aspectRatio: "684 / 562" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="Consultation request form"
                            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                            src="/images/home/consultation-form-screenshot.jpg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
