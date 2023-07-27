[//]: # "business-bricks/cmdb-instances/instance-add-relation.ts"

# INPUTS

| property       | type     | required | default | description          |
| -------------- | -------- | -------- | ------- | -------------------- |
| objectId       | string   | true     | -       | CMDB 模型 ID         |
| instanceId     | string   | true     | -       | 实例 ID              |
| relationSideId | string   | true     | -       | 关系对端 ID          |
| selectedKeys   | string[] | false    | -       | 关联实例 ID 列表     |
| visible        | boolean  | true     | -       | 是否显示添加关系按钮 |

# EVENTS

| type                   | detail                               | description      |
| ---------------------- | ------------------------------------ | ---------------- |
| open.instanceListModal | objectId: string, presetConfigs: any | 打开模态框事件   |
| update.single.success  | result: 'success'                    | 添加关系成功事件 |
| update.single.failed   | result: 'failed'                     | 添加关系失败事件 |
