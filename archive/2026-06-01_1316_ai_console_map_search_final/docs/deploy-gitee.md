# Gitee Pages 部署指南

本文档说明 CoolCheng Blog 的本地构建、Pagefind 搜索索引生成和 Gitee Pages 发布策略。

> 当前状态：本项目主部署目标已迁移到 GitHub Pages：`https://jocheng99.github.io/`。保留本文档用于理解旧的 Gitee Pages 子路径部署方式，以及将来需要恢复或迁移到类似子路径平台时参考。

## 0. 已遇到的问题与当前处理

问题：Gitee Pages 服务停止或不可用，无法继续作为稳定免费部署目标。

当前处理：

- 主部署平台切换为 GitHub Pages 用户主页仓库 `jocheng99/jocheng99.github.io`。
- 当前生产地址使用根路径：`https://jocheng99.github.io/`。
- Astro 配置使用 `SITE=https://jocheng99.github.io` 和 `BASE=/`。
- Gitee 相关 `/coolcheng/` 子路径说明仅作为历史部署参考，不能直接套用到当前 GitHub Pages 生产环境。

## 1. 本地环境要求

- Node.js 和 npm
- 能访问 npm registry
- 不需要后端服务、数据库或外部 CDN

本项目当前使用 npm。不要同时生成 pnpm、yarn 和 npm 多套锁文件。

## 2. 安装依赖

```bash
npm install
```

Windows PowerShell 如果拦截 `npm.ps1`，可使用：

```powershell
npm.cmd install
```

## 3. 本地开发命令

```bash
npm run dev
```

默认地址：

```text
http://localhost:4321/coolcheng/
```

## 4. 构建命令

```bash
npm run build
```

构建输出默认在：

```text
dist/
```

## 5. 生成搜索索引

```bash
npm run build:search
```

该命令会先运行 Astro 构建，再运行：

```bash
pagefind --site dist
```

成功后应存在：

```text
dist/pagefind/
```

## 6. 本地预览命令

```bash
npm run preview
```

预览地址通常为：

```text
http://localhost:4321/coolcheng/
```

预览完成后停止该进程，避免长期占用端口。

## 7. `/coolcheng/` 子路径配置

`astro.config.mjs` 默认：

```js
site: "https://jocheng.gitee.io"
base: "/coolcheng/"
```

可用环境变量覆盖：

```bash
SITE=https://jocheng.gitee.io BASE=/coolcheng/ npm run build:search
```

PowerShell：

```powershell
$env:SITE='https://jocheng.gitee.io'
$env:BASE='/coolcheng/'
npm run build:search
```

## 8. 发布 `dist/` 到 Gitee Pages

构建完成后检查：

```text
dist/index.html
dist/404.html
dist/pagefind/
```

Gitee Pages 对外路径为 `https://jocheng.gitee.io/coolcheng/` 时，发布内容应是 `dist/` 目录中的文件，而不是项目根目录源码。

## 9. 策略 A：源码分支 + 发布分支

适合长期维护：

1. 源码保留在 `main` 或 `source` 分支。
2. 本地运行 `npm run build:search`。
3. 将 `dist/` 中的内容发布到 Gitee Pages 使用的发布分支或发布目录。
4. 发布分支只保存构建产物，不保存 `node_modules/`。

这种方式便于保留完整源码历史，也能避免把构建产物混进主线开发。

## 10. 策略 B：当前分支手动发布 `dist/`

适合短期手动部署：

1. 在当前源码分支运行：

   ```bash
   npm run build:search
   ```

2. 将 `dist/` 内容复制到 Gitee Pages 指定发布位置。
3. 在 Gitee Pages 控制台触发更新。

如果 Gitee Pages 支持指定目录，选择 `dist/` 或上传 `dist/` 内容。如果它只发布仓库根目录，则应使用单独发布分支或把 `dist/` 内容同步到发布仓库根目录。

## 11. CSS/JS/图片 404 排查

检查生成后的 HTML：

```powershell
Select-String -LiteralPath 'dist\index.html' -Pattern '/coolcheng/|/assets/|/_astro/'
```

排查重点：

- `BASE` 是否为 `/coolcheng/`。
- 是否存在错误硬编码的 `/assets/...` 根路径。
- `dist/assets/` 和 `dist/_astro/` 是否存在。

## 12. Pagefind 搜索 404 排查

检查：

```text
dist/pagefind/pagefind-ui.js
dist/pagefind/pagefind-ui.css
dist/search/index.html
```

搜索页应引用：

```text
/coolcheng/pagefind/pagefind-ui.js
/coolcheng/pagefind/pagefind-ui.css
```

如果缺少 `dist/pagefind/`，重新运行：

```bash
npm run build:search
```

## 13. 后续迁移

迁移到 GitHub Pages 仓库子路径：

```bash
SITE=https://<user>.github.io BASE=/<repo>/ npm run build:search
```

迁移到 Cloudflare Pages、Vercel、Netlify 或自有域名根路径：

```bash
SITE=https://example.com BASE=/ npm run build:search
```

只要保持纯静态输出，迁移主要是部署平台和 `SITE`、`BASE` 的变化。
