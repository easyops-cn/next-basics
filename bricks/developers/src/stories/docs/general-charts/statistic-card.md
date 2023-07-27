[//]: # "atom-bricks/chart/statistic-card.ts"

<details>
<summary>History</summary>

| Version | Change                                                                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.16.0  | 新增属性 `multiData`、`multiConfig`，删除属性 `noBoxShadow` ，设置了 multiConfig 并且其数据长度不为 0 时启用多卡片模式，旧的多卡片使用方式（1.14.0）弃用 |
| 1.14.0  | 新增属性 `iconPosition`、`noBoxShadow`、`mode`和`sideLineColor`，通过与快捷入口 `presentational-bricks.brick-quick-entries` 搭配使用支持多卡片模式       |

</details>

# INPUTS

| property               | type                                                         | required | default   | description                                      |
| ---------------------- | ------------------------------------------------------------ | -------- | --------- | ------------------------------------------------ |
| showCard               | boolean                                                      | -        | true      | 是否展示卡片背景                                 |
| value                  | number                                                       | ✔        | -         | 统计值                                           |
| format                 | Format                                                       | -        | -         | 数据的转换格式                                   |
| valueStyle             | StatisticCardValueStyle                                      | -        | -         | 值样式                                           |
| title                  | string                                                       | -        | -         | 标题                                             |
| icon                   | StatisticCardIcon extends ( AntdIcon & FaIcon & EasyopsIcon) | -        | -         | 图标                                             |
| url                    | string                                                       | -        | -         | 卡片跳转的 URL                                   |
| tip                    | string                                                       | false    | -         | 卡片 tooltip 提示                                |
| disabled               | boolean                                                      | false    | -         | 卡片的禁用状态                                   |
| <del>fields</del>      | Fields                                                       | -        | -         | Deprecated。属性值映射                           |
| <del>dataSource</del>  | object                                                       | -        | -         | Deprecated。数据                                 |
| <del>urlTemplate</del> | string                                                       | -        | -         | Deprecated。卡片跳转 url，支持模版变量           |
| rules                  | { condition: ConditionType; color: string; }                 | -        | -         | 条件展示规则                                     |
| iconPosition           | "left" \| "right"                                            | -        | "right"   | 图标显示位置                                     |
| <del>noBoxShadow</del> | boolean                                                      | -        | false     | 是否不显示阴影,通常在构建多卡片时使用            |
| mode                   | "sideLine" \| "default"                                      | -        | "default" | 卡片切换成 sideLine 模式，通常在构建多卡片时使用 |
| sideLineColor          | sring                                                        | -        | -         | 设置 sideLine 颜色                               |
| multiData              | number[]                                                     | -        | -         | 多卡片数据源                                     |
| multiConfig            | MultiCardConfig[]                                            | -        | -         | 多卡片配置                                       |

### <del>Fields</del>

<details>
<summary>展开</summary>

| property | type   | required | default | description                    |
| -------- | ------ | -------- | ------- | ------------------------------ |
| value    | string | -        | -       | value 属性映射，支持 path 指定 |

</details>

### Format

| property  | type   | required | default | description                                                      |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------- |
| type      | string | -        | short   | 类型。默认为“short”，会将数值四舍五入自动转换为 K、M、B、T 等    |
| unit      | string | -        | -       | 单位。如果设置了内置单位会将数值进行自动转换，非内置单位直接显示 |
| precision | number | -        | -       | 精度                                                             |

点击查看支持的[内置类型及单位列表](http://docs.developers.easyops.cn/docs/brick-next/units)

### StatisticCardValueStyle

| property | type   | required | default | description |
| -------- | ------ | -------- | ------- | ----------- |
| color    | string | -        | -       | 颜色        |
| fontSize | string | -        | -       | 字体大小    |

### StatisticCardIcon

| property   | type   | required | default | description |
| ---------- | ------ | -------- | ------- | ----------- |
| color      | string | -        | -       | 颜色        |
| size       | number | -        | -       | 大小        |
| background | string | -        | -       | 背景        |

### MultiCardConfig

| property      | type                                                         | required | default | description        |
| ------------- | ------------------------------------------------------------ | -------- | ------- | ------------------ |
| value         | number                                                       | -        | -       | 统计值             |
| format        | Format                                                       | -        | -       | 数据的转换格式     |
| valueStyle    | StatisticCardValueStyle                                      | -        | -       | 值样式             |
| title         | string                                                       | -        | -       | 标题               |
| icon          | StatisticCardIcon extends ( AntdIcon & FaIcon & EasyopsIcon) | -        | -       | 图标               |
| url           | string                                                       | -        | -       | 卡片跳转的 URL     |
| tip           | string                                                       | false    | -       | 卡片 tooltip 提示  |
| disabled      | boolean                                                      | false    | -       | 卡片的禁用状态     |
| rules         | { condition: ConditionType; color: string; }                 | -        | -       | 条件展示规则       |
| iconPosition  | "left" \| "right"                                            | -        | "right" | 图标显示位置       |
| sideLineColor | sring                                                        | -        | -       | 设置 sideLine 颜色 |

说明：多卡片模式下，优先使用 multiConfig 配置的属性，若 multiConfig 没有配置某个属性，则使用 INPUTS 下的同名属性，多卡片模式下 INPUTS 的 value 属性不可用，改用 multiData 作为数据源，若 multiConfig 配置了 value 属性，则使用 multiConfig 的 value 属性

```typescript
type DataSourceType = boolean | number | string | Record<string, any>;

enum ConditionOperator {
  eq = "$eq",
  ne = "$ne",
  gt = "$gt",
  gte = "$gte",
  lt = "$lt",
  lte = "$lte",
}

enum LogicalOperator {
  and = "$and",
  or = "$or",
}

type ConditionType =
  | boolean
  | number
  | string
  | Record<string | ConditionOperator, any>
  | LogicalCondition;

interface LogicalCondition
  extends Record<string | LogicalOperator, ConditionType[]> {}
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
