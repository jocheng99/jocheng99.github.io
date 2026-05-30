---
name: personal-blog-workflow
description: Project-local workflow for building and maintaining the Jocheng personal blog, including source layout, content placement, static assets, generated outputs, and preview checks.
license: MIT
---

# Personal Blog Workflow

Use this skill whenever the task touches the personal blog site, posts, pages, styles, scripts, static assets, build outputs, or preview checks.

## Placement Rules

- Stable website source uses Astro files in `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/`, and `src/utils/`.
- Long-form blog source lives in `src/content/blog/`.
- Public static assets live in `public/assets/`.
- Reusable local scripts live in `src/tools/`.
- Blog configuration examples and local path templates live in `config/`.
- Experiments and framework trials live in `research/blog_platform/`.
- Publishable Astro output lives in `dist/` by default. Longer-term screenshots or reports can live in `results/blog/`.
- Screenshots, render checks, and throwaway preview artifacts live in `tmp/blog/`.
- External references, design notes, exported assets, and inspiration files live in `reference_materials/`.
- `archive/` is read-only unless the user explicitly asks to archive or modify old material.

## Implementation Rules

- Use Astro when the task is CoolCheng blog rebuild, deployment, pages, content collections, or Pagefind search.
- Keep the first screen as the usable blog experience, not a marketing splash page.
- Do not add frameworks beyond Astro without a concrete need.
- Use `src/utils/paths.ts` for base-path-aware internal links and assets.
- Keep visual assets in `public/assets/`, and generated previews or screenshots out of source.
- Keep placeholder copy honest and easy to replace; do not invent personal biography, credentials, or publication claims.

## Verification

- Confirm the expected directory tree exists.
- Confirm Astro build succeeds.
- Confirm `dist/index.html`, `dist/404.html`, and Pagefind output exist after `npm run build:search`.
- For visual checks, use `npm run preview` or a static server for `dist/`, then stop long-running preview processes before final report.
