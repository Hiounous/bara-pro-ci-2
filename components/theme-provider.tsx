"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Fournit le contexte de thème clair/sombre à toute l'application.
 * `attribute="class"` applique la classe `.dark` sur <html>, ce que notre
 * design system (globals.css) attend pour la variante Tailwind `dark:`.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
