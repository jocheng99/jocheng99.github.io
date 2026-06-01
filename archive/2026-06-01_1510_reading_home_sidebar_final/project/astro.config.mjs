import { defineConfig } from "astro/config";

function normalizeBase(value) {
  let base = value || "/";
  if (!base.startsWith("/")) base = `/${base}`;
  if (!base.endsWith("/")) base = `${base}/`;
  return base;
}

export default defineConfig({
  site: process.env.SITE || "https://jocheng99.github.io",
  base: normalizeBase(process.env.BASE),
  output: "static",
  trailingSlash: "always"
});
