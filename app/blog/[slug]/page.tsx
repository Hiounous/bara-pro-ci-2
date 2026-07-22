import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

/** Pré-génère les pages d'articles au build. */
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/** Métadonnées SEO par article (titre, description, Open Graph). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/** Page d'un article de blog, contenu rendu depuis le MDX local. */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.tag}
        title={post.title}
        description={post.description}
      >
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingTime} min de lecture
          </span>
        </div>
      </PageHeader>

      <Section className="!pt-16">
        <article className="mx-auto max-w-2xl">
          <MDXRemote source={post.content} components={mdxComponents} />

          <div className="mt-14 flex items-center justify-between border-t pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" /> Tous les articles
            </Link>
            <Badge variant="outline">{post.tag}</Badge>
          </div>
        </article>
      </Section>

      <WaitlistCta />
    </>
  );
}
