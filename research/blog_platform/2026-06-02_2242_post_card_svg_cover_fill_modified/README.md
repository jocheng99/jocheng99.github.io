# 2026-06-02 2242 Post Card SVG Cover Fill Modified

## 背景

文章页 SVG 封面已改为完整显示，但全部文章列表中的 SVG 封面在卡片区域使用纯 `contain` 时会留下明显空白；改成纯 `cover` 又会在窄屏下裁掉封面边缘文字。

## 修改

- 保留文章页 `.post-cover.is-illustration` 的 `object-fit: contain`，继续保证文章内封面完整显示。
- 列表卡片中的 SVG 封面前景继续使用 `object-fit: contain`，保证主体不被裁切。
- 给 SVG 列表封面写入 `--post-card-cover-image`，用同一张封面作为居中铺满背景延展，减少硬空白。
- 背景延展层增加暗色遮罩，避免和前景封面主体重复抢眼。
- 增加 `object-position: center`，让前景图和背景延展都保持居中。

## 验证

- `npm.cmd run build:search` 通过，Astro 构建 43 页，Pagefind 索引 43 页。
- 本地 `/blog/` 页面桌面宽度 1280px 检查通过。
- 本地 `/blog/` 页面移动端宽度 390px 检查通过。
- SVG 列表封面计算样式为 `object-fit: contain`，并确认背景延展层包含对应封面图。
- 临时截图保存在 `tmp/blog/render_check/2026-06-02_2242_post_card_svg_cover_fill/`。

## 状态

本版本为本地修改验证版，尚未固化、提交或部署。
