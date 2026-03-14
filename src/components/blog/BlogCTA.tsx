import Link from "next/link";
import { BOOKING_URL } from "@/lib/constants";

export default function BlogCTA() {
  return (
    <div className="mt-10 p-8 rounded-2xl border border-accent/20 bg-accent-glow/5 text-center">
      <p className="font-[var(--font-heading)] text-xl font-semibold text-off-white mb-2">
        Want MOCO to handle all of this for you?
      </p>
      <p className="text-soft text-sm mb-6 max-w-md mx-auto">
        Stop worrying about SEO, content, and social media. Let your
        done-for-you digital team take over.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/#get-started"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.3)]"
        >
          Get Started
        </Link>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 border border-accent/30 hover:border-accent/60"
        >
          Book a Call
        </a>
      </div>
    </div>
  );
}
