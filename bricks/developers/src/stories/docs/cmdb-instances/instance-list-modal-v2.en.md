[//]: # "business-bricks/cmdb-instances/instance-list-modal-v2.ts"

<details>
<summary>History</summary>

| Version | Change                                                  |
| ------- | ------------------------------------------------------- |
| 1.41.1  | New event `cmdb-instances.modal-v2.selection-change.v2` |
| 1.32.0  | New brick `cmdb-instances.instance-list-modal-v2`       |

</details>

# INPUTS

| property               | type                         | required | default                      | description                                                                                                                       |
| ---------------------- | ---------------------------- | -------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| modalTitle             | string                       | ✔️       | -                            | Modal title                                                                                                                       |
| objectId               | string                       | ✔️       | -                            | CMDB model ID                                                                                                                     |
| objectList             | CmdbModels.ModelCmdbObject[] | ✔️       | -                            | CMDB model list                                                                                                                   |
| query                  | Query                        | -        | -                            | Instance search conditions                                                                                                        |
| aq                     | Query[]                      | -        | -                            | List of instance search conditions, corresponding to advanced search                                                              |
| permissions            | string[]                     | ✔️       | -                            | Permission filter params                                                                                                          |
| presetConfigs          | InstanceListPresetConfigs    | -        | -                            | Preset configs, where `query` is the default search params and `fieldIds` is the property Ids of the columns displayed by default |
| sortDisabled           | boolean                      | -        | false                        | Whether to disable sorting                                                                                                        |
| selectDisabled         | boolean                      | -        | false                        | Whether to disable selecting instances                                                                                            |
| singleSelect           | boolean                      | -        | false                        | Whether only one row can be selected                                                                                              |
| selectedRowKeys        | string[]                     | -        | -                            | List of instanceIds, to select multiple instances in advance                                                                      |
| searchDisabled         | boolean                      | -        | false                        | Whether to disable search                                                                                                         |
| aliveHostsDisabled     | boolean                      | -        | false                        | Whether to hide the "alive hosts" checkbox                                                                                        |
| relatedToMeDisabled    | boolean                      | -        | false                        | Whether to hide the "related to me" checkbox                                                                                      |
| moreButtonsDisabled    | boolean                      | -        | false                        | Whether to hide the "more" button                                                                                                 |
| advancedSearchDisabled | boolean                      | -        | false                        | Whether to hide advanced search                                                                                                   |
| showSizeChanger        | boolean                      | -        | true                         | Whether to show the page size selector                                                                                            |
| pageSizeOptions        | string[]                     | -        | ["10","20","50","100","300"] | Add options to the page size selector                                                                                             |
| pageSize               | number                       | -        | true                         | Number of rows displayed per page                                                                                                 |

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

| type                                        | detail   | description                                                                   |
| ------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| cmdb-instances.modal-v2.selection-change    | string[] | After confirmation, emits the list of instanceIds of the selected instances   |
| cmdb-instances.modal-v2.selection-change.v2 | any[]    | After confirmation, emits the list of instance data of the selected instances |

# METHODS

| name  | params | description                   |
| ----- | ------ | ----------------------------- |
| open  | -      | Open the instance list modal  |
| close | -      | Close the instance list modal |
