---
tagName: presentational-bricks.datetime-selector
displayName: WrappedPresentationalBricksDatetimeSelector
description: 常用于时间的过滤，支持快速选择时间区间和自定义，例如图表或表格的时间过滤
category:
source: "@next-bricks/presentational-bricks"
---

# WrappedPresentationalBricksDatetimeSelector

> 常用于时间的过滤，支持快速选择时间区间和自定义，例如图表或表格的时间过滤

## 导入

```tsx
import { WrappedPresentationalBricksDatetimeSelector } from "@easyops/wrapped-components";
```

## Props

| 属性                  | 类型               | 必填 | 默认值                   | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ------------------ | ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                  | `string`           | 是   | -                        | 默认起始时间，支持任意时间范围,相关规则请按下列规则书写（"now-1h", "now-1d", "now/d", "now-7d", "now-30d") [正则表达式](https://github.com/easyops-cn/next-libs/blob/207fe7ee3ac010ab860c23cd062216c8ca612f0c/libs/datetime-components/src/processor/parseDatetimeRange.ts#L18) 注意当通过 \${query.from=now/d} 赋默认值给 form 属性时，由于 [placeholder 占位符语法](https://admin.easyops.local/next-docs/docs/brick-next/evaluate-placeholders) 不支持 `/` 的特殊字符解析，所以该值需要用字符串的形式来书写（如 demo 所示）。 |
| to                    | `string`           | -    | -                        | 默认结束时间, 相关规则请参照 from 属性                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| shouldUpdateUrlParams | `any`              | -    | `true`                   | 是否更新 url 参数并刷新页面                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type                  | `any`              | -    | `"default" as RangeType` | 时间选择器支持两种类型，一种是默认的，固定显示常用的几种时间范围，一种是自定义的，可根据需求定制特定时间范围                                                                                                                                                                                                                                                                                                                                                                                                                     |
| customTimeRange       | `RangeText[]`      | -    | -                        | 当 type 为 custom 时，配置定制的时间范围，目前暂支持如下时间点，当 type 为 default 时，该配置项无效                                                                                                                                                                                                                                                                                                                                                                                                                              |
| placement             | `TooltipPlacement` | -    | -                        | 弹出位置                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| resolution            | `ResolutionProps`  | -    | `"ms"`                   | 指定时间戳的单位，目前支持秒和毫秒，默认为毫秒，切换为秒时，url 和事件传出的时间戳都会调整成以秒为单位                                                                                                                                                                                                                                                                                                                                                                                                                           |
| size                  | `ButtonSize`       | -    | -                        | 打开选择器的按钮的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| selectNearDays        | `number`           | -    | -                        | 限制选择近 n 天                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| format                | `string`           | -    | -                        | 自定义日期显示格式，例如 "YYYY-MM-DD HH:mm:ss"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| rangeDays             | `number`           | -    | -                        | 限制选择范围天数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Events

| 事件                 | detail                                                                                                                                                                                                                    | 说明                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| onDatetimeSelected   | `\| { type: "dateRange"; value: "now/d" }     \| { type: "specifiedDate"; value: { from: number; to: number } }` — { type: "dateRange"; value: "now/d" } \| { type: "specifiedDate"; value: { from: number; to: number }} | [已废弃]选择时间                                                                                                                             |
| onDatetimeSelectedV2 | `{ from: number; to: number }` — { from: number; to: number }                                                                                                                                                             | 选择当前时间戳，与 `onDatetimeSelected` 不同的是会把时间统一转换成时间戳的形式输出                                                           |
| onDatetimeSelectedV3 | `{ from: number; to: number } \| { from: string }` — { from: number; to: number } \| { from: string }                                                                                                                     | 选择当前时间，与 `onDatetimeSelected` 不同的是虽然还是区分时间戳和时间段两种类型，但是调整了输出字段格式, 这样更利于某些监控场景的使用和编排 |

## Examples

### Basic - 默认时间范围选项

使用默认的时间范围选项，from 设置初始起始时间，选择后通过事件输出时间戳。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now/d"
  onDatetimeSelectedV2={(e: CustomEvent<{ from: number; to: number }>) => {
    console.log(e.detail);
  }}
  onDatetimeSelectedV3={(
    e: CustomEvent<{ from: number; to: number } | { from: string }>
  ) => {
    console.log(e.detail);
  }}
/>
```

### Basic - 自定义时间范围选项

设置 type 为 custom 并通过 customTimeRange 配置自定义时间范围列表，同时关闭 URL 参数更新。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  shouldUpdateUrlParams={false}
  from="now/d"
  type="custom"
  customTimeRange={[
    { range: "now-1h", text: "近1小时" },
    { range: "now-1d", text: "近24小时" },
    { range: "now/d", text: "今天" },
    { range: "now-7d", text: "近7天" },
    { range: "now-30d", text: "近30天" },
    { range: "now-1y", text: "近一年" },
  ]}
/>
```

### Styling - 设置按钮大小

通过 size 属性控制时间选择器触发按钮的大小。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now-7d"
  size="small"
  shouldUpdateUrlParams={false}
/>
```

### Styling - 设置弹出位置

通过 placement 属性控制时间选择器弹出面板的位置。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now-7d"
  placement="topLeft"
  shouldUpdateUrlParams={false}
/>
```

### Advanced - 指定时间戳单位为秒

设置 resolution 为 "s"，事件输出的时间戳和 URL 参数中的时间戳都将以秒为单位。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now-1d"
  resolution="s"
  shouldUpdateUrlParams={false}
  onDatetimeSelectedV2={(e: CustomEvent<{ from: number; to: number }>) => {
    console.log(e.detail);
  }}
/>
```

### Advanced - 自定义日期显示格式

通过 format 属性自定义日期的显示格式。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now-7d"
  format="YYYY-MM-DD HH:mm:ss"
  shouldUpdateUrlParams={false}
/>
```

### Advanced - 限制选择范围

通过 selectNearDays 限制只能选择近 N 天，通过 rangeDays 限制选择的时间跨度天数。

```tsx
<WrappedPresentationalBricksDatetimeSelector
  from="now-7d"
  selectNearDays={30}
  rangeDays={7}
  shouldUpdateUrlParams={false}
  onDatetimeSelectedV3={(
    e: CustomEvent<{ from: number; to: number } | { from: string }>
  ) => {
    console.log(e.detail);
  }}
/>
```
