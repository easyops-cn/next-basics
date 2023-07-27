# INPUTS

| property  | type              | required | default | description        |
| --------- | ----------------- | -------- | ------- | ------------------ |
| execId    | string            | ✔️       | -       | 执行工具任务 id    |
| component | { brick: string } | -        | -       | 等待图标下的构件名 |

# EVENTS

| type                | detail                                                          | description |
| ------------------- | --------------------------------------------------------------- | ----------- |
| tool.execution.done | 任务 id 结束后所发出的事件名，承载数据为 { detail: \${execId} } | -           |
