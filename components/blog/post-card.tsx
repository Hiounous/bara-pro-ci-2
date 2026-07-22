import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/blog";

/** Carte d'aperçu d'un article de blog. */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      {/* Bandeau visuel (dégradé + tag) */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-brand">
        <div className="absolute inset-0 pattern-dots opacity-20" aria-hidden />
        <div className="absolute left-4 top-4">
          <Badge variant="glass">{post.tag}</Badge>
        </div>
        <ArrowUpRight className="absolute bottom-4 right-4 size-6 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="text-balance font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
