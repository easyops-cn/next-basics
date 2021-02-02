[//]: # "business-bricks/cmdb-instances/resource-chart-viewer.ts"

<details>
<summary>History</summary>

| Version | Change                                                         |
| ------- | -------------------------------------------------------------- |
| 1.11.2  | `pageSize` 代替 `page_size`                                    |
| 1.12.0  | 新增属性 `pieChartProps`、`trendChartProps` 和 `barChartProps` |

</details>

本模板是基于实例搜索接口的封装，如果想基于数据提供更强的分组功能，推荐使用 [cmdb-instances.group-chart](developers/brick-book/template/cmdb-instances.group-chart) 构件。

# Params

| property             | type                           | required | default         | description                                                                                                         |
| -------------------- | ------------------------------ | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| objectId             | string                         | ✔️       | -               | 模型 id                                                                                                             |
| fields               | Record<string, true>           | -️       | -               | 需要拉取的字段 fields，形如 {instance: true, name: true}                                                            |
| page                 | number                         | -️       | 1               | search 接口的查询页数                                                                                               |  |
| pageSize             | number                         | -️       | 20              | search 接口的查询每页个数                                                                                           |  |
| <del>page_size</del> | number                         | -️       | 20              | search 接口的查询每页个数                                                                                           |  |
| sort                 | {string: 1 \| -1}              | -️       | {instanceId: 1} | 数据返回的排序配置，目前只支持单个属性的排序如{instance: 1}，1 表示升序， -1 表示降序                               |  |
| query                | object                         | -        | -               | 跟 search 接口的查询相同                                                                                            |
| type                 | bar \| pie \| doughnut \| line | -        | bar             | 图表类型                                                                                                            |
| showLegend           | boolean                        | -        | true            | 是否显示图例                                                                                                        |
| xAxisField           | string                         | ✔️       | -               | 读取哪个字段作为 X 轴数据                                                                                           |
| YAxisField           | string[]                       | ✔️       | -               | 读取哪个字段作为 Y 轴数据, 可以有多个值, type 为 pie 或者 doughnut 的时候，只取第 1 个                              |
| pieChartProps        | object                         | -        | -               | 当 type = pie \|doughnut 时， 传递 [pie-chart](developers/brick-book/brick/general-charts.pie-chart) 相关属性       |
| trendChartProps      | object                         | -        | -               | 当 type = line 时，传递 [trend-chart][trend-chart](developers/brick-book/brick/general-charts.trend-chart) 相关属性 |
| barChartProps        | object                         | -        | -               | 当 type = line 时，传递 [bar-chart](developers/brick-book/brick/general-charts.bar-chart) 相关属性                  |
| configProps          | object                         | -️       | -               | 透传相关 Ecahrt 属性                                                                                                |
