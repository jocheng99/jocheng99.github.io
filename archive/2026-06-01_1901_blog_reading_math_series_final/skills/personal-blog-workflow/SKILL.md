---
name: personal-blog-workflow
description: Project-local workflow for building and maintaining the Jocheng personal blog, including source layout, content placement, static assets, generated outputs, and preview checks.
license: MIT
---

# Personal Blog Workflow

Use this skill whenever the task touches the personal blog site, posts, pages, styles, scripts, static assets, build outputs, or preview checks.

## Startup Rules

- For new work in this project, read `AGENTS.md`, `skills/PROJECT_SKILLS_GUIDE.md`, `START_HERE.md`, and `PROJECT_STRUCTURE.md` first.
- For blog tasks, also read this skill and `docs/BLOG_PROJECT_STRUCTURE.md` before editing files or running project commands.
- Follow project-local instructions before global skills when the same topic is covered in both places.

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
- Unprocessed user-provided article materials live in `reference_materials/inbox/`.
- Processed article source materials move to `reference_materials/docs/blog_sources/<post-slug>/`.
- External code, legacy static sites, and old compressed site packages live in `reference_materials/code/` and are not maintained as current blog source.
- `archive/` is read-only unless the user explicitly asks to archive or modify old material.

## Implementation Rules

- Use Astro when the task is CoolCheng blog rebuild, deployment, pages, content collections, or Pagefind search.
- Keep the first screen as the usable blog experience, not a marketing splash page.
- Do not add frameworks beyond Astro without a concrete need.
- Use `src/utils/paths.ts` for base-path-aware internal links and assets.
- Keep visual assets in `public/assets/`, and generated previews or screenshots out of source.
- Keep placeholder copy honest and easy to replace; do not invent personal biography, credentials, or publication claims.
- If a user places one folder in `reference_materials/inbox/`, treat that folder as one complete blog-material group. Convert the document and related images/PPTX/assets together.
- For blog material conversion, rewrite source notes into suitable blog prose instead of publishing raw notes verbatim when they are not already article-ready.
- Public social links should use GitHub only unless the user explicitly asks to add another platform.

## Change Lifecycle

- For feature or content changes, make a local modified version and verify it first. Do not commit, push, or deploy until the user confirms the result.
- Record modification validation under `research/blog_platform/YYYY-MM-DD_HHMM_<feature>/`.
- After user confirmation, create a final snapshot under `archive/YYYY-MM-DD_HHMM_<feature>_final/`, then commit and push if requested.
- Use date-time version naming with `YYYY-MM-DD_HHMM` for modified and final snapshots.

## Deployment Target

- Current production target is GitHub Pages at `https://jocheng99.github.io/`.
- The GitHub Pages repository is `jocheng99/jocheng99.github.io`.
- Current production base path is `/`; use `SITE=https://jocheng99.github.io` and `BASE=/`.
- Gitee Pages and `/coolcheng/` path instructions are historical references unless the user explicitly asks to restore that deployment target.

## Verification

- Confirm the expected directory tree exists.
- Confirm Astro build succeeds.
- Confirm `dist/index.html`, `dist/404.html`, and Pagefind output exist after `npm run build:search`.
- Use `npm.cmd run build:search` on Windows PowerShell when `npm.ps1` may be blocked.
- Do not treat `npm run build` alone as sufficient for search validation.
- For visual checks, use `npm run preview` or a static server for `dist/`, then stop long-running preview processes before final report.
