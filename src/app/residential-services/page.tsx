import type { Metadata } from "next";
import { ServiceHub } from "@/components/services/service-hub";
import { SECTOR_HUBS } from "@/content/services";

const hub = SECTOR_HUBS.residential;

export const metadata: Metadata = { title: hub.title, description: hub.description };

export default function ResidentialServicesPage() {
    return <ServiceHub hub={hub} />;
}
