# 2026-06-01_1307 文章地图与搜索体验修改版

## 状态

本目录记录本地修改版，尚未固化、提交或部署。等待用户本地预览确认后，再按项目流程复制到 `archive/` 定稿目录。

## 修改范围

- 新增 `src/pages/map.astro`，提供文章地图、系列路线图、分类索引、常用标签和单篇记录入口。
- 更新顶部导航和页脚，增加文章地图入口。
- 升级 `src/pages/search.astro`，增加常用主题按钮、系列入口、分类入口和搜索框快捷聚焦逻辑。
- 更新 `src/components/SearchHint.astro`，把搜索页提示改成普通浏览辅助入口。
- 调整首页和关于页文案，弱化 AI 生成感，只保留简洁说明。
- 更新 `src/styles/global.css`，增加地图页、路线图和搜索工具区样式。

## 验证项

- 运行 `npm.cmd run build:search`。
- 检查 `/map/`、`/search/`、`/pagefind/pagefind-ui.js`。
- 本地预览首页、文章地图、搜索页和移动端布局。
