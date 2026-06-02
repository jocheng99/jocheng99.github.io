# Generic English Paper Template

This is a neutral English scientific manuscript template for early drafting.

Use it when no journal-specific official template has been provided. Before submission, replace it with the target journal's official template or author instructions.

Suggested copy target:

```text
research/<topic>/manuscript/
```

Compile through the project helper so build artifacts stay out of the source directory:

```powershell
.\src\tools\build_latex_manuscript.ps1 -ManuscriptDir .\research\<topic>\manuscript -Engine auto
```
