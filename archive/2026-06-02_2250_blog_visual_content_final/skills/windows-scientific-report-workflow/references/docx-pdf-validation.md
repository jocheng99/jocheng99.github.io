# DOCX and PDF Validation

Use this reference when creating a scientific Word report, exporting it to PDF, or checking rendered layout.

## DOCX Generation Choice

Prefer the project's existing report builder when present. Common local patterns:

- PowerShell/OpenXML: good for deterministic fixed-format reports and packaging existing figures.
- `python-docx`: good for method reports, narrative scientific writing, tables, and OMML formula insertion.
- Word COM editing: use mainly for export and inspection, not as the first choice for batch content generation.

For Chinese `.ps1` report builders, ensure UTF-8 with BOM before running in Windows PowerShell 5.

## Word COM Export to PDF

Export a DOCX to PDF and compute Word's page count:

```powershell
$docx = '<final-docx-path>'
$pdf = '<temporary-render-check-pdf-path>'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $doc = $word.Documents.Open($docx, $false, $true)
    try {
        $pages = $doc.ComputeStatistics(2)
        $doc.ExportAsFixedFormat($pdf, 17)
        Write-Output "pages=$pages"
    } finally {
        $doc.Close($false)
    }
} finally {
    $word.Quit()
}
```

Use a temporary PDF name such as `<report-name>_render_check.pdf` so it is clearly not the final deliverable.

## PDF Structure Check

Count pages with `pypdf`:

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "from pypdf import PdfReader; r=PdfReader(r'<pdf-path>'); print(len(r.pages))"
```

## Render PDF Pages with PyMuPDF

Render every page to PNG:

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import fitz, pathlib; pdf=pathlib.Path(r'<pdf-path>'); out=pathlib.Path(r'<page-output-dir>'); out.mkdir(parents=True, exist_ok=True); doc=fitz.open(pdf); print('pages', doc.page_count); [doc[i].get_pixmap(matrix=fitz.Matrix(1.45,1.45), alpha=False).save(out/f'page_{i+1:02d}.png') for i in range(doc.page_count)]"
```

Use higher DPI or matrix values when inspecting fine formulas or dense tables.

## Text Token Check

Extract text to catch obvious rendering or field-code errors:

```powershell
$env:PYTHONIOENCODING='utf-8'
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import fitz, pathlib; pdf=pathlib.Path(r'<pdf-path>'); doc=fitz.open(pdf); txt='\n'.join(page.get_text() for page in doc); bad=[s for s in ['#DIV','Error','MERGEFORMAT','SyntaxError'] if s in txt]; print('pages', doc.page_count); print('chars', len(txt)); print('bad_tokens', bad)"
```

## Visual Checklist

Inspect the rendered PNG pages for:

- Correct page count and no unexpected blank pages.
- Chinese text, Greek letters, subscripts, superscripts, and fractions rendered correctly.
- Tables staying within page margins.
- Figures not cropped and legends not cut off.
- Captions near their figures.
- No placeholder tokens, broken fields, or missing images.
