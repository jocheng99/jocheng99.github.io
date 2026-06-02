# 云雷达数据处理程序项目结构

> 当前目录 `Jocheng博客` 的主线用途是个人博客。通用目录治理仍遵守本文“代码、研究、结果、归档、临时文件分离”的规则；博客专用结构见 `docs/BLOG_PROJECT_STRUCTURE.md`。本文中云雷达算法、数据、定标和 `.bin` 相关内容只在处理具体云雷达研究内容时适用。

本项目采用“代码、研究、结果、归档、临时文件分离”的目录结构。原始雷达数据不放入本项目目录，只在 `config/` 中记录外部数据位置模板。新对话或继续协作时，先阅读 `AGENTS.md` 和 `START_HERE.md`。

## 顶层目录

```text
archive/      冻结代码快照和早期实验代码归档，默认不作为主线维护
config/       本机路径和外部数据位置模板，不存放原始数据
docs/         项目说明、参数表、理论说明和版本差异
docs/PROJECT_MEMORY_云雷达研究.md  当前项目事实、稳定入口、算法口径、数据/定标关系
docs/TOOL_MEMORY_本机工作流.md      本机工具链、命令模板、报告渲染和清理流程
reference_materials/  参考文档、外来原始代码、说明资料，默认只读参考
skills/PROJECT_SKILLS_GUIDE.md      项目内 skills 使用向导和优先级说明
research/     当前研究主题代码，允许迭代修改
results/      可再生成结果和最终报告、图像、MAT 输出
skills/       项目内 Codex skills 与项目 skill 使用向导
src/          稳定整理版代码和可复用工具
tmp/          临时脚本、渲染检查、缓存，可清理
```

## 代码分层

```text
src/matlab/R2014/      MATLAB R2014 兼容稳定距离产品代码
src/matlab/R2025/      MATLAB R2025 稳定距离产品和 Doppler Layer 1-6 代码
src/matlab/20260515单文件处理程序/  当前稳定 HS 单文件处理代码
src/matlab/20260515晴空residual非相干平均/  当前稳定晴空 residual 多文件非相干平均代码
src/tools/             跨研究主题复用的辅助工具脚本

research/layers1_6/2026-05-09_1651_layers1_6_research/  R2025 Layer 1-6 研究版代码
research/noise_floor_estimation/2026-05-15_1507_noise_floor_estimation_research/  噪底估计研究代码
research/noise_floor_estimation/2026-05-15_1508_modified_noise_floor_estimation/  历史修正版噪底估计研究代码
research/noise_floor_sensitivity/2026-05-15_1459_noise_floor_sensitivity_research/  噪底与 dBZ 灵敏度研究代码
research/noise_floor_sensitivity/2026-05-15_1844_clear_residual_average/  晴空 residual 多文件平均研究迭代副本
research/noise_floor_sensitivity/2026-05-15_1957_clear_residual_average_94GHz_1024_961/  94GHz 1024/961 晴空 residual 平均研究入口
research/noise_floor_method_figures/2026-05-21_1243_noise_floor_method_figures/  噪底估计论文方法图和中间结果输出脚本
research/单文件处理程序/2026-05-21_1243_single_file_processing_research/  单文件 HS/KTB-platform 研究版代码
research/cloud_mask_refinement/YYYY-MM-DD_HHMM_<feature>/  gate-threshold 二维谱域 mask 连通域后处理与诊断研究
research/doppler_spur_suppression/YYYY-MM-DD_HHMM_<feature>/  强信号诱发 Doppler 杂散检测、估计与去除研究
research/single_file_product_DSD/YYYY-MM-DD_HHMM_<feature>/  94GHz 单文件产品整理、DSD/Gamma/LWC 反演研究
research/多文件处理程序/YYYY-MM-DD_HHMM_<feature>/  多文件产品批处理研究代码
research/<topic>/manuscript/  LaTeX 论文源码、期刊模板工作副本和论文专用图表输入
```

## 结果分层

结果统一写入 `results/`，不要长期保存在 `research/` 代码目录内。

```text
results/noise_floor_estimation/    噪底估计相关历史输出和后续输出
results/noise_floor_sensitivity/   噪底灵敏度相关历史输出和后续输出
results/noise_floor_method_figures/ 噪底估计论文方法图、数值摘要和 MAT 输出
results/cloud_mask_refinement/      gate-threshold mask 连通域后处理研究输出
results/doppler_spur_suppression/  强信号诱发 Doppler 杂散研究输出
results/single_file_product_DSD/    单文件产品结构体、DSD/Gamma/LWC 反演研究输出
results/多文件处理程序/          多文件产品批处理研究输出
results/reports/YYYY-MM-DD_HHMM_<feature>/  Word 报告和论文方法类报告
results/manuscripts/<topic>/YYYY-MM-DD_HHMM_<target>/  LaTeX 论文最终 PDF、编译日志和渲染检查
results/figures/                   跨主题汇总图
results/mat/                       跨主题汇总 MAT 文件
```

## 参考资料目录

参考文件统一放入 `reference_materials/`，包括文档、PDF、Word、截图、参数表、外来原始代码和旧程序包。该目录不按日期分类，方便用户直接放入资料；若资料尚未分类，先放入 `reference_materials/inbox/`。

```text
reference_materials/
  inbox/    用户临时放入的未整理资料
  docs/     参考文档、PDF、Word、Markdown、截图、参数表
  code/     外来原始代码、参考程序包、旧代码资料
  notes/    资料来源说明、整理记录、路径迁移说明
```

参考代码默认只读；需要继续开发时，复制到 `research/` 或整理到 `src/` 后再修改。

期刊 LaTeX 模板和投稿指南按以下规则管理：

- 用户提供或下载的官方原始模板、投稿指南和说明文件先放入 `reference_materials/inbox/`，保持原样。
- 需要实际写作或编译时，复制工作副本到 `research/<topic>/manuscript/` 后再修改。
- 不把未经核验的期刊格式要求写入通用模板；每次投稿前根据目标期刊、论文类型和官方说明单独处理。
- 项目级通用 LaTeX 模板和写作流程放入 `skills/latex-writing/`。

后续新实验建议使用带日期、24 小时制小时分钟和主题的 run 目录。同一天可能存在多个测试版本时，必须保留 `HHMM`：

```text
results/<topic>/YYYY-MM-DD_HHMM_<band>_<experiment>/
  mat/
  figures/
  reports/
  render_check/
  logs/
```

## 新功能开发与测试流程

新增功能、算法改动或报告格式改动按“研究验证 -> 确认稳定 -> 整理归位”的流程管理。

### 1. 研究验证阶段

还不确定是否采用的代码放在 `research/<topic>/`，不要直接改 `src/` 中的稳定代码。

每个长期研究主题保留稳定顶层目录；同一主题下的具体测试版本建议用带日期时间的子目录承载代码：

```text
research/<topic>/YYYY-MM-DD_HHMM_<feature_name>/
  run_<feature_name>.m
  <feature_name>_core.m
  <feature_name>_compare.m
```

示例：

```text
research/doppler_spur_suppression/2026-05-21_1035_spur_diagnostics/
```

若只是很小的一次性研究脚本，也可以先放在 `research/<topic>/` 根部；但同一天可能有多个版本、多个参数测试或需要长期对比时，应使用上述版本子目录。

如果只是一次性验证脚本、临时 Python/PowerShell 转换脚本、临时 Word/PDF 检查脚本，放在：

```text
tmp/<topic>/
```

不要把临时脚本长期留在 `research/` 根部。

### 2. 测试输出阶段

所有测试输出写到 `results/`，不要写回代码目录。

推荐：

```text
results/<topic>/YYYY-MM-DD_HHMM_<feature_name>/
  mat/             MAT 或中间数值结果
  figures/         PNG/FIG 等图像
  reports/         DOCX/PDF 报告
  render_check/    PDF 逐页渲染检查图
  logs/            命令输出、检查记录
```

如果只是临时渲染检查或可删除缓存，放在：

```text
tmp/<topic>/YYYY-MM-DD_HHMM_<feature_name>/
```

### 3. 确认采用后

确认功能有效后，根据性质归位：

- 稳定、跨主题复用的 MATLAB 函数或流程：整理到 `src/matlab/` 对应版本或 `src/tools/`。
- 仍属于某个研究方向的脚本：保留在 `research/<topic>/`，清理测试版副本，只留下主入口和必要辅助函数。
- 最终报告、最终图、关键 MAT 结果：保留在 `results/<topic>/...` 或 `results/reports/`。
- 被替代但需要追溯的实验脚本：移动到 `archive/legacy_experiments/`，不要继续在主线目录维护。
- 用户明确要求“固化”“归档”“定下来”的研究版本：复制到 `archive/YYYY-MM-DD_HHMM_<feature_name>_code/`，并保留原 `research/` 可运行入口。

确认采用后同步更新：

```text
PROJECT_STRUCTURE.md              若新增了通用目录规则
docs/PROJECT_MEMORY_云雷达研究.md  若改变了稳定入口、算法口径、数据/定标关系或输出约定
docs/TOOL_MEMORY_本机工作流.md      若改变了工具链、命令模板、报告渲染或清理流程
START_HERE.md                     若改变了新对话启动阅读顺序
AGENTS.md                         若改变了新对话自动入口或项目级协作规则
skills/PROJECT_SKILLS_GUIDE.md     若新增、删除或调整项目内 skill 的使用方式
docs/*.md                         若改变了产品定义、参数、理论口径或版本差异
research/<topic>/README.md        若改变了该研究主题的入口脚本或输出约定
```

### 4. 不同文件的放置规则

```text
*.m 主线研究脚本          -> research/<topic>/YYYY-MM-DD_HHMM_<feature_name>/ 或 research/<topic>/
*.m 稳定公共函数          -> src/matlab/<version>/common/ 或 src/tools/
*.py 可复用工具           -> src/tools/
*.py 一次性生成/检查脚本   -> tmp/<topic>/YYYY-MM-DD_HHMM_<feature_name>/
*.ps1 报告构建脚本         -> research/<topic>/YYYY-MM-DD_HHMM_<feature_name>/、research/<topic>/ 或 src/tools/
*.ps1 一次性维护脚本       -> tmp/<topic>/YYYY-MM-DD_HHMM_<feature_name>/
*.tex/*.bib 论文源码        -> research/<topic>/manuscript/
latexmkrc 论文编译配置      -> research/<topic>/manuscript/ 或 skills/latex-writing/templates/<template>/
*.cls/*.bst/*.sty 期刊模板工作副本 -> research/<topic>/manuscript/，官方原件保留在 reference_materials/
LaTeX 编译缓存和辅助文件     -> tmp/latex_build/<topic>/<run>/
LaTeX 最终 PDF 和日志        -> results/manuscripts/<topic>/<run>/pdf/ 和 results/manuscripts/<topic>/<run>/logs/
*.mat 结果或校准文件       -> results/<topic>/.../mat/ 或 results/<topic>/calibration/
*.png/*.fig 图像结果       -> results/<topic>/.../figures/
*.docx/*.pdf 报告          -> results/reports/YYYY-MM-DD_HHMM_<feature_name>/ 或 results/<topic>/.../reports/
*_render_check.pdf         -> tmp/<topic>/YYYY-MM-DD_HHMM_<feature_name>/ 或 results/<topic>/.../render_check/
render_pages_*/            -> tmp/<topic>/YYYY-MM-DD_HHMM_<feature_name>/ 或 results/<topic>/.../render_check/
```

### 5. 合并前检查

在认为某个改动“确定可用”之前，至少检查：

- 新结果是否写入 `results/`，而不是代码目录。
- 临时文件是否在 `tmp/`，并可安全删除。
- `research/` 中是否留下多个过期测试副本；若有，移动到 `archive/legacy_experiments/` 或删除前确认。
- 主入口脚本、README、项目记忆文件是否指向新路径。
- 对 MATLAB 脚本运行 `checkcode`；对 DOCX/PDF 报告运行 Word COM 导出和 PyMuPDF 渲染检查。

### 6. 日常协作操作约定

本项目当前不应默认依赖 git 状态确认文件改动。若 `git status` 不可用，应在最终说明中列出实际新增和修改的文件路径。

每次新增研究主题或确认一个研究版本时，应优先保证：

- 研究主题目录保持稳定，例如 `research/doppler_spur_suppression/`。
- 具体版本代码优先放入 `research/<topic>/YYYY-MM-DD_HHMM_<feature>/`，不直接进入 `src/`。
- 输出写入 `results/<topic>/YYYY-MM-DD_HHMM_<feature>/`，并包含 `figures/`、`mat/`、`logs/` 等子目录。
- 一次性临时脚本放入 `tmp/<topic>/YYYY-MM-DD_HHMM_<feature>/`。
- 原始 `.bin` 雷达数据只记录外部路径，不复制进项目。
- 若用户明确要求“固化”“归档”“定下来”，才在 `archive/` 中新建 `YYYY-MM-DD_HHMM_<feature>_code/` 版本目录复制代码；归档目录应写 `README.md` 说明来源脚本、运行顺序、结果目录和当前状态。
- 固化到 `archive/` 时采用复制而不是移动，保留 `research/` 中的可运行入口。
- 若只是后续继续探索，应从已确认版本复制出新的 `research/` 版本，不直接修改归档副本。

文档同步按变更性质分配：

- 工具链、PowerShell、MATLAB、Office、PDF 渲染、命令替代和环境问题：写入 `docs/TOOL_MEMORY_本机工作流.md`。
- 稳定入口、算法口径、数据/定标对应关系、研究版本状态：写入 `docs/PROJECT_MEMORY_云雷达研究.md`。
- 新增通用目录、目录含义或归档/输出约定：写入 `PROJECT_STRUCTURE.md`。
- 某个研究主题的入口、运行方式、输出图和方法边界：写入该主题下的 `README.md`。

## 归档目录

```text
archive/legacy_experiments/  早期临时实验脚本，保留供追溯
archive/YYYY-MM-DD_HHMM_<feature>_code/  用户确认固化的研究代码快照
```

归档目录中的代码可以阅读和参考，但不要作为后续主线开发位置。外来原始代码和参考资料统一放入 `reference_materials/`；需要继续维护的代码应复制或迁移到 `src/` 或 `research/` 后再修改。

## 原始数据

原始 `.bin` 等雷达数据不进入本项目目录。每台机器在 `config/data_locations.local.md` 或对话中说明本机数据路径；仓库内只保留 `config/data_locations.example.md` 作为模板。

## 临时文件

`tmp/` 用于：

- Word/PDF 渲染检查中间文件
- 一次性 Python/PowerShell 脚本
- 页面 PNG 渲染缓存
- skill 校验临时目录

清理前必须确认目标路径位于项目根目录内。不要删除最终 `.docx`、正式图像、`.mat` 结果和源代码。

## 迁移记录

本结构整理将旧顶层目录迁移到以下位置：

```text
程序包_94GHz_220GHz云雷达数据处理 -> reference_materials/code/original_code/
修改雷达范围的程序包_94GHz        -> reference_materials/code/original_code/
94GHz与220GHz多普勒处理          -> archive/legacy_experiments/
R2014                           -> src/matlab/R2014
R2025                           -> src/matlab/R2025
research_R2025_layers1_6        -> research/layers1_6
noise_floor_estimation_research -> research/noise_floor_estimation
noise_floor_sensitivity_analysis -> research/noise_floor_sensitivity
output/doc                      -> results/reports
```
