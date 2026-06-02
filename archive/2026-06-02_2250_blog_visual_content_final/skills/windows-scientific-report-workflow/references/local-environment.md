# Local Environment

Use this reference to verify the local Windows workstation before report generation or validation. Treat these paths as known defaults, not guarantees. If a project memory file gives a more specific command, prefer the project memory file.

## Office COM

Known Office executables:

```text
C:\Program Files\Microsoft Office\Root\Office16\WINWORD.EXE
C:\Program Files\Microsoft Office\Root\Office16\EXCEL.EXE
C:\Program Files\Microsoft Office\Root\Office16\POWERPNT.EXE
```

Check COM availability:

```powershell
[type]::GetTypeFromProgID('Word.Application')
[type]::GetTypeFromProgID('Excel.Application')
[type]::GetTypeFromProgID('PowerPoint.Application')
```

Check Word add-ins when formula conversion or MathType behavior matters:

```powershell
$word = New-Object -ComObject Word.Application
$word.Visible = $false
foreach ($a in $word.AddIns) {
    Write-Output ($a.Name + ' | Installed=' + $a.Installed + ' | Path=' + $a.Path)
}
$word.Quit()
```

If an automated Word operation times out or fails, check for leftover background Word processes before retrying:

```powershell
Get-Process WINWORD -ErrorAction SilentlyContinue |
    Select-Object Id,StartTime,MainWindowTitle,Path
```

Only stop processes that clearly belong to the failed automation attempt.

## Python

Known Python executable:

```text
C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe
```

Known version:

```text
Python 3.13.7
```

Expected packages:

```text
python-docx
pypdf
PyMuPDF / fitz
lxml
```

Check dependencies:

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import docx, fitz, lxml, pypdf; print('ok')"
```

Use `PYTHONUTF8=1` or `PYTHONIOENCODING=utf-8` when command output contains Chinese text:

```powershell
$env:PYTHONUTF8='1'
$env:PYTHONIOENCODING='utf-8'
```

## Office MathML to OMML

Known XSLT file:

```text
C:\Program Files\Microsoft Office\root\Office16\MML2OMML.XSL
```

Verify before using it:

```powershell
Test-Path -LiteralPath 'C:\Program Files\Microsoft Office\root\Office16\MML2OMML.XSL'
```

## MATLAB

Run MATLAB checks with `matlab -batch` from the directory containing the target script:

```powershell
matlab -batch "cd('<project-or-script-directory>'); msgs = checkcode('<script.m>','-id'); disp(msgs);"
```

If MATLAB fails inside the sandbox with a filesystem consistency or permission error, request approval to rerun the same command outside the sandbox.

## PowerShell Encoding

Windows PowerShell 5 may misread Chinese text in `.ps1` scripts unless files are UTF-8 with BOM. Convert only the script you are about to run:

```powershell
$p='<script.ps1>'
$s=[System.IO.File]::ReadAllText($p,[System.Text.Encoding]::UTF8)
$enc=New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText($p,$s,$enc)
```
