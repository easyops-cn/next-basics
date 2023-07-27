[//]: # "business-bricks/monitor-alert/simple-alert-event-list.ts"

# INPUTS

| property          | type              | required | default | description                                                        |
| ----------------- | ----------------- | -------- | ------- | ------------------------------------------------------------------ |
| detailUrlTemplate | string            | ✔        | -       | 提供 objectId, instanceId, ruleId, alert_id 来组成告警事件跳转 url |
| st                | number            | ✔        | -       | 开始时间                                                           |
| et                | number            | ✔        | -       | 结束时间                                                           |
| ruleId            | string            | -        | -       | 告警策略 id                                                        |
| objectId          | string            | -        | -       | 模型 id                                                            |
| instanceId        | string            | -        | -       | 实例 id                                                            |
| theme             | 'light' \| 'dark' | -        | 'light' | 主题，默认浅色                                                     |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
