import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { isSupabaseAuthConfigured } from "@/lib/env";

/** Messages d'erreur passés en query (?error=…). */
const ERROR_MESSAGES: Record<string, string> = {
  oauth: "La connexion Google a échoué. Réessaie.",
  callback: "Le lien est invalide ou a expiré. Réessaie.",
  config: "L'authentification n'est pas encore configurée.",
};

/**
 * Cadre visuel commun aux pages d'authentification : logo, titre, sous-titre,
 * carte centrée, et éventuels bandeaux (erreur, mode non configuré).
 */
export function AuthShell({
  title,
  subtitle,
  error,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  error?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
      />
      <Reveal className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <Link href="/" aria-label="Accueil">
            <LogoMark className="h-9" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {!isSupabaseAuthConfigured && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-3 text-sm text-accent-foreground">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              Mode démo : l&apos;authentification s&apos;activera une fois les
              clés Supabase ajoutées dans <code>.env.local</code>.
            </span>
          </div>
        )}

        {errorMessage && (
          <div
            className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Card className="p-6 sm:p-8">{children}</Card>

        {footer && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </p>
        )}
      </Reveal>
    </div>
  );
}

/** Séparateur « ou » entre l'OAuth et le formulaire email. */
export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        ou
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
