import Link from "next/link";

import type { Project } from "../_content/projects";

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">
      {children}
    </span>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => {
        const isComingSoon = project.slug === "coming-soon";
        const card = (
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
              <p className="text-sm leading-6 text-white/65">{project.description}</p>
            </div>
            <span className="mt-1 text-white/50 transition group-hover:text-white/80">
              →
            </span>
          </div>
        );

        return (
          <div
            key={project.slug}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            {isComingSoon ? (
              <div className="select-none opacity-60">
                {card}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={`/${project.slug}`}
                className="group block rounded-xl outline-none ring-white/20 transition hover:bg-white/[0.03] focus-visible:ring-2"
              >
                {card}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}

