import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import {
  holidayCampaigns,
  regularCampaigns,
  selectCampaign,
} from "@/lib/newsletter/campaigns";
import { renderNewsletter } from "@/lib/newsletter/template";
import { siteConfig } from "@/config/site";

/**
 * Prévisualisation d'une campagne dans le navigateur, sans envoi d'email.
 * `?slug=...` cible une campagne précise ; sans paramètre, on affiche celle
 * prévue aujourd'hui (ou la première de la rotation).
 *
 * Réservée aux administrateurs en production ; ouverte en développement local
 * pour faciliter la relecture des contenus.
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const user = await getCurrentUser();
    if (!user || !isAdminEmail(user.email)) {
      return new NextResponse("Not found", { status: 404 });
    }
  }

  const slug = request.nextUrl.searchParams.get("slug");
  const campaign = slug
    ? (regularCampaigns.find((c) => c.slug === slug) ??
      holidayCampaigns.find((c) => c.slug === slug))
    : (selectCampaign(new Date()) ?? regularCampaigns[0]);

  if (!campaign) {
    return new NextResponse("Campagne introuvable", { status: 404 });
  }

  const html = renderNewsletter(
    campaign,
    `${siteConfig.url}/desinscription?email=exemple%40email.ci&token=apercu`,
  );

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
