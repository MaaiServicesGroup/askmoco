import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { getServiceSchema, getFAQSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const serviceSchema = getServiceSchema();
  const faqSchema = getFAQSchema([
    {
      question: "What is MOCO?",
      answer:
        "MOCO stands for Marketing, Operations, Content, Outreach. It is the always-on digital team member built by Maai Designs to handle day-to-day digital execution for small businesses — including SEO, content creation, social media management, and website maintenance.",
    },
    {
      question: "How does MOCO work with Maai Designs?",
      answer:
        "Maai Designs builds your website and digital strategy. MOCO then takes over day-to-day execution — handling content updates, social media posting, SEO optimization, and performance monitoring so you can focus on running your business.",
    },
    {
      question: "Who is MOCO for?",
      answer:
        "MOCO is built for small business owners who need a professional online presence but don't have the time, budget, or staff to manage it all in-house. Currently available exclusively through Maai Designs.",
    },
    {
      question: "What does MOCO cost?",
      answer:
        "MOCO is currently in early access. Sign up on our website to be the first to know when it's available and to receive early pricing information.",
    },
  ]);

  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema]),
        }}
      />
      <main>
        <Hero />
        <Capabilities />
        <HowItWorks />

        {/* Recent blog posts section */}
        {recentPosts.length > 0 && (
          <section className="py-24 sm:py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">
                  From the Blog
                </p>
                <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-off-white">
                  Tips for growing your business online
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group border border-slate/20 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 bg-charcoal-light/30"
                  >
                    <span className="text-xs font-medium text-accent mb-2 block">
                      {post.category}
                    </span>
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-off-white mb-2 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-soft text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                      <span>{post.readingTime}</span>
                      <span>·</span>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/blog"
                  className="text-accent hover:text-accent-light font-medium transition-colors"
                >
                  View all articles →
                </Link>
              </div>
            </div>
          </section>
        )}

        <InterestForm />
        <Footer />
      </main>
    </>
  );
}
