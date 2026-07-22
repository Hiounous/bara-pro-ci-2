import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * Client Supabase côté serveur (Server Components, Route Handlers, Server
 * Actions). Lit/écrit la session dans les cookies de la requête via
 * @supabase/ssr. À créer par requête (les cookies sont propres à la requête).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un Server Component : l'écriture de cookies y est
          // interdite. Sans gravité, le middleware rafraîchit la session.
        }
      },
    },
  });
}

/** Récupère l'utilisateur courant (ou null) de façon sûre côté serveur. */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Profil applicatif (table `profiles`). */
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "client" | "artisan";
  city: string | null;
  trade: string | null;
  avatar_url: string | null;
  created_at: string;
};

/** Récupère le profil de l'utilisateur courant (ou null). */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (data as Profile | null) ?? null;
}
