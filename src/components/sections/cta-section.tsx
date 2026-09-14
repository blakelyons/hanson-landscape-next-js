import { PillButton } from "@/components/ui/pill-button";

export function CtaSection() {
    return (
        <section className="relative flex w-full items-center justify-center overflow-clip">
            <div className="container flex items-center justify-center">
                <div className="bg-primary-light relative flex w-full max-w-5xl shrink-0 flex-col items-center justify-center gap-4.5 overflow-clip rounded-xl px-8 py-10 lg:py-15">
                    <h3 className="font-serif-display w-full min-w-full text-center text-4xl leading-11.5 font-normal text-pretty text-black not-italic">
                        Ready to Transform Your Space?
                    </h3>
                    <p className="w-full max-w-110.75 text-center font-sans text-lg leading-7 font-normal text-[rgba(0,0,0,0.5)]">
                        {`Get a free, no-obligation quote. We'll visit your property and bring your vision to life.`}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4.5 pt-6">
                        <PillButton variant="secondary" size="md" textClassName="text-white">
                            Get a Free Quote
                        </PillButton>
                        <PillButton variant="primary-dark" size="md" icon="lucide:phone">
                            Call Us Today
                        </PillButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
