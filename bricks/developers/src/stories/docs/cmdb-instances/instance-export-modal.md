[//]: # "business-bricks/cmdb-instances/instance-export-modal.ts"

# INPUTS

| property     | type   | required | default | description                                                                                                             |
| ------------ | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| objectId     | string | ✔️       | -       | CMDB 模型 id                                                                                                            |
| exportParams | object | -        | -       | CMDB 实例查询语句，若不提供则需要和 cmdb-instance.instances-list 构件一起使用，将在 url 上的 querystring 来获取查询条件 |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description                               |
| ---- | ------ | ----------------------------------------- |
| open | -      | 调用该方法可弹出 modal 来引导导出实例数据 |
