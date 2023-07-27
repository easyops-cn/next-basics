[//]: # "business-bricks/cmdb-instances/instance-relation-management-template.ts"

# INPUTS

| property       | type    | required | default | description                                                                                                                 |
| -------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| objectId       | string  | ✔        | -       | 模型 id                                                                                                                     | - |
| relationSideId | string  | ✔        | -       | 对端关系 id                                                                                                                 | - |
| cardTitle      | string  | ✔        | -       | 卡片名称                                                                                                                    | - |
| modalConfig    | Object  | -        | -       | 添加关系模态框配置项, 属性配置跟 [instance-list-modal](developers/brick-book/brick/cmdb-instances.instance-list-modal) 相同 | - |
| tableConfig    | Object  | -        | -       | 实例列表配置项, 属性配置跟 [instance-list](developers/brick-book/brick/cmdb-instances.instance-list) 相同                   | - |
| singleRelation | boolean | -        | false   | 是否是单实例关系添加                                                                                                        | - |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
