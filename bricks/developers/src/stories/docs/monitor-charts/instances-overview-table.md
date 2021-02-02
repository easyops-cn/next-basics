[//]: # "business-bricks/monitor-charts/instances-overview-table.ts"

# INPUTS

| property       | type           | required | default | description                                                                                                                                                                  |
| -------------- | -------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showCard       | boolean        | -        | -       | 是否显示卡片                                                                                                                                                                 |
| query          | any            | -        | -       | CMDB 查询条件                                                                                                                                                                |
| page           | number         | -        | 1       | 显示的页数，默认第 1 页                                                                                                                                                      |
| pageSize       | number         | -        | 10      | 显示的条数，默认 10 条                                                                                                                                                       |
| fields         | string[]       | -        | -       | 字段列表                                                                                                                                                                     |
| metrics        | string[]       | -        | -       | 指标列表                                                                                                                                                                     |
| builtInMetrics | string[]       | -        | -       | 内置指标，例如："alertCount" 为告警数量                                                                                                                                      |
| columns        | CustomColumn[] | -        | -       | 扩展自 ant-design 的 Column 相关配置项,具体查阅：<a href="https://ant.design/components/table-cn/#Column" target="_blank">https://ant.design/components/table-cn/#Column</a> |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
