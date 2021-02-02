[//]: # "business-bricks/cmdb-instances/instance-create.ts"

# INPUTS

| property            | type                                          | required | default                                          | description                                                      |
| ------------------- | --------------------------------------------- | -------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| objectId            | string                                        | ✔️       | -                                                | 模型 ID                                                          |
| allowContinueCreate | boolean                                       | -        | false                                            | 是否需要继续创建另一个实例                                       |
| brickList           | ModelAttributeFormChildren[]                  | -        | -                                                | 自定义表单项的构件                                               |
| fieldsByTag         | fieldsByTag[]                                 | -        | -                                                | 设置指定字段和该字段所属分类                                     |
| formItemProps       | FormItemProps（ant-design）                   | -        | {labelCol: { span: 3 },wrapperCol: { span: 17 }} | 设置 form.item 比例的                                            |
| blackList           | string[]                                      | -        | -                                                | 黑名单，由属性 ID 数组组成，设置该属性的时候不应设置 fieldsByTag |
| bindRelationId      | string                                        | -        | -                                                | 创建单实例成功后需要绑定的关系 ID                                |
| bindInstanceId      | string                                        | -        | -                                                | 创建单实例成功后需要绑定的对端实例 ID                            |
| showCancelButton    | boolean                                       | -        | true                                             | 是否显示取消按钮                                                 |
| cancelText          | string                                        | -        | 取消                                             | 取消按钮名称                                                     |
| cancelType          | default\|primary\|ghost\|dashed\|danger\|link | -        | default                                          | 取消按钮类型                                                     |
| isApprove           | boolean                                       | - ｜ -   | 是否申请新建                                     |

## ModelAttributeFormChildren

| property | type     | required | default | description    |
| -------- | -------- | -------- | ------- | -------------- |
| header   | string   | ✔️       | -       | 分类名字       |
| name     | string   | ✔️       | -       | 使用的构件名称 |
| label    | string[] | ✔️       | -       | 该标单项的标签 |
| options  | string[] | -        | -       | 该构件的参数   |

## fieldsByTag

| property | type     | required | default | description                |
| -------- | -------- | -------- | ------- | -------------------------- |
| name     | string   | ✔️       | -       | 分类名字                   |
| fields   | string[] | ✔️       | -       | 分类下的属性 id 组成的数组 |

# METHODS

| name        | params                                                                          | description    |
| ----------- | ------------------------------------------------------------------------------- | -------------- |
| onSubmitted | (data: { data: InstanceApi.CreateInstanceResponseBody;failed:boolean;}) => void | 创建单实例回调 |

# EVENTS

| type                  | detail                                                        | description        |
| --------------------- | ------------------------------------------------------------- | ------------------ |
| create.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | 创建单实例成功     |
| create.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | 创建单实例失败     |
| create.single.cancel  | null                                                          | 取消按钮触发的事件 |
