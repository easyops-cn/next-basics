[//]: # "atom-bricks/other/export-excel-data.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.x.0   | Added the brick `excel-utils.export-data` |

</details>

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# METHODS

| name          | params                               | description                                                                                                                                                                                                                                                             |
| ------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exportToExcel | （config: Config, filename: string） | The file method provided for exporting the contents of a brick-table to excel. You need to add an id property to the exported brick so that the data information of the brick can be obtained. For a brick-table brick, the `dataSourceField` and `columnsField` fields do not need to be configured (as shown in the demo) |

```typescript
inteface Config {
/** The id of the brick */
target: string;
/** The field name for getting the dataSource of the brick */
dataSourceField: string;
/** The field name for getting the columns of the brick */
columnsField: string
}
```

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
