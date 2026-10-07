import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono, DM_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";
import "@/styles/main.scss";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-dm-sans",
    display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-dm-serif-display",
    display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-jetbrains-mono",
    display: "swap",
});

const dmMono = DM_Mono({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-dm-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansonlandscape.com"),
    title: {
        default: "Hanson Landscape",
        template: "%s | Hanson Landscape",
    },
    description:
        "Award-winning landscape design, construction and year-round care for residential and commercial properties across Chicagoland. Call (630) 556-4120 for a free quote.",
    // Each page's own canonical URL, resolved against metadataBase.
    alternates: { canonical: "./" },
    openGraph: {
        type: "website",
        siteName: "Hanson Landscape",
        locale: "en_US",
    },
    twitter: { card: "summary_large_image" },
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
};

export const viewport: Viewport = {
    themeColor: "#2b6733",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable} ${dmMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="flex min-h-full flex-col">
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
