"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signInWithEmail } from "@/app/actions/auth";
import { signInSchema, type SignInInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Formulaire de connexion email + mot de passe. */
export function SignInForm({ next }: { next?: string }) {
  const [pending, startTransition] = React.useTransition();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: SignInInput) {
    const fd = new FormData();
    fd.set("email", values.email);
    fd.set("password", values.password);
    if (next) fd.set("next", next);
    startTransition(async () => {
      // En cas de succès, l'action redirige (rien n'est renvoyé ici).
      const res = await signInWithEmail({ status: "idle" }, fd);
      if (res?.status === "error") {
        if (res.errors?.email) {
          form.setError("email", { message: res.errors.email[0] });
        } else {
          form.setError("root", { message: res.message });
        }
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
        <Label htmlFor="signin-email" className="mb-1.5 block">
          Email
        </Label>
        <Input
          id="signin-email"
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

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label htmlFor="signin-password">Mot de passe</Label>
          <Link
            href="/mot-de-passe-oublie"
            className="text-xs font-medium text-primary hover:underline"
          >
            Oublié ?
          </Link>
        </div>
        <Input
          id="signin-password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          aria-invalid={!!form.formState.errors.password}
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {form.formState.errors.root && (
        <p className="text-sm text-destructive" role="alert">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Connexion…
          </>
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  );
}
