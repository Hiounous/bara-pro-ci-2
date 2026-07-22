import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { footerNav, siteConfig, socialLinks } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

/** Icônes de réseaux sociaux (SVG inline, pas de dépendance de marque). */
const socials = [
  {
    href: socialLinks.tiktok,
    label: "TikTok",
    path: "M16.5 5.5a4.5 4.5 0 0 0 3.5 1.7V10a7.4 7.4 0 0 1-3.5-.9v5.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3a2.7 2.7 0 1 0 1.9 2.6V2h2.9c.1 1.3.7 2.6 1.5 3.5Z",
  },
  {
    href: socialLinks.instagram,
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm6.6-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    path: "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 8.5H3V21h4V8.5Zm6.32 0H9.5V21h3.8v-6.6c0-3.5 4.5-3.8 4.5 0V21H21v-7.9c0-6-6.4-5.8-7.68-2.8V8.5Z",
  },
  {
    href: socialLinks.x,
    label: "X",
    path: "M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L4.8 22H1.7l7.5-8.6L1.3 2h6.6l4.5 6.7L18.9 2Zm-1.1 18h1.8L7.3 3.8H5.4L17.8 20Z",
  },
];

/**
 * Pied de page : navigation, inscription newsletter, réseaux sociaux et la
 * mention « Conçu en Côte d'Ivoire ».
 */
export function SiteFooter({ logoSrc }: { logoSrc?: string }) {
  return (
    <footer className="mt-24 border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Colonne marque + newsletter */}
          <div className="space-y-5">
            <Logo imageSrc={logoSrc} />
            <p className="max-w-xs text-sm text-muted-foreground">
              La première plateforme des artisans qualifiés de Côte d&apos;Ivoire.
              Trouvez un pro, en un clic.
            </p>
            <div>
              <p className="mb-2 text-sm font-medium">Reste informé du lancement</p>
              <NewsletterForm source="footer" className="max-w-sm" />
            </div>
          </div>

          {/* Colonnes de liens */}
          <FooterColumn title="Produit" links={footerNav.produit} />
          <FooterColumn title="Entreprise" links={footerNav.entreprise} />
          <FooterColumn title="Légal" links={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" /> {siteConfig.city}
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              Conçu avec <Heart className="size-3.5 fill-primary text-primary" /> en
              Côte d&apos;Ivoire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { title: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
