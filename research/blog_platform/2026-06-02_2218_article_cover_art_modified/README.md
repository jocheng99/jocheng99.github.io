# Article Cover Art Modified

## Analysis

Four posts were still using an empty cover or the default site image:

- `ai-research-workflow.md`: AI research workflow, roles, task cards, context, and verification.
- `generative-ai-prompt-assistant-guide.md`: requirement clarification before prompt generation.
- `cloud-radar-equation-notes.md`: range gate, reflectivity, Doppler velocity equations.
- `why-rewrite-this-blog.md`: rebuilding the blog from static output to maintainable source structure.

Full scan also found `jav-number-provider-routing.md`, but it already had a dedicated cover and inline images, so it was left unchanged.

## Change

- Created original SVG cover art for each post instead of using external online images.
- Stored assets under `public/assets/blog/<post-slug>/cover.svg`.
- Updated each post frontmatter `cover`.
- Updated each post `updatedDate` to `2026-06-02`.
- Updated the cloud radar test image to use its new article-specific SVG.

## Files

- `public/assets/blog/ai-research-workflow/cover.svg`
- `public/assets/blog/generative-ai-prompt-assistant-guide/cover.svg`
- `public/assets/blog/cloud-radar-equation-notes/cover.svg`
- `public/assets/blog/why-rewrite-this-blog/cover.svg`
- `src/content/blog/ai-research-workflow.md`
- `src/content/blog/generative-ai-prompt-assistant-guide.md`
- `src/content/blog/cloud-radar-equation-notes.md`
- `src/content/blog/why-rewrite-this-blog.md`

## Verification

- Passed: `npm.cmd run build:search`
- Astro built 43 pages.
- Pagefind indexed 43 pages and generated `dist/pagefind`.
- Confirmed the four SVG files are valid XML.
- Confirmed all four SVG covers exist in `dist/assets/blog/...` after build.
- Confirmed no blog post still uses `cover: ""` or `cover: "/assets/og_image.png"`.
- Rendered all four SVG covers with Edge headless for visual QA.
- Fixed one text overlap in `generative-ai-prompt-assistant-guide/cover.svg` and rerendered it successfully.
