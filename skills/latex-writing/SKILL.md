---
name: latex-writing
description: Project-local LaTeX manuscript workflow for creating, adapting, compiling, and validating English papers, Chinese papers, journal templates, and other scientific writing artifacts in this project.
---

# LaTeX Writing

Use this project-local skill whenever the user asks to create, adapt, compile, or revise a LaTeX manuscript or journal-format writing artifact in this project.

## Required Context

Before editing manuscript files, read:

1. `AGENTS.md`
2. `skills/PROJECT_SKILLS_GUIDE.md`
3. `START_HERE.md`
4. `PROJECT_STRUCTURE.md`
5. `docs/TOOL_MEMORY_本机工作流.md`

If the writing task uses specific cloud-radar algorithms, data, calibration, results, or claims, also read `docs/PROJECT_MEMORY_云雷达研究.md` if it exists. If it does not exist, state that it is missing and ask for source facts instead of inventing content.

## Source And Output Layout

Manuscript sources live under:

```text
research/<topic>/manuscript/
```

Build caches and auxiliary files live under:

```text
tmp/latex_build/<topic>/<run>/
```

Final PDFs, logs, and render checks live under:

```text
results/manuscripts/<topic>/<run>/
  pdf/
  logs/
  render_check/
```

Do not keep long-term `.aux`, `.log`, `.bbl`, `.blg`, `.fls`, `.fdb_latexmk`, rendered page images, or final PDFs in the manuscript source directory.

## Template Policy

- For generic English papers, start from `templates/generic-english-paper/`.
- For generic Chinese papers, start from `templates/generic-chinese-paper/`.
- For IEEE or journal-specific submissions, inspect `reference_materials/inbox/` first for official templates or author guidelines.
- If no official template is present, ask before downloading from official sources.
- Keep original official templates unchanged. Copy a working version before adapting it.
- Do not encode journal-specific formatting requirements from memory unless verified from user-provided material or official sources.

## Writing Guardrails

- Do not fabricate experimental results, datasets, citations, journal requirements, reviewer claims, or conclusions.
- Use explicit placeholders such as `TODO: insert verified result` and `TODO: add verified citation` when evidence is missing.
- Keep major claims aligned with provided evidence and results.
- Use the project-local `research-paper-writing` skill for section logic, claim-evidence alignment, and reviewer-facing self-review.
- Use global polishing or Nature-style skills only as supplementary writing guidance; project-local paths and evidence rules take priority.

## Compilation

Prefer the project build helper:

```powershell
.\src\tools\build_latex_manuscript.ps1 -ManuscriptDir .\research\<topic>\manuscript -Engine auto
```

Use `-TexLiveBin '<path>\bin\windows'` when TeX Live is installed but not yet on PATH.

The helper compiles from the source directory but writes build artifacts to `tmp/` and copies final PDFs/logs to `results/`.

## Validation

After creating or adapting a template:

1. Confirm the `.tex` source compiles.
2. Confirm the PDF is created under `results/manuscripts/.../pdf/`.
3. Check logs for missing files, undefined references, and citation warnings.
4. If layout matters, render PDF pages to images under `render_check/` and inspect representative pages.
5. For Chinese manuscripts, verify fonts render correctly with XeLaTeX.
