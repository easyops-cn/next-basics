[//]: # "business-bricks/cmdb-instances/highlight-table.ts"

<details>
<summary>History</summary>

| Version | Change                      |
| ------- | --------------------------- |
| 1.11.2  | `pageSize` replaces `page_size` |

</details>

# params

| property             | type              | required | default         | description                                                                                                |
| -------------------- | ----------------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| objectId             | string            | ✔️       | -               | Model id                                                                                                   |
| fields               | string[]          | -️       | -               | Fields to fetch; the configuration can be simplified to ["instanceId", "name"]                             |
| query                | object            | -        | -               | Same as the query of the search interface                                                                  |
| page                 | number            | -        | 1               | Configure the page number of the search interface query                                                    |
| pageSize             | number            | -        | 20              | Configure the number of items per page of the search interface query                                        |
| <del>page_size</del> | number            | -        | 20              | Configure the number of items per page of the search interface query                                        |
| sort                 | {string: 1 \| -1} | -        | {instanceId: 1} | Sorting configuration for the returned data. Currently only single-property sorting is supported, such as {instance: 1}, where 1 means ascending and -1 means descending |
| columns              | columnsProps      | -        | -               | Configure the display of each table column, as shown below                                                  |
| title                | string            | -        | -               | Title                                                                                                      |

# columns

| property          | type       | required | default | description                                                                                                            |
| ----------------- | ---------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| title             | string     | ✔️       | -       | Title of each column                                                                                                   |
| dataIndex         | string     | ✔️       | -       | Key of each column                                                                                                     |
| detailUrlTemplate | string     | -️       | -       | Configure the redirect link of each column                                                                             |
| target            | string     | -️       | -       | Redirect target, for example it can be set to "\_blank"                                                                |
| rules             | rulesProps | -️       | -       | Configure the highlight rules of each column, the same as the [conditional display brick](developers/brick-book/brick/presentational-bricks.brick-conditional-display) |

> Tips: When both rules and detailUrlTemplate are configured for a column, the style of the detailUrlTemplate tag overrides the highlight style of rules.
