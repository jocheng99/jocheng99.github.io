# MathML to OMML Formulas

Use this reference when a Word report needs editable professional equations.

## Preferred Method

Generate the report body with `python-docx`, then convert MathML to Word OMML using Office's `MML2OMML.XSL`.

Why:

- Word receives native editable equation objects.
- Word COM PDF export renders the equations reliably.
- This avoids the common parsing errors caused by bulk conversion of linear formula strings.

Core Python pattern:

```python
from lxml import etree
from docx.oxml import parse_xml

MML2OMML = r'C:\Program Files\Microsoft Office\root\Office16\MML2OMML.XSL'
XSLT = etree.XSLT(etree.parse(MML2OMML))

def omml_from_mathml(inner):
    math = f'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">{inner}</math>'
    result = XSLT(etree.fromstring(math.encode('utf-8')))
    return parse_xml(etree.tostring(result, encoding='unicode'))
```

Append the OMML object to a paragraph:

```python
from docx.enum.text import WD_ALIGN_PARAGRAPH

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p._p.append(omml_from_mathml(mathml_inner))
p.add_run('    (1)')
```

Use inline surrounding text to define variables after the equation rather than putting too much prose inside equation objects.

## Avoid by Default

Do not prefer Word `OMaths.BuildUp()` for batch conversion of linear formulas. It can misparse expressions with fractions, Greek letters, subscripts, functions, and terms such as `2*pi*l/Ndop`.

Do not rely on MathType macros for headless automation. The macro flow may require Ribbon control parameters or interactive dialogs and can leave background Word processes running.

If MathType or `BuildUp()` is explicitly requested, test on a small representative document first, export to PDF, render pages, and inspect the formulas visually.
