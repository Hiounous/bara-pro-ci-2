"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TalentCard } from "@/components/sections/talent-card";
import { demoArtisans } from "@/lib/demo-data";

/**
 * Section héro de l'accueil : proposition de valeur, double appel à l'action
 * (client / pro) et aperçu animé du fil de talents en vidéo.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fonds décoratifs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots opacity-[0.6] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-brand-green/15 blur-[100px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Colonne texte */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="glass" className="gap-2 py-1.5 pl-2 pr-3.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-gradient-brand">
                <Sparkles className="size-3 text-white" />
              </span>
              La 1<sup>ère</sup> plateforme des artisans de Côte d&apos;Ivoire
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Trouvez un pro,
            <br />
            <span className="text-gradient-brand">en un clic.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-xl text-pretty text-lg text-muted-foreground"
          >
            Électriciens, plombiers, peintres, menuisiers, mécaniciens…
            Découvrez leur savoir-faire en vidéo, comparez les avis et réservez
            un artisan vérifié près de chez vous.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="brand" size="lg">
              <Link href="/liste-attente?role=client">
                Je cherche un pro <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/liste-attente?role=artisan">
                Je suis un professionnel
              </Link>
            </Button>
          </motion.div>

          {/* Preuve sociale compacte */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex items-center gap-4 pt-2"
          >
            <div className="flex -space-x-2">
              {demoArtisans.slice(0, 4).map((a) => (
                <span
                  key={a.name}
                  className="flex size-9 items-center justify-center rounded-full border-2 border-background text-base shadow-sm"
                  style={{ backgroundImage: a.gradient }}
                  title={`${a.name} — ${a.trade}`}
                >
                  <span aria-hidden>{a.emoji}</span>
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 font-semibold">
                <Star className="size-4 fill-brand-gold text-brand-gold" />
                4,9/5
                <span className="font-normal text-muted-foreground">
                  · avis clients
                </span>
              </div>
              <p className="text-muted-foreground">
                Des artisans de confiance, déjà à vos côtés.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Colonne visuelle : aperçu du fil */}
        <div className="relative">
          <div className="relative mx-auto flex max-w-md items-end justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-1/2"
            >
              <TalentCard artisan={demoArtisans[1]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="z-10 w-[58%] -translate-y-6"
            >
              <TalentCard
                artisan={demoArtisans[0]}
                className="glow-brand"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden w-1/2 sm:block"
            >
              <TalentCard artisan={demoArtisans[2]} />
            </motion.div>
          </div>

          {/* Étiquette flottante "réservation" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="glass absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-soft"
          >
            <PlayCircle className="size-4 text-primary" />
            Regardez. Comparez. Réservez.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
