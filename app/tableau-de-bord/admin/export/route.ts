import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";

/**
 * Export CSV des tables `waitlist` ou `newsletter` (?table=…).
 * Réservé aux administrateurs authentifiés — 404 pour tout le monde d'autre
 * (on ne révèle pas l'existence de la route).
 */
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return new NextResponse("Not configured", { status: 503 });

  const table = request.nextUrl.searchParams.get("table");
  if (table !== "waitlist" && table !== "newsletter") {
    return new NextResponse("Bad request", { status: 400 });
  }

  const columns =
    table === "waitlist"
      ? ["email", "role", "city", "trade", "source", "created_at"]
      : ["email", "source", "created_at"];

  const { data, error } = await supabase
    .from(table)
    .select(columns.join(", "))
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse("Erreur d'export", { status: 500 });
  }

  // Échappe une valeur CSV (guillemets doublés, cellule entre guillemets).
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  // `select` dynamique : Supabase ne peut pas inférer le type des colonnes.
  const rows = (data ?? []) as unknown as Record<string, unknown>[];
  const csv = [
    columns.join(","),
    ...rows.map((r) => columns.map((c) => esc(r[c])).join(",")),
  ].join("\r\n");

  const today = new Date().toISOString().slice(0, 10);
  // BOM UTF-8 pour qu'Excel affiche correctement les accents.
  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="barapro-${table}-${today}.csv"`,
    },
  });
}
