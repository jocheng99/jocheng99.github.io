# 本机工具与工作流记忆

本文档记录本机可用工具、命令模板、报告生成、渲染检查和清理流程。云雷达项目当前入口、算法口径、数据/定标关系见：

```text
docs/PROJECT_MEMORY_云雷达研究.md
```

## 1. MATLAB

MATLAB 可用。常用运行方式：

```powershell
matlab -batch "cd('E:\Work\8、Codex\云雷达数据处理程序\research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research'); <MATLAB命令>"
```

常用代码检查：

```matlab
msgs = checkcode('script_name.m','-id');
for k = 1:numel(msgs)
    fprintf('%s line %d: %s\n', msgs(k).id, msgs(k).line, msgs(k).message);
end
```

注意：

- 沙箱内直接启动 MATLAB 可能出现 `File system inconsistency`。
- 遇到该错误时，需要在沙箱外运行 MATLAB。
- `checkcode` 中 `datestr/now/datenum` 通常是兼容性提示，不等同于语法错误。

## 2. Office

本机已安装 Microsoft Office，且 COM 自动化可用。

常见路径：

```text
C:\Program Files\Microsoft Office\Root\Office16\WINWORD.EXE
C:\Program Files\Microsoft Office\Root\Office16\EXCEL.EXE
C:\Program Files\Microsoft Office\Root\Office16\POWERPNT.EXE
```

COM 检查：

```powershell
[type]::GetTypeFromProgID('Word.Application')
[type]::GetTypeFromProgID('Excel.Application')
[type]::GetTypeFromProgID('PowerPoint.Application')
```

## 3. Python

Python 不在 PATH，`py -0p` 也可能不能发现安装版本，但实际可执行文件可用：

```text
C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe
```

版本：

```text
Python 3.13.7
```

已确认可用库：

```text
python-docx
pypdf
PyMuPDF
```

PyMuPDF 安装命令：

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -m pip install --user PyMuPDF
```

## 4. Word 报告生成

当前报告生成优先使用 PowerShell/OpenXML 或 `python-docx`，避免依赖 Word 交互编辑。

典型脚本：

```text
research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\build_equiv_thermal_dbz_report.ps1
research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\build_94GHz_report.ps1
```

执行时可绕过 PowerShell 执行策略：

```powershell
& 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe' -ExecutionPolicy Bypass -File '<脚本路径>'
```

如果 `.ps1` 含中文，PowerShell 5 可能按本地编码误读。需要确保脚本是 UTF-8 BOM：

```powershell
$p='...\build_equiv_thermal_dbz_report.ps1'
$s=[System.IO.File]::ReadAllText($p,[System.Text.Encoding]::UTF8)
$enc=New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText($p,$s,$enc)
```

报告输出通常放入：

```text
results\reports\
```

## 5. DOCX 转 PDF 检查

用 Word COM 后台导出 PDF：

```powershell
$doc='...\report.docx'
$pdf='...\report_render_check.pdf'
$word=New-Object -ComObject Word.Application
$word.Visible=$false
$word.DisplayAlerts=0
try {
    $d=$word.Documents.Open($doc,$false,$true)
    try {
        $d.ExportAsFixedFormat($pdf,17)
    } finally {
        $d.Close($false)
    }
} finally {
    $word.Quit()
}
```

统计页数：

```powershell
$word=New-Object -ComObject Word.Application
$word.Visible=$false
$doc=$word.Documents.Open('<docx路径>')
$pages=$doc.ComputeStatistics(2)
$doc.Close($false)
$word.Quit()
Write-Output "pages=$pages"
```

若 Word 自动化失败或 MathType 宏失败，应检查并清理后台 Word：

```powershell
Get-Process WINWORD -ErrorAction SilentlyContinue | Select-Object Id,StartTime,MainWindowTitle,Path
Stop-Process -Id <进程ID> -Force
```

## 6. PDF 结构与页面渲染检查

PDF 页数检查：

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "from pypdf import PdfReader; r=PdfReader(r'<pdf路径>'); print(len(r.pages))"
```

推荐渲染脚本：

```text
src\tools\render_report_pages_pymupdf.py
```

运行：

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' 'E:\Work\8、Codex\云雷达数据处理程序\src\tools\render_report_pages_pymupdf.py' '<pdf路径>' --out-dir '<输出页面图片目录>' --dpi 160
```

一次性 PyMuPDF 渲染命令：

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import fitz, pathlib; pdf=pathlib.Path(r'<pdf路径>'); out=pathlib.Path(r'<页面输出目录>'); out.mkdir(parents=True, exist_ok=True); doc=fitz.open(pdf); print('pages', doc.page_count); [doc[i].get_pixmap(matrix=fitz.Matrix(1.45,1.45), alpha=False).save(out/f'page_{i+1:02d}.png') for i in range(doc.page_count)]"
```

检查重点：

- 页数是否正确。
- 每页是否有文字或图片。
- 图像是否被裁切。
- 表格是否溢出页边。
- 图例、说明框是否被图框截断。
- 中文字体是否正常。
- 公式是否变形、断裂或被错误解析。

PDF 文本抽查：

```powershell
$env:PYTHONIOENCODING='utf-8'
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import fitz, pathlib; pdf=pathlib.Path(r'<pdf路径>'); doc=fitz.open(pdf); txt='\n'.join(page.get_text() for page in doc); bad=[s for s in ['#DIV','Error','MERGEFORMAT','SyntaxError'] if s in txt]; print('pages', doc.page_count); print('chars', len(txt)); print('bad_tokens', bad)"
```

## 7. Word 公式生成

推荐用 `python-docx` 生成 Word 主体，用 Office 自带 `MML2OMML.XSL` 把 MathML 转为 Word 专业公式 OMML。

可用文件：

```text
C:\Program Files\Microsoft Office\root\Office16\MML2OMML.XSL
```

Python 关键代码：

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

## 8. 2026-05-27 WBandCloud 批处理代码整理工具问题

本节记录 `research\多文件处理程序\2026-05-26_1809_WBandCloud20260520V0_clean_batch_research\` 整理、检查和归档过程中遇到的本机工具问题。

### PowerShell 中文编码

问题：直接 `Get-Content` 读取项目中文文档或 MATLAB 中文注释时，PowerShell 输出可能把 UTF-8 中文错读为乱码。

处理方式：读取中文文件前设置控制台输出编码，并显式指定 UTF-8：

```powershell
[Console]::OutputEncoding=[System.Text.Encoding]::UTF8
Get-Content -Encoding UTF8 -LiteralPath '<文件路径>'
```

修改后用乱码特征扫描确认：

```powershell
Select-String -LiteralPath '<文件路径>' -Pattern '�|鏆|闆|鍒|鐨|涓|璺|鏁|銆|浣|绔|寰|婊|缁|搴|瀹|姣|榛|鍙'
```

### `rg.exe` 被拒绝访问

问题：本机当前沙箱中调用 `rg` 可能报“拒绝访问”。

处理方式：改用 PowerShell 原生命令完成搜索和定位：

```powershell
Select-String -LiteralPath '<文件路径>' -Pattern '<模式>'
Get-ChildItem -LiteralPath '<目录>'
```

### MATLAB `checkcode` 运行边界

问题：沙箱内直接启动 MATLAB 可能出现文件系统或偏好目录访问问题。

处理方式：对 MATLAB 静态检查使用沙箱外 `matlab.exe -batch`，例如：

```powershell
& 'D:\Program Files\MATLAB\R2024b\bin\matlab.exe' -batch "cd('<代码目录>'); msgs=checkcode('WBandCloud20260520V0.m','-id'); for k=1:numel(msgs), fprintf('%s line %d: %s\n', msgs(k).id,msgs(k).line,msgs(k).message); end"
```

若 MATLAB 输出中文提示乱码，不依赖提示正文，优先看 `checkcode` 的 ID 和行号，例如 `NASGU`、`ASGLU`、`DATNM`、`DATST`、`TNOW1`。

### 大补丁上下文失效

问题：MATLAB 脚本在多轮修改后，较大的 `apply_patch` 容易因为上下文不匹配失败。

处理方式：先用 `Get-Content -Encoding UTF8` 读取目标行附近内容，再按小块补丁修改；每次改完用 `checkcode` 和 `Select-String` 验证。

### 项目目录边界

问题：WBandCloud 多文件处理涉及外部原始 `.bin`、研究代码、归档代码和可再生成输出，容易混到项目外或 `archive` 中。

处理方式：

- 只在 `E:\Work\8、Codex\云雷达数据处理程序\` 下生成和修改项目文件。
- 原始 `.bin` 数据只作为外部路径读取，不复制进项目。
- 研究阶段代码保留在 `research\多文件处理程序\...`。
- 用户要求“固化”时复制代码到 `archive\YYYY-MM-DD_HHMM_<feature>_code\`，不移动研究目录。
- 归档只保存代码和说明，不复制可再生成的 MAT、PNG 或日志输出。

插入公式：

```python
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p._p.append(omml_from_mathml(mathml_inner))
p.add_run('    (1)')
```

不推荐优先使用 Word `OMaths.BuildUp()` 批量处理线性公式。实际测试中，`BuildUp()` 可能误解析含 `2πl/Ndop`、上下标、分式和函数名的表达式。

MathType Word 加载项位置：

```text
C:\Program Files\Microsoft Office\root\Office16\STARTUP\MathType Commands 2016.dotm
```

MathType 自动转换不建议作为无界面流程依赖。`$word.Run('MTCommand_OnConvertEquations')` 可能需要 Ribbon 控件参数或交互对话框。

## 8. 论文方法类报告写作规则

若用户要求“像论文方法部分”，应按理论方法组织，不要按程序字段表组织。

推荐结构：

```text
方法概述
距离-Doppler 功率谱估计
晴空噪声统计定标
HS 停止判据的晴空定标
正式观测中的初始噪底估计
对称性与距离向趋势约束
噪底限幅修正与二维噪声谱构造
谱相减与反射率诊断
符号说明
```

写法要求：

- 正文使用理论符号，例如 `P(f_i,r_l)`、`B(f_i)`、`M_cal`、`eta_K`。
- 不把 `HS_CAL.xxx`、`HS_RESULT.xxx`、`RAW_FILE` 等程序字段作为主体。
- 公式后用自然语言解释每个变量。
- 只写方法本身；不要混入代码改进建议、路径问题或工程化注意事项，除非用户明确要求。

## 9. 中间文件清理

保留：

```text
*.m
*.ps1
*.md
results/**/*.mat
results/**/*.png
results/**/*.fig
results/**/*.docx
```

清理：

```text
tmp\<topic>\YYYY-MM-DD_HHMM_<feature>\docx_build_*
tmp\<topic>\YYYY-MM-DD_HHMM_<feature>\*_render_check.pdf
tmp\<topic>\YYYY-MM-DD_HHMM_<feature>\render_*_pages\
tmp\<topic>\YYYY-MM-DD_HHMM_<feature>\__pycache__\
results\reports\2026-05-20_1451_noise_floor_sensitivity_reports\*_render_check.pdf
results\reports\2026-05-20_1451_noise_floor_sensitivity_reports\render_pages_*
```

已有清理脚本：

```text
research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\cleanup_intermediate_outputs.ps1
```

预览：

```powershell
& 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe' -ExecutionPolicy Bypass -File 'E:\Work\8、Codex\云雷达数据处理程序\research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\cleanup_intermediate_outputs.ps1' -DryRun
```

实际清理：

```powershell
& 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe' -ExecutionPolicy Bypass -File 'E:\Work\8、Codex\云雷达数据处理程序\research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\cleanup_intermediate_outputs.ps1'
```

手动清理前必须确认目标路径位于项目根目录内，避免误删。递归删除前应解析绝对路径并检查边界。

## 10. 常见问题记录

### PowerShell 中文输出编码

预期操作：直接用 `Get-Content` 查看中文 Markdown、日志或 PowerShell 脚本。

实际现象：Windows PowerShell 输出中文时可能按本地编码解释，终端中出现乱码。

固定做法：读取关键中文文件时明确指定 UTF-8：

```powershell
Get-Content -LiteralPath '<文件路径>' -Encoding UTF8
```

如果终端仍显示异常，不要依赖整段终端输出判断内容；改用 `Select-String` 定位关键行，或直接编辑文件。

### rg.exe 被拒绝运行

预期操作：按常规优先使用 `rg` 搜索文本和文件。

实际现象：当前环境中 `rg.exe` 可能被系统拒绝运行。

固定做法：若 `rg` 失败，立即改用 PowerShell 原生命令，不在当前任务中反复排查 `rg`：

```powershell
Select-String -LiteralPath '<文件路径>' -Pattern '<关键词>'
Get-ChildItem -LiteralPath '<目录>' -Filter '<模式>'
Get-ChildItem -LiteralPath '<目录>' -Recurse -Filter '<模式>'
```

### 当前项目目录不是 git 仓库

预期操作：用 `git status --short` 检查改动范围。

实际现象：当前项目目录可能返回：

```text
fatal: not a git repository
```

固定做法：不要依赖 git 状态判断变更；改用文件路径、时间戳、目录枚举、日志文件和最终文件清单确认改动范围。

### MATLAB 沙箱启动异常

预期操作：在默认沙箱内直接运行 `matlab -batch` 执行 `checkcode`、脚本或 MAT 文件检查。

实际现象：沙箱内 MATLAB 可能启动失败并报：

```text
File system inconsistency
```

固定做法：若沙箱内 MATLAB 失败，申请在沙箱外运行 MATLAB。不要因为沙箱失败而跳过关键 `checkcode` 或主程序验证。

### MATLAB checkcode 结果解释

`checkcode` 中常见提示包括：

```text
datestr / now / datenum 兼容性建议
isscalar 性能建议
caxis 建议替换为 clim
```

这些通常是风格或兼容性提示，不等同于语法错误。最终说明时应区分“无语法错误”和“仍有兼容性提示”。

### MAT 文件结构检查

分析已有 `.mat` 结果时，不要盲猜字段名。先列文件变量和结构字段：

```matlab
info = whos('-file', file);
S = load(file);
fieldnames(S.result)
```

若顶层变量不是 `result`，先用 `whos('-file', file)` 确认实际变量名，再展开字段。

### MATLAB 图像与图窗尺寸检查

涉及可视化质量时，不只看脚本是否运行成功，还应检查 PNG 是否实际生成、尺寸是否合理、代表距离门图是否可读。

可用 PowerShell 读取 PNG 尺寸：

```powershell
Add-Type -AssemblyName System.Drawing
Get-ChildItem -LiteralPath '<figures目录>' -Filter 'Fig*.png' | ForEach-Object {
    $img=[System.Drawing.Image]::FromFile($_.FullName)
    try { '{0}: {1}x{2}' -f $_.Name,$img.Width,$img.Height }
    finally { $img.Dispose() }
}
```

MATLAB 多子图诊断图容易过大。新诊断脚本建议使用统一比例参数控制图窗：

```matlab
FIG_SCALE = 0.78;
set(gcf, 'Position', [x y round(w*FIG_SCALE) round(h*FIG_SCALE)]);
```

### 固定带宽图说明框截断

原图中文字过长：

```text
Cooper reference: 1 kHz detection bandwidth
native df = ...
```

已改短为：

```text
Cooper ref: 1 kHz
native df = ...
```

对应位置：

```text
research\noise_floor_sensitivity\2026-05-15_1459_noise_floor_sensitivity_research\plot_equiv_thermal_dbz_sensitivity_from_out.m
```

### MATLAB 图标题下划线被解析为下标

当 `radarLabel` 含下划线，例如 `94GHz_1024_961`，MATLAB 默认 TeX 解释会显示为下标。稳定 residual 平均函数中标题已设置：

```matlab
title(..., 'Interpreter', 'none')
```

## 2026-05-22 cloud mask refinement 工具调用与踩坑记录

本节记录 `research\cloud_mask_refinement\2026-05-22_1247_gateThresholdMask_HSnoiseLow_seeded_growth\` 到已确认归档版：

```text
archive\2026-05-22_1752_gateThresholdMask_HSnoiseLow_physicalMorphology_code\
```

期间实际用到的本机工具、注意事项和坑点。

### 项目上下文恢复

每次继续处理本项目时，先读：

```text
AGENTS.md
skills\PROJECT_SKILLS_GUIDE.md
START_HERE.md
docs\PROJECT_MEMORY_云雷达研究.md
PROJECT_STRUCTURE.md
```

本次开发属于 research 验证和归档，不修改 `src/`。归档只在用户确认“可以确定下来”后执行。

### 搜索工具

按常规优先尝试 `rg`，但本会话中 `rg.exe` 被系统拒绝运行：

```text
程序“rg.exe”无法运行: 拒绝访问
```

实际替代命令：

```powershell
Select-String -Path '<文件>' -Pattern '<关键词>'
Get-ChildItem -LiteralPath '<目录>'
Get-Content -Encoding UTF8 -LiteralPath '<文件>' | Select-Object -Skip <n> -First <m>
```

经验：遇到 `rg` 被拒绝时，不要在算法任务中继续排查 `rg`；直接切 PowerShell 原生命令即可。

### MATLAB 执行

默认沙箱内运行 `matlab -batch` 会失败：

```text
Fatal Startup Error:
File system inconsistency
```

本次 `checkcode`、主程序运行、MAT 结果读取都需要申请沙箱外执行 `matlab -batch`。固定做法：

```powershell
matlab -batch "run('<main.m>');"
```

或：

```powershell
matlab -batch "S=load('<result.mat>'); ... fprintf(...);"
```

不要因为沙箱 MATLAB 启动失败而跳过验证；本项目 MATLAB 验证需要按权限流程执行。

### MATLAB 输出编码

MATLAB 在 PowerShell/工具输出中可能出现中文路径乱码，例如：

```text
E:\Work\8��Codex\���״����ݴ�������\...
```

这通常只是终端编码显示问题。实际文件路径、PNG、MAT、TXT 日志在磁盘上正常。判断输出是否成功应优先看：

```powershell
Test-Path -LiteralPath '<输出文件>'
Get-ChildItem -LiteralPath '<输出目录>'
Get-Content -Encoding UTF8 -LiteralPath '<summary.txt>'
```

### checkcode 解释

本次 `checkcode` 中主程序仍有风格类提示：

```text
isscalar
caxis -> clim
hist -> histogram
```

后处理函数 `refine_hs_noise_low_seeded_mask_2d.m` 为 0 条提示。最终汇报时应区分：

- `checkcode` 无新增语法/结构问题；
- 主程序仍有历史绘图风格提示。

### RAW_FILE 切换

用户明确不需要 `RAW_CASE`，本次按主程序顶部 `RAW_FILE` 手动切换样本：

```matlab
RAW_FILE = '...\20260509_100426SN728.bin';
% RAW_FILE = '...\20260507_154036SN200.bin';
```

测试两个样本时会临时切到 SN200，跑完必须切回默认 SN728，并用 `Select-String` 确认：

```powershell
Select-String -Path '<main.m>' -Pattern '^RAW_FILE|20260507_154036SN200|20260509_100426SN728'
```

这是容易遗忘的点；最终交付前必须检查。

### 结果输出与覆盖

主程序按原始文件名自动写入子目录：

```text
results\cloud_mask_refinement\2026-05-22_1247_gateThresholdMask_HSnoiseLow_seeded_growth\20260509_100426SN728\
results\cloud_mask_refinement\2026-05-22_1247_gateThresholdMask_HSnoiseLow_seeded_growth\20260507_154036SN200\
```

同一样本重复运行会覆盖该子目录下的图、MAT、日志。对比不同算法版本时，不要只看文件夹时间，要读 summary 中的参数和统计字段：

```text
range_bin_spacing_m
velocity_bin_spacing_mps
min_range_span_m
min_gate_velocity_span_mps
min_area_bins
final_signal_bin_total
profile_final_gates
```

### 图像检查

本次使用 Codex `view_image` 直接查看本地 PNG，重点检查：

```text
Fig02_mask_low_high_final_removed.png
Fig05_profile_dBZ_MDV_HSnoiseLow_compare.png
```

`Fig02` 后续被拆成 5 行：

```text
low mask
high seed mask
per-gate seeded support rejected
2D morphology rejected
final mask
```

这类图比只看 summary 更容易判断“噪点是在哪个阶段被删掉的”。

### MATLAB legend 警告

当晴空样本最终没有保留连通域时，`plot(x(kept), y(kept), ...)` 可能为空，`legend('Removed','Kept')` 会产生警告：

```text
警告: 忽略额外的图例条目
```

修复方式：先创建 NaN 占位 handle，再把显式 handle 传给 legend：

```matlab
h_removed = plot(NaN, NaN, 'rx');
hold on;
h_kept = plot(NaN, NaN, 'bo');
...
legend([h_removed h_kept], 'Removed', 'Kept', 'Location', 'best');
```

这不改变算法，只修复空图例场景。

### 归档操作

用户确认“可以先确定下来”后，按项目规则复制而不是移动：

```powershell
New-Item -ItemType Directory -Path '<archive_dir>'
Copy-Item -LiteralPath '<research_file>' -Destination '<archive_dir>'
```

本次只复制代码和 README，不复制 `results/`。归档后用 SHA256 核对 `.m` 文件一致：

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '<file>'
```

注意：归档 README 后续会添加归档状态说明，所以 README 哈希不需要与 research README 保持一致；`.m` 文件应保持一致。

### 文档同步

确认版至少同步三处：

```text
archive\<confirmed_version>\README.md
research\<topic>\<version>\README.md
docs\PROJECT_MEMORY_云雷达研究.md
```

工具链和踩坑记录写入：

```text
docs\TOOL_MEMORY_本机工作流.md
```

算法口径、版本状态、结果统计写入：

```text
docs\PROJECT_MEMORY_云雷达研究.md
```

### 可优化项

- 后续可做一个小 runner，避免频繁手动切 `RAW_FILE`。
- 若还会多次比较算法版本，建议在结果目录中加入参数标签或时间戳，避免重复运行覆盖同一样本输出。
- 主程序绘图里仍有 `caxis`、`hist` 这类历史风格用法；研究阶段可接受，整理进 `src` 前可统一替换为 `clim`、`histogram`。

## 2026-05-27 WBandCloud 修订版报告生成路线

本项目后续需要写带公式的 Word/PDF 科学说明文档时，优先采用以下路线：

```text
Markdown 源稿（正文 + LaTeX 公式语法）
  -> Pandoc 转 DOCX（公式转 Word 原生 OMML）
  -> Word COM 导出 PDF
  -> PyMuPDF 渲染每页 PNG
  -> 人工抽查公式、中文、表格和分页
```

适用场景：

- 说明文档最终要求交付 `.docx`，但正文中包含较多分式、求和、上下标、希腊字母和 Gamma/反函数等公式。
- 本机没有安装 TeX 引擎，不能稳定走 `xelatex`/`pdflatex` 原生 LaTeX PDF。
- 需要可靠渲染中文和 Word 原生公式，并能导出 PDF 检查版式。

当前本机结论：

```text
Word COM: available
Pandoc: C:\Users\LJC\AppData\Local\Pandoc\pandoc.exe
Office MathML->OMML: C:\Program Files\Microsoft Office\root\Office16\MML2OMML.XSL
System Python: C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe
System Python packages: python-docx, lxml, PyMuPDF, pypdf
TeX engines: pdflatex/xelatex/lualatex/tectonic not found
```

推荐命令模板：

```powershell
& 'C:\Users\LJC\AppData\Local\Pandoc\pandoc.exe' `
  '<source.md>' `
  -o '<report.docx>' `
  --from markdown+tex_math_dollars+tex_math_single_backslash `
  --standalone
```

Word COM 导出 PDF：

```powershell
$docx = '<report.docx>'
$pdf = '<report_render_check.pdf>'
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

本次 `WBandCloud20260520V0` 修订版报告验证中，`ExportAsFixedFormat($pdf,17)` 在公式密集 DOCX 上可能卡住；同一文档使用 `SaveAs2($pdf,17)` 可以成功导出 PDF。后续带大量 OMML 公式的 Pandoc DOCX 优先使用下列方式：

```powershell
$docx = '<report.docx>'
$pdf = '<report.pdf>'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $doc = $word.Documents.Open($docx, $false, $true, $false)
    try {
        $pages = $doc.ComputeStatistics(2)
        $doc.SaveAs2($pdf, 17)
        Write-Output "pages=$pages"
    } finally {
        $doc.Close($false)
    }
} finally {
    $word.Quit()
}
```

PyMuPDF 渲染检查：

```powershell
& 'C:\Users\LJC\AppData\Local\Programs\Python\Python313\python.exe' -c "import fitz, pathlib; pdf=pathlib.Path(r'<report_render_check.pdf>'); out=pathlib.Path(r'<render_pages_dir>'); out.mkdir(parents=True, exist_ok=True); doc=fitz.open(pdf); print('pages', doc.page_count); [doc[i].get_pixmap(matrix=fitz.Matrix(1.5,1.5), alpha=False).save(out/f'page_{i+1:02d}.png') for i in range(doc.page_count)]"
```

公式注意事项：

- Markdown 中优先使用独立块公式 `$$ ... $$`，少量短公式可用行内 `$...$`。
- 避免在公式对象里写长中文解释；变量解释放在公式后的正文或表格中。
- 若 Pandoc 对个别复杂公式转换不稳定，再用 Python `lxml` + Office `MML2OMML.XSL` 生成 OMML 后插入 DOCX。
- 不优先使用 Word `OMaths.BuildUp()` 或 MathType 宏做批量转换；它们在分式、下标、希腊字母和 `2\pi l/N` 一类公式中更容易误解析。

输出放置：

```text
results/reports/YYYY-MM-DD_HHMM_<feature>/
  src_md/
  docx/
  pdf/
  render_check/
  logs/
```

## 2026-05-30 LaTeX 论文写作框架

本项目新增项目级 LaTeX 写作入口：

```text
skills/latex-writing/SKILL.md
```

通用模板：

```text
skills/latex-writing/templates/generic-english-paper/
skills/latex-writing/templates/generic-chinese-paper/
skills/latex-writing/templates/ieee/
```

论文源码位置：

```text
research/<topic>/manuscript/
```

编译输出约定：

```text
tmp/latex_build/<topic>/<run>/                         编译缓存和辅助文件
results/manuscripts/<topic>/<run>/pdf/                 最终 PDF
results/manuscripts/<topic>/<run>/logs/                编译日志
results/manuscripts/<topic>/<run>/render_check/        渲染检查
```

推荐编译脚本：

```powershell
.\src\tools\build_latex_manuscript.ps1 -ManuscriptDir .\research\<topic>\manuscript -Engine auto
```

如果 TeX Live 已安装但尚未加入 PATH，可显式传入二进制目录：

```powershell
.\src\tools\build_latex_manuscript.ps1 -ManuscriptDir .\research\<topic>\manuscript -Engine auto -TexLiveBin '<TeXLive>\bin\windows'
```

TeX Live 2026 已安装：

```text
D:\texlive\2026
D:\texlive\2026\bin\windows
```

当前 Codex 进程若尚未刷新 PATH，可用绝对路径或在编译脚本中传入：

```powershell
-TexLiveBin 'D:\texlive\2026\bin\windows'
```

已验证工具：

```text
latex/pdflatex/xelatex/lualatex: TeX Live 2026
latexmk: 4.87
biber: 2.21
tlmgr: TeX Live 2026, Windows 入口为 tlmgr.bat
```

TeX Live 2026 官方网络安装准备文件仍保留在：

```text
tmp/latex_setup/install-tl-windows.exe
tmp/latex_setup/install-tl.zip
tmp/latex_setup/install-tl/
tmp/latex_setup/texlive.profile
tmp/latex_setup/install-tl-20260530.log
```

当前 profile 目标路径已改为实际安装位置：

```text
D:\texlive\2026
```

历史记录：曾尝试安装到 `D:\Program Files\Tex\2026`，但普通用户无创建权限，被 Windows 拒绝。后续默认使用 `D:\texlive\2026`。

写作约束：

- 不编造实验结果、数据、引用或期刊格式要求。
- 未知内容用明确 `TODO` 占位符。
- 官方期刊模板和投稿指南先放入 `reference_materials/inbox/` 并保持原样，再复制工作副本进入 `research/<topic>/manuscript/`。
- 通用中文论文模板使用 XeLaTeX 和 `ctexart`。
- 通用模板默认不启用参考文献输出，避免在无核验引用时触发 BibTeX 错误或显示占位符引用；添加真实引用后再启用 `\bibliographystyle` 和 `\bibliography`。
- 当前 Codex PowerShell 进程可能还未继承系统 PATH 中的 TeX Live 路径；在这种情况下使用 `-TexLiveBin 'D:\texlive\2026\bin\windows'`。

2026-05-30 烟测结果：

```text
English template:
  source: research/latex_framework_smoke_english/manuscript/
  pdf: results/manuscripts/latex_framework_smoke_english/2026-05-30_1828_smoke_english_verified/pdf/main.pdf
  pages: 1

Chinese template:
  source: research/latex_framework_smoke_chinese/manuscript/
  pdf: results/manuscripts/latex_framework_smoke_chinese/2026-05-30_1828_smoke_chinese_verified/pdf/main.pdf
  pages: 2
```

PDF 页面渲染检查已写入各自的 `render_check/` 目录。直接在沙箱内运行本机 Python 可能出现 `Access is denied`；需要时按权限流程在沙箱外运行 PyMuPDF 渲染。
