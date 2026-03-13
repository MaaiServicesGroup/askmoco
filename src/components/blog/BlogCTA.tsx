import Link from "next/link";

export default function BlogCTA() {
  return (
    <div className="mt-10 p-8 rounded-2xl border border-accent/20 bg-accent-glow/5 text-center">
      <p className="font-[var(--font-heading)] text-xl font-semibold text-off-white mb-2">
        Want MOCO to handle all of this for you?
      </p>
      <p className="text-soft text-sm mb-6 max-w-md mx-auto">
        Stop worrying about SEO, content, and social media. Let your digital
        team member take over.
      </p>
      <Link
        href="/#early-access"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.3)]"
      >
        Get Early Access
      </Link>
    </div>
  );
}
