[//]: # "business-bricks/cmdb-instances/resource-chart-viewer.ts"

<details>
<summary>History</summary>

| Version | Change                                                         |
| ------- | -------------------------------------------------------------- |
| 1.11.2  | `pageSize` replaces `page_size`                                |
| 1.12.0  | Added the properties `pieChartProps`, `trendChartProps` and `barChartProps` |

</details>

This template is a wrapper around the instance search API. If you want stronger grouping capabilities based on the data, it is recommended to use the [cmdb-instances.group-chart](developers/brick-book/template/cmdb-instances.group-chart) brick.

# Params

| property             | type                           | required | default         | description                                                                                                         |
| -------------------- | ------------------------------ | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| objectId             | string                         | ✔️       | -               | Model id                                                                                                            |
| fields               | Record<string, true>           | -️       | -               | The fields to be fetched, in the form of {instance: true, name: true}                                               |
| page                 | number                         | -️       | 1               | Query page number of the search API                                                                                 |  |
| pageSize             | number                         | -️       | 20              | Query page size of the search API                                                                                   |  |
| <del>page_size</del> | number                         | -️       | 20              | Query page size of the search API                                                                                   |  |
| sort                 | {string: 1 \| -1}              | -️       | {instanceId: 1} | Sort configuration of the returned data. Currently only sorting by a single property is supported, e.g. {instance: 1}; 1 means ascending and -1 means descending |  |
| query                | object                         | -        | -               | Same as the query of the search API                                                                                 |
| type                 | bar \| pie \| doughnut \| line | -        | bar             | Chart type                                                                                                          |
| showLegend           | boolean                        | -        | true            | Whether to show the legend                                                                                          |
| xAxisField           | string                         | ✔️       | -               | Which field to read as the X axis data                                                                              |
| YAxisField           | string[]                       | ✔️       | -               | Which field(s) to read as the Y axis data. Multiple values are allowed; when type is pie or doughnut, only the first one is used |
| pieChartProps        | object                         | -        | -               | When type = pie \|doughnut, pass the related properties of [pie-chart](developers/brick-book/brick/general-charts.pie-chart) |
| trendChartProps      | object                         | -        | -               | When type = line, pass the related properties of [trend-chart][trend-chart](developers/brick-book/brick/general-charts.trend-chart) |
| barChartProps        | object                         | -        | -               | When type = line, pass the related properties of [bar-chart](developers/brick-book/brick/general-charts.bar-chart)   |
| configProps          | object                         | -️       | -               | Pass through the related ECharts properties                                                                         |
