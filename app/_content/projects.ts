export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "constellation",
    title: "Constellation Thoughts",
    description:
      "ポインターに反応する星空。近傍同士の接続線とグロー表現を試作しました。コードはCursorおよびAIを利用しています。",
    tags: ["Next.js", "React", "Tailwind", "SVG"],
  },
  {
    slug: "coming-soon",
    title: "Next project (coming soon)",
    description:
      "作品が増えたらここに追加します（このカードはテンプレートです）。",
    tags: ["Template"],
  },
];

