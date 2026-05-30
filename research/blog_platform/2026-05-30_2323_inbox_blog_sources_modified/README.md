# Inbox Blog Sources Modified

时间：2026-05-30 23:23

## 修改目标

将 `reference_materials/inbox/` 中已处理的博客素材转化为站点文章，并把处理后的源材料移动到 `reference_materials/docs/blog_sources/` 下按文章分类保存，使 `inbox` 继续只承担未处理资料暂存区的作用。

## 本次处理

- 新增博客文章：`src/content/blog/ppt-automation-drawing-workflow.md`
- 新增公开配图目录：`public/assets/blog/ppt-automation-drawing-workflow/`
- 新增标签稳定 slug：`PPT 自动化 -> ppt-automation`
- 更新搜索页提示文案为当前 GitHub Pages 根路径说明
- 整理已处理来源材料到：`reference_materials/docs/blog_sources/`
- 移动旧站 zip 到：`reference_materials/code/coolcheng_legacy_static/coolcheng-master.zip`
- 补充参考资料目录说明：`reference_materials/docs/blog_sources/README.md`

## 待验证

- 运行 `npm.cmd run build:search`
- 抽查新文章页面、博客列表、标签页和 Pagefind 输出
