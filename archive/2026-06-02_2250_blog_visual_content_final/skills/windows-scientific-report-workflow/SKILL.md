---
name: windows-scientific-report-workflow
description: Local Windows scientific report workflow for restoring project context and using Microsoft Office COM, PowerShell, Python, PyMuPDF, python-docx, MathML-to-OMML, and MATLAB checkcode to build, export, render-check, and clean up DOCX/PDF reports. Use when Codex needs to resume a project from a workflow memory file, generate or validate scientific Word/PDF reports, inspect formulas and page layout, run MATLAB script checks, or safely remove report build artifacts on this Windows workstation.
---

# Windows Scientific Report Workflow

Use this skill for local Windows scientific reporting workflows that combine project memory files, Office COM, PowerShell, Python document tools, PDF rendering checks, and MATLAB validation.

## Start Here

When working inside a project, first look in the project root for a workflow memory file:

- `工具与流程记忆_*.md`
- `*_workflow_memory.md`
- `PROJECT_MEMORY.md`

If a memory file exists, read it before editing files or running report commands. Treat the memory file as project-specific context for paths, script names, output folders, domain assumptions, and known issues. Use this skill for reusable local tooling decisions.

Do not copy paths from another project. Resolve the current project root and adapt commands to the files present in that project.

## Workflow

1. Restore context.
   Read the project memory file, then identify the report source scripts, final output directory, and temporary output directory.

2. Verify local tools only when needed.
   For Office, Python, MATLAB, and MathML-to-OMML checks, see `references/local-environment.md`.

3. Generate or update the report.
   Prefer existing project scripts and local patterns. For DOCX generation choices and PowerShell encoding notes, see `references/docx-pdf-validation.md`.

4. Render-check the output.
   Export DOCX to PDF with Word COM, count pages, render PDF pages to PNG with PyMuPDF, and inspect layout. See `references/docx-pdf-validation.md`.

5. Handle formulas carefully.
   For editable Word equations, prefer MathML -> OMML using Office `MML2OMML.XSL`. Avoid bulk `OMaths.BuildUp()` unless explicitly needed and verified. See `references/mathml-omml-formulas.md`.

6. Clean up temporary artifacts.
   Remove render-check PDFs, PNG page dumps, and build caches only after path-boundary checks. See `references/cleanup-safety.md`.

## Guardrails

- Keep project-specific paths, script names, and domain theory out of this skill body. Put them in the project memory file or a domain-specific skill.
- Preserve final outputs such as `.docx`, final figures, and data products unless the user explicitly asks to delete them.
- When a command needs to write outside the current workspace, request approval instead of working around permissions.
- If Office COM, MATLAB, or Python is unavailable, report the exact failed check and continue with a safer fallback only when it preserves the requested output quality.
- For Chinese PowerShell scripts, ensure `.ps1` files are UTF-8 with BOM before running in Windows PowerShell 5.

## Reference Map

- `references/local-environment.md`: known local tool paths, dependency checks, Office COM, MATLAB, PowerShell encoding.
- `references/docx-pdf-validation.md`: DOCX generation, Word COM PDF export, PDF page counting, PyMuPDF rendering, visual checks.
- `references/mathml-omml-formulas.md`: editable Word equation workflow using MathML -> OMML and why to avoid unstable MathType/BuildUp automation.
- `references/cleanup-safety.md`: safe cleanup rules and path-boundary pattern for temporary report artifacts.
