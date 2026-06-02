# 2026-06-02 2250 Blog Visual Content Final

## 状态

本目录是用户确认采用后的博客最终快照，用于追溯当前线上发布版本对应的项目源码和资料状态。

## 主要内容

- 文章页右侧作者卡片、GitHub/邮箱/Bilibili 图标链接、站点信息和文章目录。
- 文章目录当前小节高亮、阅读进度条、返回顶部按钮、图片灯箱。
- Markdown 公式渲染支持和云雷达方程测试文章。
- 文章封面与默认封面支持。
- 文章底部上一篇/下一篇，以及系列导航位置调整到文章封面下方。
- 新增和整理的博客文章、封面图和公开图片资源。
- 全部文章列表中的 SVG 封面改为完整前景加背景延展，减少空白并避免主体裁切。

## 快照范围

已复制：

- `.github/`
- `config/`
- `docs/`
- `public/`
- `reference_materials/docs/blog_sources/`
- `research/blog_platform/`
- `skills/`
- `src/`
- `AGENTS.md`
- `START_HERE.md`
- `PROJECT_STRUCTURE.md`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `.gitignore`

未复制：

- `dist/`，由构建命令重新生成。
- `node_modules/`，由 `npm install` 重新生成。
- `tmp/`，仅保存临时预览和截图缓存。
- `.git/`，不属于归档源码快照。

## 验证命令

```powershell
npm.cmd run build:search
```

发布目标：

```text
https://jocheng99.github.io/
```

GitHub Pages 由 `master` 分支推送后触发 GitHub Actions 构建发布。
