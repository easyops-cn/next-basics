[//]: # "business-bricks/cmdb-instances/instance-tree-template.ts"

# INPUTS

| property      | type     | required | default | description                                                                                                                |
| ------------- | -------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| initObjectIds | string[] | ✔️       | -       | 设置资源树显示的初始化模型，不能超过 5 个。 当用户调整配置之后，优先以用户配置为准。如果该配置项为空，则默认显示应用模型。 |
| pageSize      | number   | -️       | 10      | 显示每个模型分类下的数目                                                                                                   |

# EVENTS

| type                     | detail       | description                                |
| ------------------------ | ------------ | ------------------------------------------ |
| instance-tree.drag-start | instanceData | 当拖动树节点时触发, 事件传递实例数据的信息 |
| instance-tree.drag-end   | -            | 当拖动结束时触发                           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
