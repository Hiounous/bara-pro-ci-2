/**
 * Données de démonstration pour la vitrine (aperçu du fil de talents,
 * témoignages, statistiques). Purement illustratives en phase pré-lancement —
 * centralisées ici pour être facilement remplacées par de vraies données.
 *
 * Les photos proviennent de banques d'images libres de droits (Pexels) et
 * illustrent des gestes de métier, sans personne identifiable : elles ne
 * représentent pas les artisans nommés ci-dessous.
 */

export type DemoArtisan = {
  name: string;
  trade: string;
  city: string;
  rating: number;
  reviews: number;
  verified: boolean;
  /** Photo d'illustration du métier (format vertical). */
  photo: string;
  /** Dégradé utilisé pour les pastilles/avatars et en repli de la photo. */
  gradient: string;
  emoji: string;
};

export const demoArtisans: DemoArtisan[] = [
  {
    name: "Koffi A.",
    trade: "Électricien",
    city: "Cocody, Abidjan",
    rating: 4.9,
    reviews: 127,
    verified: true,
    photo: "/artisans/electricien.jpg",
    gradient: "linear-gradient(150deg,#FF7A00,#E85D00)",
    emoji: "⚡",
  },
  {
    name: "Aminata D.",
    trade: "Peintre",
    city: "Yopougon, Abidjan",
    rating: 4.8,
    reviews: 89,
    verified: true,
    photo: "/artisans/peintre.jpg",
    gradient: "linear-gradient(150deg,#0B8A3D,#066A2E)",
    emoji: "🎨",
  },
  {
    name: "Ibrahim T.",
    trade: "Plombier",
    city: "Marcory, Abidjan",
    rating: 5.0,
    reviews: 64,
    verified: true,
    photo: "/artisans/plombier.jpg",
    gradient: "linear-gradient(150deg,#F4B740,#E85D00)",
    emoji: "🔧",
  },
  {
    name: "Yao K.",
    trade: "Menuisier",
    city: "Treichville, Abidjan",
    rating: 4.7,
    reviews: 52,
    verified: true,
    photo: "/artisans/menuisier.jpg",
    gradient: "linear-gradient(150deg,#14201A,#066A2E)",
    emoji: "🪵",
  },
  {
    name: "Adama K.",
    trade: "Soudeur",
    city: "Abobo, Abidjan",
    rating: 4.9,
    reviews: 73,
    verified: true,
    photo: "/artisans/soudeur.jpg",
    gradient: "linear-gradient(150deg,#FF7A00,#F4B740)",
    emoji: "🔥",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  emoji: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "J'ai trouvé un électricien vérifié en 5 minutes, un dimanche soir. Il est venu le lendemain matin. Bluffant.",
    name: "Marie-Louise K.",
    role: "Cliente · Cocody",
    emoji: "😍",
  },
  {
    quote:
      "Depuis que je publie mes vidéos sur Bara Pro, mon carnet de commandes est plein. Les clients voient enfin mon vrai travail.",
    name: "Sékou C.",
    role: "Menuisier · Yopougon",
    emoji: "🛠️",
  },
  {
    quote:
      "Fini les mauvaises surprises. Les avis et la vérification changent tout quand on cherche un pro de confiance.",
    name: "Georges A.",
    role: "Client · Marcory",
    emoji: "👍",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "10+", label: "métiers couverts" },
  { value: "100%", label: "artisans vérifiés" },
  { value: "0 F", label: "pour créer son profil" },
  { value: "24/7", label: "réservation en ligne" },
];
