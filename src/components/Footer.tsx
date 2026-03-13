import { MAAI_URL, MAAI_NAME, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate/20 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <p className="text-soft text-sm">
          MOCO is built by{" "}
          <a
            href={MAAI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
          >
            {MAAI_NAME}
          </a>
        </p>
        <p className="text-muted text-sm">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-accent transition-colors"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          &middot; {LOCATION}
        </p>
        <p className="text-muted/60 text-xs">
          &copy; {year} MOCO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
