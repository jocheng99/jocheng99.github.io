# GitHub Pages 部署指南

目标仓库：

```text
https://github.com/jocheng99/jocheng99.github.io
```

## 关键判断

GitHub Pages 的用户主页仓库必须命名为：

```text
<用户名>.github.io
```

现在你的账号名是 `jocheng99`，仓库名是 `jocheng99.github.io`，因此这是标准用户主页仓库。

最终访问地址：

```text
https://jocheng99.github.io/
```

对应构建环境变量：

```text
SITE=https://jocheng99.github.io
BASE=/
```

## 推荐方式：GitHub Actions 自动部署

本项目已提供：

```text
.github/workflows/deploy-github-pages.yml
```

该工作流会：

1. 安装依赖：`npm ci`
2. 构建 Astro 静态站：`npm run build:search`
3. 生成 Pagefind 搜索索引
4. 上传 `dist/`
5. 部署到 GitHub Pages

## GitHub 仓库设置

进入仓库页面：

```text
Settings -> Pages
```

在 `Build and deployment` 中选择：

```text
Source: GitHub Actions
```

不要选择 `Deploy from a branch`，否则 GitHub 会尝试直接发布源码分支里的文件。

## 推送源码前先备份旧静态站

你的远程仓库以前放过旧 Hexo 静态文件。推荐先在 GitHub 网页上保留一个备份分支：

1. 进入仓库代码页。
2. 点击当前分支 `master`。
3. 新建分支，例如：

   ```text
   legacy-hexo-static
   ```

4. 这个分支用于保存旧静态站点快照。

完成备份后，再把本地 Astro 源码推送到 `master` 或 `main`。

## 首次推送源码

当前本地目录还不是 git 仓库。完成远程备份后，在本地项目根目录运行：

```bash
git init
git branch -M master
git remote add origin https://github.com/jocheng99/jocheng99.github.io.git
git add .
git commit -m "Rebuild CoolCheng blog with Astro"
git push -u origin master --force-with-lease
```

说明：

- 使用 `--force-with-lease` 是因为远程 `master` 已有旧 Hexo 静态产物，而本地是重新搭建的 Astro 源码。
- 请先确认旧内容已经备份到 `legacy-hexo-static` 分支，再执行覆盖推送。
- 如果你不想覆盖远程 `master`，可以先推到新分支，例如 `source`，再在 GitHub 上确认后切换。

## 部署完成后访问

主页：

```text
https://jocheng99.github.io/
```

搜索页：

```text
https://jocheng99.github.io/search/
```

## 本地验证

构建：

```bash
npm run build:search
```

预览：

```bash
npm run preview
```

本地地址：

```text
http://127.0.0.1:4321/
```

## 常见问题

页面样式丢失：

- 确认工作流环境变量是 `BASE=/`。
- 确认 `Settings -> Pages` 的 Source 是 `GitHub Actions`。

搜索页 404：

- 确认构建命令是 `npm run build:search`。
- 确认 Actions 产物里包含 `pagefind/`。

搜索页提示“搜索索引尚未生成”：

- 不要只运行 `npm run build`，应运行 `npm run build:search`，让 Astro 构建后继续生成 `dist/pagefind/`。
- GitHub Actions 工作流也必须使用 `npm run build:search`，否则线上搜索页存在但索引资源缺失。
- 当前搜索页从 `/pagefind/pagefind-ui.js` 动态加载 Pagefind UI；用户主页仓库 `jocheng99.github.io` 使用根路径 `BASE=/`，不要保留 Gitee 子路径 `/coolcheng/`。

首页“游戏记录入口”打开 404：

- 原因是旧实现用 `encodeURIComponent` 生成中文分类路径，GitHub Pages 对中文 URL 的处理可能导致实际目录和访问路径不一致。
- 当前解决方案是在 `src/utils/taxonomy.ts` 中维护稳定英文 slug，例如 `游戏 -> /categories/game/`，页面展示名称仍保留中文。

Actions 没有部署权限：

- 到 `Settings -> Pages` 选择 `Source: GitHub Actions`。
- 到 `Settings -> Actions -> General` 确认 Actions 允许运行。

推送被拒绝：

- 远程仓库已有旧提交，本地是新仓库历史。
- 确认已创建 `legacy-hexo-static` 备份分支后，再使用 `git push -u origin master --force-with-lease`。
- 如果出现 `stale info`，说明本地对远程分支的认知已经过期。先运行 `git fetch origin` 更新远程引用，确认远程分支状态符合预期后再重新推送。

提交时报 `Author identity unknown`：

- 当前机器未配置 Git 作者信息。
- 只对本仓库配置时运行：

  ```bash
  git config user.email "531062291@qq.com"
  git config user.name "jocheng99"
  ```

- 若希望作为本机默认配置，再加 `--global`。
