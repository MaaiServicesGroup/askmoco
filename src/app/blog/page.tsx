import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME, BLOG_DESCRIPTION } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-32 pb-16 px-6">
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
              <li className="text-off-white">Blog</li>
            </ol>
          </nav>

          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-off-white mb-4">
            MOCO Blog
          </h1>
          <p className="text-soft text-lg max-w-2xl mb-12">
            Practical guides on SEO, digital marketing, and building a strong
            online presence — written for small business owners who want results
            without the jargon.
          </p>

          {/* Category filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Post grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">Posts coming soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-slate/20 rounded-2xl p-6 sm:p-8 hover:border-accent/30 transition-all duration-300 bg-charcoal-light/30"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">
                      {post.readingTime}
                    </span>
                    <time className="text-xs text-muted" dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-off-white mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-soft leading-relaxed mb-4">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted bg-charcoal-lighter px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* CTA to early access */}
          <div className="mt-16 text-center border border-slate/20 rounded-2xl p-8 bg-charcoal-light/30">
            <p className="text-off-white font-[var(--font-heading)] text-xl font-semibold mb-2">
              Want MOCO to handle all this for your business?
            </p>
            <p className="text-soft mb-6">
              Get early access and let your digital team member take over.
            </p>
            <Link
              href="/#early-access"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
