"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { useAntiSpam } from "@/hooks/use-anti-spam";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Formulaire d'inscription newsletter, compact et réutilisable.
 * Validation instantanée côté client (react-hook-form + zod), soumission via
 * server action. `source` trace l'emplacement d'inscription.
 */
export function NewsletterForm({
  source = "footer",
  className,
}: {
  source?: string;
  className?: string;
}) {
  const [pending, startTransition] = React.useTransition();
  const [done, setDone] = React.useState<string | null>(null);
  const antiSpam = useAntiSpam();

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", source },
  });

  function onSubmit(values: NewsletterInput) {
    const fd = new FormData();
    fd.set("email", values.email);
    fd.set("source", source);
    antiSpam.append(fd);
    startTransition(async () => {
      const res = await subscribeNewsletter({ status: "idle" }, fd);
      if (res.status === "success") {
        setDone(res.message ?? "Merci !");
        form.reset({ email: "", source });
      } else {
        form.setError("email", {
          message: res.errors?.email?.[0] ?? res.message,
        });
      }
    });
  }

  if (done) {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-medium text-brand-green",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-4 shrink-0" /> {done}
      </p>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("w-full", className)}
      noValidate
    >
      <input {...antiSpam.fieldProps} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`newsletter-${source}`} className="sr-only">
            Adresse email
          </label>
          <Input
            id={`newsletter-${source}`}
            type="email"
            placeholder="ton@email.ci"
            autoComplete="email"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
        </div>
        <Button type="submit" variant="brand" disabled={pending}>
          {pending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              S&apos;inscrire <ArrowRight />
            </>
          )}
        </Button>
      </div>
      {form.formState.errors.email && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {form.formState.errors.email.message}
        </p>
      )}
    </form>
  );
}
