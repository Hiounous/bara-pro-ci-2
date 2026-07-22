import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Chargeur d'articles de blog basé sur des fichiers MDX locaux
 * (`content/blog/*.mdx`). L'architecture est volontairement isolée derrière
 * ces fonctions : passer à un CMS plus tard ne demandera que de réécrire
 * `getAllPosts` / `getPostBySlug`, sans toucher aux pages.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  author: string;
  tag: string;
  cover?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: number; // minutes
};

export type Post = PostMeta & {
  content: string; // MDX brut
};

/** Estime le temps de lecture (~200 mots/minute). */
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    ...fm,
    slug,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/** Retire le contenu MDX brut pour ne garder que les métadonnées. */
function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    tag: post.tag,
    cover: post.cover,
    readingTime: post.readingTime,
  };
}

/** Tous les articles, triés du plus récent au plus ancien. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(toMeta);
}

/** Un article par son slug, ou `null` s'il n'existe pas. */
export function getPostBySlug(slug: string): Post | null {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? `${slug}.mdx` : fs.existsSync(md) ? `${slug}.md` : null;
  if (!file) return null;
  return readPostFile(file);
}

/** Slugs de tous les articles (pour generateStaticParams). */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}
