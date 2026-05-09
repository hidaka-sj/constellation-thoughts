export type ExternalLink = {
  label: string;
  href: string;
  note?: string;
};

export const externalLinks: ExternalLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/hidaka-sj",
  },
  {
    label: "X (SAMPLE)",
    href: "https://x.com/your_handle",
    note: "見栄えのために置いています",
  },
  {
    label: "Zenn (SAMPLE)",
    href: "https://zenn.dev/your_id",
    note: "見栄えのために置いています",
  },
  {
    label: "Qiita (SAMPLE)",
    href: "https://qiita.com/your_id",
    note: "見栄えのために置いています",
  },
  {
    label: "Email (SAMPLE)",
    href: "mailto:your.name@example.com",
    note: "見栄えのために置いています",
  },
  {
    label: "Resume PDF (SAMPLE)",
    href: "https://example.com/resume.pdf",
    note: "見栄えのために置いています",
  },
];

