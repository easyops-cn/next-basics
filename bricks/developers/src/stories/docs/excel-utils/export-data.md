[//]: # "atom-bricks/other/export-excel-data.ts"

<details>
<summary>History</summary>

| Version | Change                             |
| ------- | ---------------------------------- |
| 1.x.0   | 新增构件 `excel-utils.export-data` |

</details>

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# METHODS

| name          | params                               | description                                                                                                                                                                                                    |
| ------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exportToExcel | （config: Config, filename: string） | 提供给 brick-table 内容导出为 excel 的文件方法，其中需要在导出的构件中添加一个 id 属性，以便获取该构件的数据信息。如果是 brick-table 构件导出可不用配置 `dataSourceField` 和 `columnsField` 字段(如 demo 所示) |

```typescript
inteface Config {
/** 构件的 id */
target: string;
/** 构件的获取 dataSource 的字段名称 */
dataSourceField: string;
/** 构件的获取 columns 的字段名称 */
columnsField: string
}
```

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
