[//]: # "business-bricks/agile/kanban-container.ts"

<details>
<summary>History</summary>

| Version | Change                             |
| ------- | ---------------------------------- |
| 1.10.0  | New property `diabledDrag`         |
| 1.1.0   | New property `columnWidth`         |
| 1.0.0   | New brick `agile.kanban-container` |

</details>

> Tips: When the kanban container is used together with the brick [basic-bricks.micro-view](developers/brick-book/brick/basic-bricks.micro-view), adaptive horizontal scrolling requires setting the parameter `overflowXAuto: true` on micro-view

# INPUTS

| property          | type                                                                                          | required | default | description                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| columns           | Column[]                                                                                      | ✔️       | []      | Column data, defined in the table below                                                                     |
| data              | {step?:string,[propName:string]:any}[]                                                        | ✔️       | []      | The data. `step` corresponds to the `key` of `column`, and can also be set to another field via `stepField` |
| stepField         | string                                                                                        | -        | "step"  | The field matching the key of a column, defaults to step                                                    |
| useBrick          | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | -        | -       | Supports custom display bricks for each card item                                                           |
| shouldAdaptHeight | boolean                                                                                       | -        | false   | Whether to adapt the height to fill the browser window                                                      |
| bottomSize        | number                                                                                        | -        | 44      | The distance from the bottom of the container to the bottom of the browser window                           |
| columnWidth       | number                                                                                        | -        | 290     | Column width                                                                                                |
| containerStyle    | React.CSSProperties                                                                           |          | -       | The custom style of the container                                                                           |
| isHiddenNumber    | boolean                                                                                       |          | false   | Whether to show the number of cards currently in use                                                        |

`<agile.kanban-container>` passes the following data source to the custom display bricks of card items:

| field    | type | description    |
| -------- | ---- | -------------- |
| itemData | any  | Card item data |

## Column

| property    | type    | required | default | description                                                               |
| ----------- | ------- | -------- | ------- | ------------------------------------------------------------------------- |
| key         | string  | ✔️       | -       | The key of the column, corresponding to the data of `stepField` in `data` |
| title       | string  | ✔️       | -       | The title of the column                                                   |
| regex       | string  | -        | -       | The regex matched by this column                                          |
| disableDrag | boolean | -        | false   | Whether to disable dragging for this column                               |

# EVENTS

| type           | detail                                                                                                  | description                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| drag.end       | { source: Record<string, any>; target: Record<string, any>; }                                           | The event emitted when dragging succeeds. `source` is the source state of the card, `target` is the target state information |
| drag.end.regex | { source: Record<string, any>; target: Record<string, any>;sourceColumn: Column;targetColumn: Column; } | The event emitted when dragging succeeds. `source` is the source state of the card, `target` is the target state information |
