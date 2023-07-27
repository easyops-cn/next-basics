[//]: # "business-bricks/cmdb-instances/instance-single-custom-delete-btn.ts"

# INPUTS

| property    | type                                                      | required | default | description          |
| ----------- | --------------------------------------------------------- | -------- | ------- | -------------------- |
| objectId    | string                                                    | ✔️       | -       | 模型 id              | - |
| instanceId  | string                                                    | ✔️       | -       | 实例 id              | - |
| redirectUrl | string                                                    | ✔️       | -       | 删除成功后跳转的 url | - |
| btnName     | string                                                    | false    | 删除    | 按钮名称             | - |
| type        | `default \| primary \| ghost \| dashed \| danger \| link` | -️       | danger  | 按钮样式类型         | - |
| style       | Object                                                    | false    | -       | 样式                 | - |
| msg         | string                                                    | ✔️       | -       | 自定义消息           | - |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
