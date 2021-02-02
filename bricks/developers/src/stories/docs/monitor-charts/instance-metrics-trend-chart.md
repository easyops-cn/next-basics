[//]: # "business-bricks/monitor-charts/instance-metrics-trend-chart.ts"

<details>
<summary>History</summary>

| Version | Change              |
| ------- | ------------------- |
| 1.5.4   | 新属性 `extraWhere` |
| 1.7.0   | 新属性 `sql`        |

</details>

# INPUTS

| property             | type     | required | default          | description                                                                           |
| -------------------- | -------- | -------- | ---------------- | ------------------------------------------------------------------------------------- |
| objectId             | string   | ✔️       | -                | 模型 Id                                                                               |
| instanceId           | string   | ✔️       | -                | 实例 Id                                                                               |
| extraWhere           | string   | -        | -                | 额外的 where 条件                                                                     |
| sql                  | string   | -        | -                | 自定义 sql，详见下文说明                                                              |
| table                | string   | -        | -                | 指标表，不填则等于 objectId                                                           |
| db                   | string   | -        | easyops          | influxdb 的数据库                                                                     |
| metrics              | Metric[] | ✔️       | -                | 指标列表                                                                              |
| unit                 | string   | ✔️       | -                | 单位                                                                                  |
| groupByMetrics       | string[] | -        | \["time(auto)"\] | groupBy                                                                               |
| wrapperProperties    | object   | -        | -                | 外围 div 的属性，比如可设置样式之类的                                                 |
| trendChartProperties | object   | -        | -                | "趋势图"构件属性，点击 [查看](developers/brick-book/brick/general-charts.trend-chart) |
| showLegend           | boolean  | -        | true             | 是否显示图例                                                                          |
| title                | string   | -        | -                | 图表标题                                                                              |

### Metric

| property       | type    | required | default | description                                                                                                                 |
| -------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| name           | string  | ✔️       | -       | 指标名称                                                                                                                    |
| alias          | string  | -        | -       | 指标别名                                                                                                                    |
| unit           | string  | -        | -       | 指标单位，如果设置了单位会做自适应，点击查看支持[单位列表](http://docs.developers.easyops.cn/docs/brick-next/units)         |
| aggregation    | string  | -        | mean    | 聚合方式，跟[influxdb](https://docs.influxdata.com/influxdb/v1.7/query_language/functions/)一致：mean,max,min,first,last 等 |
| useAggregation | boolean | -        | true    | 是否使用 aggregate 或默认 aggregate                                                                                         |

#### unit 说明：

单位对于图表来说很重要，有了明确的单位才能知道这个图表的明确数值，也才能做自适应单位转换，让人更好读。该模板从如下优先级决定最终的单位：

1. 外层的 unit 配置
2. metrics 列表里面的第一个单位
3. trendChartProperties 里面定义的单位

#### useAggregation 说明：

`useAggregation`主要是用来处理多指标四则运算时候，不能单指标聚合场景：

如`name: mean("host.network.bytes_out")+mean("host.network.bytes_in")`
这时候`useAggregation: false`

#### extraWhere 说明：

`extraWhere`用来设置额外的 where 条件，如果有值，则会跟`objectId`和`instanceId`一起组合成`where`条件，如：

`extraWhere: "mountpoint='/home'"`

最终的 sql 则为：`where objectId = 'xxx' and instanceId = 'xxx' and mountpoint = '/home'`

#### 自定义 sql 说明：

在一些复杂的场景，需要手动写 sql，这时候将忽略`table、objectId、instanceId、groupByMetrics`字段。比如你可以写成：

```
select mean("host.network.bytes_out")+mean("host.network.bytes_in") from HOST.HOST where $timeFilter group by time(auto)

```

注意，如上示例，即使是自定义 sql，我们也支持一些内置变量，如 grafana 一样：

- \$timeFilter：将根据 from 和 to 转换成 time > xxx and time < xxx
- group by time(auto)：将自动根据查询的时间范围做精度的自适应

```
< 1day: time(1m)
< 3day: time(2m)
< 7day: time(5m)
< 30day: time(20m)
< 6month: time(1h)
< 12month: time(1d)
other: time(1d)
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
