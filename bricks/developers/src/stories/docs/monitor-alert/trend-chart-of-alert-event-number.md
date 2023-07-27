[//]: # "business-bricks/monitor-alert/trend-chart-of-alert-event-number.ts"

# 描述

设置时间段以及时间颗粒度来获得某一资源实例的告警数量趋势图

# INPUTS

| params             | type             | required | default | description                              |
| ------------------ | ---------------- | -------- | ------- | ---------------------------------------- |
| st                 | number \| string | -        | ✔️      | 开始时间                                 |
| et                 | number \| string | -        | -       | 结束时间, 默认当前                       |
| aggregate_interval | string           | -        | '15m'   | 聚合时间颗粒度, /\d+[dhm]/, 默认 15 分钟 |
| objectId           | string           | -        | -       | 模型 id                                  |
| instanceId         | string           | -        | -       | 实例 id                                  |
| query              | any              | -        | -       | CMDB 查询条件                            |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
