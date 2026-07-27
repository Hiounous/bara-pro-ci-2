"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Bookmark,
  CalendarCheck,
  Check,
  Clock,
  Flame,
  Hammer,
  Heart,
  Home,
  MessageCircle,
  Paintbrush,
  Play,
  Plus,
  Ruler,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  User,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Démo interactive du fil de talents (façon TikTok) présentée aux artisans :
 * elle montre comment leur travail apparaît aux clients. Défilement vertical
 * avec accroche (scroll-snap), like (dont double-tap), abonnement, favoris,
 * commentaires et réservation — le tout simulé côté client.
 */

type DemoPost = {
  id: number;
  initials: string;
  avatar: string;
  name: string;
  trade: string;
  city: string;
  tradeIcon: LucideIcon;
  badge: string;
  badgeIcon: LucideIcon;
  description: string;
  rating: string;
  reviews: number;
  years: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  background: string;
};

const posts: DemoPost[] = [
  {
    id: 1,
    initials: "YK",
    avatar: "linear-gradient(135deg,#FF7A00,#F4B740)",
    name: "Yao Kouassi",
    trade: "Électricien",
    city: "Cocody",
    tradeIcon: Zap,
    badge: "Avant / Après",
    badgeIcon: Sparkles,
    description:
      "Rénovation complète du tableau électrique d'une villa 🔌 Sécurité aux normes, fini les coupures ! #électricité #Abidjan",
    rating: "4,9",
    reviews: 128,
    years: 8,
    likes: 2431,
    comments: 184,
    saves: 312,
    shares: 96,
    background: "linear-gradient(160deg,#3B2A12 0%,#7A4A08 45%,#C46A00 100%)",
  },
  {
    id: 2,
    initials: "MD",
    avatar: "linear-gradient(135deg,#0B8A3D,#0FA85A)",
    name: "Mariam Diabaté",
    trade: "Peintre décoratrice",
    city: "Marcory",
    tradeIcon: Paintbrush,
    badge: "Projet terminé en 2 jours",
    badgeIcon: Clock,
    description:
      "Transformation d'un salon avec un mur d'accent terracotta 🎨 Vos murs racontent votre histoire ! #peinture #déco",
    rating: "4,8",
    reviews: 214,
    years: 6,
    likes: 5102,
    comments: 347,
    saves: 689,
    shares: 210,
    background: "linear-gradient(160deg,#0E2B1A 0%,#14502C 50%,#1F8A48 100%)",
  },
  {
    id: 3,
    initials: "IS",
    avatar: "linear-gradient(135deg,#7A44A8,#B07CE0)",
    name: "Ibrahim Sanogo",
    trade: "Plombier",
    city: "Yopougon",
    tradeIcon: Wrench,
    badge: "Astuce du jour",
    badgeIcon: Flame,
    description:
      "3 signes que votre robinet fuit AVANT que la facture explose 💧 Sauvegardez pour plus tard ! #plomberie #astuce",
    rating: "4,9",
    reviews: 96,
    years: 10,
    likes: 8930,
    comments: 512,
    saves: 1204,
    shares: 430,
    background: "linear-gradient(160deg,#241633 0%,#4A2A66 50%,#7A44A8 100%)",
  },
  {
    id: 4,
    initials: "AK",
    avatar: "linear-gradient(135deg,#B0501F,#E08A50)",
    name: "Aya Koné",
    trade: "Menuisière",
    city: "Treichville",
    tradeIcon: Hammer,
    badge: "Fabrication sur mesure",
    badgeIcon: Ruler,
    description:
      "Du bois brut à cette bibliothèque en iroko massif 🪵 Fait main, fait avec fierté. #menuiserie #artisanat",
    rating: "5,0",
    reviews: 73,
    years: 5,
    likes: 3765,
    comments: 228,
    saves: 540,
    shares: 151,
    background: "linear-gradient(160deg,#331A12 0%,#6E3018 50%,#B0501F 100%)",
  },
];

/** Commentaires affichés dans la feuille du bas. */
const demoComments = [
  {
    initials: "AT",
    color: "#2E5E46",
    user: "Aminata T.",
    text: "Il a refait toute l'installation chez ma mère, travail impeccable et très ponctuel 👏",
    likes: 45,
  },
  {
    initials: "KB",
    color: "#5E3A2E",
    user: "Koffi B.",
    text: "C'est combien pour un tableau comme ça ? J'suis à Angré",
    likes: 12,
  },
  {
    initials: "YK",
    color: "#E8850B",
    user: "Yao Kouassi · Créateur",
    text: "@Koffi B. Envoyez-moi les photos en message, je vous fais un devis gratuit 🙏",
    likes: 30,
  },
  {
    initials: "SD",
    color: "#3A2E5E",
    user: "Sarah D.",
    text: "Enfin une appli où on peut VOIR le travail avant de payer 🔥",
    likes: 87,
  },
];

/** Formatage déterministe des milliers (évite tout écart d'hydratation). */
function formatCount(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function FeedDemo() {
  const [liked, setLiked] = React.useState<Record<number, boolean>>({});
  const [followed, setFollowed] = React.useState<Record<number, boolean>>({});
  const [saved, setSaved] = React.useState<Record<number, boolean>>({});
  const [burst, setBurst] = React.useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTap = React.useRef(0);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  }, []);

  React.useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  /**
   * Double-tap sur la vidéo : like + cœur animé.
   * Appelée uniquement depuis un gestionnaire de clic — lire l'horloge y est
   * légitime (la règle de pureté vise le corps du rendu).
   */
  function handleVideoTap(post: DemoPost) {
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    if (now - lastTap.current < 320) {
      setLiked((s) => ({ ...s, [post.id]: true }));
      setBurst(post.id);
      setTimeout(() => setBurst(null), 800);
    }
    lastTap.current = now;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Châssis du téléphone */}
      <div className="relative rounded-[40px] border border-white/10 bg-black p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="relative h-[620px] w-[310px] overflow-hidden rounded-[32px] bg-black text-white">
          {/* Encoche */}
          <div
            className="absolute left-1/2 top-3 z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-black"
            aria-hidden
          />

          {/* Onglets du haut (placés sous l'encoche pour rester lisibles) */}
          <div className="pointer-events-none absolute inset-x-0 top-11 z-40 flex justify-center gap-6 text-[13px] font-semibold">
            <span className="opacity-60">Abonnements</span>
            <span className="border-b-2 border-white pb-1">Pour toi</span>
          </div>

          {/* Fil vertical avec accroche */}
          <div className="h-full snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {posts.map((post) => {
              const TradeIcon = post.tradeIcon;
              const BadgeIcon = post.badgeIcon;
              const isLiked = !!liked[post.id];
              const isSaved = !!saved[post.id];
              const isFollowed = !!followed[post.id];

              return (
                <section
                  key={post.id}
                  className="relative flex h-full snap-start snap-always flex-col justify-end overflow-hidden"
                >
                  {/* Fond « vidéo » simulé */}
                  <button
                    type="button"
                    onClick={() => handleVideoTap(post)}
                    className="absolute inset-0 cursor-pointer"
                    style={{ backgroundImage: post.background }}
                    aria-label={`Vidéo de ${post.name} — double-cliquez pour aimer`}
                  >
                    <span
                      className="absolute -inset-1/2 animate-feed-drift bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_45%)]"
                      aria-hidden
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"
                      aria-hidden
                    />
                  </button>

                  {/* Cœur au double-tap */}
                  <AnimatePresence>
                    {burst === post.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.15, 1], opacity: [0, 1, 1] }}
                        exit={{ scale: 1, opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                      >
                        <Heart className="size-24 fill-[#FF3B5C] text-[#FF3B5C] drop-shadow-lg" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Étiquette de contexte */}
                  <span className="pointer-events-none absolute left-4 top-20 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
                    <BadgeIcon className="size-3 text-brand-gold" />
                    {post.badge}
                  </span>

                  {/* Colonne d'actions */}
                  <div className="absolute bottom-28 right-2 z-10 flex flex-col items-center gap-4">
                    <div className="relative mb-1">
                      <span
                        className="flex size-11 items-center justify-center rounded-full border-2 border-white text-sm font-bold"
                        style={{ backgroundImage: post.avatar }}
                      >
                        {post.initials}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !isFollowed;
                          setFollowed((s) => ({ ...s, [post.id]: next }));
                          showToast(
                            next ? `Abonné à ${post.name}` : "Désabonné",
                          );
                        }}
                        aria-label={
                          isFollowed
                            ? `Se désabonner de ${post.name}`
                            : `S'abonner à ${post.name}`
                        }
                        className={cn(
                          "absolute -bottom-2 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black text-white transition-colors",
                          isFollowed ? "bg-brand-green" : "bg-primary",
                        )}
                      >
                        {isFollowed ? (
                          <Check className="size-2.5" />
                        ) : (
                          <Plus className="size-2.5" />
                        )}
                      </button>
                    </div>

                    <RailButton
                      label={formatCount(post.likes + (isLiked ? 1 : 0))}
                      onClick={() =>
                        setLiked((s) => ({ ...s, [post.id]: !isLiked }))
                      }
                      aria={isLiked ? "Retirer le like" : "Aimer la vidéo"}
                    >
                      <Heart
                        className={cn(
                          "size-6 transition-transform",
                          isLiked && "scale-110 fill-[#FF3B5C] text-[#FF3B5C]",
                        )}
                      />
                    </RailButton>

                    <RailButton
                      label={formatCount(post.comments)}
                      onClick={() => setCommentsOpen(true)}
                      aria="Voir les commentaires"
                    >
                      <MessageCircle className="size-6" />
                    </RailButton>

                    <RailButton
                      label={formatCount(post.saves)}
                      onClick={() => {
                        const next = !isSaved;
                        setSaved((s) => ({ ...s, [post.id]: next }));
                        showToast(
                          next ? "Ajouté aux favoris" : "Retiré des favoris",
                        );
                      }}
                      aria="Enregistrer dans les favoris"
                    >
                      <Bookmark
                        className={cn(
                          "size-6",
                          isSaved && "fill-brand-gold text-brand-gold",
                        )}
                      />
                    </RailButton>

                    <RailButton
                      label={formatCount(post.shares)}
                      onClick={() => showToast("Lien du profil copié ✓")}
                      aria="Partager le profil"
                    >
                      <Share2 className="size-6" />
                    </RailButton>
                  </div>

                  {/* Informations de l'artisan */}
                  <div className="relative z-10 px-4 pb-24 pr-20">
                    <div className="flex items-center gap-1.5 text-[15px] font-bold">
                      {post.name}
                      <BadgeCheck className="size-4 fill-[#3EA6FF] text-black" />
                    </div>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/25 px-2.5 py-1 text-[11px] font-semibold">
                      <TradeIcon className="size-3" />
                      {post.trade} · {post.city}
                    </span>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/95">
                      {post.description}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-gold">
                      <Star className="size-3 fill-brand-gold" />
                      <span className="text-white">{post.rating}</span>
                      <span className="text-white/70">
                        {`· ${post.reviews} avis · ${post.years} ans d'expérience`}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Demande envoyée à ${post.name} ✓`)
                      }
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-brand-orange-deep px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(255,122,0,0.45)] transition-transform active:scale-95"
                    >
                      <CalendarCheck className="size-4" />
                      Réserver
                    </button>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Barre de progression de la vidéo */}
          <div className="absolute inset-x-0 bottom-16 z-30 h-[2.5px] bg-white/15">
            <div className="h-full animate-feed-progress bg-primary" />
          </div>

          {/* Barre de navigation (décorative) */}
          <div
            className="absolute inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-white/10 bg-black/80 pb-1.5 backdrop-blur"
            aria-hidden
          >
            <NavItem icon={Home} label="Accueil" active />
            <NavItem icon={Search} label="Recherche" />
            <span className="flex h-7 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-brand-gold">
              <Plus className="size-4 text-white" />
            </span>
            <NavItem icon={MessageCircle} label="Messages" />
            <NavItem icon={User} label="Profil" />
          </div>

          {/* Feuille des commentaires */}
          <AnimatePresence>
            {commentsOpen && (
              <>
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setCommentsOpen(false)}
                  className="absolute inset-0 z-[60] cursor-default bg-black/40"
                  aria-label="Fermer les commentaires"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute inset-x-0 bottom-0 z-[61] flex max-h-[66%] flex-col rounded-t-[22px] bg-[#161A18]"
                >
                  <div className="relative border-b border-white/10 px-4 py-3.5 text-center text-[13px] font-bold">
                    184 commentaires
                    <button
                      type="button"
                      onClick={() => setCommentsOpen(false)}
                      className="absolute right-4 top-3.5 opacity-60"
                      aria-label="Fermer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3.5">
                    {demoComments.map((c) => (
                      <div key={c.user} className="flex gap-2.5">
                        <span
                          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                          style={{ background: c.color }}
                        >
                          {c.initials}
                        </span>
                        <div className="text-[12.5px] leading-snug">
                          <div className="text-[11px] font-bold opacity-70">
                            {c.user}
                          </div>
                          {c.text}
                          <div className="mt-1 flex items-center gap-1 text-[11px] opacity-50">
                            <Heart className="size-3" /> {c.likes} · Répondre
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 border-t border-white/10 p-3">
                    <span className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[12.5px] text-white/40">
                      Ajouter un commentaire…
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary">
                      <Send className="size-4" />
                    </span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="absolute bottom-24 left-1/2 z-[80] -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-5 py-2.5 text-[12.5px] font-semibold text-brand-ink"
                role="status"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Play className="size-3.5 text-primary" />
        Faites défiler dans le téléphone — tout est cliquable
      </p>
    </div>
  );
}

/** Bouton de la colonne d'actions (icône + compteur). */
function RailButton({
  children,
  label,
  onClick,
  aria,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className="flex flex-col items-center gap-1 drop-shadow transition-transform active:scale-110"
    >
      {children}
      <span className="text-[11px] font-semibold">{label}</span>
    </button>
  );
}

/** Élément de la barre de navigation simulée. */
function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-col items-center gap-0.5 text-[9px]",
        active ? "opacity-100" : "opacity-55",
      )}
    >
      <Icon className="size-5" />
      {label}
    </span>
  );
}
