# Bara Pro CI — Vitrine officielle

> **« Trouvez un pro, en un clic. »**
> La première plateforme dédiée aux artisans qualifiés de Côte d'Ivoire.

Site vitrine et base technique du produit : un fil de talents en vidéo façon TikTok,
des profils vérifiés, et un parcours de réservation pensé pour la confiance.

---

## 🚀 Démarrer en local

```bash
npm install       # installer les dépendances
npm run dev       # lancer le serveur de développement
```

Ouvrir **http://localhost:3000**.

> Le site tourne **sans aucune clé** : les formulaires (liste d'attente,
> newsletter, contact) basculent automatiquement en **mode démo** si Supabase
> et Resend ne sont pas configurés. Aucune configuration n'est requise pour
> explorer la vitrine.

### Scripts

| Commande         | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Serveur de développement (Turbopack)     |
| `npm run build`  | Build de production                      |
| `npm run start`  | Serveur de production (après build)      |
| `npm run lint`   | Analyse ESLint                           |

---

## 🧱 Stack technique

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (thème piloté par variables CSS) + composants façon shadcn/ui
- **Framer Motion** — animations & micro-interactions
- **Radix UI** — primitives accessibles (accordéon, onglets, label…)
- **react-hook-form** + **Zod** — formulaires typés et validés
- **Supabase** (Postgres) — liste d'attente & newsletter
- **Resend** — emails transactionnels
- **next-mdx-remote** — blog en MDX local
- Polices : **Space Grotesk** (titres) + **Inter** (texte)

---

## 🎨 Design system

Tout est centralisé dans [`app/globals.css`](app/globals.css) (palette de marque,
tokens sémantiques clair/sombre, utilitaires premium) et
[`config/site.ts`](config/site.ts) (identité, navigation, réseaux).

Palette de marque :

| Rôle              | Couleur   |
| ----------------- | --------- |
| Orange principal  | `#FF7A00` |
| Orange profond    | `#E85D00` |
| Vert ivoirien     | `#0B8A3D` |
| Vert profond      | `#066A2E` |
| Or / accent       | `#F4B740` |
| Encre foncée      | `#14201A` |
| Ivoire / fond     | `#FFFCF7` |

---

## 🗂️ Structure

```
app/
  layout.tsx            # layout racine (fonts, thème, header/footer, SEO)
  page.tsx              # accueil
  fonctionnalites/      comment-ca-marche/   a-propos/
  faq/    contact/      liste-attente/       newsletter/
  blog/  blog/[slug]/   # blog MDX (liste + article)
  confidentialite/  conditions/
  actions/              # server actions (waitlist, newsletter, contact)
  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
components/
  ui/                   # primitives (button, input, card, accordion, tabs…)
  layout/               # header, footer
  sections/             # sections vitrine réutilisables
  forms/                # formulaires (waitlist, newsletter, contact)
  brand/  motion/  blog/
config/site.ts          # configuration centrale
lib/                    # utils, supabase, resend, blog, validations, données
content/blog/*.mdx      # articles de blog
supabase/migrations/    # schéma SQL
```

---

## 🔐 Variables d'environnement

Copier [`.env.example`](.env.example) en `.env.local` et renseigner les clés
**(optionnel en local)** :

- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — enregistrement des inscriptions
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL` — envoi des emails
- `NEXT_PUBLIC_SITE_URL` — URL publique (SEO, sitemap, Open Graph)

### Base de données

Exécuter le SQL de [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
dans l'éditeur SQL de Supabase pour créer les tables `waitlist` et `newsletter`
(RLS activée, écritures réservées à la clé `service_role` côté serveur).

---

## ☁️ Déploiement (Vercel)

1. Pousser le dépôt sur GitHub.
2. Importer le projet sur [Vercel](https://vercel.com) (framework détecté : Next.js).
3. Renseigner les variables d'environnement.
4. Déployer.

---

Conçu avec ❤️ en Côte d'Ivoire.
