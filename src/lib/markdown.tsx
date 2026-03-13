import React from "react";

interface MarkdownProps {
  content: string;
}

function processInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Process bold, italic, links, code inline
  const regex =
    /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      nodes.push(
        <strong key={match.index} className="font-semibold text-off-white">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic
      nodes.push(
        <em key={match.index} className="italic">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // Link
      const isExternal =
        match[7].startsWith("http://") || match[7].startsWith("https://");
      nodes.push(
        <a
          key={match.index}
          href={match[7]}
          className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {match[6]}
        </a>
      );
    } else if (match[8]) {
      // Inline code
      nodes.push(
        <code
          key={match.index}
          className="bg-charcoal-lighter px-1.5 py-0.5 rounded text-accent-light text-sm"
        >
          {match[9]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function MarkdownRenderer({ content }: MarkdownProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      const headingClasses: Record<number, string> = {
        2: "font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-off-white mt-12 mb-4",
        3: "font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-off-white mt-8 mb-3",
        4: "font-[var(--font-heading)] text-lg font-semibold text-off-white mt-6 mb-2",
      };

      elements.push(
        <HeadingTag key={i} id={id} className={headingClasses[level] || ""}>
          {processInline(text)}
        </HeadingTag>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes("|") && lines[i + 1]?.match(/^\|[\s-:|]+\|$/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      const headerCells = tableLines[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      const bodyRows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim())
      );

      elements.push(
        <div
          key={`table-${i}`}
          className="my-8 overflow-x-auto rounded-xl border border-slate/30"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate/30 bg-charcoal-lighter">
                {headerCells.map((cell, ci) => (
                  <th
                    key={ci}
                    className="px-4 py-3 text-sm font-semibold text-off-white"
                  >
                    {processInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-slate/20 last:border-0"
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-sm text-soft">
                      {processInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(lines[i].replace(/^[-*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 ml-4">
          {items.map((item, idx) => (
            <li key={idx} className="text-soft leading-relaxed flex gap-2">
              <span className="text-accent mt-1.5 flex-shrink-0">•</span>
              <span>{processInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 ml-4 list-decimal list-outside pl-4">
          {items.map((item, idx) => (
            <li key={idx} className="text-soft leading-relaxed pl-1">
              {processInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-6 border-l-4 border-accent/40 pl-4 py-2 text-soft italic bg-accent-glow/5 rounded-r-lg"
        >
          {quoteLines.map((ql, idx) => (
            <p key={idx}>{processInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(
        <hr key={i} className="my-8 border-t border-slate/20" />
      );
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-soft leading-relaxed mb-4">
        {processInline(line)}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}
