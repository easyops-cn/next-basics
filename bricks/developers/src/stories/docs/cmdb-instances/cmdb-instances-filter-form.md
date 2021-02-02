[//]: # "atom-bricks/form-input/cmdb-instances-filter-form.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.22.0  | 新增 `instances.filter.form.change` 事件 |

</details>

# INPUTS

| property           | type                         | required | default | description                                                                       |
| ------------------ | ---------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
| name               | string                       | ✔️       | -       | 表单项名称                                                                        |
| label              | string                       | -        | -       | 表单项标签                                                                        |
| objectList         | CmdbModels.ModelCmdbObject[] | ✔️       | -       | 模型列表 (`autoPullObjectList`为 true 时，objectList 可以内部拉取，可以不用填写） |
| autoPullObjectList | boolean                      | -        | -       | 是否内部拉去`objectList`                                                          |
| value              | CmdbInstancesFilter          | -        | -       | 表单项初始值                                                                      |

### CmdbInstancesFilter

| property  | type                         | required | default | description |
| --------- | ---------------------------- | -------- | ------- | ----------- |
| objectId  | string                       | ✔️       | -       | 模型 ID     |
| instances | CmdbInstancesFilterInstances | ✔️       | -       | 筛选条件    |

### CmdbInstancesFilterInstances

| property | type                          | required | default | description                                                                                                    |
| -------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| type     | "all" / "constant" / "search" | ✔️       | -       | 筛选类型。“all”代表“全部实例”，“constants”代表“指定实例”，“search”代表“动态过滤”                               |
| query    | any                           | -        | -       | 当 type 为 “constant” 或 “search” 时的查询条件。“constant” 时必须为 { instanceId: { \$in: [“xxx”] } 的数据结构 |

```typescript
export interface CmdbInstancesFilter {
  objectId: string;
  instances: {
    type: "constant" | "search" | "all";
    query?: any;
  };
}
```

# EVENTS

| type                           | detail                | description        |
| ------------------------------ | --------------------- | ------------------ |
| `instances.filter.form.change` | `CmdbInstancesFilter` | 实例选项改变时触发 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
