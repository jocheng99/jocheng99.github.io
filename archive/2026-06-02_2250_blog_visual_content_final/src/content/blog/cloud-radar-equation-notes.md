---
title: "云雷达常用方程速记"
description: "用几个简化方程测试 Markdown 公式渲染，并整理云雷达笔记里常见的距离、反射率因子和多普勒速度表达。"
pubDate: "2026-06-01"
updatedDate: "2026-06-02"
category: "技术"
tags:
  - 云雷达
  - 公式
  - Markdown
draft: false
cover: "/assets/blog/cloud-radar-equation-notes/cover.svg"
slug: "cloud-radar-equation-notes"
featured: false
series: "云雷达笔记"
seriesOrder: 1
---

这篇短文先作为公式与图片交互的测试页。后续真正整理云雷达笔记时，可以把推导、变量单位、数据处理步骤和图像解释继续补充进来。

## 距离门

脉冲雷达里，回波距离可以用往返传播时间估计：

$$
R = \frac{c \Delta t}{2}
$$

其中 $R$ 是目标距离，$c$ 是电磁波传播速度，$\Delta t$ 是发射到接收之间的时间差。系数 $2$ 来自信号往返传播。

## 反射率因子

云雷达产品里常见的反射率因子通常写成对数形式：

$$
Z_{\mathrm{dBZ}} = 10 \log_{10}\left(\frac{Z}{1\ \mathrm{mm}^{6}\ \mathrm{m}^{-3}}\right)
$$

这个表达适合在文章中检查下标、希腊字母、单位和对数函数的显示效果。

## 多普勒速度

当已知多普勒频移 $f_d$ 和雷达波长 $\lambda$ 时，径向速度的简化表达可以写成：

$$
v_r = \frac{\lambda f_d}{2}
$$

实际处理时还需要结合速度正负号约定、谱中心估计、折叠速度和噪底处理。这里暂时只用于测试 Markdown 公式渲染。

## 图片放大测试

下面这张图用于测试文章图片点击放大。实际云雷达文章可以替换为 PPI、RHI、时间高度图或谱图。

![云雷达公式测试图](/assets/blog/cloud-radar-equation-notes/cover.svg)
