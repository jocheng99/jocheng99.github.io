# Generic Chinese Paper Template

This is a neutral Chinese scientific manuscript template based on `ctexart`.

Use it for early drafting when no specific Chinese journal, conference, or degree-thesis template has been provided. Before submission or degree review, replace or adapt it according to official requirements.

Suggested copy target:

```text
research/<topic>/manuscript/
```

Compile with XeLaTeX:

```powershell
.\src\tools\build_latex_manuscript.ps1 -ManuscriptDir .\research\<topic>\manuscript -Engine xelatex
```
