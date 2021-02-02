[//]: # "business-bricks/cmdb-instances/instance-multi-create.ts"

# INPUTS

| property      | type                                                                               | required | default | description        |
| ------------- | ---------------------------------------------------------------------------------- | -------- | ------- | ------------------ |
| objectId      | string                                                                             | true     | -       | 模型 ID            |
| onCreated     | (params: {data: InstanceApi.ImportInstanceResponseBody;failed: boolean;}) => void; | true     | -       | 创建多实例回调     |
| onCanceled    | (params: { canceled: boolean }) => void;                                           | true     | -       | 取消创建回调       |
| attributeKeys | string[]                                                                           | false    | -       | 显示的实例属性字段 |

# EVENTS

| type                  | detail                                                        | description    |
| --------------------- | ------------------------------------------------------------- | -------------- |
| create.multi.failed   | {data: InstanceApi.ImportInstanceResponseBody,failed: true;}  | 创建多实例失败 |
| create.multi.success  | {data: InstanceApi.ImportInstanceResponseBody,failed: false;} | 创建多实例成功 |
| create.multi.canceled | { canceled: boolean }                                         | 取消创建       |
