import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * En-tête standard des pages internes : fond décoratif, badge, titre et
 * accroche. Garantit une cohérence visuelle sur tout le site.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("relative overflow-hidden border-b", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 pattern-dots opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <Reveal className="flex flex-col items-center gap-5">
          {eyebrow && <Badge>{eyebrow}</Badge>}
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
