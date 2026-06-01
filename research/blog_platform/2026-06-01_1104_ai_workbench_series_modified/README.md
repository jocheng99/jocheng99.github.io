# AI Workbench And Series Navigation Modified

时间：2026-06-01 11:04

## 修改目标

本次修改将博客定位调整为“人工喂素材，AI 处理生成博客”，并在保持 GitHub Pages 纯静态部署的基础上增加前端交互。

## 修改范围

- 首页改为内容工作台：
  - 首屏强调 AI 生成博客定位。
  - 增加素材流转分段控件：喂素材、AI 处理、人工确认、发布归档。
  - 增加文章数、系列数、AI 相关记录数、分类数指标。
  - 增加文章系列入口。
- 文章页增加系列导航：
  - 新增 `series` 和 `seriesOrder` frontmatter 字段。
  - 新增 `SeriesNav.astro` 组件。
  - 已为 AI 相关文章和博客搭建文章标注系列。
- 更新博客介绍：
  - 首页描述、About 页面、站点默认 description 改为 AI 生成博客定位。

## 修改文件

```text
src/pages/index.astro
src/pages/about.astro
src/layouts/BlogPostLayout.astro
src/components/SeriesNav.astro
src/content.config.ts
src/utils/blog.ts
src/utils/paths.ts
src/components/SEO.astro
src/styles/global.css
src/content/blog/*.md
```

## 待验证

```text
npm.cmd run build:search
```

本地预览重点检查：

```text
/
/blog/ai-research-workflow/
/blog/rebuild-coolcheng-astro/
/about/
```
