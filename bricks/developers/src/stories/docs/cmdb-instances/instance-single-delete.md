[//]: # "business-bricks/cmdb-instances/instance-single-delete.ts"

# INPUTS

| property   | type   | required | default | description |
| ---------- | ------ | -------- | ------- | ----------- |
| objectId   | string | true     | -       | 模型 ID     |
| instanceId | string | true     | -       | 实例 ID     |

# EVENTS

| type                   | detail     | description    |
| ---------------------- | ---------- | -------------- |
| delete.single.success  | 'success'  | 单实例删除成功 |
| delete.single.canceled | 'canceled' | 单实例删除取消 |
| delete.single.failed   | 'error'    | 单实例删除失败 |
