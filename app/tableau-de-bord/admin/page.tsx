import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Eye,
  HardHat,
  Mail,
  Search,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterTestButton } from "@/components/admin/newsletter-test-button";
import { getCurrentUser } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import { isSupabaseAuthConfigured } from "@/lib/env";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Admin — Liste d'attente",
  robots: { index: false, follow: false },
};

// Données en temps réel : pas de cache statique pour cette page.
export const dynamic = "force-dynamic";

type WaitlistRow = {
  email: string;
  role: "client" | "artisan";
  city: string | null;
  trade: string | null;
  source: string | null;
  created_at: string;
};

/**
 * Tableau de bord administrateur (réservé aux emails admin) :
 * indicateurs de la liste d'attente + newsletter, dernières inscriptions,
 * et export CSV. Lit les tables via la clé service_role côté serveur.
 */
export default async function AdminPage() {
  if (!isSupabaseAuthConfigured) redirect("/connexion");

  const user = await getCurrentUser();
  if (!user) redirect("/connexion?next=/tableau-de-bord/admin");
  // Un non-admin ne doit même pas savoir que la page existe.
  if (!isAdminEmail(user.email)) notFound();

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/tableau-de-bord");

  // Requêtes en parallèle : liste complète + compte newsletter.
  const [waitlistRes, newsletterRes] = await Promise.all([
    supabase
      .from("waitlist")
      .select("email, role, city, trade, source, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("newsletter").select("*", { count: "exact", head: true }),
  ]);

  const rows = (waitlistRes.data ?? []) as WaitlistRow[];
  const total = rows.length;
  const artisans = rows.filter((r) => r.role === "artisan").length;
  const clients = total - artisans;
  const newsletterCount = newsletterRes.count ?? 0;

  // Inscriptions des 7 derniers jours. (Composant serveur dynamique : lire
  // l'horloge au rendu est voulu — la règle de pureté ne s'applique pas ici.)
  // eslint-disable-next-line react-hooks/purity
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const lastWeek = rows.filter((r) => +new Date(r.created_at) > weekAgo).length;

  const stats = [
    { icon: Users, label: "Inscrits (total)", value: total },
    { icon: Search, label: "Clients", value: clients },
    { icon: HardHat, label: "Artisans", value: artisans },
    { icon: Mail, label: "Newsletter", value: newsletterCount },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        href="/tableau-de-bord"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Retour au tableau de bord
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold">Liste d&apos;attente</h1>
            <Badge variant="gold">Admin</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {lastWeek} inscription{lastWeek > 1 ? "s" : ""} ces 7 derniers jours
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/tableau-de-bord/admin/export?table=waitlist">
              <Download className="size-4" /> Export waitlist
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="/tableau-de-bord/admin/export?table=newsletter">
              <Download className="size-4" /> Export newsletter
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="/api/newsletter/preview" target="_blank">
              <Eye className="size-4" /> Aperçu newsletter
            </a>
          </Button>
          <NewsletterTestButton />
        </div>
      </div>

      {/* Indicateurs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold leading-none">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tableau des inscriptions */}
      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/40 text-left">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Rôle</th>
                <th className="px-5 py-3 font-medium">Métier</th>
                <th className="px-5 py-3 font-medium">Ville</th>
                <th className="px-5 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-muted-foreground"
                  >
                    Aucune inscription pour le moment.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr
                  key={r.email}
                  className="border-b last:border-0 transition-colors hover:bg-secondary/30"
                >
                  <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                    {formatDate(r.created_at)}
                  </td>
                  <td className="px-5 py-3 font-medium">{r.email}</td>
                  <td className="px-5 py-3">
                    <Badge variant={r.role === "artisan" ? "green" : "default"}>
                      {r.role === "artisan" ? (
                        <>
                          <HardHat className="size-3" /> Artisan
                        </>
                      ) : (
                        <>
                          <Search className="size-3" /> Client
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {r.trade || "—"}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {r.city || "—"}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {r.source || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
