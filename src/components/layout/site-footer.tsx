import { FooterColumn } from "./footer-column";
import { PartnerLogos } from "@/components/ui/partner-logos";

const MENU_COLUMNS = [
  {
    heading: "COMPANY",
    items: ["About Us", "Portfolio", "Testimonials", "Careers"],
  },
  {
    heading: "COMMERCIAL SERVICES",
    items: ["Landscape Maintenance", "Landscape Construction", "Landscape Enhancement", "Snow & Ice Management"],
  },
  {
    heading: "RESIDENTIAL SERVICES",
    items: ["Landscape Design", "Landscape Construction"],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full">
      <div
        className="h-[3px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(34, 197, 94) 0%, rgb(248, 156, 28) 25%, rgb(159, 51, 34) 75%, rgb(34, 197, 94) 100%)",
        }}
      />
      <div className="flex w-full flex-col items-center bg-neutral-700 py-20">
       <div className="container flex flex-col items-start px-20">
        <div className="grid w-full grid-cols-[361px_1fr] gap-x-[43px]">
          <div className="flex flex-col items-start gap-[21px]">
            <div className="relative h-[88px] w-[111px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Hanson Landscape"
                className="absolute inset-0 size-full max-w-none object-cover"
                src="/images/home/logo.png"
              />
            </div>
            <p className="w-full min-w-full font-serif-display text-[40px] font-normal not-italic leading-[46px] text-white">
              Our Mission
            </p>
            <p className="w-full min-w-full font-sans text-lg font-normal leading-7 text-[rgba(255,255,255,0.5)]">
              {`Dolore sit laboris veniam aliquip. Cupidatat officia veniam adipisicing. Nisi aliqua duis ut nostrud aliquip sit. `}
            </p>
          </div>

          <div className="grid grid-cols-[96px_188px_195px_222px] gap-x-[43px]">
            {MENU_COLUMNS.map((column) => (
              <FooterColumn key={column.heading} heading={column.heading} items={column.items} className="flex w-full flex-col items-start gap-4" />
            ))}
            <div className="flex w-full flex-col items-start gap-4">
              <p className="h-[45px] w-full font-mono-label text-base font-normal leading-[52px] text-[rgba(255,255,255,0.35)]">
                Contact
              </p>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="w-full whitespace-pre-wrap font-sans text-base font-normal leading-none text-[rgba(255,255,255,0.5)]">
                  <p className="mb-0 leading-4">(630) 556-4120</p>
                  <p className="mb-0 leading-4">&#8203;</p>
                  <p className="mb-0 leading-4 text-forrest">info@hansonlandscape.com</p>
                  <p className="mb-0 leading-4">&#8203;</p>
                  <p className="leading-4">Chicagoland Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PartnerLogos className="ml-[450px] mt-10 flex items-center gap-4" />

        <div className="mt-10 flex w-full items-center justify-between border-t border-[rgba(255,255,255,0.5)] pt-8 font-sans text-base font-normal leading-4 text-[rgba(255,255,255,0.5)]">
          <p className="shrink-0 whitespace-nowrap">© 2026 Hanson Landscape. All rights reserved.</p>
          <p className="shrink-0 whitespace-pre">{`Privacy Policy   |   Site Map`}</p>
        </div>
       </div>
      </div>
    </footer>
  );
}
