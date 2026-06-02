---
title: "JAV 番号识别与 provider 路由：把编号当作线索，而不是事实"
description: "从媒体库自动化的角度整理番号提取、类型分类、provider 路由和字段合并原则，重点是降低误匹配、误覆盖和不可复核的风险。"
pubDate: "2026-06-02"
updatedDate: "2026-06-02"
category: "技术"
tags:
  - 媒体库
  - 元数据
  - 自动化
  - 数据清洗
draft: false
cover: "/assets/blog/jav-number-provider-routing/server-racks.jpg"
slug: "jav-number-provider-routing"
featured: false
series: "媒体库整理与自动化"
seriesOrder: 1
---

这篇文章讨论的是一个很具体的工程问题：当本地媒体库里存在大量以番号命名的文件时，自动化工具应该怎样识别编号、选择元数据 provider，并且避免把搜索结果误当成事实。

这里的重点不是内容本身，也不是资源获取，而是媒体库整理中的数据治理。一个看起来很小的编号字段，背后可能对应作品品番、平台内容 ID、图片 CDN 线索、厂商官网路径、字幕或版本后缀。如果这些字段被混在一起，刮削结果就会出现错片、错封面、错厂商，甚至把低质量页面覆盖到主元数据里。

## 核心判断

番号只能先当作线索，不能直接当作最终事实。

一个比较稳的流程应该拆成两层。第一层是 `number extractor`，只负责从文件名、目录名或 NFO 里提取候选字符串。第二层是 `number classifier`，负责判断候选属于哪类编号，并决定后续 provider 路由。

这样拆分以后，系统不会因为某个正则命中就直接进入错误 provider，也不会把 DMM/FANZA 的 `content_id`、FC2 平台 ID、CCBU/IPPA 编号和作品品番互相覆盖。每一类编号都应保留来源、置信度和复核原因。

## 建议保留的字段

一个只有 `number_guess` 的设计太薄。后续入库、检索和人工复核至少应该保留这些字段：

| 字段 | 作用 |
|---|---|
| `raw_number` | 从文件名、目录名或 NFO 中原样提取的候选 |
| `canonical_number` | 入库和展示用的标准编号，例如 `MIDA-649` |
| `search_number` | provider 查询用编号，通常会去掉字幕、流出、修正版等后缀 |
| `number_family` | 编号类型，例如 `coded_jav`、`fc2_ppv`、`numeric_prefix` |
| `maker_hint` | 根据前缀推断出的厂商提示，只能低置信使用 |
| `suffix_flags` | 字幕、修正版、分集、版本等后缀标记 |
| `content_id_candidates_json` | DMM/FANZA CID 或图片 CDN 候选，不能覆盖主番号 |
| `provider_profile` | 推荐 provider 顺序 |
| `confidence` | 识别置信度 |
| `review_reason` | 冲突、不确定或需要人工复核的原因 |

这组字段的价值在于可追溯。即使后续元数据错了，也能回头看出错误来自文件名识别、provider 搜索、详情页校验，还是字段合并阶段。

## 常见编号类型

现有简单正则通常能识别 `MIDA-649`、`ABF-037`、`ADN-620` 这类“字母前缀 + 数字”的普通有码番号，但真实文件名会复杂很多。

| 类型 | 示例 | 处理原则 |
|---|---|---|
| 普通有码品番 | `MIDA-649`、`ADN-620`、`ABW-001` | 标准化成 `PREFIX-123`，走通用主元数据 provider，再进入详情页校验 |
| 官方紧凑品番 | `MIDA490`、`ADN620` | 和普通品番属于同一体系，展示可标准化，搜索可保留紧凑变体 |
| DMM/FANZA CID | `mida00649`、`118abw00001` | 只作为内容 ID 或图片线索，不能覆盖作品品番 |
| 数字前缀 | `200GANA-2998` | 单独归入 `numeric_prefix`，避免被普通字母前缀正则漏掉 |
| FC2 / FC2-PPV | `FC2-PPV-1234567` | 走 FC2 profile，不应先查普通番号站点 |
| 无码日期型 | `112619_001` | 只能先判断 family，具体站点必须由 provider 校验 |
| HEYZO / TokyoHot | `HEYZO-2998`、`n1234` | 走专用 provider，不并入通用厂商前缀表 |
| 纯数字组织号 | `010054` | 默认进入复核，不能直接当作单部作品品番 |
| 字幕或版本后缀 | `ABF-037-UC` | 搜索主番号，后缀写入 `suffix_flags` |

这里最容易犯的错，是把“格式像”当作“事实是”。例如纯数字可能只是组织编号，DMM CID 可能只是图片路线，字幕后缀也未必是官方品番的一部分。

## provider 路由要分层

provider 路由不应是一个固定列表从头查到尾，而应由 `number_family` 决定。

![网络线缆，适合作为 provider 路由分层的隐喻](/assets/blog/jav-number-provider-routing/network-cables.jpg)

对普通有码番号，可以先走 JavLibrary 镜像、AVMOO 这类主元数据源，再按前缀把官网作为补充来源，最后用 DMM/FANZA CID 或 AVWikiDB 之类补图片和简介线索。对 FC2、HEYZO、TokyoHot 或日期型无码编号，则应该直接进入专用 profile。

我更倾向于把 provider 分成四种角色：

| 角色 | 作用 | 合并规则 |
|---|---|---|
| 主元数据 | 番号、标题、演员、日期、厂牌、系列、标签 | 详情页编号严格匹配后才允许进入主字段 |
| 官方补充 | 官方标题、简介、发行信息、label | 可提高简介和发行信息置信度，但仍要校验品番 |
| 图片线索 | 封面、样图、DMM CID、CDN 路线 | 只生成候选，不反向覆盖主番号 |
| clue-only | 论坛、资源页、低质量页面 | 只保留为辅助证据，不进入主字段 |

搜索结果页不能直接算命中。必须进入详情页以后，把页面中的标准化番号和 `search_number` 做严格匹配。只要出现 `number_mismatch`，该 provider 的字段就不应参与主元数据合并。

## 厂商前缀只是 hint

厂商前缀表很有诱惑力，因为它看起来能直接把 `MIDA`、`ADN`、`SSIS`、`ABW` 这类前缀映射到厂商或 label。但这个映射不稳定：公开表可能冲突，历史 label 可能迁移，同一前缀也可能在不同资料中被误归类。

更稳的做法是把前缀写成 `maker_hint` 或 `provider_hint`。它可以影响搜索顺序，但不能直接写成最终厂商事实。真正可以提高置信度的，是详情页里的品番、maker、label、series、genre 和发布日期是否互相一致。

## 字段合并顺序

字段合并阶段需要比搜索阶段更保守。一个可用的规则是：

1. 先校验详情页番号是否匹配。
2. 再按 provider 角色决定字段能否进入主元数据。
3. 对标题、简介、标签、图片分别保存来源和语言。
4. 对冲突字段保留证据，不静默覆盖。
5. 对不确定项目生成人工复核原因。

![混乱线缆，适合作为错误合并和人工复核的隐喻](/assets/blog/jav-number-provider-routing/cable-chaos.jpg)

例如，中文简介可以作为中文来源保存，但不能冒充日文原文。论坛线索可以说明资源或字幕状态，但不应覆盖作品标题、厂商和演员字段。图片 CDN 命中可以生成封面候选，但不能证明主番号正确。

## 落地实现顺序

我会把这类能力先放在研究阶段，而不是直接接入正式媒体盘。比较安全的实现顺序是：

1. 只实现 `classify_number(text)`，用小样本单元测试覆盖常见 family。
2. 把识别输出从单个 `number_guess` 扩展为 `raw_number`、`canonical_number`、`search_number`、`number_family` 和 `provider_profile`。
3. 在 scrape queue 中按 `provider_profile` 调整 provider 顺序，但保持 dry-run 和详情页严格校验。
4. 最后再进入落盘预览，确认不会移动、删除、重命名或写入媒体文件。

这个顺序的关键是先验证分类和路由，不急着改真实库。媒体库整理最怕“看起来自动化成功”，但实际上把错误元数据批量写进去了。

## 复核清单

每一次自动匹配完成前，我希望系统至少回答这些问题：

- `canonical_number` 是从哪里来的？
- 当前 provider 是否进入了详情页，而不是停在搜索结果页？
- 页面里的标准化番号是否严格匹配？
- `content_id` 是否只是辅助 ID？
- 前缀映射是否只作为 hint 使用？
- 中文简介、官方简介、聚合站简介是否分别保存来源？
- 低质量线索是否被挡在主字段外？
- 这次操作是否仍然停留在 dry-run 和预览阶段？

如果这些问题没有答案，系统就不该把结果写入长期数据库，更不该修改真实媒体文件。

## 图片来源

本文配图均为公开可用的中性技术图片，不涉及具体媒体内容：

- 封面：Brett Sayles, Pexels, [Server Racks on Data Center](https://www.pexels.com/photo/server-racks-on-data-center-5408005/)
- 路由图：Brett Sayles, Pexels, [White and Blue Cables](https://www.pexels.com/photo/white-and-blue-cables-2881229/)
- 复核图：Paul Seling, Pexels, [Cables in a Server Rack](https://www.pexels.com/photo/black-and-red-corded-headphones-12266915/)

## 参考资料

- [Javinizer file matching 文档](https://javinizer.gitbook.io/docs/using-javinizer/file-matching)
- [Javinizer 文档首页](https://javinizer.gitbook.io/docs)
- [Suki Desu: JAV code structure](https://skdesu.com/en/jav-codes-list/)
- [GetAV: JAV prefix list](https://getav.net/en/codes)
- [CCBU/IPPA number explanation](https://ccbu-search.com/ccbu-ippa-number/)
