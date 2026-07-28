/**
 * Contenus de la newsletter Bara Pro CI.
 *
 * Deux familles de messages :
 *  - `regularCampaigns` : rotation envoyée chaque mercredi et dimanche ;
 *  - `holidayCampaigns` : messages liés aux fêtes ivoiriennes, prioritaires
 *    le jour J (quel que soit le jour de la semaine).
 *
 * Les textes restent volontairement qualitatifs : aucune statistique chiffrée
 * n'est avancée sans source vérifiable.
 */

export type Campaign = {
  /** Identifiant stable (logs). */
  slug: string;
  /** Objet de l'email. */
  subject: string;
  /** Texte d'aperçu affiché après l'objet dans la boîte de réception. */
  preheader: string;
  /** Titre affiché en haut du message. */
  title: string;
  /** Corps du message (un élément = un paragraphe). */
  paragraphs: string[];
  /** Phrase mise en avant dans un encadré (optionnelle). */
  highlight?: string;
  /** Libellé du bouton principal. */
  ctaLabel: string;
};

/** Rotation régulière (mercredi & dimanche). */
export const regularCampaigns: Campaign[] = [
  {
    slug: "artisanat-voie-davenir",
    subject: "L'artisanat ivoirien, une voie d'avenir 🇨🇮",
    preheader: "Et si le prochain grand métier était déjà entre nos mains ?",
    title: "L'artisanat, une voie d'avenir",
    paragraphs: [
      "En Côte d'Ivoire, une part immense de l'activité économique repose sur des femmes et des hommes qui travaillent de leurs mains : électriciens, plombiers, peintres, menuisiers, mécaniciens. Ils construisent, réparent, embellissent notre quotidien.",
      "Pourtant, ces métiers restent souvent invisibles. Beaucoup d'artisans talentueux ne dépassent jamais la clientèle de leur quartier — non par manque de compétence, mais par manque de visibilité.",
      "C'est précisément ce déséquilibre que Bara Pro CI veut corriger : donner à chaque artisan une vitrine à la hauteur de son savoir-faire, et à chaque client la certitude de tomber sur un vrai professionnel.",
    ],
    highlight:
      "Le talent ne manque pas en Côte d'Ivoire. C'est le pont entre ce talent et ceux qui en ont besoin qui manquait.",
    ctaLabel: "Rejoindre la liste d'attente",
  },
  {
    slug: "emploi-jeunes",
    subject: "Créer son emploi plutôt que l'attendre",
    preheader: "Les métiers manuels recrutent — et ils ne demandent qu'à être vus.",
    title: "Créer son emploi plutôt que l'attendre",
    paragraphs: [
      "L'emploi des jeunes est l'un des grands défis de notre pays. Chaque année, des milliers de personnes cherchent leur place — pendant que des métiers essentiels peinent à trouver des bras qualifiés.",
      "L'artisanat offre une réponse concrète : une compétence qui s'apprend, un métier qui ne se délocalise pas, et une demande qui ne s'arrête jamais. Un bon électricien, un bon plombier, ne manquera jamais de travail — à condition qu'on puisse le trouver.",
      "Bara Pro CI construit ce chaînon manquant : une plateforme où le travail bien fait devient une carte de visite, et où un jeune artisan peut se bâtir une réputation dès ses premiers chantiers.",
    ],
    ctaLabel: "Je veux en être au lancement",
  },
  {
    slug: "video-nouveau-cv",
    subject: "La vidéo, le nouveau CV de l'artisan 🎥",
    preheader: "Montrer vaut mieux que promettre.",
    title: "La vidéo, le nouveau CV de l'artisan",
    paragraphs: [
      "Comment prouver qu'on travaille bien ? Pendant longtemps, la seule réponse était : « demandez autour de vous ». Le bouche-à-oreille reste précieux, mais il s'arrête aux frontières du quartier.",
      "Aujourd'hui, une courte vidéo suffit à changer la donne. Une soudure nette, un carrelage aligné au millimètre, une finition impeccable : en quelques secondes, le client comprend à qui il a affaire.",
      "C'est le cœur de Bara Pro CI : un fil de talents où chaque artisan montre son travail en action. Pas de promesses, des preuves. Et pour le client, la tranquillité de voir avant de réserver.",
    ],
    highlight:
      "Sur Bara Pro CI, votre travail parle pour vous — 24 heures sur 24.",
    ctaLabel: "Découvrir la plateforme",
  },
  {
    slug: "confiance-monnaie",
    subject: "La confiance, la vraie monnaie de l'artisanat",
    preheader: "Ce que change un badge vérifié.",
    title: "La confiance, la vraie monnaie",
    paragraphs: [
      "Faire entrer un inconnu chez soi pour des travaux demande une part de confiance. Trop souvent, cette confiance repose sur un numéro transmis par un ami, sans garantie réelle.",
      "Nous pensons que la confiance doit se construire, se vérifier et se voir. C'est pourquoi chaque artisan de Bara Pro CI passe par un processus de vérification, et pourquoi les avis clients occupent une place centrale sur son profil.",
      "Pour l'artisan sérieux, c'est une reconnaissance méritée. Pour le client, c'est la fin des mauvaises surprises. Tout le monde y gagne.",
    ],
    ctaLabel: "Rejoindre la liste d'attente",
  },
  {
    slug: "economie-locale",
    subject: "Le numérique au service de l'économie locale",
    preheader: "La technologie n'est utile que si elle sert le terrain.",
    title: "Le numérique au service du local",
    paragraphs: [
      "On associe souvent le numérique aux grandes entreprises internationales. Nous croyons l'inverse : les outils les plus utiles sont ceux qui font vivre l'économie de proximité.",
      "Chaque réservation passée sur Bara Pro CI, c'est un revenu pour un artisan d'Abidjan, une famille qui vit de son métier, un savoir-faire qui se transmet. La technologie n'est qu'un moyen — la finalité, c'est l'impact local.",
      "C'est aussi pour cela que nous construisons cette plateforme ici, en Côte d'Ivoire, avec les réalités d'ici : les quartiers, les habitudes, les modes de paiement, la langue.",
    ],
    highlight: "Conçu en Côte d'Ivoire, pour la Côte d'Ivoire.",
    ctaLabel: "Soutenir le projet",
  },
  {
    slug: "informel-opportunite",
    subject: "De l'informel à la reconnaissance",
    preheader: "Structurer sans dénaturer.",
    title: "De l'informel à la reconnaissance",
    paragraphs: [
      "Une grande partie de l'activité artisanale se déroule de manière informelle. Ce n'est pas un défaut de sérieux : c'est souvent le seul cadre disponible pour travailler.",
      "Notre ambition n'est pas d'imposer des contraintes, mais d'apporter des outils : un profil professionnel, un historique de travaux, des avis clients, un suivi des demandes. Autant d'éléments qui donnent de la valeur à une activité existante.",
      "Un artisan qui peut montrer son parcours et sa réputation gagne en crédibilité — auprès des clients, mais aussi des partenaires et des institutions.",
    ],
    ctaLabel: "Créer ma place sur la plateforme",
  },
  {
    slug: "temps-perdu",
    subject: "Combien de temps perdez-vous à chercher un pro ?",
    preheader: "Le calcul est vite fait.",
    title: "Le vrai coût d'une recherche",
    paragraphs: [
      "Une fuite d'eau un dimanche soir. Une panne électrique la veille d'un événement. Et là commence la tournée : appeler un cousin, demander à un voisin, attendre un rappel qui n'arrive jamais.",
      "Ce temps perdu a un coût réel : des dégâts qui s'aggravent, des journées de travail sacrifiées, du stress évitable. Et à l'arrivée, aucune garantie sur la qualité de l'intervention.",
      "Avec Bara Pro CI, la recherche devient immédiate : le métier, votre quartier, les artisans disponibles autour de vous — et la réservation en quelques secondes.",
    ],
    highlight: "Trouvez un pro, en un clic. C'est tout l'objet de notre travail.",
    ctaLabel: "Être prévenu au lancement",
  },
  {
    slug: "fierte-du-metier",
    subject: "« Bara » : le travail comme fierté",
    preheader: "Pourquoi nous avons choisi ce nom.",
    title: "« Bara » : le travail comme fierté",
    paragraphs: [
      "En nouchi, « bara » signifie le travail. Ce n'est pas un mot choisi au hasard : il porte l'idée que le travail bien fait mérite d'être vu, reconnu et valorisé.",
      "Derrière chaque installation électrique sûre, chaque meuble sur mesure, chaque mur repeint avec soin, il y a des années d'apprentissage et un vrai savoir-faire. Cela ne devrait jamais rester dans l'ombre.",
      "Bara Pro CI est né de cette conviction : remettre l'artisan au centre, et faire du savoir-faire ivoirien une fierté visible de tous.",
    ],
    ctaLabel: "Rejoindre l'aventure",
  },
  {
    slug: "feuille-de-route",
    subject: "Abidjan d'abord, puis toute la Côte d'Ivoire",
    preheader: "Où nous en sommes, et ce qui arrive.",
    title: "Notre feuille de route",
    paragraphs: [
      "Nous préparons le lancement à Abidjan. Commencer par une ville nous permet de bien faire les choses : vérifier sérieusement les artisans, soigner l'expérience et bâtir une communauté solide.",
      "Viendront ensuite les autres villes du pays, au rythme de notre capacité à maintenir le même niveau d'exigence. Nous préférons grandir bien que grandir vite.",
      "Les inscrits de la première heure — vous — bénéficieront d'un accès prioritaire. Merci d'être là avant même l'ouverture : cela compte énormément.",
    ],
    ctaLabel: "Garder ma place prioritaire",
  },
  {
    slug: "client-artisan-gagnant",
    subject: "Deux besoins, une seule plateforme",
    preheader: "Ce que chacun y gagne.",
    title: "Client ou artisan : deux fois gagnant",
    paragraphs: [
      "Côté client, la demande est simple : trouver rapidement quelqu'un de compétent, savoir combien ça coûte, et être sûr que le travail sera bien fait.",
      "Côté artisan, le besoin est symétrique : être trouvé, prouver sa valeur, remplir son carnet de commandes sans dépendre uniquement du bouche-à-oreille.",
      "Une plateforme ne fonctionne que si elle sert les deux côtés. C'est la règle que nous nous imposons à chaque décision : si une fonctionnalité n'aide ni le client ni l'artisan, elle n'a pas sa place.",
    ],
    ctaLabel: "Choisir mon profil",
  },
];

/** Message lié à une fête (prioritaire le jour J). */
export type HolidayCampaign = Campaign & {
  /** Mois (1-12). */
  month: number;
  /** Jour du mois. */
  day: number;
};

/**
 * Fêtes à date fixe en Côte d'Ivoire.
 *
 * ⚠️ Les fêtes mobiles (Pâques, Ascension, Pentecôte) et les fêtes musulmanes
 * (Aïd el-Fitr, Tabaski, Maouloud) suivent des calendriers variables : leurs
 * dates doivent être ajoutées manuellement chaque année dans ce tableau.
 */
export const holidayCampaigns: HolidayCampaign[] = [
  {
    month: 1,
    day: 1,
    slug: "nouvel-an",
    subject: "Bonne année 2027 ! 🎉",
    preheader: "Nos vœux pour vous et vos projets.",
    title: "Bonne et heureuse année",
    paragraphs: [
      "Toute l'équipe Bara Pro CI vous souhaite une année pleine de santé, de réussite et de beaux projets.",
      "Que cette année soit celle des chantiers menés à bien, des maisons qui s'embellissent et des métiers qui trouvent enfin la reconnaissance qu'ils méritent.",
      "Merci de faire partie des premiers à croire en cette aventure. Le meilleur reste à construire — ensemble.",
    ],
    ctaLabel: "Commencer l'année avec nous",
  },
  {
    month: 5,
    day: 1,
    slug: "fete-du-travail",
    subject: "1er mai : hommage à celles et ceux qui bâtissent 🛠️",
    preheader: "Bonne fête du Travail.",
    title: "Bonne fête du Travail",
    paragraphs: [
      "En ce 1er mai, nous pensons à toutes celles et ceux dont le travail tient le pays debout : les artisans, les ouvriers, les techniciens, les indépendants.",
      "Ce sont des mains qui installent, réparent, construisent et transmettent. Un savoir-faire qui ne s'improvise pas et qui mérite d'être célébré — pas seulement aujourd'hui.",
      "Bara Pro CI existe justement pour donner à ce travail la visibilité qu'il mérite, toute l'année.",
    ],
    highlight: "« Bara » : le travail. C'est notre nom, et c'est notre raison d'être.",
    ctaLabel: "Valoriser mon métier",
  },
  {
    month: 8,
    day: 7,
    slug: "independance",
    subject: "7 août : bonne fête de l'Indépendance 🇨🇮",
    preheader: "Fiers de bâtir ici.",
    title: "Bonne fête de l'Indépendance",
    paragraphs: [
      "En ce jour de fête nationale, nous célébrons la Côte d'Ivoire et celles et ceux qui la font avancer chaque jour.",
      "L'indépendance, c'est aussi la capacité à créer ici nos propres solutions, adaptées à nos réalités. C'est l'esprit dans lequel Bara Pro CI a été imaginé : une plateforme ivoirienne, pensée pour les artisans ivoiriens.",
      "Bonne fête à tous. Que cette journée soit belle, en famille et en fierté.",
    ],
    highlight: "Conçu en Côte d'Ivoire, pour la Côte d'Ivoire. 🇨🇮",
    ctaLabel: "Soutenir un projet ivoirien",
  },
  {
    month: 11,
    day: 15,
    slug: "journee-paix",
    subject: "15 novembre : Journée nationale de la Paix 🕊️",
    preheader: "La paix se construit aussi par le travail.",
    title: "Journée nationale de la Paix",
    paragraphs: [
      "La paix ne tient pas seulement aux grands discours : elle se construit dans le quotidien, par le travail, la confiance et le respect mutuel.",
      "Chaque fois qu'un artisan est traité avec considération et qu'un client est servi avec honnêteté, un lien se crée. C'est aussi cela, la cohésion sociale.",
      "En ce 15 novembre, nous vous souhaitons une belle journée, sereine et unie.",
    ],
    ctaLabel: "Rejoindre la communauté",
  },
  {
    month: 12,
    day: 25,
    slug: "noel",
    subject: "Joyeux Noël à vous et vos proches 🎄",
    preheader: "Un moment pour souffler.",
    title: "Joyeux Noël",
    paragraphs: [
      "Toute l'équipe Bara Pro CI vous souhaite un très joyeux Noël, entouré de ceux qui comptent.",
      "Après une année de travail, ces quelques jours de repos sont mérités. Profitez-en pleinement.",
      "Merci pour votre confiance et votre soutien depuis le début de cette aventure. On se retrouve très vite avec de belles nouvelles.",
    ],
    ctaLabel: "Voir où nous en sommes",
  },
  {
    month: 12,
    day: 31,
    slug: "reveillon",
    subject: "Merci pour cette année 🙏",
    preheader: "Rendez-vous l'année prochaine.",
    title: "Merci pour cette année",
    paragraphs: [
      "Une année s'achève, et avec elle les premiers pas de Bara Pro CI. Rien de tout cela n'aurait de sens sans les personnes qui nous suivent depuis le début.",
      "L'année qui arrive sera celle du lancement et des premières mises en relation. Nous avons hâte de vous montrer ce que nous préparons.",
      "Excellente fin d'année à vous et à vos proches. À très bientôt !",
    ],
    ctaLabel: "Rester informé",
  },
];

/**
 * Sélectionne la campagne à envoyer pour une date donnée.
 * Priorité aux fêtes ; sinon rotation déterministe (mercredi & dimanche).
 * Renvoie `null` s'il n'y a rien à envoyer ce jour-là.
 */
export function selectCampaign(date: Date): Campaign | null {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const holiday = holidayCampaigns.find(
    (h) => h.month === month && h.day === day,
  );
  if (holiday) return holiday;

  // 0 = dimanche, 3 = mercredi
  const weekday = date.getUTCDay();
  if (weekday !== 0 && weekday !== 3) return null;

  // Rotation stable : on compte les envois écoulés depuis une date de référence
  // (mercredi 29 juillet 2026), sans avoir besoin de stocker un état.
  const reference = Date.UTC(2026, 6, 29);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), day);
  const days = Math.floor((today - reference) / 86_400_000);
  const weeks = Math.floor(days / 7);
  const index = weeks * 2 + (weekday === 3 ? 0 : 1);

  const safeIndex =
    ((index % regularCampaigns.length) + regularCampaigns.length) %
    regularCampaigns.length;
  return regularCampaigns[safeIndex];
}
