# Workflow Autoplay Modified

时间：2026-06-01 12:13

## 修改目标

让首页 AI 控制台工作台不再只是静态状态灯，而是进入页面后自动播放“素材处理流程”。

## 本次修改

- 在首页流程面板增加渐变进度条。
- 默认进入页面后自动播放：
  - 喂素材
  - AI 处理
  - 人工确认
  - 发布归档
- 每个阶段停留 5 秒。
- 当前阶段状态灯增加轻微呼吸动画。
- 用户点击任意阶段后暂停自动播放。
- 20 秒无操作后自动恢复循环播放。
- 增加 `prefers-reduced-motion: reduce` 兼容，减少动画环境下静止显示。

## 修改文件

```text
src/pages/index.astro
src/styles/global.css
```

## 待验证

```text
npm.cmd run build:search
npm.cmd run preview
```

重点检查：

```text
/
```

- 页面源代码包含 `workflow-progress`。
- 页面源代码包含 `data-workflow-progress`。
- 首页流程按钮仍可手动点击。
- Pagefind 搜索资源仍能访问。
