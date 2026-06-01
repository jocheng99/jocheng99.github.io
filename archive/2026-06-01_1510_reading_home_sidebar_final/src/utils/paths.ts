export const SITE_NAME = "CoolCheng Blog";
export const SITE_DESCRIPTION = "记录技术、工具、游戏和日常思考的个人静态博客。";
export const SITE_VERSION = "v2026.06.01-reading";
export const DEFAULT_OG_IMAGE = "/assets/og_image.png";
export const DEFAULT_POST_COVER = DEFAULT_OG_IMAGE;

export function normalizeBase(base = import.meta.env.BASE_URL || "/") {
  if (!base || base === "/") return "/";
  const withLeading = base.startsWith("/") ? base : `/${base}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export const BASE_PATH = normalizeBase();

export function withBase(path = "/") {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:")) return path;
  if (!path || path === "/") return BASE_PATH;
  return `${BASE_PATH.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function canonicalUrl(path = "/", site = "https://jocheng99.github.io") {
  return new URL(withBase(path), site).toString();
}
