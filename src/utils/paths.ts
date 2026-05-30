export const SITE_NAME = "CoolCheng Blog";
export const SITE_DESCRIPTION = "技术学习、工程实践、游戏记录和个人思考。";
export const DEFAULT_OG_IMAGE = "/assets/og_image.png";

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

export function canonicalUrl(path = "/", site = "https://jocheng.gitee.io") {
  return new URL(withBase(path), site).toString();
}
