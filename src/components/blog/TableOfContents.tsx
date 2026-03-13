"use client";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="my-8 p-6 rounded-2xl border border-slate/20 bg-charcoal-light/30"
    >
      <h2 className="font-[var(--font-heading)] text-sm font-semibold text-off-white uppercase tracking-widest mb-4">
        In This Article
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-soft hover:text-accent transition-colors leading-relaxed"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
