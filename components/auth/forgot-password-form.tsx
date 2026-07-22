"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { requestPasswordReset } from "@/app/actions/auth";
import { forgotPasswordSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ForgotInput = z.infer<typeof forgotPasswordSchema>;

/** Formulaire de demande de réinitialisation de mot de passe. */
export function ForgotPasswordForm() {
  const [pending, startTransition] = React.useTransition();
  const [sent, setSent] = React.useState<string | null>(null);

  const form = useForm<ForgotInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: ForgotInput) {
    const fd = new FormData();
    fd.set("email", values.email);
    startTransition(async () => {
      const res = await requestPasswordReset({ status: "idle" }, fd);
      if (res.status === "success") {
        setSent(res.message ?? "Email envoyé.");
      } else {
        form.setError("email", {
          message: res.errors?.email?.[0] ?? res.message,
        });
      }
    });
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-6 text-center"
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-green/10">
          <MailCheck className="size-7 text-brand-green" />
        </span>
        <h3 className="font-display text-xl font-semibold">Email envoyé</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{sent}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div>
        <Label htmlFor="fp-email" className="mb-1.5 block">
          Email
        </Label>
        <Input
          id="fp-email"
          type="email"
          placeholder="ton@email.ci"
          autoComplete="email"
          aria-invalid={!!form.formState.errors.email}
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Envoi…
          </>
        ) : (
          "Envoyer le lien de réinitialisation"
        )}
      </Button>
    </form>
  );
}
