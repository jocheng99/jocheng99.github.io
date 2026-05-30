# 2026-05-30 23:31 Inbox Blog Sources Final

本目录是本次确认版的定稿快照，用于追溯从 `reference_materials/inbox/` 素材整理到博客文章发布前的稳定状态。

## 固化内容

- 博客文章：
  - `src/content/blog/ai-research-workflow.md`
  - `src/content/blog/generative-ai-prompt-assistant-guide.md`
  - `src/content/blog/ppt-automation-drawing-workflow.md`
- PPT 自动化文章公开配图：
  - `public/assets/blog/ppt-automation-drawing-workflow/`
- 关键源码：
  - `src/utils/taxonomy.ts`
  - `src/components/SearchHint.astro`
- 参考资料目录说明：
  - `reference_materials/README.md`
  - `reference_materials/docs/blog_sources/README.md`
  - `reference_materials/code/coolcheng_legacy_static/README.md`
- 项目 README 快照：
  - `project/README.md`

## 状态

- 用户已确认本版内容没问题。
- 本版后续应提交并推送到 GitHub Pages 仓库。
- 源素材已从 `reference_materials/inbox/` 移入 `reference_materials/docs/blog_sources/`，旧站 zip 已移入 `reference_materials/code/coolcheng_legacy_static/`。

## 验证

确认前已运行：

```text
npm.cmd run build:search
```

并抽查：

```text
/blog/ppt-automation-drawing-workflow/
/blog/
/tags/ppt-automation/
/search/
/assets/blog/ppt-automation-drawing-workflow/slide_03_nature_schematic.png
```
