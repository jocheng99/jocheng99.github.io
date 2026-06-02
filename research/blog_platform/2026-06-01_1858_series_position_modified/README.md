# Series Position Modified

## Change

- Moved article `SeriesNav` from the end of the article body to directly below the post cover.
- Kept the article-level previous/next pager at the bottom of the article.
- Renamed series pager labels to `系列上一篇` and `系列下一篇` to distinguish them from the article pager.

## Files

- `src/layouts/BlogPostLayout.astro`
- `src/components/SeriesNav.astro`
- `src/styles/global.css`

## Verification

- Passed: `npm.cmd run build:search`
- Astro built 38 pages.
- Pagefind indexed 38 pages and generated `dist/pagefind`.
- Local preview checked `http://127.0.0.1:4321/blog/ai-research-workflow/`.
- Confirmed article child order: `post-hero -> post-cover -> series-nav -> prose -> article-pager`.
- Confirmed series pager labels use `系列上一篇` / `系列下一篇`.
