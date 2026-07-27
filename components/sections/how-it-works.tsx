"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck,
  HardHat,
  Heart,
  MessageSquare,
  Search,
  Star,
  UserPlus,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedDemo } from "@/components/sections/feed-demo";
import { Badge } from "@/components/ui/badge";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const clientSteps: Step[] = [
  {
    icon: Search,
    title: "Découvrez & comparez",
    description:
      "Parcourez le fil de talents en vidéo, filtrez par métier, note et proximité, et repérez le pro qu'il vous faut.",
  },
  {
    icon: CalendarCheck,
    title: "Réservez en un clic",
    description:
      "Choisissez un créneau, décrivez votre besoin et confirmez. Échangez au besoin via la messagerie intégrée.",
  },
  {
    icon: Star,
    title: "Profitez & évaluez",
    description:
      "L'artisan intervient, vous profitez d'un travail de qualité, puis vous laissez un avis pour la communauté.",
  },
];

const artisanSteps: Step[] = [
  {
    icon: UserPlus,
    title: "Créez votre profil",
    description:
      "Inscrivez-vous gratuitement, faites vérifier votre identité et vos compétences pour obtenir le badge de confiance.",
  },
  {
    icon: Video,
    title: "Montrez votre savoir-faire",
    description:
      "Publiez de courtes vidéos de vos réalisations. Votre travail parle pour vous et attire les bons clients.",
  },
  {
    icon: MessageSquare,
    title: "Recevez & gérez vos demandes",
    description:
      "Recevez des réservations, échangez avec les clients et développez votre activité depuis votre tableau de bord.",
  },
];

/** Parcours client / artisan avec sélecteur (onglets) et étapes animées. */
export function HowItWorks() {
  return (
    <Tabs defaultValue="client" className="flex flex-col items-center">
      <TabsList aria-label="Choisir un parcours">
        <TabsTrigger value="client">
          <Search className="size-4" /> Je suis client
        </TabsTrigger>
        <TabsTrigger value="artisan">
          <HardHat className="size-4" /> Je suis artisan
        </TabsTrigger>
      </TabsList>

      <TabsContent value="client" className="w-full">
        <StepGrid steps={clientSteps} />
      </TabsContent>
      <TabsContent value="artisan" className="w-full">
        <StepGrid steps={artisanSteps} />
        <ArtisanFeedShowcase />
      </TabsContent>
    </Tabs>
  );
}

/**
 * Démonstration destinée aux artisans : montre concrètement comment leur
 * travail apparaît dans le fil de talents, du point de vue des clients.
 */
function ArtisanFeedShowcase() {
  const arguments_ = [
    {
      icon: Video,
      title: "Votre travail en vedette",
      text: "Chaque vidéo occupe tout l'écran : le client voit votre savoir-faire, pas une simple annonce.",
    },
    {
      icon: BadgeCheck,
      title: "Votre badge de confiance",
      text: "Métier, quartier, note et nombre d'avis affichés en permanence à côté de votre nom.",
    },
    {
      icon: Heart,
      title: "Une audience qui vous suit",
      text: "Likes, favoris et abonnés : vos meilleures réalisations continuent de travailler pour vous.",
    },
    {
      icon: CalendarCheck,
      title: "La réservation à portée de pouce",
      text: "Un bouton « Réserver » sur chaque vidéo — le client passe de la découverte à la demande en un geste.",
    },
  ];

  return (
    <div className="mt-16 border-t pt-14">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        <Badge variant="green">Aperçu en direct</Badge>
        <h3 className="text-balance text-2xl font-bold sm:text-3xl">
          Votre vitrine,{" "}
          <span className="text-gradient-brand">vue par les clients</span>
        </h3>
        <p className="text-pretty text-muted-foreground">
          Voici exactement à quoi ressemble le fil de talents. Faites défiler,
          likez, abonnez-vous : c&apos;est l&apos;expérience que vivront vos
          futurs clients.
        </p>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {arguments_.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold">{a.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-1 lg:order-2">
          <FeedDemo />
        </div>
      </div>
    </div>
  );
}

function StepGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="relative grid gap-6 md:grid-cols-3">
      {/* Ligne de liaison décorative (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
      />
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative flex flex-col items-center rounded-2xl border bg-card p-7 text-center shadow-soft"
          >
            <span className="relative mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-soft">
              <Icon className="size-7" />
              <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-bold text-primary">
                {i + 1}
              </span>
            </span>
            <h3 className="font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
