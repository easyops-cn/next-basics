[//]: # "business-bricks/cmdb-instances/highlight-table.ts"

<details>
<summary>History</summary>

| Version | Change                      |
| ------- | --------------------------- |
| 1.11.2  | `pageSize` 代替 `page_size` |

</details>

# params

| property             | type              | required | default         | description                                                                           |
| -------------------- | ----------------- | -------- | --------------- | ------------------------------------------------------------------------------------- |
| objectId             | string            | ✔️       | -               | 模型 id                                                                               |
| fields               | string[]          | -️       | -               | 需要拉取的字段 fields, 可简化配置为 ["instanceId", "name"]                            |
| query                | object            | -        | -               | 跟 search 接口的查询相同                                                              |
| page                 | number            | -        | 1               | 配置 search 接口查询的页数                                                            |
| pageSize             | number            | -        | 20              | 配置 search 接口每页查询的个数                                                        |
| <del>page_size</del> | number            | -        | 20              | 配置 search 接口每页查询的个数                                                        |
| sort                 | {string: 1 \| -1} | -        | {instanceId: 1} | 数据返回的排序配置，目前只支持单个属性的排序如{instance: 1}，1 表示升序， -1 表示降序 |
| columns              | columnsProps      | -        | -               | 配置表格每一列显示, 详情如下所示                                                      |
| title                | string            | -        | -               | 标题                                                                                  |

# columns

| property          | type       | required | default | description                                                                                                              |
| ----------------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| title             | string     | ✔️       | -       | 每一列标题                                                                                                               |
| dataIndex         | string     | ✔️       | -       | 每一列的 key                                                                                                             |
| detailUrlTemplate | string     | -️       | -       | 配置每一列的跳转链接                                                                                                     |
| target            | string     | -️       | -       | 跳转的 target，例如可以设置为"\_blank"                                                                                   |
| rules             | rulesProps | -️       | -       | 配置每一列高亮的规则，同[条件展示构件](developers/brick-book/brick/presentational-bricks.brick-conditional-display) 一样 |

> Tips: 当一列内同时配置了 rules 和 detailUrlTemplate 时，detailUrlTemplate 标签的样式会覆盖 rules 的高亮样式。
