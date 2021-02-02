[//]: # "business-bricks/agile/issue-list.ts"

该构件提供标准的 issue 表格显示，以便于在不同场景复用。注意，对接的后台数据固定为：\_ISSUE 模型。如果没这个模型，请导入

# INPUTS

| property           | type                                     | required | default | description                                                                                                                           |
| ------------------ | ---------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| showCard           | boolean                                  | -        | true    | 是否显示外围的 card                                                                                                                   |
| query              | any                                      | -        | -       | 透传给 cmdb 的 search 接口的 query 参数                                                                                               |
| showSelectBox      | boolean                                  | -        | false   | 是否显示行选择框                                                                                                                      |
| rowSelectHandler   | BrickEventHandler 或 BrickEventHandler[] | -        | false   | 行选择的处理函数，对应`brick-table`的`select.update`事件，具体见[表格](developers/brick-book/brick/presentational-bricks.brick-table) |
| detailUrlTemplate  | string                                   | -        | false   | 详情链接，可配置 url 模板。用`@`可使用当前行的数据，如`${APP.homepage}/issue/@{instanceId}`                                           |
| detailClickHandler | BrickEventHandler 或 BrickEventHandler[] | -        | false   | 详情的点击事件处理函数，注意如果配置了`detailUrlTemplate`，此配置无效。具体配置方法见 demo 示例                                       |
| productUrlTemplate | string                                   | -        | false   | 产品字段的 url 链接，配置方法与`detailUrlTemplate`相同，注意，如果此字段为空，则不显示产品列                                          |

### 关于分页

该模板内置分页，且分页参数固定来源于`${QUERY.page}`，`${QUERY.pageSize}`

### BrickEventHandler

```
{
  "action": "console.log"
}
或
[{
  "target": "#css-selector",
  "method": "xxx",
  "args": []
}]
```

详细见文档[Events](http://docs.developers.easyops.cn/docs/brick-next/events)

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |

