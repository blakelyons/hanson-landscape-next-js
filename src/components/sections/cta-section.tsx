import { PillButton } from "@/components/ui/pill-button";

export function CtaSection() {
    return (
        <section className="relative flex w-full items-center justify-center overflow-clip">
            <div className="container flex items-center justify-center px-20 pt-20">
                <div className="bg-primary-light relative flex w-[1024px] shrink-0 flex-col items-center justify-center gap-[18px] overflow-clip rounded-xl py-[60px]">
                    <p className="font-serif-display w-full min-w-full text-center text-[40px] leading-[46px] font-normal text-black not-italic">
                        Ready to Transform Your Space?
                    </p>
                    <p className="w-[443px] text-center font-sans text-lg leading-7 font-normal text-[rgba(0,0,0,0.5)]">
                        {`Get a free, no-obligation quote. We'll visit your property and bring your vision to life.`}
                    </p>
                    <div className="flex items-start gap-[18px] pt-6">
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
