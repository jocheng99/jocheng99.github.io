# Project Agent Entry

When starting a new conversation or continuing work in this project, read this file first.

## First Read

1. `skills/PROJECT_SKILLS_GUIDE.md`
2. `START_HERE.md`

The project-local skills guide is the routing layer for this project. Prefer project-local skill instructions over global skills when they cover the same task.

## Project-Local Skill Priority

- If a relevant skill exists under `skills/`, read its `SKILL.md` before editing files or running project commands.
- If a project-local skill and a global skill have overlapping scope, follow the project-local skill first and use the global skill only as supplementary guidance.
- Do not assume project-local skills are automatically injected into the available skills list. If they are not listed, open the project copy manually from `skills/<skill-name>/SKILL.md`.

## Project Guardrails

- Stable code goes in `src/`.
- Personal blog source uses Astro: pages/layouts/components/styles live under `src/`, Markdown posts live in `src/content/blog/`, and public assets live in `public/assets/`.
- Research and feature validation go in `research/`.
- Outputs go in `results/`.
- Generated Astro output normally goes in `dist/`; longer-term reports or screenshots can go in `results/blog/`.
- Temporary scripts, render checks, and caches go in `tmp/`.
- `archive/` is read-only unless the user explicitly asks to change archived files.
- Raw radar `.bin` data stays outside this project directory.
