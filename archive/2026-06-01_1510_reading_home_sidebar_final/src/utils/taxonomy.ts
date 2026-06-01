export function taxonomySlug(name: string) {
  const normalized = name.trim();
  const mapped = TAXONOMY_SLUGS[normalized];
  if (mapped) return mapped;

  const asciiSlug = normalized
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (asciiSlug) return asciiSlug;

  let hash = 0;
  for (const char of normalized) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return `item-${hash.toString(36)}`;
}

export function taxonomyPath(kind: "categories" | "tags", name: string) {
  return `/${kind}/${taxonomySlug(name)}/`;
}

const TAXONOMY_SLUGS: Record<string, string> = {
  "技术": "tech",
  "游戏": "game",
  "随笔": "essay",
  "个人博客": "personal-blog",
  "记录": "notes",
  "长期主义": "long-termism",
  "塞尔达": "zelda",
  "游戏记录": "game-log",
  "截图": "screenshots",
  "静态站点": "static-site",
  "Astro": "astro",
  "Gitee Pages": "gitee-pages",
  "AI 工具": "ai-tools",
  "科研工作流": "research-workflow",
  "PPT 自动化": "ppt-automation",
  "提示词": "prompting",
  "Codex": "codex",
  "项目管理": "project-management",
  "需求澄清": "requirement-clarification"
};
