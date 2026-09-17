[//]: # "business-bricks/agile/issue-list.ts"

This brick provides a standard issue table display for reuse in different scenarios. Note that the backend data it connects to is fixed to: the \_ISSUE model. If you do not have this model, please import it.

# INPUTS

| property           | type                                     | required | default | description                                                                                                                           |
| ------------------ | ---------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| showCard           | boolean                                  | -        | true    | Whether to show the outer card                                                                                                        |
| query              | any                                      | -        | -       | The query params passed through to the cmdb search interface                                                                          |
| showSelectBox      | boolean                                  | -        | false   | Whether to show the row selection box                                                                                                 |
| rowSelectHandler   | BrickEventHandler or BrickEventHandler[] | -        | false   | The row selection handler, corresponding to the `select.update` event of `brick-table`. For details, see [Table](developers/brick-book/brick/presentational-bricks.brick-table) |
| detailUrlTemplate  | string                                   | -        | false   | The detail link. A url template can be configured. Use `@` to use the data of the current row, e.g. `${APP.homepage}/issue/@{instanceId}` |
| detailClickHandler | BrickEventHandler or BrickEventHandler[] | -        | false   | The click event handler for the detail. Note that if `detailUrlTemplate` is configured, this configuration has no effect. For the specific configuration, see the demo example |
| productUrlTemplate | string                                   | -        | false   | The url link of the product field. The configuration method is the same as `detailUrlTemplate`. Note that if this field is empty, the product column is not shown |

### About Pagination

This template has built-in pagination, and the pagination params are fixed to come from `${QUERY.page}`, `${QUERY.pageSize}`

### BrickEventHandler

```
{
  "action": "console.log"
}
or
[{
  "target": "#css-selector",
  "method": "xxx",
  "args": []
}]
```

For details, see the document [Events](http://docs.developers.easyops.cn/docs/brick-next/events)

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |

