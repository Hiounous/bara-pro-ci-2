/**
 * Configuration centrale du site : identité, navigation, réseaux, SEO.
 * Source unique de vérité — évite les valeurs en dur dispersées dans le code.
 */

export const siteConfig = {
  name: "Bara Pro CI",
  shortName: "Bara Pro",
  slogan: "Trouvez un pro, en un clic.",
  description:
    "La première plateforme dédiée aux artisans qualifiés de Côte d'Ivoire. " +
    "Découvrez, comparez et réservez électriciens, plombiers, peintres, " +
    "menuisiers et mécaniciens de confiance grâce à un fil de talents en vidéo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_CI",
  city: "Abidjan, Côte d'Ivoire",
  email: "holy.corporation.us@gmail.com",
  // Affichage lisible + version brute pour les liens tel:/wa.me
  phone: "+225 07 47 74 97 09",
  phoneRaw: "+2250747749709",
  ogImage: "/opengraph-image",
} as const;

/** Liens de navigation principaux (header + footer). */
export const mainNav = [
  { title: "Fonctionnalités", href: "/fonctionnalites" },
  { title: "Comment ça marche", href: "/comment-ca-marche" },
  { title: "À propos", href: "/a-propos" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
] as const;

/** Regroupement des liens pour le footer. */
export const footerNav = {
  produit: [
    { title: "Fonctionnalités", href: "/fonctionnalites" },
    { title: "Comment ça marche", href: "/comment-ca-marche" },
    { title: "Rejoindre la liste", href: "/liste-attente" },
    { title: "Newsletter", href: "/newsletter" },
  ],
  entreprise: [
    { title: "À propos", href: "/a-propos" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/faq" },
  ],
  legal: [
    { title: "Confidentialité", href: "/confidentialite" },
    { title: "Conditions d'utilisation", href: "/conditions" },
  ],
} as const;

export const socialLinks = {
  tiktok: "https://www.tiktok.com/@barapro_ci",
  instagram: "https://www.instagram.com/barapro_ci/",
  linkedin: "https://www.linkedin.com/in/hiounous-kamara-887770295/",
  x: "https://x.com/barapro_ci",
} as const;

/** Métiers mis en avant sur le site. */
export const trades = [
  "Électricien",
  "Plombier",
  "Peintre",
  "Menuisier",
  "Mécanicien",
  "Maçon",
  "Carreleur",
  "Climatisation",
  "Soudeur",
  "Jardinier",
] as const;

export type SiteConfig = typeof siteConfig;
