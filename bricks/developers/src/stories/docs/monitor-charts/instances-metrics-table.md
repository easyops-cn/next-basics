[//]: # "business-bricks/monitor-charts/instances-metrics-table.ts"

# INPUTS

| property             | type                   | required | default | description                                                                               |
| -------------------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| objectId             | string                 | ✔️       | -       | 模型 ID                                                                                   |
| query                | any                    | -        | -       | CMDB 查询条件                                                                             |
| fields               | Record<string,boolean> | -        | -       | 指定 CMDB 的返回字段                                                                      |
| table                | string                 | -        | -       | 指标表，不填则等于`objectId`                                                              |
| metrics              | string[]               | ✔️       | -       | 指标列表，将会组装成`last(xxx),last(yyy),`                                                |
| groupByMetrics       | string[]               | -        | -       | groupBy 指标列表                                                                          |
| wrapperProperties    | object                 | -        | -       | wrapper 元素属性                                                                          |
| brickTableProperties | object                 | ✔️       | -       | "表格"构件属性，点击[查看](developers/brick-book/brick/presentational-bricks.brick-table) |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
