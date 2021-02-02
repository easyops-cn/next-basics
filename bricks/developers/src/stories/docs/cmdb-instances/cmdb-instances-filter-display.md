[//]: # "atom-bricks/form-input/cmdb-instances-filter-display.ts"

# INPUTS

| property           | type                         | required | default | description                                                                   |
| ------------------ | ---------------------------- | -------- | ------- | ----------------------------------------------------------------------------- |
| dataSource         | object                       | -        | -       | 数据源                                                                        |
| fields             | Fields                       | -        | -       | 数据字段映射，支持 path 指定                                                  |
| objectId           | string                       | ✔️       | -       | 模型 ID                                                                       |
| instances          | CmdbInstancesFilterInstances | ✔️       | -       | 筛选条件                                                                      |
| autoPullObjectList | boolean                      | -        | -       | 如果为 true，则内部直接设置 objectList 属性，否则需要外部设置 objectList 属性 |

### CmdbInstancesFilterInstances

| property | type                          | required | default | description                                                                                                    |
| -------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| type     | "all" / "constant" / "search" | ✔️       | -       | 筛选类型。“all”代表“全部实例”，“constants”代表“指定实例”，“search”代表“动态过滤器”                             |
| query    | any                           | -        | -       | 当 type 为 “constant” 或 “search” 时的查询条件。“constant” 时必须为 { instanceId: { \$in: [“xxx”] } 的数据结构 |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
