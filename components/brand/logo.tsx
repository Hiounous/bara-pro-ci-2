import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Symbole de marque Bara Pro CI : une « tuile vidéo » orange avec un bouton
 * lecture blanc et le point rouge d'enregistrement — le fil de talents en
 * vidéo, cœur du produit. SVG inline (net à toute taille, aucun fichier).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 54 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="Bara Pro CI"
    >
      {/* Tuile vidéo */}
      <rect
        x="1"
        y="4"
        width="46"
        height="34"
        rx="10"
        className="fill-primary"
      />
      {/* Bouton lecture */}
      <path d="M19.5 13.5 19.5 28.5 32.5 21 Z" fill="white" />
      {/* Point rouge d'enregistrement */}
      <circle
        cx="42"
        cy="11"
        r="6.5"
        fill="#EE3E2E"
        stroke="white"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/**
 * Logo cliquable (retour accueil).
 *
 * - Si `imageSrc` est fourni (ex. le logo circulaire officiel déposé dans
 *   `public/`), on l'affiche tel quel — il contient déjà le texte.
 * - Sinon, on rend le lockup SVG : mark vidéo + « BARA » + pastille « CI ».
 */
export function Logo({
  className,
  withText = true,
  imageSrc,
}: {
  className?: string;
  withText?: boolean;
  imageSrc?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${siteConfig.name} — accueil`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={siteConfig.name}
          width={56}
          height={56}
          priority
          className="size-12 rounded-full object-cover shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <>
          <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
          {withText && (
            <span className="flex items-center gap-1.5">
              <span className="font-display text-xl font-bold italic tracking-tight text-primary">
                BARA
              </span>
              <span className="rounded-md bg-brand-green px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                CI
              </span>
            </span>
          )}
        </>
      )}
    </Link>
  );
}
