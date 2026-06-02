# AI Console Style Modified

时间：2026-06-01 11:24

## 修改目标

在已有“AI 生成博客工作台”基础上，改一版 AI 控制台风格，增加状态灯、流程线、日志块和版本号，让首页更像一个正在运行的内容生成系统。

## 修改范围

- 增加站点版本号：`v2026.06.01-console`
- 页眉增加运行状态胶囊：`AI console`
- 页脚显示当前 console build 版本
- 首页首屏右侧改为控制台窗口：
  - 窗口状态灯
  - source / agent / review 状态块
  - 运行日志列表
- 内容工作台流程增加：
  - 状态灯
  - 横向流程线
  - 每个阶段的日志块
- 全站配色调整为 AI 控制台风格：
  - 深色网格背景
  - 绿色运行态
  - 青色处理态
  - 琥珀色人工确认态
  - 少量红色警示态

## 修改文件

```text
src/pages/index.astro
src/styles/global.css
src/components/Header.astro
src/components/Footer.astro
src/utils/paths.ts
```

## 待验证

```text
npm.cmd run build:search
```

本地预览重点检查：

```text
/
/blog/ppt-automation-drawing-workflow/
/search/
```
