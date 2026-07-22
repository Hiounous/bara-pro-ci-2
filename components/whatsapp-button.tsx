"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";

/** Logo WhatsApp (SVG inline). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.04 4C9.9 4 4.92 8.98 4.92 15.12c0 2.13.6 4.12 1.64 5.82L4.5 28l7.24-1.9a11.06 11.06 0 0 0 4.3.86h.01c6.14 0 11.12-4.98 11.12-11.12S22.18 4 16.04 4Zm0 20.3h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.9 1.02 1.04-3.8-.22-.35a9.16 9.16 0 0 1-1.4-4.87c0-5.08 4.14-9.22 9.22-9.22 2.46 0 4.78.96 6.52 2.7a9.16 9.16 0 0 1 2.7 6.52c0 5.08-4.14 9.22-9.23 9.22Zm5.06-6.9c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.74-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.2 1.25.18 1.72.1.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32Z" />
    </svg>
  );
}

/**
 * Bouton WhatsApp flottant, présent sur toutes les pages. Ouvre une discussion
 * WhatsApp vers le numéro Bara Pro CI avec un message pré-rempli. Le canal n°1
 * en Côte d'Ivoire — pratique pour convertir clients et artisans.
 */
export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Bonjour Bara Pro CI 👋 J'aimerais avoir plus d'informations.",
  );
  const href = `https://wa.me/${siteConfig.phoneRaw.replace("+", "")}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-all duration-300 hover:pr-5 hover:shadow-[0_12px_34px_-8px_rgba(37,211,102,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[140px] group-hover:opacity-100">
        Écris-nous
      </span>
      {/* Pastille de notification */}
      <span className="absolute -right-0.5 -top-0.5 flex size-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
        <span className="relative inline-flex size-3.5 rounded-full border-2 border-white bg-brand-orange" />
      </span>
    </a>
  );
}
