# Math TOC Lightbox Modified

## Change

- Added Markdown math rendering through `remark-math`, `rehype-katex`, and KaTeX CSS.
- Strengthened article TOC active-section state with `aria-current` and clearer visual styling.
- Added a no-dependency image lightbox for Markdown images inside article content.
- Added `src/content/blog/cloud-radar-equation-notes.md` as a short formula and image interaction test post.

## Files

- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `src/layouts/BaseLayout.astro`
- `src/layouts/BlogPostLayout.astro`
- `src/styles/global.css`
- `src/content/blog/cloud-radar-equation-notes.md`

## Verification

- Passed: `npm.cmd run build:search`
- Astro built 38 pages.
- Pagefind indexed 38 pages and generated `dist/pagefind`.
- Local preview checked `http://127.0.0.1:4321/blog/cloud-radar-equation-notes/`.
- Confirmed KaTeX rendering: 9 `.katex` nodes and 3 display equations.
- Confirmed TOC active-section state switches to `多普勒速度` with `aria-current="location"`.
- Confirmed article image lightbox opens, locks page scroll, preserves image alt text, and closes with `Escape`.
