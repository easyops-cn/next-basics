[//]: # "business-bricks/cmdb-instances/instance-remove-relation.ts"

# INPUTS

| property       | type     | required | default | description                     |
| -------------- | -------- | -------- | ------- | ------------------------------- |
| objectId       | string   | ✔️       | -       | CMDB 模型 ID                    |
| instanceId     | string   | ✔️       | -       | 实例 ID                         |
| relationSideId | string   | ✔️       | -       | 关联实例 ID                     |
| selectedKeys   | string[] | -        | -       | 默认选中的实例                  |
| configProps    | object   | -        | -       | ant-design 的 Button 相关配置项 |

# EVENTS

| type                  | detail            | description      |
| --------------------- | ----------------- | ---------------- |
| update.single.success | result: 'success' | 删除关系成功事件 |
| update.single.failed  | result: 'failed'  | 删除关系失败事件 |
| update.single.cancel  | result: 'cancel'  | 删除关系取消事件 |
