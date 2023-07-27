[//]: # "business-bricks/cmdb-instances/instance-create-modal.ts"

# INPUTS

| property            | type                                                                            | required | default | description                |
| ------------------- | ------------------------------------------------------------------------------- | -------- | ------- | -------------------------- |
| title               | string                                                                          | true     | -       | 模态框标题                 |
| objectId            | string                                                                          | true     | -       | 模型 ID                    |
| visible             | boolean                                                                         | true     | -       | 是否可见                   |
| allowContinueCreate | boolean                                                                         | false    | -       | 是否显示'继续创建'checkbox |
| attributeKeys       | string[]                                                                        | false    | -       | 显示的属性字段             |
| onSubmitted         | (data: { data: InstanceApi.CreateInstanceResponseBody;failed:boolean;}) => void | false    | -       | 创建实例回调               |

# EVENTS

| type                  | detail                                                        | description  |
| --------------------- | ------------------------------------------------------------- | ------------ |
| create.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | 创建实例失败 |
| create.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | 创建实例成功 |

# METHODS

| name      | params | description |
| --------- | ------ | ----------- |
| openModal | -      | 打开弹出框  |
