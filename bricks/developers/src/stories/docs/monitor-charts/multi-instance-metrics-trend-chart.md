[//]: # "business-bricks/monitor-charts/multi-instance-metrics-trend-chart.ts"

<details>
<summary>History</summary>

| Version | Change              |
| ------- | ------------------- |
| 1.7.0   | 新属性 `extraWhere` |
| 1.7.2   | 新属性 `emptyText`  |
| 1.7.3   | 新属性 `translate`  |

</details>

注意：与[单实例的多指标趋势图](developers/brick-book/template/monitor-charts.instance-metrics-trend-chart)相比，这个模板实现了动态的指标列表，因为直接在 storyboard，无法通过"单实例的多指标趋势图"来配置，达到一个指标一个卡片的目标

# INPUTS

| property       | type               | required | default          | description                                                                                                                            |
| -------------- | ------------------ | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| objectId       | string             | ✔️       | -                | 模型 Id                                                                                                                                |
| instanceId     | string \| string[] | -        | -                | 实例 Id 或 实例 Id 列表                                                                                                                |
| query          | any                | -        | -                | CMDB 查询条件                                                                                                                          |
| extraWhere     | string             | -        | -                | 额外的 where 条件                                                                                                                      |
| metrics        | Metric[] \| Metric | ✔️       | -                | 指标列表                                                                                                                               |
| db             | string             | -        | easyops          | influxdb 的数据库                                                                                                                      |
| groupByMetrics | string[]           | -        | \["time(auto)"\] | groupBy                                                                                                                                |
| from           | string             | -        | now-1h           | 开始时间，`now-1d`，`now/d`，`now-1h`格式，一般从[时间选择器](developers/brick-book/brick/presentational-bricks.datetime-selector)获得 |
| to             | string             | -        | -                | 结束时间，格式同`from`，如果为空，则为当前时间                                                                                         |
| showLegend     | boolean            | -        | true             | 是否显示图例                                                                                                                           |
| emptyText      | string             | -        | false            | 如果 metrics 为空，将显示无数据提示，可设置跳转链接（支持 html）                                                                       |
| translate      | boolean            | -        | false            | 如果设置了`group by instanceId`，是否将 instanceId 翻译成名称                                                                          |
| columns        | number             | -        | -                | 列数                                                                                                                                   |

### Metric

| property       | type    | required | default | description                                                                                                                 |
| -------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| name           | string  | ✔️       | -       | 指标名称                                                                                                                    |
| alias          | string  | -        | -       | 指标别名，如果不填则等于 name。另外，这个也作为 card 的 title                                                               |
| aggregation    | string  | -        | mean    | 聚合方式，跟[influxdb](https://docs.influxdata.com/influxdb/v1.7/query_language/functions/)一致：mean,max,min,first,last 等 |
| unit           | string  | -        | -       | 单位，如果设置了单位会做自适应，点击查看支持[单位列表](http://docs.developers.easyops.cn/docs/brick-next/units)             |
| useAggregation | boolean | -        | true    | 是否使用 aggregate 或默认 aggregate                                                                                         |

#### useAggregation 说明：

`useAggregation`主要是用来处理多指标四则运算时候，不能单指标聚合场景：

如`name: mean("host.network.bytes_out")+mean("host.network.bytes_in")`
这时候`useAggregation: false`

#### extraWhere 说明：

`extraWhere`用来设置额外的 where 条件，如果有值，则会跟`objectId`和`instanceId`一起组合成`where`条件，如：

`extraWhere: "mountpoint='/home'"`

最终的 sql 则为：`where objectId = 'xxx' and instanceId = 'xxx' and mountpoint = '/home'`

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
