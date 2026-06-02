# 博客本地预览与检查流程

本文档用于在本机检查 CoolCheng Blog 的页面效果。当前博客是 Astro 静态站，正式部署目标是 GitHub Pages 根路径：

```text
https://jocheng99.github.io/
```

本地检查建议优先使用“构建 + 预览”流程，因为它和线上发布产物最接近，并且会同时检查 Pagefind 搜索索引。

## 1. 进入项目目录

PowerShell 中进入项目根目录：

```powershell
cd 'E:\Work\8、Codex\Jocheng博客'
```

如果是第一次运行，先安装依赖：

```powershell
npm.cmd install
```

后续日常预览一般不需要重复安装依赖。

## 2. 推荐流程：构建搜索索引并预览

运行完整构建：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run build:search
```

成功后应看到类似结果：

```text
33 page(s) built
Indexed 33 pages
```

并且目录中应存在：

```text
dist/index.html
dist/404.html
dist/pagefind/
```

启动本地预览：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run preview
```

浏览器打开：

```text
http://127.0.0.1:4321/
```

## 3. 快速开发流程：只看页面改动

如果只是临时看布局和样式变化，可以用开发服务器：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run dev
```

默认打开：

```text
http://127.0.0.1:4321/
```

注意：`dev` 适合快速看页面，但不能完整验证 Pagefind 搜索索引。确认版本前仍要运行：

```powershell
npm.cmd run build:search
npm.cmd run preview
```

## 4. 当前重点检查页面

首页：

```text
http://127.0.0.1:4321/
```

检查点：

- 首屏是否显示“人工喂素材，AI 处理生成”的博客定位。
- “内容工作台”是否出现。
- 指标卡片是否显示文章数、系列数、AI 相关记录数、分类数。
- “喂素材 / AI 处理 / 人工确认 / 发布归档”四个按钮是否可以切换内容。
- “文章系列”区域是否出现系列入口。

AI 工作流文章：

```text
http://127.0.0.1:4321/blog/ai-research-workflow/
```

检查点：

- 页面底部是否出现“AI 生成博客工作流”系列导航。
- 当前文章是否显示为系列第 1 篇。
- 是否能跳转到下一篇“生成 AI 提示词助手”。

PPT 自动化文章：

```text
http://127.0.0.1:4321/blog/ppt-automation-drawing-workflow/
```

检查点：

- 页面底部是否出现“AI 生成博客工作流”系列导航。
- 是否显示为系列第 3 篇。
- 上一篇链接是否指向“生成 AI 提示词助手”。

博客搭建文章：

```text
http://127.0.0.1:4321/blog/rebuild-coolcheng-astro/
```

检查点：

- 页面底部是否出现“博客搭建记录”系列导航。
- 上一篇链接是否指向“为什么重新写这个博客”。

关于页：

```text
http://127.0.0.1:4321/about/
```

检查点：

- 博客介绍是否表达“人工喂素材，AI 处理生成”。
- 不应再显示旧的“个人简介占位”。

搜索页：

```text
http://127.0.0.1:4321/search/
```

检查点：

- 搜索框是否正常出现。
- 可以尝试搜索：

  ```text
  Codex
  PPT
  AI
  ```

- 如果提示搜索资源缺失，先停止预览，然后重新运行 `npm.cmd run build:search`。

游戏分类：

```text
http://127.0.0.1:4321/categories/game/
```

检查点：

- 页面不应 404。
- 应能看到游戏记录文章。

## 5. 停止本地预览

在运行 `npm.cmd run preview` 或 `npm.cmd run dev` 的终端中按：

```text
Ctrl+C
```

如果进程没有正常停止，检查端口：

```powershell
netstat -ano | Select-String ':4321'
```

找到最后一列 PID 后停止：

```powershell
Stop-Process -Id <PID> -Force
```

再次确认端口已释放：

```powershell
netstat -ano | Select-String ':4321'
```

没有输出通常表示端口已释放。

## 6. 常见问题

PowerShell 提示 `npm.ps1` 被拦截：

```powershell
npm.cmd run build:search
npm.cmd run preview
```

搜索页提示“搜索索引尚未生成”：

```powershell
npm.cmd run build:search
```

页面样式或内容像旧版本：

- 刷新浏览器。
- 必要时使用强制刷新：`Ctrl+F5`。
- 确认当前打开的是 `http://127.0.0.1:4321/`，不是线上地址。

端口 4321 被占用：

```powershell
netstat -ano | Select-String ':4321'
Stop-Process -Id <PID> -Force
```

## 7. 确认采用前的标准

确认一版可以进入固化和部署前，至少满足：

- `npm.cmd run build:search` 成功。
- 首页、文章页、关于页、搜索页可以打开。
- 首页工作台交互可用。
- 文章系列导航可用。
- 搜索页能加载 Pagefind UI。
- 预览结束后 4321 端口已释放。

确认后再进入项目规则流程：

```text
research/blog_platform/YYYY-MM-DD_HHMM_<feature>/
-> archive/YYYY-MM-DD_HHMM_<feature>_final/
-> git commit
-> git push
```
