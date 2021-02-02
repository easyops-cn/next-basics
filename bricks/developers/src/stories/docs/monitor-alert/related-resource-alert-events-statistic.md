[//]: # "business-bricks/monitor-alert/related-resource-alert-events-statistic.ts"

# INPUTS

| property          | type     | required | default | description                                                                                                                                                       |
| ----------------- | -------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| st                | number   | ✔        | -       | 开始时间                                                                                                                                                          |
| et                | number   | ✔        | -       | 结束时间                                                                                                                                                          |
| objectId          | string   | ✔        | -       | 模型 ID                                                                                                                                                           |
| instanceId        | string   | ✔        | -       | 资源实例 ID                                                                                                                                                       |
| relationSideIds   | string[] | ✔        | -       | 与资源实例相关的关系别名                                                                                                                                          |
| disabledPopup     | boolean  | -        | false   | 是否禁用弹框展示精简版告警列表, 默认启用                                                                                                                          |
| detailUrlTemplate | string   | -        | -       | 当 `disabledPopup` 为 true 时（禁用时），可不提供，详情查看[精简版告警列表](developers/brick-book/template/monitor-alert.related-resource-alert-events-statistic) |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
