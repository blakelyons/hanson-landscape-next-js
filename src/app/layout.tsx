import type { Metadata } from "next";
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
  description: "TODO: replace with the real Hanson Landscape site description.",
  openGraph: {
    type: "website",
    siteName: "Hanson Landscape",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable} ${dmMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
