import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type BlogPost = BlogPostMeta & {
  html: string;
};

type PostFrontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
};

const postsDirectory = path.join(process.cwd(), "posts");

function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
}

function toSlug(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function normalizeMeta(slug: string, frontmatter: PostFrontmatter): BlogPostMeta {
  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "1970-01-01",
    excerpt: frontmatter.excerpt ?? "",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  };
}

export async function getAllPostMetas(): Promise<BlogPostMeta[]> {
  const metas = await Promise.all(
    getPostSlugs().map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      return normalizeMeta(toSlug(fileName), data as PostFrontmatter);
    }),
  );

  return metas.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const html = await marked.parse(content);
  const meta = normalizeMeta(slug, data as PostFrontmatter);

  return {
    ...meta,
    html,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  return getPostSlugs().map(toSlug);
}

