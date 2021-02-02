[//]: # "atom-bricks/form-input/cmdb-instance-select-panel.ts"

<details>
<summary>History</summary>

| Version | Change                             |
| ------- | ---------------------------------- |
| 1.28.0  | 新增 `instance.select.change` 事件 |

</details>

# INPUTS

| property                  | type                       | required | default  | description                                            |
| ------------------------- | -------------------------- | -------- | -------- | ------------------------------------------------------ |
| name                      | string                     | -        | -        | 表单字段名                                             |
| label                     | string                     | -        | -        | 表单字段说明                                           |
| objectList                | CmdbModels.ModelCmdbObject | ✔️       | -        | 模型列表                                               |
| objectId                  | string                     | ✔️       | -        | 模型 ID                                                |
| value                     | string[]                   | -        | []       | 默认选择实例的 ID 列表                                 |
| addBtnText                | string                     | -        | 选择实例 | 选择实例按钮文字                                       |
| instanceQuery             | any                        | -        | -        | 预设弹窗内实例的筛选条件，格式与参见请求数据中的 query |
| fields                    | string[]                   | -        | -        | 模型的属性 ID 数组，控制实例弹窗和已选表格的显示列     |
| addInstancesModalPageSize | number                     | -        | 10       | 添加实例弹窗的默认分页个数                             |
| showSizeChanger           | boolean                    | -        | false    | 添加实例弹窗是否展示分页                               |
| pageSizeOptions           | string[]                   | -        | -        | 添加实例弹窗的分页个数选项                             |

# EVENTS

| type                        | detail     | description                                         |
| --------------------------- | ---------- | --------------------------------------------------- |
| `instance.select.change`    | `string[]` | 当选择项变化时触发，detail 为所有选择实例的实例 ID  |
| `instance.select.change.v2` | `any[]`    | 当选择项变化时触发，detail 为所有选择实例的实例数据 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
