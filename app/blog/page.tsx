import Link from "next/link";

import { getAllPostMetas } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPostMetas();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm tracking-widest text-white/60">BLOG</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Notes & Updates
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
          >
            ← Profile
          </Link>
        </header>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs text-white/45">{post.date}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

