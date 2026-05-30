---
title: "从零重建个人博客：Astro 与静态部署"
description: "记录把旧 Hexo 静态产物保护起来，并用 Astro 重建 CoolCheng Blog 的第一步。"
pubDate: "2026-05-30"
updatedDate: "2026-05-30"
category: "技术"
tags:
  - Astro
  - 静态站点
  - Gitee Pages
draft: false
cover: "/assets/legacy/first/title.jpg"
slug: "rebuild-coolcheng-astro"
featured: true
---

旧博客已经运行过很久，留下的材料更像 Hexo 生成后的静态站点，而不是完整源码。因此这次重建的第一步不是继续修旧 HTML，而是把它们放进参考材料目录，避免后续把历史产物误当作主线代码维护。

新的博客选择 Astro，原因很直接：文章可以继续写 Markdown，站点可以构建成纯静态文件，部署到 Gitee Pages 时不需要服务器，也方便以后迁移到 GitHub Pages、Cloudflare Pages 或自有服务器。

## 这次先确定的边界

- 旧 HTML、CSS、JS 只作为历史参考。
- 旧图片可以整理成公开素材，但涉及个人收款或联系方式的图片不放进新站。
- 新文章使用 `src/content/blog/` 中的 Markdown 管理。
- 搜索使用 Pagefind，在构建后生成静态索引。

## 一个最小命令流

```bash
npm install
npm run build
npm run build:search
```

如果部署目标仍然是 `https://jocheng.gitee.io/coolcheng/`，就要确保 base path 是 `/coolcheng/`。这个路径问题会影响 CSS、JS、图片和搜索资源，是迁移静态站点时最容易踩坑的地方。
