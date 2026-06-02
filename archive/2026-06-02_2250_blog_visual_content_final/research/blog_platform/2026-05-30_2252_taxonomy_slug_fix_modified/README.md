# 2026-05-30_2252_taxonomy_slug_fix 修改版

本目录保存“分类/标签 URL slug 修复”的修改版备份，尚未定稿、尚未提交、尚未部署。

问题原因：

- 原先 `src/utils/taxonomy.ts` 使用 `encodeURIComponent` 直接把中文分类/标签转成 URL。
- 构建输出中会生成 `%E6%B8%B8%E6%88%8F` 这类百分号目录。
- GitHub Pages 等静态托管在解析 URL 时可能发生解码，导致页面请求和实际目录不一致，出现 404。

修改策略：

- 将常用中文分类和标签映射为稳定英文 slug。
- 示例：`游戏 -> game`，`技术 -> tech`，`随笔 -> essay`。
- 页面显示仍保留中文，只改变 URL 路径。

验证：

- `npm.cmd run build:search` 成功。
- 构建输出包含 `dist/categories/game/index.html`。
- 首页“查看游戏记录”链接指向 `/categories/game/`。
- 本地预览 `/categories/game/` 正常显示“分类：游戏”和游戏文章，不再 404。

下一步：

- 用户确认后，再复制到 `archive/YYYY-MM-DD_HHMM_taxonomy_slug_fix_code/` 定稿。
- 定稿后再提交并推送，触发 GitHub Pages 部署。
