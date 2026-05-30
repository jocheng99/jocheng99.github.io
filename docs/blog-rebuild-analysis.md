# CoolCheng 博客重建分析

日期：2026-05-30

## 1. 当前仓库结构判断

当前目录属于“包含旧压缩包和项目治理文档的工作区”，并且已经存在一次初始静态博客草稿：

- 有项目入口文档：`AGENTS.md`、`START_HERE.md`、`PROJECT_STRUCTURE.md`、`skills/PROJECT_SKILLS_GUIDE.md`。
- 无现代前端项目入口：未发现 `package.json`、锁文件、`astro.config.*` 或 `vite.config.*`。
- 根目录未发现旧 Hexo 生成产物目录：未发现 `archives/`、`categories/`、`tags/`、`content.json`、`index.html`。
- 旧博客压缩包位于 `reference_materials/inbox/coolcheng-master.zip`。
- `src/site/` 是本次会话早期创建的无依赖静态草稿，不是最终目标技术栈，应保留为历史参考后替换为 Astro 项目。

## 2. 旧 Hexo 静态产物识别结果

`coolcheng-master.zip` 内部结构显示它高度符合 Hexo 生成后的静态站点产物：

- 年份路径：`2021/`、`2023/`
- 归档、分类、标签：`archives/`、`categories/`、`tags/`
- 静态资源：`css/`、`js/`、`image/`、`img/`
- 站点文件：`index.html`、`atom.xml`、`content.json`、`manifest.json`、`sitemap.xml`、`sitemap.txt`

该压缩包不应作为新博客源码继续维护。

## 3. 是否发现原始 Hexo 源码

未在压缩包索引中发现典型 Hexo 源码文件或目录：

- 未发现 `package.json`
- 未发现 `_config.yml`
- 未发现 `source/`
- 未发现 `themes/`
- 未发现 `scaffolds/`

因此当前可用旧材料按“Hexo 静态产物”处理。

## 4. 是否发现 package.json 或已有前端项目

未发现 `package.json`，也未发现 `pnpm-lock.yaml`、`package-lock.json`、`yarn.lock`。包管理器按任务规则默认使用 npm。

## 5. 旧素材清单摘要

压缩包内可复用素材包括：

- 文章静态页：`2021/10/31/First/index.html`、`2021/12/03/game/index.html`、`2023/09/06/makedowntest/index.html`
- 旧内容索引：`content.json`
- 图片素材：`image/first/`、`image/makedown/`、`image/zelda/`
- 个人/站点素材：`image/头像.gif`、`img/avatar.png`、`img/favicon.svg`、`img/logo.svg`、`img/og_image.png`
- 旧站中存在支付和微信图片：`image/微信.jpg`、`image/支付宝.jpg`，出于隐私和安全考虑不放入新站公共资源。

## 6. 新博客技术方案

采用 Astro + TypeScript + Markdown Content Collections + Pagefind：

- Astro 负责纯静态站点生成。
- TypeScript 负责内容工具函数和路径处理。
- Markdown 内容位于 `src/content/blog/`。
- Pagefind 在构建后生成静态搜索索引。
- 不使用 Hexo、Next.js、Nuxt、后端 CMS、数据库、外部搜索服务或 CDN。

## 7. Gitee Pages 部署路径风险

目标地址为：

```text
https://jocheng.gitee.io/coolcheng/
```

主要风险：

- Astro `base` 必须默认为 `/coolcheng/`，否则 CSS、JS、图片和页面链接可能在 Gitee Pages 子路径下 404。
- Pagefind 资源路径必须跟随 base path，不应硬编码为 `/pagefind/...`。
- 构建输出目录是否直接为 `dist/` 需要实际检查，不能假设 Gitee Pages 发布层级。

## 8. 构建和部署策略

本地默认命令：

```powershell
npm install
npm run build
npm run build:search
```

部署策略：

- 策略 A：源码保留在源码分支，`dist/` 构建产物发布到 Gitee Pages 使用的发布分支或指定目录。
- 策略 B：当前分支保留源码，手动构建后把 `dist/` 内容复制到 Gitee Pages 指定发布位置。

后续迁移时通过环境变量调整：

```text
SITE=https://jocheng.gitee.io
BASE=/coolcheng/
```

## 9. 需要保留、移动、复制、忽略的旧文件清单

保留：

- `AGENTS.md`
- `START_HERE.md`
- `PROJECT_STRUCTURE.md`
- `skills/PROJECT_SKILLS_GUIDE.md`
- `docs/TOOL_MEMORY_本机工作流.md`

解压并保护：

- `reference_materials/inbox/coolcheng-master.zip` -> `reference_materials/code/coolcheng_legacy_static/`

复制到新站公共素材：

- `img/favicon.svg` -> `public/assets/favicon.svg`
- `img/logo.svg` -> `public/assets/logo.svg`
- `img/avatar.png` -> `public/assets/avatar/avatar.png`
- `img/og_image.png` -> `public/assets/og_image.png`
- `image/first/`、`image/makedown/`、`image/zelda/` -> `public/assets/legacy/`

不发布到公共素材：

- `image/微信.jpg`
- `image/支付宝.jpg`

移动为历史参考：

- `src/site/` 初始静态草稿 -> `reference_materials/code/initial_static_scaffold/`
- `tmp/blog/render_check/` 初始截图可继续作为临时检查文件，不进入源码。

忽略：

- 旧 HTML/CSS/JS 不作为新博客源码维护。
- 旧文章正文不在本次完整迁移。

## 10. 实施步骤

1. 解压旧 `coolcheng-master.zip` 到 `reference_materials/code/coolcheng_legacy_static/`。
2. 为旧静态产物补充 README，说明它不是新源码。
3. 从旧静态产物整理非敏感图片到 `public/assets/`。
4. 将早期静态草稿移入参考材料目录。
5. 创建 Astro 项目文件：`package.json`、`astro.config.mjs`、`tsconfig.json`。
6. 创建内容集合、布局、组件、工具函数和页面。
7. 创建 3 篇中文示例文章。
8. 集成 Pagefind 搜索页和构建脚本。
9. 更新 `README.md`、`docs/deploy-gitee.md`、项目本地博客结构文档和 skill。
10. 运行依赖安装、构建、搜索索引生成和输出检查。
