# 2026-06-01_1446 文章阅读增强修改版

## 状态

本目录记录本地修改版，尚未固化、提交或部署。等待用户本地预览确认后，再按项目流程复制到 `archive/` 定稿目录。

## 修改范围

- 新增 `src/components/ArticleSidebar.astro`，文章页右侧提供作者卡片、文章目录、公告栏和最新文章。
- 新增 `src/components/ArticlePager.astro`，文章底部提供上一篇和下一篇入口。
- 修改 `src/layouts/BlogPostLayout.astro`：
  - 使用 Astro Markdown headings 生成 TOC。
  - 使用默认封面兜底。
  - 接入阅读进度条和返回顶部按钮。
  - 文章页桌面端改为正文 + 侧栏双栏布局。
- 修改 `src/components/PostCard.astro`，文章列表没有封面时使用默认封面。
- 修改 `src/utils/paths.ts`，增加 `DEFAULT_POST_COVER` 并更新站点版本号。
- 修改 `src/styles/global.css`，补充文章侧栏、TOC、默认封面、翻页、阅读进度和返回顶部样式。

## 验证项

- 运行 `npm.cmd run build:search`。
- 检查文章页是否生成作者卡片、TOC、最新文章、上一篇/下一篇。
- 检查默认封面是否用于无 `cover` 字段文章。
- 检查阅读进度条和返回顶部按钮交互。
- 检查移动端是否无横向溢出。
