[//]: # "atom-bricks/form-input/cmdb-instances-filter-form.ts"

<details>
<summary>History</summary>

| Version | Change                                            |
| ------- | ------------------------------------------------- |
| 1.22.0  | Added the `instances.filter.form.change` event    |

</details>

# INPUTS

| property           | type                         | required | default | description                                                                                            |
| ------------------ | ---------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------ |
| name               | string                       | ✔️       | -       | Form item name                                                                                         |
| label              | string                       | -        | -       | Form item label                                                                                        |
| objectList         | CmdbModels.ModelCmdbObject[] | ✔️       | -       | Model list (when `autoPullObjectList` is true, objectList can be pulled internally and does not need to be filled in) |
| autoPullObjectList | boolean                      | -        | -       | Whether to pull `objectList` internally                                                                 |
| value              | CmdbInstancesFilter          | -        | -       | Initial value of the form item                                                                          |

### CmdbInstancesFilter

| property  | type                         | required | default | description |
| --------- | ---------------------------- | -------- | ------- | ----------- |
| objectId  | string                       | ✔️       | -       | Model ID    |
| instances | CmdbInstancesFilterInstances | ✔️       | -       | Filter conditions |

### CmdbInstancesFilterInstances

| property | type                          | required | default | description                                                                                                    |
| -------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| type     | "all" / "constant" / "search" | ✔️       | -       | Filter type. "all" means "all instances", "constants" means "specified instances", and "search" means "dynamic filtering" |
| query    | any                           | -        | -       | Query condition when type is "constant" or "search". When "constant", it must be a data structure of { instanceId: { \$in: ["xxx"] } |

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

| type                           | detail                | description                              |
| ------------------------------ | --------------------- | ---------------------------------------- |
| `instances.filter.form.change` | `CmdbInstancesFilter` | Triggered when the instance option changes |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
