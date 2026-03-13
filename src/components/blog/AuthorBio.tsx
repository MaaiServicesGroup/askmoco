import Link from "next/link";
import { MAAI_URL, MAAI_NAME } from "@/lib/constants";

export default function AuthorBio() {
  return (
    <div className="mt-10 p-6 rounded-2xl border border-slate/20 bg-charcoal-light/30 flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
        <span className="font-[var(--font-heading)] text-accent font-bold text-lg">
          M
        </span>
      </div>
      <div>
        <p className="font-[var(--font-heading)] font-semibold text-off-white mb-1">
          MOCO Team
        </p>
        <p className="text-sm text-soft leading-relaxed">
          The MOCO blog is written by the team at{" "}
          <a
            href={MAAI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
          >
            {MAAI_NAME}
          </a>
          . We help small businesses build and maintain a professional online
          presence without the enterprise price tag.
        </p>
        <Link
          href="/blog"
          className="text-sm text-accent hover:text-accent-light transition-colors mt-2 inline-block"
        >
          View all posts →
        </Link>
      </div>
    </div>
  );
}
