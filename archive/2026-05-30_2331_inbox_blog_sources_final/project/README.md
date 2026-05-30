# CoolCheng Blog

CoolCheng Blog 是一个从旧 Hexo 静态产物重新搭建的现代个人博客。新项目使用 Astro 生成纯静态页面，面向中文技术学习记录、工程实践、游戏记录和个人随笔，默认部署到 GitHub Pages：

```text
https://jocheng99.github.io/
```

## 技术栈

- Astro
- TypeScript
- Markdown / Astro Content Collections
- Pagefind 静态搜索
- 纯静态输出，无后端、无数据库、无外部 CDN

## 目录结构

```text
astro.config.mjs        Astro 站点配置，默认 base 为 /
package.json            npm 脚本和依赖
src/content.config.ts   文章内容集合 schema
src/content/blog/       Markdown 文章
src/pages/              页面和动态路由
src/layouts/            全局布局和文章布局
src/components/         导航、SEO、文章卡片、标签等组件
src/styles/global.css   暗色极简全局样式
src/utils/              文章、分类标签、base path 工具函数
public/assets/          favicon、logo、头像和旧图像素材
docs/                   重建分析和部署文档
reference_materials/    旧 Hexo 静态产物和参考材料
dist/                   构建产物，运行构建命令后生成
```

## 本地开发

先安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问路径：

```text
http://localhost:4321/
```

## 构建

```bash
npm run build
```

如在受限沙箱中遇到 Astro telemetry 写入用户目录失败，可在 PowerShell 中临时关闭 telemetry 后运行：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run build
```

## 搜索索引

Pagefind 索引在 Astro 构建后生成：

```bash
npm run build:search
```

成功后应出现：

```text
dist/pagefind/
```

搜索页位于：

```text
/search/
```

在线上 GitHub Pages 对应：

```text
https://jocheng99.github.io/search/
```

## Gitee Pages 部署

部署细节见：

```text
docs/deploy-gitee.md
```

## GitHub Pages 部署

当前仓库 `jocheng99/jocheng99.github.io` 按 GitHub 规则属于用户主页仓库，默认访问地址是：

```text
https://jocheng99.github.io/
```

部署细节见：

```text
docs/deploy-github-pages.md
```

项目已提供 GitHub Actions 工作流：

```text
.github/workflows/deploy-github-pages.yml
```

当前默认配置：

```js
site: "https://jocheng99.github.io"
base: "/"
```

可用环境变量覆盖：

```bash
SITE=https://example.com BASE=/ npm run build:search
```

## 新增文章

在 `src/content/blog/` 新建 Markdown 文件，例如：

```text
src/content/blog/my-note.md
```

frontmatter 模板：

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDate: "2026-05-30"
updatedDate: "2026-05-30"
category: "技术"
tags:
  - Astro
  - 静态站点
draft: false
cover: "/assets/covers/example.jpg"
slug: "my-note"
featured: false
---
```

说明：

- `draft: true` 的文章不会出现在列表、分类、标签、归档和文章详情路由中。
- `slug` 用于生成 `/blog/<slug>/`。
- `cover` 建议使用 `public/assets/` 下的路径，并以 `/assets/...` 开头。

## 旧 Hexo 静态产物

旧压缩包保留在：

```text
reference_materials/inbox/coolcheng-master.zip
```

旧静态站点解压到：

```text
reference_materials/code/coolcheng_legacy_static/
```

它不是新博客源码。旧 HTML/CSS/JS 仅作为历史参考；可公开使用的旧图片已整理到：

```text
public/assets/legacy/
public/assets/avatar/
```

涉及个人收款或联系方式的旧图片没有复制到 `public/`。

## 后续迁移

迁移到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或自有服务器时，主要调整：

- `SITE`
- `BASE`
- 发布目录或平台构建命令

如果部署在域名根路径，设置：

```bash
BASE=/
```

## 常见问题

CSS、JS 或图片 404：

- 检查 `BASE` 是否与部署子路径一致。
- 检查页面里是否错误出现硬编码 `/assets/` 或 `/pagefind/` 根路径。

搜索不可用：

- 确认运行过 `npm run build:search`。
- 确认 `dist/pagefind/` 存在。
- 确认搜索页引用的是 `/pagefind/` 或当前 `BASE` 下的 Pagefind 资源。

中文分类或标签路径：

- 项目使用稳定英文 slug 生成 URL，例如 `游戏 -> /categories/game/`，显示名称仍保留中文。
