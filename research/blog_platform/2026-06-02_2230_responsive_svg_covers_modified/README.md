# Responsive SVG Covers Modified

## Issue

- Newly added SVG cover images were displayed with the same `object-fit: cover` rule used for photographic covers.
- On article pages, small viewport ratios could crop the illustration instead of scaling the whole cover.

## Change

- Detect SVG covers in `BlogPostLayout.astro` and `PostCard.astro`.
- Add `is-illustration` class for SVG cover images.
- Use `object-fit: contain` and natural aspect-ratio sizing for article-page SVG covers.
- Keep existing photographic covers unchanged.

## Files

- `src/layouts/BlogPostLayout.astro`
- `src/components/PostCard.astro`
- `src/styles/global.css`

## Verification

- Passed: `npm.cmd run build:search`
- Astro built 43 pages.
- Pagefind indexed 43 pages and generated `dist/pagefind`.
- Confirmed `cloud-radar-equation-notes` article output uses `class="post-cover is-illustration"`.
- Captured local page screenshots at 390 px and 960 px widths; SVG cover displays fully at both sizes.
