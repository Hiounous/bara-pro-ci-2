import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BadgeCheck,
  CalendarCheck,
  HardHat,
  MessageCircle,
  PlaySquare,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentUser, getProfile } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { isSupabaseAuthConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

/**
 * Tableau de bord protégé. Le middleware bloque déjà l'accès non authentifié ;
 * on revérifie ici par sécurité et on charge le profil (rôle client/artisan)
 * pour adapter le contenu.
 */
export default async function TableauDeBordPage() {
  // Garde-fou : sans auth configurée, pas d'espace protégé.
  if (!isSupabaseAuthConfigured) redirect("/connexion");

  const user = await getCurrentUser();
  if (!user) redirect("/connexion?next=/tableau-de-bord");

  const profile = await getProfile();
  const role = profile?.role ?? "client";
  const displayName =
    profile?.full_name || user.email?.split("@")[0] || "Bienvenue";
  const isArtisan = role === "artisan";
  const isAdmin = isAdminEmail(user.email);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-xl font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold">
                Salut, {displayName} 👋
              </h1>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={isArtisan ? "green" : "default"}>
                {isArtisan ? (
                  <>
                    <HardHat className="size-3.5" /> Artisan
                  </>
                ) : (
                  <>
                    <Search className="size-3.5" /> Client
                  </>
                )}
              </Badge>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Bandeau de bienvenue */}
      <Card className="mt-8 flex flex-col items-start gap-4 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-5 text-primary" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">
              Ton espace {isArtisan ? "artisan" : "client"} arrive bientôt
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {isArtisan
                ? "Tu pourras bientôt publier tes vidéos, gérer tes réservations et suivre tes avis. En attendant, complète ton profil."
                : "Tu pourras bientôt découvrir le fil de talents, réserver des artisans et suivre tes demandes."}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/tableau-de-bord/profil">
            <Settings className="size-4" /> Mon profil
          </Link>
        </Button>
      </Card>

      {/* Accès admin (visible uniquement pour les comptes administrateurs) */}
      {isAdmin && (
        <Card className="mt-6 flex flex-col items-start gap-4 border-brand-gold/40 bg-brand-gold/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15">
              <Users className="size-5 text-accent-foreground" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold">
                  Espace administrateur
                </h2>
                <Badge variant="gold">Admin</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Liste d&apos;attente, newsletter, statistiques et exports CSV.
              </p>
            </div>
          </div>
          <Button asChild variant="brand" size="sm">
            <Link href="/tableau-de-bord/admin">Ouvrir l&apos;admin</Link>
          </Button>
        </Card>
      )}

      {/* Cartes de fonctionnalités à venir (adaptées au rôle) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(isArtisan ? artisanCards : clientCards).map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} className="flex flex-col gap-3 p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                <Icon className="size-5 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{c.title}</h3>
                  <Badge variant="outline" className="text-[10px]">
                    Bientôt
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const clientCards = [
  {
    icon: PlaySquare,
    title: "Fil de talents",
    description: "Découvre les artisans en vidéo, près de chez toi.",
  },
  {
    icon: CalendarCheck,
    title: "Mes réservations",
    description: "Retrouve et gère tes rendez-vous à venir.",
  },
  {
    icon: MessageCircle,
    title: "Messagerie",
    description: "Échange directement avec les professionnels.",
  },
];

const artisanCards = [
  {
    icon: PlaySquare,
    title: "Mes vidéos",
    description: "Publie ton savoir-faire pour attirer des clients.",
  },
  {
    icon: BadgeCheck,
    title: "Vérification",
    description: "Obtiens ton badge de confiance en te faisant vérifier.",
  },
  {
    icon: Star,
    title: "Mes avis",
    description: "Suis ta réputation et tes évaluations clients.",
  },
];
