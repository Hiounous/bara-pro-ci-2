"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/config/site";
import { isSupabaseAuthConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * En-tête du site : navigation responsive, effet "glass" au défilement,
 * toggle de thème et CTA « Rejoindre la liste ». Menu mobile plein écran.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le défilement du body quand le menu mobile est ouvert.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // État de session (côté client, pour garder les pages vitrine statiques).
  const [isAuthed, setIsAuthed] = React.useState(false);
  React.useEffect(() => {
    if (!isSupabaseAuthConfigured) return;
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setIsAuthed(!!data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setIsAuthed(!!session?.user),
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b shadow-soft"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Navigation desktop */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthed ? (
            <Button
              asChild
              variant="brand"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/tableau-de-bord">Tableau de bord</Link>
            </Button>
          ) : (
            <>
              {isSupabaseAuthConfigured && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  <Link href="/connexion">Connexion</Link>
                </Button>
              )}
              <Button
                asChild
                variant="brand"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/liste-attente">Rejoindre la liste</Link>
              </Button>
            </>
          )}

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 lg:hidden"
          >
            <div className="glass h-[calc(100dvh-4rem)] overflow-y-auto border-t px-4 py-6">
              <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
                {mainNav.map((item, i) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                          active
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                {isAuthed ? (
                  <Button asChild variant="brand" size="lg">
                    <Link href="/tableau-de-bord" onClick={() => setOpen(false)}>
                      Mon tableau de bord
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="brand" size="lg">
                      <Link href="/liste-attente" onClick={() => setOpen(false)}>
                        Rejoindre la liste d&apos;attente
                      </Link>
                    </Button>
                    {isSupabaseAuthConfigured && (
                      <Button asChild variant="outline" size="lg">
                        <Link href="/connexion" onClick={() => setOpen(false)}>
                          Connexion
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
