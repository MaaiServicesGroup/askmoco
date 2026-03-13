import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyMoco from "@/components/WhyMoco";
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
        "MOCO is a done-for-you digital team built by Maai Designs. We handle your website, blog, social media, newsletters, ads, review management, and lead capture so you can focus on running your business.",
    },
    {
      question: "What services does MOCO include?",
      answer:
        "MOCO covers eight core areas: website construction and management, blog management, newsletters, forms and lead capture, review management, social media management, Google Ads, and Meta Ads.",
    },
    {
      question: "Who is MOCO for?",
      answer:
        "MOCO is built for small business owners who need a professional online presence but don't have the time, staff, or budget to manage it all in-house.",
    },
    {
      question: "How does pricing work?",
      answer:
        "MOCO operates on a fixed monthly cost. No hourly billing, no surprise invoices. Contact us to learn about plans for your business.",
    },
    {
      question: "How does MOCO work with Maai Designs?",
      answer:
        "Maai Designs builds your website and digital foundation. MOCO then handles the ongoing execution — content, social media, ads, reviews, and more — on a day-to-day basis.",
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
        <Services />
        <WhyMoco />
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
