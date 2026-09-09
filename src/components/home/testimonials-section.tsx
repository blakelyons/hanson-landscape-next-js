"use client";
import { useRef } from "react";
import { SectionIntro } from "@/components/ui/section-intro";
import { Icon } from "@/components/ui/icon";
import { Carousel } from "@/components/ui/carousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        quote: '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
        name: "Sarah M.",
        location: "Naperville, IL",
    },
    {
        quote: '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
        name: "Sarah M.",
        location: "Naperville, IL",
    },
    {
        quote: '"Hanson Landscape transformed our backyard into an oasis. The attention to detail was incredible and the team was professional throughout."',
        name: "Sarah M.",
        location: "Naperville, IL",
    },
];

function TestimonialCard({ quote, name, location }: (typeof TESTIMONIALS)[number]) {
    return (
        <div className="testimonial-card border-forrest-light-2-border bg-forrest-light-2 flex w-84 shrink-0 flex-col items-start gap-7.5 rounded-xl border p-8">
            <div className="testimonial-card__stars flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="text-primary star size-5 shrink-0">
                        <Icon icon="mingcute:star-fill" width={20} height={20} />
                    </div>
                ))}
            </div>
            <p className="testimonial-card__quote w-69.25 font-sans text-sm leading-6 font-normal text-white italic">
                {quote}
            </p>
            <p className="testimonial-card__name font-sans text-sm leading-none font-normal whitespace-nowrap text-white italic">
                <span className="leading-6 font-bold italic">{name}</span>
                <span className="leading-6">
                    <br aria-hidden />
                    {location}
                </span>
            </p>
        </div>
    );
}

export function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

            if (!cards.length) return;

            gsap.set(".testimonial-card__stars .star", {
                opacity: 0,
                x: -10,
            });

            const tl = gsap.timeline({
                defaults: { duration: 0.8, ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center+=20%",
                },
            });

            const cardStagger = 0.3;

            cards.forEach((card, index) => {
                const stars = card.querySelectorAll(".star");
                const quote = card.querySelector(".testimonial-card__quote");
                const name = card.querySelector(".testimonial-card__name");
                const cardStart = index * cardStagger;

                gsap.set([quote, name], {
                    opacity: 0,
                    y: 10,
                });

                tl.to(stars, { opacity: 1, x: 0, stagger: 0.05 }, cardStart)
                    .to(quote, { opacity: 1, y: 0 }, cardStart + 0.5)
                    .to(name, { opacity: 1, y: 0 }, cardStart + 0.9);
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="testimonials-section bg-forrest-dark relative flex w-full flex-col items-center justify-center overflow-clip py-20"
        >
            <div className="container flex flex-col items-center justify-center gap-15">
                <SectionIntro
                    className="w-full"
                    eyebrow="client stories"
                    eyebrowColor="text-primary"
                    heading="What Our Clients Say"
                    headingClassName="text-white"
                    animateEntrance
                />
                {/* w-282 (1128px) = 3 cards * 336px + 2 gaps * 60px, so Swiper's numeric
                    slidesPerView divides evenly back to the card's own fixed width. */}
                <div className="w-full">
                    {TESTIMONIALS.length > 3 ? (
                        <Carousel
                            slides={TESTIMONIALS.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                            slidesPerView={3}
                            spaceBetween={32}
                            showDots={false}
                            showArrows
                            loop
                        />
                    ) : (
                        <div className="flex flex-row flex-wrap items-center justify-center gap-8">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
