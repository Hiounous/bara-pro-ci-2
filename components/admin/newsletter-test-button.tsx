"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { sendNewsletterTest } from "@/app/actions/newsletter-test";
import { Button } from "@/components/ui/button";

/**
 * Bouton d'envoi d'un email de test à l'administrateur connecté.
 * L'envoi passe par une server action (POST) : impossible de le déclencher
 * accidentellement en rechargeant la page.
 */
export function NewsletterTestButton() {
  const [pending, startTransition] = React.useTransition();
  const [feedback, setFeedback] = React.useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  function handleClick() {
    setFeedback(null);
    startTransition(async () => {
      const res = await sendNewsletterTest({ status: "idle" }, new FormData());
      setFeedback({
        ok: res.status === "success",
        message: res.message ?? "",
      });
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="green"
        size="sm"
        onClick={handleClick}
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            <Send className="size-4" /> M&apos;envoyer un test
          </>
        )}
      </Button>

      {feedback && (
        <p
          className={`flex items-start gap-1.5 text-xs ${
            feedback.ok ? "text-brand-green" : "text-destructive"
          }`}
          role="status"
        >
          {feedback.ok ? (
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
          ) : (
            <XCircle className="mt-0.5 size-3.5 shrink-0" />
          )}
          {feedback.message}
        </p>
      )}
    </div>
  );
}
