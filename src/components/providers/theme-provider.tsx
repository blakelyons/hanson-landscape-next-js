"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper so next-themes stays a client boundary of its own.
 * No named themes are defined yet beyond light/dark/system — extend the
 * `themes` prop here when seasonal/brand variants are designed.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
