[//]: # "business-bricks/cmdb-instances/instance-multi-edit.ts"

# INPUTS

| property     | type     | required | default | description     |
| ------------ | -------- | -------- | ------- | --------------- |
| objectId     | string   | true     | -       | 模型 ID         |
| selectedKeys | string[] | true     | -       | 批量编辑实例 ID |
| isApprove    | boolean  | false    | -       | 是否批量审批    |

# EVENTS

| type                  | detail     | description      |
| --------------------- | ---------- | ---------------- |
| update.multi.success  | 'success'  | 批量编辑实例成功 |
| update.multi.canceled | 'canceled' | 批量编辑实例取消 |

# METHODS

| name            | params  | description          |
| --------------- | ------- | -------------------- |
| onHandleVisible | boolean | 打开&#124;关闭弹出框 |
