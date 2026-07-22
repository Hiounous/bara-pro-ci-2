import type { HTMLAttributes } from "react";

/**
 * Styles des éléments Markdown/MDX rendus dans les articles.
 * On mappe chaque balise à des classes Tailwind pour un rendu "prose" cohérent
 * avec le design system, sans dépendre du plugin typography.
 */
type P = HTMLAttributes<HTMLElement>;

export const mdxComponents = {
  h2: (props: P) => (
    <h2
      className="mt-12 scroll-mt-24 font-display text-2xl font-bold tracking-tight"
      {...props}
    />
  ),
  h3: (props: P) => (
    <h3 className="mt-8 font-display text-xl font-semibold" {...props} />
  ),
  p: (props: P) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: P) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: P) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  li: (props: P) => <li className="pl-1 leading-relaxed" {...props} />,
  a: (props: P) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-brand-orange-deep"
      {...props}
    />
  ),
  strong: (props: P) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  blockquote: (props: P) => (
    <blockquote
      className="mt-6 rounded-r-xl border-l-4 border-primary bg-secondary/40 py-3 pl-5 pr-4 italic text-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (props: P) => (
    <code
      className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
};
