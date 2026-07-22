import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

/**
 * Client Supabase pour le navigateur (composants client).
 * Utilise la clé anon publique. La session est gérée par cookies via
 * @supabase/ssr, en cohérence avec le client serveur et le middleware.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(env.supabaseUrl!, env.supabaseAnonKey!);
}
