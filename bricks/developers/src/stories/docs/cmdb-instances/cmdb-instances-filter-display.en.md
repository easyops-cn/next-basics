[//]: # "atom-bricks/form-input/cmdb-instances-filter-display.ts"

# INPUTS

| property           | type                         | required | default | description                                                                                     |
| ------------------ | ---------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| dataSource         | object                       | -        | -       | Data source                                                                                     |
| fields             | Fields                       | -        | -       | Data field mapping, supports specifying path                                                    |
| objectId           | string                       | ✔️       | -       | Model ID                                                                                        |
| instances          | CmdbInstancesFilterInstances | ✔️       | -       | Filter conditions                                                                               |
| autoPullObjectList | boolean                      | -        | -       | If true, the objectList property is set internally; otherwise the objectList property must be set externally |

### CmdbInstancesFilterInstances

| property | type                          | required | default | description                                                                                                    |
| -------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| type     | "all" / "constant" / "search" | ✔️       | -       | Filter type. "all" means "all instances", "constants" means "specified instances", and "search" means "dynamic filter" |
| query    | any                           | -        | -       | Query condition when type is "constant" or "search". When "constant", it must be a data structure of { instanceId: { \$in: ["xxx"] } |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
