# Cleanup Safety

Use this reference after report generation and render checks are complete.

## Keep by Default

Do not delete final deliverables or scientific data products unless explicitly requested:

```text
*.docx
*.pptx
*.xlsx
*.mat
final figures
source scripts
project markdown notes
```

## Common Temporary Artifacts

Safe cleanup candidates after validation:

```text
*_render_check.pdf
render_*_pages/
render_pages_*/
_docx_build_*/
tmp/docs/build_*.py
tmp/docs/__pycache__/
```

Adapt these patterns to the current project memory file and actual output folders.

## Path Boundary Rule

Before recursive deletion, resolve every target and confirm it is inside the current project root or an explicitly named output directory.

PowerShell pattern:

```powershell
$root = (Resolve-Path '<project-root>').Path
$targets = @(
  '<target-path-or-glob-1>',
  '<target-path-or-glob-2>'
)

foreach ($target in $targets) {
    foreach ($item in Resolve-Path $target -ErrorAction SilentlyContinue) {
        $path = $item.Path
        if (-not $path.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Refusing to delete outside project root: $path"
        }
        Write-Output "Would delete: $path"
    }
}
```

Run a dry preview first. Only after confirming the preview, run `Remove-Item -LiteralPath ... -Recurse -Force` on the resolved safe paths.

Do not build delete commands by piping paths into another shell. Use native PowerShell cmdlets with `-LiteralPath`.
