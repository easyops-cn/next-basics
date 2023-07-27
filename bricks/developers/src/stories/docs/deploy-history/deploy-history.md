[//]: # "business-bricks/deploy/deploy-list.ts"

<details>
<summary>History</summary>

| Version | Change                           |
| ------- | -------------------------------- |
| 1.0.4   | 新增参数 `showCard`、`cardProps` |

</details>

# INPUTS

| property   | type                                                     | required | default | description                                                                                                    |
| ---------- | -------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| app_id     | string                                                   | -        | -       | 具体应用的部署信息，不填默认显示全部                                                                           |
| start_time | number \| now-1h \| now-1d \| now/d \| now-7d \| now-30d | -        | -       | 查询某个时间范围的起点                                                                                         |
| end_time   | number                                                   | -        | -       | 查询某个时间范围的终点，当起点是时间戳类型搭配用                                                               |
| query      | string                                                   | -        | `''`    | 根据关键字查询相关的部署信息                                                                                   |
| page_size  | number                                                   | -        | 10      | 配置部署列表每一页显示条目                                                                                     |
| page       | number                                                   | -        | 1       | 查询部署信息页数                                                                                               |
| linkUrl    | string                                                   | -        | -       | 配置部署列表第一列跳转路由，支持变量书写如`/developers/#{app_id}` 可根据每一项部署条目的信息替换变量为具体值。 |
| showCard   | boolean                                                  | -        | true    | 是否显示外层卡片                                                                                               |
| cardProps  | Record<string, any>                                      | -        | -       | 配置外层卡片相关属性 具体详情参考 [通用卡片构件](developers/brick-book/brick/basic-bricks.general-card)        |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
