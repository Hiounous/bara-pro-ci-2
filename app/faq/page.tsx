import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Sécurité, paiement, vérification des artisans, zones couvertes, " +
    "gratuité : toutes les réponses à vos questions sur Bara Pro CI.",
};

/**
 * Page FAQ avec accordéon accessible + données structurées (JSON-LD) pour
 * améliorer le référencement (rich results Google).
 */
export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Tout ce que vous devez savoir avant de nous rejoindre. Une autre question ? Écrivez-nous."
      />

      <Section className="!pt-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border bg-secondary/40 p-8 text-center">
              <h2 className="font-display text-xl font-semibold">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Notre équipe basée à {siteConfig.city.split(",")[0]} est là pour
                vous aider.
              </p>
              <Button asChild variant="brand">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
