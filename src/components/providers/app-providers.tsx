"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { RouteTransitionProvider } from "@/components/transitions/route-transition-overlay";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryProvider>
                <SmoothScrollProvider>
                    <RouteTransitionProvider>{children}</RouteTransitionProvider>
                </SmoothScrollProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}
