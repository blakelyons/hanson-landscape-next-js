import { PillButton } from "@/components/ui/pill-button";

export function CtaSection() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-clip">
     <div className="container flex items-center justify-center px-20 pt-20">
      <div className="relative flex w-[1024px] shrink-0 flex-col items-center justify-center gap-[18px] overflow-clip rounded-xl bg-amber-light py-[60px]">
        <p className="w-full min-w-full text-center font-serif-display text-[40px] font-normal not-italic leading-[46px] text-black">
          Ready to Transform Your Space?
        </p>
        <p className="w-[443px] text-center font-sans text-lg font-normal leading-7 text-[rgba(0,0,0,0.5)]">
          {`Get a free, no-obligation quote. We'll visit your property and bring your vision to life.`}
        </p>
        <div className="flex items-start gap-[18px] pt-6">
          <PillButton variant="green" size="md" textClassName="text-white">
            Get a Free Quote
          </PillButton>
          <PillButton
            variant="amber-dark"
            size="md"
            textClassName="text-amber-dark-2"
            icon="/images/home/arrow-icon-cta.svg"
          >
            Call Us Today
          </PillButton>
        </div>
      </div>
     </div>
    </section>
  );
}
