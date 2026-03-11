---
tagName: presentational-bricks.cost-time
displayName: WrappedPresentationalBricksCostTime
description: 耗时展示构件，将毫秒级时间自动转换为人类可读的时间文本（如"15秒"、"1天"），支持直接传入耗时或通过起止时间自动计算
category:
source: "@next-bricks/presentational-bricks"
---

# presentational-bricks.cost-time

> 耗时展示构件，将毫秒级时间自动转换为人类可读的时间文本（如"15 秒"、"1 天"），支持直接传入耗时或通过起止时间自动计算

## Props

| 属性       | 类型                                                                     | 必填 | 默认值 | 说明                                                                         |
| ---------- | ------------------------------------------------------------------------ | ---- | ------ | ---------------------------------------------------------------------------- |
| cost       | `number`                                                                 | -    | -      | 消耗时间（毫秒级）                                                           |
| startTime  | `string \| number`                                                       | -    | -      | 起始时间，与 endTime 配合使用，当未传入 cost 时自动计算耗时                  |
| endTime    | `string \| number`                                                       | -    | -      | 结束时间，与 startTime 配合使用，当未传入 cost 时自动计算耗时                |
| unitStyle  | `React.CSSProperties`                                                    | -    | -      | 时间单位文本的自定义样式，设置后将使用自定义渲染逻辑而非默认的 costTime 函数 |
| dataSource | `any`                                                                    | -    | -      | [已废弃]数据源                                                               |
| fields     | `{     cost?: string;     startTime?: string;     endTime?: string;   }` | -    | -      | [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段                 |

## Examples

### Basic

直接传入毫秒级耗时，自动转换为可读文本

```yaml
brick: presentational-bricks.cost-time
properties:
  cost: 123456
```

### 通过起止时间计算耗时

传入起始时间和结束时间，构件自动计算并展示耗时

```yaml
brick: presentational-bricks.cost-time
properties:
  startTime: 1593603641000
  endTime: 1593603798000
```

### Styling

自定义时间单位文本的样式

```yaml
brick: presentational-bricks.cost-time
properties:
  cost: 7265000
  unitStyle:
    color: "#999"
    fontSize: "12px"
```
