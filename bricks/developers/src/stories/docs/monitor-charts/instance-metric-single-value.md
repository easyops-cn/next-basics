[//]: # "business-bricks/monitor-charts/instance-metric-single-value.ts"

<details>
<summary>History</summary>

| Version | Change                     |
| ------- | -------------------------- |
| 1.7.0   | 新属性 `extraWhere`和`sql` |

</details>

# INPUTS

| property                | type     | required | default | description                                                                                                                                              |
| ----------------------- | -------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| objectId                | string   | ✔️       | -       | 模型 ID                                                                                                                                                  |
| instanceId              | string   | ✔️       | -       | 实例 ID                                                                                                                                                  |
| extraWhere              | string   | -        | -       | 额外的 where 条件                                                                                                                                        |
| sql                     | string   | -        | -       | 自定义 sql，注意，在本构件中，需要将指标`as "value"`。详见下文说明                                                                                       |
| table                   | string   | -        | -       | 指标表，不填则等于`objectId`                                                                                                                             |
| metric                  | string   | ✔️       | -       | 指标名称，如果本身没有带聚合函数，将会组装成`last(xxx)`，如果带了聚合函数，则原始传入，如`last("host.network.bytes_out")+last("host.network.bytes_out")` |
| wrapperProperties       | object   | -        | -       | wrapper 元素属性                                                                                                                                         |
| statisticCardProperties | object   | -        | -       | "统计卡片"构件属性，点击[查看](developers/brick-book/brick/general-charts.statistic-card)                                                                |
| icon                    | MenuIcon | -        | -       | 显示的图标，点击可查看支持的[图标库](developers/icon)                                                                                                    |

#### extraWhere 说明：

`extraWhere`用来设置额外的 where 条件，如果有值，则会跟`objectId`和`instanceId`一起组合成`where`条件，如：

`extraWhere: "mountpoint='/home'"`

最终的 sql 则为：`where objectId = 'xxx' and instanceId = 'xxx' and mountpoint = '/home'`

#### 自定义 sql 说明：

在一些复杂的场景，需要手动写 sql，这时候将忽略`table、objectId、instanceId、groupByMetrics`字段。比如你可以写成：

```
select last("host.network.bytes_out")+last("host.network.bytes_in") as "value" from HOST.HOST where $timeFilter group by time(auto)

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
