import Link from "next/link";
import { MAAI_URL, MAAI_NAME, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate/20 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-[var(--font-heading)] font-bold text-off-white mb-2">
              MOCO
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Your always-on digital team member. Marketing, Operations,
              Content, Outreach.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-off-white text-sm font-semibold mb-2">
              Explore
            </p>
            <div className="space-y-1.5">
              <Link
                href="/blog"
                className="text-muted text-sm hover:text-accent transition-colors block"
              >
                Blog
              </Link>
              <Link
                href="/#early-access"
                className="text-muted text-sm hover:text-accent transition-colors block"
              >
                Early Access
              </Link>
              <a
                href={MAAI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-sm hover:text-accent transition-colors block"
              >
                {MAAI_NAME}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-off-white text-sm font-semibold mb-2">
              Contact
            </p>
            <div className="space-y-1.5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted text-sm hover:text-accent transition-colors block"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-muted text-sm">{LOCATION}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted/60 text-xs">
            &copy; {year} MOCO. All rights reserved.
          </p>
          <p className="text-muted/60 text-xs">
            Built by{" "}
            <a
              href={MAAI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:text-accent transition-colors"
            >
              {MAAI_NAME}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
