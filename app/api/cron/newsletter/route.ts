import { type NextRequest, NextResponse } from "next/server";
import { sendScheduledNewsletter } from "@/lib/newsletter/send";

/**
 * Envoi programmé de la newsletter.
 *
 * Déclenché chaque jour à 19h30 UTC par Vercel Cron (voir vercel.json).
 * La logique décide s'il y a lieu d'envoyer : fête du jour, sinon mercredi
 * ou dimanche, sinon rien. La Côte d'Ivoire étant en UTC+0, 19h30 UTC
 * correspond bien à 19h30 heure locale.
 *
 * Accès protégé par CRON_SECRET : Vercel envoie ce jeton dans l'en-tête
 * Authorization. Sans jeton configuré, la route reste fermée en production.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const result = await sendScheduledNewsletter(new Date());
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[cron:newsletter] échec:", e);
    return NextResponse.json(
      { ok: false, error: "Envoi impossible" },
      { status: 500 },
    );
  }
}
