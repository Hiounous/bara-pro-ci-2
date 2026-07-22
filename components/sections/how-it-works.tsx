"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  HardHat,
  MessageSquare,
  Search,
  Star,
  UserPlus,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      </TabsContent>
    </Tabs>
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
