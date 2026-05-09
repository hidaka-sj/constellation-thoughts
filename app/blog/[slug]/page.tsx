import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
          >
            ← Blog
          </Link>
          <p className="text-xs text-white/45">{post.date}</p>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-base leading-7 text-white/65">{post.excerpt}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="mt-10 text-sm leading-7 text-white/80 [&_a]:text-white [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:mb-1 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
          >
            プロフィールへ戻る
          </Link>
        </div>
      </article>
    </main>
  );
}

