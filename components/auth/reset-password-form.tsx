"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { updatePassword } from "@/app/actions/auth";
import { resetPasswordSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetInput = z.infer<typeof resetPasswordSchema>;

/** Formulaire de définition d'un nouveau mot de passe (après lien de récupération). */
export function ResetPasswordForm() {
  const [pending, startTransition] = React.useTransition();
  const form = useForm<ResetInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: ResetInput) {
    const fd = new FormData();
    fd.set("password", values.password);
    startTransition(async () => {
      const res = await updatePassword({ status: "idle" }, fd);
      if (res?.status === "error") {
        form.setError("password", {
          message: res.errors?.password?.[0] ?? res.message,
        });
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div>
        <Label htmlFor="rp-password" className="mb-1.5 block">
          Nouveau mot de passe
        </Label>
        <Input
          id="rp-password"
          type="password"
          placeholder="8 caractères minimum"
          autoComplete="new-password"
          aria-invalid={!!form.formState.errors.password}
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Enregistrement…
          </>
        ) : (
          "Mettre à jour le mot de passe"
        )}
      </Button>
    </form>
  );
}
