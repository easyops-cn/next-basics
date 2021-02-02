[//]: # "atom-bricks/chart-v2/base-chart.ts"

<details>
<summary>History</summary>

| Version | Change                                                  |
| ------- | ------------------------------------------------------- |
| 1.0.0   | 新增构件 `chart-v2.base-chart`                          |
| 1.3.0   | 新增属性 `axis.xAxis.type`, `series.[field].isNegative` |
| 1.32.0  | 新增属性 `label`, 新增事件`chart-v2.plot.click`         |

</details>

这是对其他图表类型的封装。作为基本类，其子类有

- line-chart
- area-chart
- bar-chart
- horizontal-bar-chart
- pie-chart
- donut-chart

# INPUTS

| property    | type                      | required | default | description                                      |
| ----------- | ------------------------- | -------- | ------- | ------------------------------------------------ |
| data        | Record<string, any>[]     | ✔️       | -       | 图表数据                                         |
| width       | number                    | -        | -       | 宽度                                             |
| height      | number                    | -        | -       | 高度                                             |
| padding     | ViewPadding               | -        | -       | 画布 padding                                     |
| xField      | string                    | -        | -       | x 轴字段                                         |
| yField      | string                    | -        | -       | y 轴字段                                         |
| label       | Label                     | -        | -       | 配置图形文本                                     |
| rightYField | string                    | -        | -       | 右 y 轴字段                                      |
| groupField  | string                    | -        | -       | 分类字段                                         |
| axis        | Record<`field`, BaseAxis> | -        | -       | 坐标轴设置                                       |
| threshold   | Threshold                 | -        | -       | 阈值线，对折线图、面积图、柱状图，横向柱状图有效 |

### BaseAxis

| property   | type   | required | default | description                     |
| ---------- | ------ | -------- | ------- | ------------------------------- |
| min        | number | -        | -       | 坐标轴最小值                    |
| max        | number | -        | -       | 坐标轴最大值                    |
| unit       | string | -        | -       | 单位                            |
| labelField | string | -        | -       | 将会把该字段值以 label 形式展示 |

### Threshold

| property    | type              | required | default | description |
| ----------- | ----------------- | -------- | ------- | ----------- |
| value       | number            | ✔️       | -       | 阈值        |
| textContent | string            | ✔️       | -       | 阈值文本    |
| color       | string            | -        | -       | 阈值线颜色  |
| lineType    | "dash" \| "solid" | -        | "solid" | 默认实线    |

# EVENTS

| type           | detail                                          | description                                                              |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| chart-v2.click | { data: any, clientX: number, clientY: number } | data 代表该点数据, 是一个对象；clientX, clientY 为点击事件发生的屏幕位置 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
