import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
    title: { absolute: "Hanson Landscape | Landscape Design, Construction & Maintenance in Chicagoland" },
    description:
        "Award-winning landscape design, construction and year-round care for residential and commercial properties across Chicagoland. Call (630) 556-4120 for a free quote.",
};

export default function Home() {
    return <HomePage />;
}
