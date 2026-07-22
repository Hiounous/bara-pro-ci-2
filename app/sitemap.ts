import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

/** Génère le sitemap : pages statiques + articles de blog. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/fonctionnalites",
    "/comment-ca-marche",
    "/a-propos",
    "/faq",
    "/contact",
    "/liste-attente",
    "/newsletter",
    "/blog",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
