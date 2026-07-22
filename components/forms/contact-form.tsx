"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { useAntiSpam } from "@/hooks/use-anti-spam";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/** Formulaire de contact (nom, email, message) relié à Resend. */
export function ContactForm({ className }: { className?: string }) {
  const [pending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | null>(null);
  const antiSpam = useAntiSpam();

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: ContactInput) {
    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("message", values.message);
    antiSpam.append(fd);
    startTransition(async () => {
      const res = await sendContactMessage({ status: "idle" }, fd);
      if (res.status === "success") {
        setSuccess(res.message ?? "Message envoyé !");
        form.reset();
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
        <h3 className="font-display text-xl font-semibold">Message envoyé</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{success}</p>
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

      <div>
        <Label htmlFor="ct-name" className="mb-1.5 block">
          Nom complet
        </Label>
        <Input
          id="ct-name"
          placeholder="Ton nom"
          autoComplete="name"
          aria-invalid={!!form.formState.errors.name}
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="ct-email" className="mb-1.5 block">
          Email
        </Label>
        <Input
          id="ct-email"
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
        <Label htmlFor="ct-message" className="mb-1.5 block">
          Message
        </Label>
        <Textarea
          id="ct-message"
          placeholder="Comment peut-on t'aider ?"
          rows={5}
          aria-invalid={!!form.formState.errors.message}
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {form.formState.errors.message.message}
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
            <Loader2 className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Envoyer le message <Send />
          </>
        )}
      </Button>
    </form>
  );
}
