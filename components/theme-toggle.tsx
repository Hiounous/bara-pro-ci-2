"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Bascule clair/sombre. On évite l'incohérence d'hydratation en n'affichant
 * l'icône réelle qu'après le montage (le thème n'est connu que côté client).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Pattern "mounted" canonique de next-themes : le thème résolu n'est connu
  // que côté client, on n'affiche donc l'icône réelle qu'après le montage pour
  // éviter tout décalage d'hydratation. (setState au montage, volontaire.)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // L'aria-label dépend du thème résolu (inconnu au SSR) : on garde un libellé
  // neutre tant que le composant n'est pas monté pour éviter tout décalage
  // d'hydratation.
  const label = !mounted
    ? "Changer de thème"
    : isDark
      ? "Activer le thème clair"
      : "Activer le thème sombre";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative"
    >
      {mounted ? (
        <>
          <Sun
            className={`transition-all ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"} absolute`}
          />
          <Moon
            className={`transition-all ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"} absolute`}
          />
        </>
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
