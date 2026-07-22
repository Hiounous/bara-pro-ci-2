"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

/** Logo WhatsApp compact. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M16.04 4C9.9 4 4.92 8.98 4.92 15.12c0 2.13.6 4.12 1.64 5.82L4.5 28l7.24-1.9a11.06 11.06 0 0 0 4.3.86c6.14 0 11.12-4.98 11.12-11.12S22.18 4 16.04 4Zm5.06 13.4c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.74-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.2 1.25.18 1.72.1.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32Z" />
    </svg>
  );
}

/**
 * Boutons de partage affichés après une inscription réussie : encourage la
 * viralité (WhatsApp = canal n°1 en CI) + copie du lien.
 */
export function ShareButtons({ message }: { message?: string }) {
  const [copied, setCopied] = React.useState(false);
  const url = siteConfig.url;
  const text = message ?? "Je viens de rejoindre la liste d'attente de Bara Pro CI 🇨🇮 — trouve un artisan de confiance en un clic :";

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible : on ignore silencieusement.
    }
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
      <Button asChild variant="green" size="sm">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph /> Partager sur WhatsApp
        </a>
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? (
          <>
            <Check className="size-4 text-brand-green" /> Lien copié
          </>
        ) : (
          <>
            <Copy className="size-4" /> Copier le lien
          </>
        )}
      </Button>
    </div>
  );
}
