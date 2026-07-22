import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, getProfile } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Mon profil",
  robots: { index: false, follow: false },
};

/** Profil de l'utilisateur (lecture). L'édition viendra dans une phase suivante. */
export default async function ProfilPage() {
  if (!isSupabaseAuthConfigured) redirect("/connexion");
  const user = await getCurrentUser();
  if (!user) redirect("/connexion?next=/tableau-de-bord/profil");

  const profile = await getProfile();
  const isArtisan = profile?.role === "artisan";

  const fields: { label: string; value: string }[] = [
    { label: "Nom complet", value: profile?.full_name || "—" },
    { label: "Email", value: profile?.email || user.email || "—" },
    { label: "Rôle", value: isArtisan ? "Artisan" : "Client" },
  ];
  if (isArtisan) {
    fields.push(
      { label: "Métier", value: profile?.trade || "—" },
      { label: "Ville", value: profile?.city || "—" },
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        href="/tableau-de-bord"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Retour au tableau de bord
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Mon profil</h1>
        <Badge variant="outline">Édition bientôt</Badge>
      </div>

      <Card className="divide-y">
        {fields.map((f) => (
          <div
            key={f.label}
            className="flex items-center justify-between gap-4 p-5"
          >
            <span className="text-sm text-muted-foreground">{f.label}</span>
            <span className="text-sm font-medium">{f.value}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
