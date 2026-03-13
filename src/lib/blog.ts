import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  tableOfContents: { id: string; text: string; level: number }[];
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[] | boolean | undefined>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string | string[] | boolean | undefined> = {};

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: string | string[] | boolean = line.slice(colonIndex + 1).trim();

    // Handle arrays like tags: ["seo", "marketing"]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    // Handle booleans
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    // Strip quotes
    else {
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  }

  return { data, content };
}

function extractTableOfContents(
  content: string
): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    toc.push({ id, text, level });
  }

  return toc;
}

function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");

      return {
        slug,
        title: (data.title as string) || slug,
        description: (data.description as string) || "",
        publishedAt: (data.publishedAt as string) || "",
        updatedAt: data.updatedAt as string | undefined,
        author: (data.author as string) || "MOCO Team",
        category: (data.category as string) || "General",
        tags: (data.tags as string[]) || [],
        readingTime: calculateReadingTime(content),
        featured: data.featured as boolean | undefined,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  const toc = extractTableOfContents(content);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    publishedAt: (data.publishedAt as string) || "",
    updatedAt: data.updatedAt as string | undefined,
    author: (data.author as string) || "MOCO Team",
    category: (data.category as string) || "General",
    tags: (data.tags as string[]) || [],
    readingTime: calculateReadingTime(content),
    featured: data.featured as boolean | undefined,
    tableOfContents: toc,
    content,
  };
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags))];
}
