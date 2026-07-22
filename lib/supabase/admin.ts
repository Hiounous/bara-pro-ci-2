import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Client Supabase côté serveur avec la clé service_role (écriture directe,
 * contourne la RLS) — pour les tables `waitlist` et `newsletter`.
 *
 * Renvoie `null` si Supabase n'est pas configuré (mode démo). Ne JAMAIS
 * importer côté client : la clé service_role ne doit pas fuiter.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (cached) return cached;

  cached = createClient(env.supabaseUrl!, env.supabaseServiceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
