import { SiteHeader } from "@/components/home/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PortfolioBento } from "@/components/home/portfolio-bento";
import { CtaSection } from "@/components/home/cta-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { ProcessSection } from "@/components/home/process-section";
import { ConsultationSection } from "@/components/home/consultation-section";
import { SiteFooter } from "@/components/home/site-footer";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-white">
      <div className="relative">
        <SiteHeader />
        <HeroSection />
      </div>
      <TrustBar />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <PortfolioBento />
      <CtaSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <ConsultationSection />
      <SiteFooter />
    </div>
  );
}
