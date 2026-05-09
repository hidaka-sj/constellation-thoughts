import { LinksSection } from "./_components/LinksSection";
import { ProjectsSection } from "./_components/ProjectsSection";
import { externalLinks } from "./_content/links";
import { projects } from "./_content/projects";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm tracking-widest text-white/60">PORTFOLIO</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Hidaka / Web Developer
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/70">
            Next.js / React を軸に、見せ方と体験の良さを磨いています。
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold tracking-tight">About</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-white/70">
              <p>
                CursorおよびAIを利用し、要件の整理 → UI設計 → 実装 → 公開（GitHub Pages など）まで短いサイクルで学習します。
              </p>
              <p className="text-white/60">
                興味: デザインシステム、アニメーション、パフォーマンス、アクセシビリティ。
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "HTML/CSS",
                "UI Design",
                "Git/GitHub",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-white/45">
              必要に応じて: ESLint / Prettier / GitHub Actions / Static Export
            </p>
          </div>
        </section>

        <div className="grid gap-6 sm:grid-cols-2">
          <section className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Blog</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  制作メモや学習ログをまとめるブログを追加しました。
                </p>
              </div>
              <Link
                href="/blog"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
              >
                Open Blog →
              </Link>
            </div>
          </section>

          <div className="sm:col-span-2">
            <h2 className="mb-3 text-sm font-semibold tracking-widest text-white/60">
              PROJECTS
            </h2>
            <ProjectsSection projects={projects} />
          </div>

          <LinksSection links={externalLinks} />

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              必要に応じて準備予定です
            </p>
          </section>
        </div>

        <footer className="pt-4 text-xs text-white/45">
          Built with Next.js static export (GitHub Pages).
        </footer>
      </div>
    </main>
  );
}
