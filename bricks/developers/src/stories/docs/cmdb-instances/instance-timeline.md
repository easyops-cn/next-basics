[//]: # "business-bricks/cmdb-instances/instance-timeline.ts"

# INPUTS

| property     | type    | required | default | description    |
| ------------ | ------- | -------- | ------- | -------------- |
| objectId     | string  | true     | -       | 模型 ID        |
| instanceId   | string  | true     | -       | 实例 ID        |
| showFilter   | boolean | false    | false   | 是否显示过滤器 |
| showRollback | boolean | false    | false   | 是否显示回滚   |

# EVENTS

| type                    | detail     | description  |
| ----------------------- | ---------- | ------------ |
| read.multiple.clickItem | instanceId | 列表点击事件 |
