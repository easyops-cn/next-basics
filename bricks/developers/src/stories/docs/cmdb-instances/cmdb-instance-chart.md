[//]: # "business-bricks/cmdb-instances/instance-group-chart.ts"

<details>
<summary>History</summary>

| Version | Change                                                         |
| ------- | -------------------------------------------------------------- |
| 1.12.0  | 新增属性 `pieChartProps`、`trendChartProps` 和 `barChartProps` |

</details>

> Tips: 该模板与 [资源图形展示](developers/brick-book/template/cmdb-instances.resource-chart-viewer) 不同的地方在于内部封装了不同的接口，提供了基于分组统计不同字段数据的功能，可应对较为复杂的场景。

# Params

| property        | type                           | required | default | description                                                                                                                                                                              |
| --------------- | ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| objectId        | string                         | ✔️       | -       | 模型 id                                                                                                                                                                                  |
| query           | object                         | -️       | -       | 查询条件,与 [实例聚合接口](developers/providers/cmdb/instance-api-group-instance) 的 query 字段一致                                                                                      |
| type            | bar \| pie \| doughnut \| line | -        | bar     | 图表类型                                                                                                                                                                                 |
| title           | string                         | -        | -       | 图表标题                                                                                                                                                                                 |
| colorList       | string[]                       | -        | -       | 图表填充颜色列表                                                                                                                                                                         |
| showLegend      | boolean                        | -        | true    | 是否显示图例                                                                                                                                                                             |
| xAxisField      | string                         | ✔️       | -       | 读取该字段作为 X 轴数据, 并用该字段作为 `groupBy` 统计                                                                                                                                   |
| YAxisField      | YAxisFieldProps[]              | ✔️       | -       | 读取该字段作为 Y 轴数据, 可以有多个值, type 为 pie 或者 doughnut 的时候，只取第 1 个, 配置项同 [实例聚合接口](developers/providers/cmdb/instance-api-group-instance) 的 `funcs` 字段一致 |
| pieChartProps   | object                         | -        | -       | 当 type = pie \|doughnut 时， 传递 [pie-chart](developers/brick-book/brick/general-charts.pie-chart) 相关属性                                                                            |
| trendChartProps | object                         | -        | -       | 当 type = line 时，传递 [trend-chart](developers/brick-book/brick/general-charts.trend-chart) 相关属性                                                                                   |
| barChartProps   | object                         | -        | -       | 当 type = bar 时，传递 [bar-chart](developers/brick-book/brick/general-charts.bar-chart) 相关属性                                                                                        |
| configProps     | object                         | -️       | -       | 透传相关 Ecahrt 属性                                                                                                                                                                     |

```typescript
interface YAxisFieldProps {
  /** 对字段进行某种操作,min, max, sun, avg */
  op?: "max" | "avg" | "min" | "sum" | "count";
  /** 操作字段 */
  field?: string;
  /** 字段别名 */
  alias?: string;
}
```
