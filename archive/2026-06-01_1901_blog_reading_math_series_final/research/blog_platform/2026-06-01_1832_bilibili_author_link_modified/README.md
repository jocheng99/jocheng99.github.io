# Bilibili Author Link Modified

## Change

- Added a Bilibili homepage icon link to the article-page author card.
- Reused the existing inline SVG icon-button style beside email and GitHub.
- Used the user-provided target URL: `https://m.bilibili.com/space/40216637?spm_id_from=333.1387.0.0`.

## Files

- `src/components/ArticleSidebar.astro`

## Verification

- Passed: `npm.cmd run build:search`
- Astro built 34 pages.
- Pagefind indexed 34 pages and generated `dist/pagefind`.
- Passed local preview check at `http://127.0.0.1:4321/blog/rebuild-coolcheng-astro/`.
- Confirmed the author card shows visible links for email, GitHub, and Bilibili.
