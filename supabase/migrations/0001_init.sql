-- =============================================================================
-- Bara Pro CI — Migration initiale
-- Tables : waitlist (liste d'attente) + newsletter (inscriptions email)
-- À exécuter dans Supabase : SQL Editor -> coller -> Run
-- =============================================================================

-- --- Type du rôle choisi dans la liste d'attente -----------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'waitlist_role') then
    create type public.waitlist_role as enum ('client', 'artisan');
  end if;
end
$$;

-- --- Table : liste d'attente --------------------------------------------------
create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  role        public.waitlist_role not null default 'client',
  city        text,
  trade       text,                       -- métier renseigné par les artisans
  source      text,                       -- page d'où vient l'inscription
  created_at  timestamptz not null default now(),
  constraint waitlist_email_key unique (email)
);

comment on table public.waitlist is 'Inscriptions à la liste d''attente (clients et artisans).';

-- --- Table : newsletter -------------------------------------------------------
create table if not exists public.newsletter (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,
  created_at  timestamptz not null default now(),
  constraint newsletter_email_key unique (email)
);

comment on table public.newsletter is 'Inscriptions à la newsletter.';

-- --- Index (tri par date, cas d''usage tableau de bord) -----------------------
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists newsletter_created_at_idx on public.newsletter (created_at desc);

-- =============================================================================
-- Sécurité (RLS)
-- On active la RLS et on ne crée AUCUNE policy publique : seules les requêtes
-- avec la clé service_role (côté serveur, dans nos server actions) peuvent
-- écrire. Aucune lecture/écriture n'est possible avec la clé anon publique.
-- =============================================================================
alter table public.waitlist  enable row level security;
alter table public.newsletter enable row level security;
