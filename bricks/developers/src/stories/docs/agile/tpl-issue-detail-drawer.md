[//]: # "business-bricks/agile/tpl-issue-detail-drawer.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.5.2   | 新增构件 `agile.tpl-issue-detail-drawer` |

</details>

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# EVENTS

| type  | detail | description  |
| ----- | ------ | ------------ |
| open  | -      | 抽屉打开事件 |
| close | -      | 抽屉关闭事件 |

# METHODS

| name | params  | description                                                        |
| ---- | ------- | ------------------------------------------------------------------ |
| open | issueId | 打开 issue 详情抽屉，注意`issueId`是`name`字段，而不是`instanceId` |
