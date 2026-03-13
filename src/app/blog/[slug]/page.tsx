import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { getBlogPostSchema, getBreadcrumbSchema } from "@/lib/schema";
import { MarkdownRenderer } from "@/lib/markdown";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogCTA from "@/components/blog/BlogCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — ${SITE_NAME} Blog`,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category ||
          p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  const postSchema = getBlogPostSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([postSchema, breadcrumbSchema]),
        }}
      />

      <article className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li className="text-off-white truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                {post.category}
              </span>
              <span className="text-sm text-muted">{post.readingTime}</span>
            </div>

            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-off-white leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-soft text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted border-b border-slate/20 pb-6">
              <span>By {post.author}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span>·</span>
                  <span>
                    Updated{" "}
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Table of Contents */}
          {post.tableOfContents.length > 2 && (
            <TableOfContents items={post.tableOfContents} />
          )}

          {/* Post body */}
          <div className="prose-moco max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate/20">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted bg-charcoal-lighter px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author bio */}
          <AuthorBio />

          {/* CTA */}
          <BlogCTA />

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}
        </div>
      </article>
    </>
  );
}
