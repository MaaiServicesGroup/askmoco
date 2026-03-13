import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section className="mt-12 pt-8 border-t border-slate/20">
      <h2 className="font-[var(--font-heading)] text-xl font-semibold text-off-white mb-6">
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-5 rounded-xl border border-slate/20 hover:border-accent/30 transition-all duration-300 bg-charcoal-light/20"
          >
            <span className="text-xs text-accent mb-2 block">
              {post.category}
            </span>
            <h3 className="font-[var(--font-heading)] font-semibold text-off-white text-sm group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-xs text-muted mt-2">{post.readingTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
