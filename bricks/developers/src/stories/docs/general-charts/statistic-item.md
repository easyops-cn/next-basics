[//]: # "atom-bricks/chart/statistic-item.ts"

<details>
<summary>History</summary>

| Version | Change                                       |
| ------- | -------------------------------------------- |
| 1.4.0   | 新增构件 `general-charts.statistic-item`     |
| 1.4.1   | 颜色选择标准化                               |
| 1.6.0   | 新增 fontSize 属性                           |
| 1.7.0   | 新增 text 属性                               |
| 1.11.0  | 新增 itemTitle, fontSizeConfigs 和 unit 属性 |

</details>

# INPUTS

| property        | type              | required | default  | description                               |
| --------------- | ----------------- | -------- | -------- | ----------------------------------------- |
| itemTitle       | `string`          | -        | -        | 标题                                      |
| ~~title~~       | ~~`string`~~      | -        | -        | ~~标题~~（已废弃，请使用 itemTitle 替代） |
| value           | `string`          | -        | -        | 值,用于计算颜色                           |
| description     | `string`          | -        | -        | 描述                                      |
| colorMap        | `ColorObj[]`      | -        | -        | 颜色范围                                  |
| showCard        | `boolean`         | -        | -        | 是否展示卡片                              |
| fontSize        | `string`          | -        | `"10px"` | 基础字体大小，基于此计算各部分大小        |
| text            | `string`          | -        | -        | 值的展示内容                              |
| fontSizeConfigs | `FontSizeConfigs` | -        | -        | 字体大小配置                              |
| unit            | `string`          | -        | -        | 单位                                      |

# ColorObj

| property | type               | required | default | description                                         |
| -------- | ------------------ | -------- | ------- | --------------------------------------------------- |
| progress | `number \| string` | -        | -       | 进度范围最大值，值（value）小于等于最大值则为该颜色 |
| color    | `Color`            | `false`  | -       | 颜色                                                |

# FontSizeConfigs

| property | type     | required | default | description    |
| -------- | -------- | -------- | ------- | -------------- |
| title    | `string` | -        | -       | 标题的字体大小 |
| value    | `string` | -        | -       | 值的字体大小   |
| unit     | `string` | -        | -       | 单位的字体大小 |
| desc     | `string` | -        | -       | 描述的字体大小 |

```typescript
export enum Color {
  green = "green",
  red = "red",
  blue = "blue",
  orange = "orange",
  cyan = "cyan",
  purple = "purple",
  geekblue = "geekblue",
  gray = "gray",
}
```

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
