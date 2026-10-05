// Client testimonials, carried over verbatim from the legacy hansonlandscape.com
// /testimonials page (light punctuation/capitalization cleanup only).
// `location` holds the client's business and/or town when given; may be empty.

export type Testimonial = {
    title?: string;
    quote: string;
    name: string;
    location: string;
};

export const CLIENT_TESTIMONIALS: Testimonial[] = [
    {
        title: "Meticulous Attention to Detail",
        quote: "\u201cThey installed beautiful flowers, an entry sidewalk and patio for our home.\u201d",
        name: "Mark Weinhold",
        location: "",
    },
    {
        title: "Organized and Friendly",
        quote: "\u201cVery well organized and friendly. Also willing to go the extra mile to make sure the work is done properly and well.\u201d",
        name: "Jenny Brown",
        location: "Westwood Terrace Apartments, Moline, IL",
    },
    {
        title: "Professional, Courteous, Hard Working",
        quote: "\u201cMaintenance staff is professional and courteous and very hard working.\u201d",
        name: "Lakewood Springs HOA",
        location: "",
    },
    {
        title: "Excellent Service",
        quote: "\u201cExcellent service and quality products. Very friendly crew, best yard clean up in town.\u201d",
        name: "Wanda Bass",
        location: "",
    },
    {
        title: "Provided Us With Great Services",
        quote: "\u201cYour crew came out and did a great job taking care of us and we were very pleased with the service.\u201d",
        name: "T.J. Thiltgen",
        location: "",
    },
    {
        title: "Caring and Professional",
        quote: "\u201cHanson Landscape is very caring and professional.\u201d",
        name: "Horst Korallus",
        location: "Infiniti of Clarendon Hills & Infiniti of Naperville",
    },
    {
        title: "Timely Service",
        quote: "\u201cVery professional, timely service and good call reply time.\u201d",
        name: "Doug Grillaert",
        location: "",
    },
    {
        title: "Exceeding Expectations",
        quote: "\u201cProfessional work that exceeded our expectations.\u201d",
        name: "Randy Meier",
        location: "",
    },
    {
        title: "Quick, Reliable & Dedicated",
        quote: "\u201cQuick, reliable and dedicated to making sure your experience is perfect.\u201d",
        name: "Amli at River Run",
        location: "",
    },
    {
        title: "Attention to Detail",
        quote: "\u201cTheir attention to detail and timeliness is second to none.\u201d",
        name: "Brent",
        location: "",
    },
    {
        title: "Just Perfect",
        quote: "\u201cThank you, thank you, thank you. I just love the landscaping work you did for us.\u201d",
        name: "Dana Lamont",
        location: "Somonauk, IL",
    },
];
