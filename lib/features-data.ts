import {
  CalendarCheck,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  PlaySquare,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Les 7 fonctionnalités clés de Bara Pro CI. Source unique réutilisée sur
 * l'accueil (aperçu) et la page Fonctionnalités (détail).
 */
export type Feature = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent visuel de la carte. */
  accent: "orange" | "green" | "gold";
};

export const features: Feature[] = [
  {
    slug: "fil-video",
    icon: PlaySquare,
    title: "Fil de talents en vidéo",
    description:
      "Un fil vertical façon TikTok où chaque artisan montre son travail en action. Voir, c'est déjà faire confiance.",
    accent: "orange",
  },
  {
    slug: "profils-verifies",
    icon: ShieldCheck,
    title: "Profils vérifiés",
    description:
      "Identité, compétences et références contrôlées. Un badge de confiance pour chaque pro, fini les mauvaises surprises.",
    accent: "green",
  },
  {
    slug: "recherche-intelligente",
    icon: Search,
    title: "Recherche intelligente",
    description:
      "Trouvez le bon métier, au bon endroit, au bon budget. Filtres par spécialité, note, disponibilité et proximité.",
    accent: "orange",
  },
  {
    slug: "carte-interactive",
    icon: MapPin,
    title: "Carte interactive",
    description:
      "Repérez les artisans autour de vous en un coup d'œil. La proximité, c'est l'intervention plus rapide.",
    accent: "gold",
  },
  {
    slug: "reservation",
    icon: CalendarCheck,
    title: "Réservation en ligne",
    description:
      "Choisissez un créneau et réservez en quelques secondes, 24h/24. Confirmation immédiate, sans allers-retours.",
    accent: "green",
  },
  {
    slug: "messagerie",
    icon: MessageCircle,
    title: "Messagerie intégrée",
    description:
      "Échangez, partagez des photos et cadrez le devis directement dans l'app. Toute la conversation au même endroit.",
    accent: "orange",
  },
  {
    slug: "tableau-de-bord-pro",
    icon: LayoutDashboard,
    title: "Tableau de bord pro",
    description:
      "Pour les artisans : gérez vos vidéos, demandes, réservations et avis. Développez votre activité, en toute simplicité.",
    accent: "gold",
  },
];

/** Classes utilitaires par accent, pour les icônes/cartes. */
export const accentClasses: Record<
  Feature["accent"],
  { bg: string; text: string; ring: string }
> = {
  orange: {
    bg: "bg-primary/10",
    text: "text-primary",
    ring: "group-hover:border-primary/40",
  },
  green: {
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    ring: "group-hover:border-brand-green/40",
  },
  gold: {
    bg: "bg-brand-gold/15",
    text: "text-accent-foreground",
    ring: "group-hover:border-brand-gold/50",
  },
};
