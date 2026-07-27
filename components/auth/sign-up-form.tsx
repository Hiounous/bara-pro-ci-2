"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, HardHat, Loader2, MailCheck, Search } from "lucide-react";
import { signUpWithEmail } from "@/app/actions/auth";
import { signUpSchema, type SignUpInput } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Formulaire d'inscription email + mot de passe, avec choix du rôle. */
export function SignUpForm() {
  const [pending, startTransition] = React.useTransition();
  const [checkEmail, setCheckEmail] = React.useState<string | null>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "client",
      city: "",
      trade: "",
    },
  });

  const role = form.watch("role");

  function onSubmit(values: SignUpInput) {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.set(k, v ?? ""));
    startTransition(async () => {
      const res = await signUpWithEmail({ status: "idle" }, fd);
      if (res?.status === "success") {
        setCheckEmail(res.message ?? "Vérifie ta boîte mail.");
      } else if (res?.status === "error") {
        if (res.errors?.email) {
          form.setError("email", { message: res.errors.email[0] });
        } else {
          form.setError("root", { message: res.message });
        }
      }
    });
  }

  // Écran « vérifie ta boîte mail » après inscription réussie.
  if (checkEmail) {
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
        <h3 className="font-display text-xl font-semibold">Vérifie ta boîte mail</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{checkEmail}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Rôle */}
      <div>
        <Label className="mb-2 block">Je m&apos;inscris en tant que…</Label>
        <div className="grid grid-cols-2 gap-2">
          <RoleOption
            active={role === "client"}
            icon={<Search className="size-4" />}
            label="Client"
            hint="Je cherche un pro"
            onClick={() => form.setValue("role", "client")}
          />
          <RoleOption
            active={role === "artisan"}
            icon={<HardHat className="size-4" />}
            label="Artisan"
            hint="Je propose mes services"
            onClick={() => form.setValue("role", "artisan")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="su-name" className="mb-1.5 block">
          Nom complet
        </Label>
        <Input
          id="su-name"
          placeholder="Ton nom"
          autoComplete="name"
          aria-invalid={!!form.formState.errors.fullName}
          {...form.register("fullName")}
        />
        {form.formState.errors.fullName && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>

      {role === "artisan" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div>
            <Label htmlFor="su-trade" className="mb-1.5 block">
              Métier
            </Label>
            <Input
              id="su-trade"
              placeholder="Ex : Électricien"
              {...form.register("trade")}
            />
          </div>
          <div>
            <Label htmlFor="su-city" className="mb-1.5 block">
              Ville
            </Label>
            <Input
              id="su-city"
              placeholder="Ex : Abidjan"
              {...form.register("city")}
            />
          </div>
        </motion.div>
      )}

      <div>
        <Label htmlFor="su-email" className="mb-1.5 block">
          Email
        </Label>
        <Input
          id="su-email"
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
        <Label htmlFor="su-password" className="mb-1.5 block">
          Mot de passe
        </Label>
        <Input
          id="su-password"
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

      {form.formState.errors.root && (
        <p className="text-sm text-destructive" role="alert">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Création du compte…
          </>
        ) : (
          "Créer mon compte"
        )}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5 text-brand-green" />
        Gratuit, sans engagement.
      </p>
      <p className="text-center text-xs text-muted-foreground">
        En créant un compte, vous acceptez nos{" "}
        <Link
          href="/conditions"
          className="underline underline-offset-2 hover:text-primary"
        >
          conditions d&apos;utilisation
        </Link>{" "}
        et notre{" "}
        <Link
          href="/confidentialite"
          className="underline underline-offset-2 hover:text-primary"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}

/** Bouton de sélection de rôle. */
function RoleOption({
  active,
  icon,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all",
        active
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-input hover:border-primary/40 hover:bg-secondary",
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-lg",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </button>
  );
}
