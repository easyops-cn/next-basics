[//]: # "atom-bricks/form-input/cmdb-instances-input-form.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.23.0  | 新增 `cmdb.instance.form.change` 事件 |
| 1.26.0  | 新增 `selectFromText` 属性            |

</details>

# INPUTS

| property         | type                          | required | default        | description                                                                                                           |
| ---------------- | ----------------------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| name             | string                        | ✔️       | -              | 表单项名称                                                                                                            |
| label            | string                        | -        | -              | 表单项标签                                                                                                            |
| selectFromText   | string                        | -        | 从 CMDB 中筛选 | 从 CMDB 中筛选按钮文本                                                                                                |
| objectList       | CmdbModels.ModelCmdbObject[]  | ✔️       | -              | 模型列表                                                                                                              |
| objectId         | string                        | ✔️       | -              | 模型 ID                                                                                                               |
| fieldId          | string                        | ✔️       | -              | 展示字段 ID                                                                                                           |
| query            | { [fieldId: string]: any } [] | -        | -              | 可选择实例的过滤条件， 参数同 InstanceApi.postSearch 中的 query，但参数结构必须为 [{ hostname: { $like: "%test%" } }] |
| value            | string[]                      | -        | -              | 选择的初始实例 ID 列表                                                                                                |
| singleSelect     | boolean                       | -        | false          | 是否只能选择单个实例                                                                                                  |
| inputDisabled    | boolean                       | -        | false          | 是否禁用输入框                                                                                                        |
| checkDisabled    | boolean                       | -        | false          | 是否禁用校验                                                                                                          |
| checkAgentStatus | boolean                       | -        | false          | 选择主机实例时，是否过滤掉 Agent 异常的主机实例                                                                       |
| checkPermission  | boolean                       | -        | false          | 选择主机实例时，是否过滤掉没有权限的主机实例                                                                          |

# EVENTS

| type                           | detail     | description        |
| ------------------------------ | ---------- | ------------------ |
| `cmdb.instance.form.change`    | `string[]` | 选择实例变化时触发 |
| `cmdb.instance.form.change.v2` | `any[]`    | 选择实例变化时触发 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
