import type { ExternalLink } from "../_content/links";
import { ExternalAnchor } from "./ExternalAnchor";

export function LinksSection({ links }: { links: ExternalLink[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-semibold tracking-tight">Links</h2>
      <p className="mt-2 text-xs leading-5 text-white/45">
        「SAMPLE」と書かれているものは仮リンクです。
      </p>

      <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
        {links.map((link) => (
          <div key={link.href} className="flex flex-col gap-1">
            <ExternalAnchor href={link.href}>{link.label}</ExternalAnchor>
            {link.note ? <span className="text-xs text-white/45">{link.note}</span> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

