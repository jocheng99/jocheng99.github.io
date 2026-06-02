# Start Here

新对话或继续处理本项目时，先根据任务类型阅读以下文档。若当前会话从项目根目录启动，应先阅读 `AGENTS.md` 和 `skills\PROJECT_SKILLS_GUIDE.md`，再按本文继续恢复项目上下文。

## 阅读顺序

### 0. 项目内 skills 路由相关

```text
skills\PROJECT_SKILLS_GUIDE.md
```

用于确认当前项目内有哪些 skill、什么时候优先使用项目内 skill、以及它们和全局 skills 的关系。

### 1. 工具、运行、报告、渲染、清理相关

```text
docs\TOOL_MEMORY_本机工作流.md
```

用于恢复本机 MATLAB、Python、Office、Word/PDF 渲染、公式生成和临时文件清理流程。

### 1A. 个人博客站点、内容、发布结构相关

```text
skills\personal-blog-workflow\SKILL.md
docs\BLOG_PROJECT_STRUCTURE.md
```

用于搭建或维护个人博客站点源码、内容源稿、静态资源、发布输出和临时预览检查。

### 2. LaTeX 论文写作、期刊模板、TeX Live 编译相关

```text
skills\latex-writing\SKILL.md
```

用于创建或接入 LaTeX 英文论文、中文论文、期刊模板和科研写作文档。论文源码放入 `research\<topic>\manuscript\`，构建缓存写入 `tmp\`，最终 PDF、日志和渲染检查写入 `results\`。

### 3. 云雷达算法、稳定入口、数据格式、定标文件、输出约定相关

```text
docs\PROJECT_MEMORY_云雷达研究.md
```

用于确认当前稳定脚本、数据/定标对应关系、residual 平均和 dBZ 灵敏度口径。

### 4. 文件放置、归档规则、research 到 src 迁移规则相关

```text
PROJECT_STRUCTURE.md
```

用于确认项目目录治理规则。该文件应保持稳定，通常不频繁修改。

## 默认规则

- 稳定代码放入 `src/`。
- 研究和新功能验证放入 `research/`。
- 输出结果写入 `results/`。
- 临时脚本、渲染检查、缓存写入 `tmp/`。
- `archive/` 默认只读，除非明确要求，不修改归档代码。
- 原始雷达 `.bin` 数据不放入项目目录。
