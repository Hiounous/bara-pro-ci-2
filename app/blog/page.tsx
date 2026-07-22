import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { PostCard } from "@/components/blog/post-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils, actus et coulisses de Bara Pro CI. Tout pour bien choisir un " +
    "artisan et mettre en valeur les métiers de Côte d'Ivoire.",
};

/** Page liste du blog : grille de tous les articles. */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Le journal de{" "}
            <span className="text-gradient-brand">Bara Pro CI</span>
          </>
        }
        description="Conseils pratiques, regards sur l'artisanat ivoirien et coulisses du projet."
      />

      <Section className="!pt-16">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Les premiers articles arrivent très bientôt. 📝
          </p>
        ) : (
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
