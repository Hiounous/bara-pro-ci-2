import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, un partenariat, une idée ? Contactez l'équipe Bara Pro CI, " +
    "basée à Abidjan, Côte d'Ivoire.",
};

const infos = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.phoneRaw.replace("+", "")}`,
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: siteConfig.city,
  },
  {
    icon: Clock,
    label: "Réponse",
    value: "Sous 24–48h en semaine",
  },
];

/** Page Contact : formulaire (relié à Resend) + coordonnées. */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Parlons-en, <span className="text-gradient-brand">on vous écoute</span>
          </>
        }
        description="Une question, une suggestion ou une envie de collaborer ? Écrivez-nous, on vous répond vite."
      />

      <Section className="!pt-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Coordonnées */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <MessageCircle className="size-5 text-primary" />
              Coordonnées
            </div>
            {infos.map((info) => {
              const Icon = info.icon;
              const content = (
                <Card className="flex items-center gap-4 p-5 transition-colors hover:border-primary/40">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {info.label}
                    </div>
                    <div className="font-medium">{info.value}</div>
                  </div>
                </Card>
              );
              const external = info.href?.startsWith("http");
              return info.href ? (
                <a
                  key={info.label}
                  href={info.href}
                  className="block"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {content}
                </a>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}

            {/* Carte / localisation stylisée */}
            <Card className="relative mt-2 aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-brand opacity-90" />
              <div className="absolute inset-0 pattern-dots opacity-20" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                <MapPin className="size-8" />
                <span className="font-display text-lg font-bold">Abidjan</span>
                <span className="text-sm text-white/80">Côte d&apos;Ivoire</span>
              </div>
            </Card>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1}>
            <Card className="p-6 sm:p-8">
              <h2 className="mb-6 font-display text-xl font-semibold">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
