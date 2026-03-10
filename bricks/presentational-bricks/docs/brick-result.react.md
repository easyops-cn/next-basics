---
tagName: presentational-bricks.brick-result
displayName: WrappedPresentationalBricksBrickResult
description: 结果页面，支持三种状态类型：基础结果状态（success/error/info/warning/404/403/500）、空结果状态（empty/no-data/search-empty 等）和自定义插画状态（illustrations），可配置主标题、次标题、自定义图标及插画
category:
source: "@next-bricks/presentational-bricks"
---

# WrappedPresentationalBricksBrickResult

> 结果页面，支持三种状态类型：基础结果状态（success/error/info/warning/404/403/500）、空结果状态（empty/no-data/search-empty 等）和自定义插画状态（illustrations），可配置主标题、次标题、自定义图标及插画

## 导入

```tsx
import { WrappedPresentationalBricksBrickResult } from "@easyops/wrapped-components";
```

## Props

| 属性                | 类型                                                            | 必填 | 默认值 | 说明                                                                                                                                                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------- | ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status              | `BrickResultStatus \| EmptyResultStatus \| IllustrationsStatus` | 是   | -      | 结果的状态，决定图标和颜色。支持三类值：BrickResultStatus（success/error/info/warning/404/403/500）显示 Ant Design 内置结果图标；EmptyResultStatus（empty/no-data/search-empty 等）显示空状态插画；设为 "illustrations" 时使用 illustrationsConfig 配置自定义插画。设置的值不符合任何类型时返回空元素 |
| customTitle         | `string`                                                        | -    | -      | 主标题文字                                                                                                                                                                                                                                                                                            |
| subTitle            | `string`                                                        | -    | -      | 次标题文字                                                                                                                                                                                                                                                                                            |
| icon                | `string`                                                        | -    | -      | [自定义图标](https://ant.design/components/icon-cn/), 仅当 status 为 `BrickResultStatus` 时有效                                                                                                                                                                                                       |
| illustrationsConfig | `IllustrationsConfig`                                           | -    | `{}`   | 自定义插画配置，仅当 status 为 "illustrations" 时生效。可通过 name 和 category 指定插画库图片，size 控制尺寸（默认 middle），imageStyle 覆盖样式（不推荐）                                                                                                                                            |
| useNewIllustration  | `any`                                                           | -    | `true` | 是否使用新版插画替换插画库 default 分类下的图标，需配合特性开关 support-new-illustrations 及应用配置 supportNewIllustrations 启用                                                                                                                                                                     |
| emptyResultSize     | `IconSize`                                                      | -    | -      | 空结果插画的尺寸，仅当 status 为 EmptyResultStatus 类型时生效，可选值：small/middle/large/xlarge/unset，默认 middle                                                                                                                                                                                   |

## Slots

| 名称    | 说明                                                                      |
| ------- | ------------------------------------------------------------------------- |
| content | 提供 content 插槽，用于在结果页面下方放置自定义内容（如操作按钮、链接等） |

## Examples

### Basic 基础用法

#### 成功结果状态

展示操作成功的结果页面。

```tsx
<WrappedPresentationalBricksBrickResult
  status="success"
  customTitle="操作执行成功"
  subTitle="任务已完成，请查看详情"
/>
```

#### 信息提示结果

展示普通信息的结果页面，包含主标题和次标题。

```tsx
<WrappedPresentationalBricksBrickResult
  status="info"
  customTitle="今天是星期二"
  subTitle="2019/10/29 21:35"
/>
```

#### 警告结果并自定义图标

展示警告状态的结果页面，并通过 icon 属性自定义图标。

```tsx
<WrappedPresentationalBricksBrickResult
  status="warning"
  customTitle="今日有雨"
  subTitle="明天天气会好转"
  icon="question"
/>
```

#### 404 结果并使用 content 插槽

展示 404 状态的结果页面，并在 content 插槽中放置自定义内容。

```tsx
<WrappedPresentationalBricksBrickResult status="404" customTitle="HTTP 404">
  <div slot="content" style={{ textAlign: "center" }}>
    页面未找到，请检查链接地址
  </div>
</WrappedPresentationalBricksBrickResult>
```

### Empty 空结果状态

#### 空数据状态

展示空数据的结果页面，使用 empty 状态。

```tsx
<WrappedPresentationalBricksBrickResult status="empty">
  <div slot="content" style={{ textAlign: "center" }}>
    请前往首页进行创建
  </div>
</WrappedPresentationalBricksBrickResult>
```

#### 搜索结果为空

展示搜索无结果的状态页面。

```tsx
<WrappedPresentationalBricksBrickResult status="search-empty">
  <div slot="content" style={{ textAlign: "center" }}>
    搜索为空
  </div>
</WrappedPresentationalBricksBrickResult>
```

#### 空结果自定义尺寸

通过 emptyResultSize 控制空结果插画的尺寸大小。

```tsx
<WrappedPresentationalBricksBrickResult
  status="no-data"
  customTitle="暂无数据"
  emptyResultSize="large"
/>
```

### Illustrations 自定义插画

#### 使用插画库自定义插画

status 设为 illustrations 时启用自定义插画模式，通过 illustrationsConfig 的 name 和 category 指定插画。

```tsx
<WrappedPresentationalBricksBrickResult
  status="illustrations"
  illustrationsConfig={{
    name: "search-empty",
    category: "default",
    imageStyle: { width: "250px" },
  }}
>
  <div slot="content" style={{ textAlign: "center" }}>
    搜索为空
  </div>
</WrappedPresentationalBricksBrickResult>
```

#### 自定义插画尺寸

通过 illustrationsConfig 的 size 属性控制插画尺寸。

```tsx
<WrappedPresentationalBricksBrickResult
  status="illustrations"
  customTitle="暂无内容"
  illustrationsConfig={{
    name: "no-content",
    category: "easyops2",
    size: "small",
  }}
/>
```

### Advanced 高级用法

#### 关闭新版插画

通过 useNewIllustration 设为 false 关闭新版插画替换。

```tsx
<WrappedPresentationalBricksBrickResult
  status="empty"
  customTitle="暂无数据"
  useNewIllustration={false}
/>
```
