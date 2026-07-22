/** Questions fréquentes, regroupées par thème. */
export type FaqItem = { question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    question: "Bara Pro CI, c'est quoi exactement ?",
    answer:
      "Bara Pro CI est une plateforme qui met en relation les particuliers et les artisans qualifiés de Côte d'Ivoire. Grâce à un fil de vidéos, vous découvrez le travail réel des pros, comparez les avis et réservez en quelques clics.",
  },
  {
    question: "Comment vérifiez-vous les artisans ?",
    answer:
      "Chaque artisan passe par un processus de vérification : contrôle de l'identité, des compétences et des références. Les profils validés reçoivent un badge de confiance. Les avis clients viennent ensuite renforcer cette confiance dans la durée.",
  },
  {
    question: "Est-ce que c'est gratuit ?",
    answer:
      "Oui. La création d'un compte et l'inscription à la liste d'attente sont entièrement gratuites, pour les clients comme pour les artisans. Aucune carte bancaire n'est requise pour rejoindre la liste.",
  },
  {
    question: "Comment se passe le paiement d'une prestation ?",
    answer:
      "Au lancement, nous proposerons des moyens de paiement adaptés au marché ivoirien (mobile money et autres). L'objectif est un paiement clair et sécurisé, avec un devis validé avant toute intervention.",
  },
  {
    question: "Mes données personnelles sont-elles en sécurité ?",
    answer:
      "La sécurité et la confidentialité de vos données sont une priorité. Nous ne collectons que le nécessaire, ne revendons jamais vos informations, et appliquons les bonnes pratiques de protection des données.",
  },
  {
    question: "Quelles zones sont couvertes ?",
    answer:
      "Nous démarrons à Abidjan pour garantir une qualité de service optimale, avant d'étendre progressivement à d'autres villes de Côte d'Ivoire. Rejoignez la liste d'attente pour être prévenu de l'ouverture dans votre zone.",
  },
  {
    question: "Je suis artisan : comment rejoindre la plateforme ?",
    answer:
      "Inscrivez-vous à la liste d'attente en choisissant le profil « artisan » et en précisant votre métier et votre ville. Les premiers inscrits bénéficieront d'un accès prioritaire et d'un accompagnement pour créer leur profil au lancement.",
  },
  {
    question: "Quand la plateforme sera-t-elle disponible ?",
    answer:
      "Nous préparons activement le lancement à Abidjan. Le meilleur moyen d'être informé de la date exacte est de rejoindre la liste d'attente et de vous abonner à notre newsletter.",
  },
];
