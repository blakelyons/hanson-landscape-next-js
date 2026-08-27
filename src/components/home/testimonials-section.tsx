import { SectionIntro } from "@/components/ui/section-intro";

const TESTIMONIALS = [
  {
    quote:
      '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
    name: "Sarah M.",
    location: "Naperville, IL",
  },
  {
    quote:
      '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
    name: "Sarah M.",
    location: "Naperville, IL",
  },
  {
    quote:
      '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
    name: "Sarah M.",
    location: "Naperville, IL",
  },
];

function TestimonialCard({ quote, name, location }: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="flex w-[336px] shrink-0 flex-col items-start gap-[30px] rounded-xl border border-forrest-light-2-border bg-forrest-light-2 p-8">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="size-5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src="/images/home/star-icon.svg" />
          </div>
        ))}
      </div>
      <p className="w-[277px] font-sans text-sm font-normal italic leading-6 text-white">{quote}</p>
      <p className="whitespace-nowrap font-sans text-sm font-normal italic leading-none text-white">
        <span className="font-bold italic leading-6">{name}</span>
        <span className="leading-6">
          <br aria-hidden />
          {location}
        </span>
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-clip bg-forest-dark py-20">
      <div className="container flex flex-col items-center justify-center gap-[60px] px-20">
        <SectionIntro
          className="h-[72px] w-full"
          eyebrow="client stories"
          heading="What Our Clients Say"
          eyebrowClassName="text-primary"
          headingClassName="text-white"
        />
        <div className="flex items-start gap-[60px]">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
