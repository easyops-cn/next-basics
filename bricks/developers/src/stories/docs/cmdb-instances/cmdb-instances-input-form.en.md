[//]: # "atom-bricks/form-input/cmdb-instances-input-form.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.23.0  | New `cmdb.instance.form.change` event |
| 1.26.0  | New `selectFromText` property         |

</details>

# INPUTS

| property         | type                          | required | default        | description                                                                                                           |
| ---------------- | ----------------------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| name             | string                        | ✔️       | -              | Form item name                                                                                                        |
| label            | string                        | -        | -              | Form item label                                                                                                       |
| selectFromText   | string                        | -        | Filter from CMDB | The text of the Filter from CMDB button                                                                             |
| objectList       | CmdbModels.ModelCmdbObject[]  | ✔️       | -              | Model list                                                                                                            |
| objectId         | string                        | ✔️       | -              | Model ID                                                                                                              |
| fieldId          | string                        | ✔️       | -              | Display field ID                                                                                                      |
| query            | { [fieldId: string]: any } [] | -        | -              | The filter condition for selectable instances. The params are the same as the query in InstanceApi.postSearch, but the param structure must be [{ hostname: { $like: "%test%" } }] |
| value            | string[]                      | -        | -              | The initial list of selected instance IDs                                                                             |
| singleSelect     | boolean                       | -        | false          | Whether only a single instance can be selected                                                                        |
| inputDisabled    | boolean                       | -        | false          | Whether to disable the input                                                                                          |
| checkDisabled    | boolean                       | -        | false          | Whether to disable validation                                                                                         |
| checkAgentStatus | boolean                       | -        | false          | Whether to filter out host instances with abnormal Agent when selecting host instances                                 |
| checkPermission  | boolean                       | -        | false          | Whether to filter out host instances without permission when selecting host instances                                  |

# EVENTS

| type                           | detail     | description                                |
| ------------------------------ | ---------- | ------------------------------------------ |
| `cmdb.instance.form.change`    | `string[]` | Triggered when the selected instance changes |
| `cmdb.instance.form.change.v2` | `any[]`    | Triggered when the selected instance changes |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
