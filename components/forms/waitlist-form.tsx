"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, HardHat, Loader2, Search } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { waitlistSchema, type WaitlistInput } from "@/lib/validations";
import { useAntiSpam } from "@/hooks/use-anti-spam";
import { ShareButtons } from "@/components/share-buttons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Formulaire de liste d'attente réutilisable (accueil, page dédiée, CTA…).
 * L'utilisateur choisit son rôle ; les artisans voient des champs métier/ville
 * supplémentaires. Validation client + server action.
 */
export function WaitlistForm({
  source = "page",
  defaultRole = "client",
  className,
}: {
  source?: string;
  defaultRole?: "client" | "artisan";
  className?: string;
}) {
  const [pending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | null>(null);
  const antiSpam = useAntiSpam();

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", role: defaultRole, city: "", trade: "", source },
  });

  const role = form.watch("role");

  function onSubmit(values: WaitlistInput) {
    const fd = new FormData();
    fd.set("email", values.email);
    fd.set("role", values.role);
    fd.set("city", values.city ?? "");
    fd.set("trade", values.trade ?? "");
    fd.set("source", source);
    antiSpam.append(fd);
    startTransition(async () => {
      const res = await joinWaitlist({ status: "idle" }, fd);
      if (res.status === "success") {
        setSuccess(res.message ?? "Merci, tu es sur la liste !");
      } else if (res.errors?.email) {
        form.setError("email", { message: res.errors.email[0] });
      } else {
        form.setError("root", { message: res.message });
      }
    });
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center shadow-soft",
          className,
        )}
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-green/10">
          <CheckCircle2 className="size-7 text-brand-green" />
        </span>
        <h3 className="font-display text-xl font-semibold">Inscription confirmée</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{success}</p>
        <div className="mt-2 w-full border-t pt-5">
          <p className="mb-3 text-sm font-medium">
            Fais passer le mot 👇
          </p>
          <ShareButtons />
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <input {...antiSpam.fieldProps} />

      {/* Sélecteur de rôle */}
      <div>
        <Label className="mb-2 block">Je suis…</Label>
        <div className="grid grid-cols-2 gap-2">
          <RoleOption
            active={role === "client"}
            icon={<Search className="size-4" />}
            label="Un client"
            hint="Je cherche un pro"
            onClick={() => form.setValue("role", "client")}
          />
          <RoleOption
            active={role === "artisan"}
            icon={<HardHat className="size-4" />}
            label="Un artisan"
            hint="Je propose mes services"
            onClick={() => form.setValue("role", "artisan")}
          />
        </div>
      </div>

      {/* Champs artisan (ville + métier) */}
      {role === "artisan" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div>
            <Label htmlFor="wl-trade" className="mb-1.5 block">
              Ton métier
            </Label>
            <Input
              id="wl-trade"
              placeholder="Ex : Électricien"
              {...form.register("trade")}
            />
          </div>
          <div>
            <Label htmlFor="wl-city" className="mb-1.5 block">
              Ta ville
            </Label>
            <Input
              id="wl-city"
              placeholder="Ex : Abidjan"
              {...form.register("city")}
            />
          </div>
        </motion.div>
      )}

      <div>
        <Label htmlFor="wl-email" className="mb-1.5 block">
          Adresse email
        </Label>
        <Input
          id="wl-email"
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

      {form.formState.errors.root && (
        <p className="text-xs text-destructive" role="alert">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Un instant…
          </>
        ) : (
          "Rejoindre la liste d'attente"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Gratuit, sans engagement. Vous recevrez nos actualités du lancement —
        désinscription en un clic. En vous inscrivant, vous acceptez notre{" "}
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

/** Bouton de sélection de rôle (client / artisan). */
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
