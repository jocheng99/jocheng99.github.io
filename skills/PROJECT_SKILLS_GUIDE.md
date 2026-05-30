# 项目内 Skills 使用向导

本文件是当前云雷达数据处理项目的 skill 路由说明。新对话或继续处理本项目时，先阅读本文件，再按任务类型打开对应的项目内 `SKILL.md`。

## 使用原则

- 项目内 skill 位于 `skills/<skill-name>/SKILL.md`。
- 项目内 skill 优先于全局同类 skill。全局 skill 可作为补充，但不能覆盖本项目的路径、算法口径、输出约定和目录治理规则。
- 不要假设项目内 skill 一定会自动出现在 Codex 的可用 skills 列表中。如果未自动出现，应手动读取本项目下的 `SKILL.md`。
- 后续新增项目 skill 时，先放在 `skills/` 下维护；如需新对话自动触发，可再把全局入口指向该项目 skill。

## 启动顺序

1. 读取本文件，确定需要使用哪些项目内 skill。
2. 读取 `START_HERE.md`，恢复项目文档阅读顺序。
3. 按任务类型读取下表对应的项目内 skill。
4. 再根据 `START_HERE.md` 读取必要的项目记忆、工具记忆和目录结构说明。

## 当前项目内 Skills

| Skill | 路径 | 何时使用 |
|---|---|---|
| `windows-scientific-report-workflow` | `skills/windows-scientific-report-workflow/SKILL.md` | 处理本机 Windows 工具链、MATLAB 检查、Word/PDF 报告生成、公式、渲染检查、临时文件清理时使用。 |
| `personal-blog-workflow` | `skills/personal-blog-workflow/SKILL.md` | 搭建或维护个人博客、静态页面、文章内容、视觉资源、发布输出和预览验证时使用。 |
| `karpathy-guidelines` | `skills/karpathy-guidelines/SKILL.md` | 编写、审查、重构代码时使用，尤其是新增功能、整理代码、避免过度设计、明确验证标准时使用。 |
| `research-paper-writing` | `skills/research-paper-writing/SKILL.md` | 撰写、改写或自审论文 Abstract、Introduction、Related Work、Method、Experiments、Conclusion，检查段落逻辑、claim-evidence 对齐和审稿人视角风险时使用。 |
| `latex-writing` | `skills/latex-writing/SKILL.md` | 创建、接入、编译或检查 LaTeX 英文论文、中文论文、期刊模板和项目级科研写作文档时使用。 |

## 推荐任务路由

- 新功能开发、MATLAB 脚本修改、代码整理：先读 `karpathy-guidelines`，再读 `START_HERE.md` 和项目记忆。
- 个人博客页面、文章、样式、静态资源、发布输出：先读 `personal-blog-workflow`，再按需读 `karpathy-guidelines`。
- Word/PDF 报告、公式、页面渲染、Office COM、PyMuPDF、python-docx、MATLAB `checkcode`：先读 `windows-scientific-report-workflow`。
- LaTeX 英文论文、中文论文、期刊模板接入、TeX Live 编译和 PDF 输出检查：先读 `latex-writing`，再按需结合 `research-paper-writing` 和 `windows-scientific-report-workflow`。
- 论文段落写作、方法/实验/结论章节重写、claim-evidence 自审：先读 `research-paper-writing`，再按需要结合项目记忆和结果目录。
- 云雷达算法、HS 定标、晴空 residual、dBZ 灵敏度、数据/定标对应关系：读 `START_HERE.md` 后进入 `docs/PROJECT_MEMORY_云雷达研究.md`。
- 文件放置、结果目录、临时文件、归档边界：读 `PROJECT_STRUCTURE.md`。

## 与全局 Nature Skills 的关系

全局 `nature-*` skills 可用于论文写作、润色、作图、读文和 PPT，但在本项目中应服从项目内规则：

- 写论文或润色时，可用 `nature-writing`、`nature-polishing`，但结论、术语和边界必须来自项目记忆或用户提供的结果。
- 项目内 `research-paper-writing` 优先用于论文结构、段落角色、claim-evidence 对齐和审稿人视角自审；全局 `nature-writing`、`nature-polishing` 可作为补充，用于 Nature 风格表达和英文润色。
- 做论文图时，可用 `nature-figure`，但数据路径、输出目录、MATLAB/Python 后端和图件口径必须服从本项目说明。
- 读文献或做 PPT 时，可用 `nature-reader`、`nature-paper2ppt`，但输出位置仍按 `results/` 和 `tmp/` 规则管理。
- 检索文献时，云雷达、大气遥感、毫米波雷达、Doppler cloud radar、noise floor estimation、calibration、sensitivity 等领域词优先于生医检索路径。

## 后续新增项目 Skill 规范

新增项目 skill 建议命名为：

```text
skills/<domain-or-workflow-name>/SKILL.md
```

建议优先新增一个云雷达领域覆盖 skill：

```text
skills/cloud-radar-research-workflow/SKILL.md
```

该 skill 应只保存云雷达领域规则、项目启动流程、术语口径、输出约定和与全局 Nature skills 的配合方式，不复制全局 skill 的长篇内容。
