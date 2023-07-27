[//]: # "business-bricks/cmdb-instances/instance-edit.ts"

# INPUTS

| property         | type                                          | required | default                                          | description                                                      |
| ---------------- | --------------------------------------------- | -------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| objectId         | string                                        | true     | -                                                | 模型 ID                                                          |
| instanceId       | string                                        | true     | -                                                | 实例 ID                                                          |
| brickList        | ModelAttributeFormChildren[]                  | false    | -                                                | 自定义表单项的构件                                               |
| fieldsByTag      | fieldsByTag[]                                 | false    | -                                                | 设置指定字段和该字段所属分类                                     |
| formItemProps    | FormItemProps（ant-design）                   | false    | {labelCol: { span: 3 },wrapperCol: { span: 17 }} | 设置 form.item 比例的                                            |
| blackList        | string[]                                      | false    | -                                                | 黑名单，由属性 ID 数组组成，设置该属性的时候不应设置 fieldsByTag |
| bindRelationId   | string                                        | false    | -                                                | 创建单实例成功后需要绑定的关系 ID                                |
| bindInstanceId   | string                                        | false    | -                                                | 创建单实例成功后需要绑定的对端实例 ID                            |
| showCancelButton | boolean                                       | -        | true                                             | 是否显示取消按钮                                                 |
| cancelText       | string                                        | -        | 取消                                             | 取消按钮名称                                                     |
| cancelType       | default\|primary\|ghost\|dashed\|danger\|link | -        | default                                          | 取消按钮类型                                                     |

## ModelAttributeFormChildren

| property | type     | required            | default | description    |
| -------- | -------- | ------------------- | ------- | -------------- |
| header   | string   | true                | -       | 分类名字       |
| name     | string   | true                | -       | 使用的构件名称 |
| label    | string[] | true                | -       | 该标单项的标签 |
| options  | string[] | Record<string, any> | -       | 该构件的参数   |

## fieldsByTag

| property | type     | required | default | description                |
| -------- | -------- | -------- | ------- | -------------------------- |
| name     | string   | true     | -       | 分类名字                   |
| fields   | string[] | true     | -       | 分类下的属性 id 组成的数组 |

# METHODS

| name        | params                                                                          | description  |
| ----------- | ------------------------------------------------------------------------------- | ------------ |
| onSubmitted | (data: { data: InstanceApi.UpdateInstanceResponseBody;failed:boolean;}) => void | 更新实例回调 |

# EVENTS

| type                  | detail                                                        | description        |
| --------------------- | ------------------------------------------------------------- | ------------------ |
| update.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | 更新单实例失败     |
| update.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | 更新单实例成功     |
| update.single.cancel  | null                                                          | 取消按钮触发的事件 |
