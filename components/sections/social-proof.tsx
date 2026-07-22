import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats, testimonials } from "@/lib/demo-data";

/** Preuve sociale : statistiques clés + témoignages. */
export function SocialProof() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ils nous font confiance"
        title="Une communauté qui grandit, des deux côtés"
        description="Clients rassurés, artisans mis en lumière : Bara Pro CI crée de la valeur pour tout le monde."
      />

      {/* Statistiques */}
      <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.label}>
            <div className="rounded-2xl border bg-card p-6 text-center shadow-soft">
              <div className="text-gradient-brand font-display text-3xl font-bold sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Témoignages */}
      <RevealGroup className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name}>
            <Card className="flex h-full flex-col gap-4 p-6">
              <Quote className="size-7 text-primary/30" />
              <p className="flex-1 text-pretty text-sm leading-relaxed">
                « {t.quote} »
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <span
                  className="flex size-10 items-center justify-center rounded-full bg-secondary text-lg"
                  aria-hidden
                >
                  {t.emoji}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
