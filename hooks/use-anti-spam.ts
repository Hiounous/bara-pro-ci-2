"use client";

import * as React from "react";

/**
 * Fournit les champs anti-spam à ajouter aux formulaires :
 * - `fieldProps` : à étaler sur un <input> caché (honeypot).
 * - `append(fd)` : ajoute le honeypot + l'horodatage de début au FormData
 *   juste avant l'envoi.
 */
export function useAntiSpam() {
  // Horodatage du montage du formulaire (dans un effet : Date.now() est impur
  // et ne doit pas être appelé pendant le rendu).
  const startedAt = React.useRef(0);
  React.useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const [website, setWebsite] = React.useState("");

  const append = React.useCallback(
    (fd: FormData) => {
      fd.set("website", website);
      fd.set("startedAt", String(startedAt.current));
    },
    [website],
  );

  const fieldProps = {
    type: "text" as const,
    name: "website",
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": true,
    className: "hidden",
    value: website,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setWebsite(e.target.value),
  };

  return { append, fieldProps };
}
