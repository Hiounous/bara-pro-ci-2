import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendScheduledNewsletter } from "@/lib/newsletter/send";
import { selectCampaign } from "@/lib/newsletter/campaigns";

/**
 * Envoi de test de la newsletter, réservé aux administrateurs.
 *
 * `?slug=...` permet de tester une campagne précise ; sans paramètre, on
 * envoie celle prévue aujourd'hui (ou la première de la rotation si aucune
 * n'est programmée). L'email part uniquement vers l'administrateur connecté.
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const slug = request.nextUrl.searchParams.get("slug") ?? undefined;
  // Sans campagne prévue aujourd'hui, on teste la première de la rotation.
  const fallback = selectCampaign(new Date()) ? undefined : "artisanat-voie-davenir";

  try {
    const result = await sendScheduledNewsletter(new Date(), {
      testEmail: user.email!,
      forceSlug: slug ?? fallback,
    });
    return NextResponse.json({ test: true, destinataire: user.email, ...result });
  } catch (e) {
    console.error("[admin:newsletter-test] échec:", e);
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
