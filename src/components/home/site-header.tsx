import { ServicesNavDropdown } from "./nav-dropdown";

const NAV_LINKS = ["Home", "About"];
const NAV_LINKS_AFTER = ["Portfolio", "Testimonials"];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-[13px] z-20 h-[114px] w-full">
      <div className="container flex h-full items-start justify-between">
        <a href="#" className="ml-[94px] mt-[7px] block h-[145px] w-[183px] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Hanson Landscape" className="size-full object-cover" src="/images/home/logo.png" />
        </a>
        <nav className="mr-[250px] mt-[31px] flex items-center gap-8">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap font-sans text-base font-medium leading-[52px] text-white transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
          <ServicesNavDropdown />
          {NAV_LINKS_AFTER.map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap font-sans text-base font-medium leading-[52px] text-white transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-[39px] bg-primary px-8 py-2.5 font-sans text-sm font-medium text-white"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
