[//]: # "business-bricks/cmdb-instances/instance-multi-delete.ts"

# 描述

该模态框通过 `onHandleVisible` 方法控制模态框打开和关闭， 一般通过事件机制让其他构件触发调用

# INPUTS

| property           | type                         | required | default                                                    | description            |
| ------------------ | ---------------------------- | -------- | ---------------------------------------------------------- | ---------------------- |
| objectId           | string                       | true     | -                                                          | 模型 ID                |
| selectedKeys       | string[]                     | true     | -                                                          | 需要删除的实例 ID      |
| detailUrlTemplates | Record&lt;string, string&gt; | false    | {"default":"/cmdb-instances/objectId/instance/instanceId"} | 删除失败的实例查看链接 |

# EVENTS

| type                  | detail     | description      |
| --------------------- | ---------- | ---------------- |
| delete.multi.success  | 'success'  | 批量删除实例成功 |
| delete.multi.canceled | 'canceled' | 批量删除实例取消 |

# METHODS

| name            | params  | description          |
| --------------- | ------- | -------------------- |
| onHandleVisible | boolean | 打开&#124;关闭弹出框 |
