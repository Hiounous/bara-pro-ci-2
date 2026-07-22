import { Sparkles } from "lucide-react";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { WaitlistCount } from "@/components/sections/waitlist-count";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

/**
 * Bloc d'appel à rejoindre la liste d'attente, avec formulaire intégré.
 * Réutilisé en bas de plusieurs pages.
 */
export function WaitlistCta({
  defaultRole = "client",
  source = "cta",
}: {
  defaultRole?: "client" | "artisan";
  source?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-soft sm:p-12 lg:p-16">
          {/* Décor */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-green/15 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="flex flex-col items-start gap-5">
              <Badge variant="green" className="gap-1.5">
                <Sparkles className="size-3.5" /> Lancement à Abidjan
              </Badge>
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">
                Soyez les premiers à{" "}
                <span className="text-gradient-brand">trouver un pro</span> — ou à
                être trouvé.
              </h2>
              <p className="max-w-md text-muted-foreground">
                Rejoignez la liste d&apos;attente : les premiers inscrits
                bénéficieront d&apos;un accès prioritaire au lancement, clients
                comme artisans.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Gratuit et sans engagement</li>
                <li>✅ Accès prioritaire au lancement</li>
                <li>✅ Aucune carte bancaire requise</li>
              </ul>
              <WaitlistCount className="pt-2" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border bg-background/60 p-6 shadow-soft backdrop-blur sm:p-8">
                <WaitlistForm defaultRole={defaultRole} source={source} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
