[//]: # "business-bricks/cmdb-instances/instance-list-modal-v2.ts"

<details>
<summary>History</summary>

| Version | Change                                                 |
| ------- | ------------------------------------------------------ |
| 1.41.1  | 新增事件 `cmdb-instances.modal-v2.selection-change.v2` |
| 1.32.0  | 新增构件 `cmdb-instances.instance-list-modal-v2`       |

</details>

# INPUTS

| property               | type                         | required | default                      | description                                                        |
| ---------------------- | ---------------------------- | -------- | ---------------------------- | ------------------------------------------------------------------ |
| modalTitle             | string                       | ✔️       | -                            | 模态框标题                                                         |
| objectId               | string                       | ✔️       | -                            | CMDB 模型 ID                                                       |
| objectList             | CmdbModels.ModelCmdbObject[] | ✔️       | -                            | CMDB 模型列表                                                      |
| query                  | Query                        | -        | -                            | 实例搜索条件                                                       |
| aq                     | Query[]                      | -        | -                            | 实例搜索条件列表，对应高级搜索                                     |
| permissions            | string[]                     | ✔️       | -                            | 权限过滤参数                                                       |
| presetConfigs          | InstanceListPresetConfigs    | -        | -                            | 预设配置项，query 为默认的搜索参数，fieldIds 为默认展示列的属性 Id |
| sortDisabled           | boolean                      | -        | false                        | 是否禁用排序                                                       |
| selectDisabled         | boolean                      | -        | false                        | 是否禁用勾选实例                                                   |
| singleSelect           | boolean                      | -        | false                        | 是否只能选择一行                                                   |
| selectedRowKeys        | string[]                     | -        | -                            | instanceId 列表，提前勾选多个实例                                  |
| searchDisabled         | boolean                      | -        | false                        | 是否禁用搜索                                                       |
| aliveHostsDisabled     | boolean                      | -        | false                        | 是否禁止展示"正常主机"的勾选框                                     |
| relatedToMeDisabled    | boolean                      | -        | false                        | 是否禁止展示"与我相关"的勾选框                                     |
| moreButtonsDisabled    | boolean                      | -        | false                        | 是否禁止展示"更多"的按钮                                           |
| advancedSearchDisabled | boolean                      | -        | false                        | 是否禁止展示高级搜索                                               |
| showSizeChanger        | boolean                      | -        | true                         | 是否显示分页下拉框                                                 |
| pageSizeOptions        | string[]                     | -        | ["10","20","50","100","300"] | 添加分页下拉框选项                                                 |
| pageSize               | number                       | -        | true                         | 显示列表数据数目                                                   |

```typescript
declare enum ComparisonOperators {
    Equal = "$eq",
    NotEqual = "$ne",
    Like = "$like",
    NotLike = "$nlike",
    GreaterThan = "$gt",
    GreaterThanOrEqual = "$gte",
    LessThan = "$lt",
    LessThanOrEqual = "$lte",
    In = "$in",
    NotIn = "$nin"
}
declare enum ElementOperators {
    Exists = "$exists"
}
export declare type QueryOperatorExpressions = Partial<Record<ComparisonOperators | ElementOperators, any>>;
export interface Query {
    [fieldOrLogical: string]: QueryOperatorExpressions | Query[];
}
// e.g.
const query: Query = { {"ip": {"$like": "%192%"}} };

export interface InstanceListPresetConfigs {
    query?: Record<string, any>;
    fieldIds?: string[];
}
```

# EVENTS

| type                                        | detail   | description                              |
| ------------------------------------------- | -------- | ---------------------------------------- |
| cmdb-instances.modal-v2.selection-change    | string[] | 确认后，发出所选择的实例 instanceId 列表 |
| cmdb-instances.modal-v2.selection-change.v2 | any[]    | 确认后，发出所选择的实例数据列表         |

# METHODS

| name  | params | description        |
| ----- | ------ | ------------------ |
| open  | -      | 打开实例列表模态框 |
| close | -      | 关闭实例列表模态框 |
