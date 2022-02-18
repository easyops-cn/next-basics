[//]: # "business-bricks/agile/kanban-container.ts"

<details>
<summary>History</summary>

| Version | Change                            |
| ------- | --------------------------------- |
| 1.10.0  | 新增 `diabledDrag` 属性           |
| 1.1.0   | 新增属性 `columnWidth`            |
| 1.0.0   | 新增构件 `agile.kanban-container` |

</details>

> Tips: 看板容器配合构件 [basic-bricks.micro-view](developers/brick-book/brick/basic-bricks.micro-view) 使用的时候，横向滚动自适应需要在 micro-view 设置参数：`overflowXAuto: true`

# INPUTS

| property          | type                                                                                          | required | default | description                                                            |
| ----------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------- |
| columns           | Column[]                                                                                      | ✔️       | []      | 列数据，具体定义如下表                                                 |
| data              | {step?:string,[propName:string]:any}[]                                                        | ✔️       | []      | 数据，`step` 对应 `column` 中的 `key`，也可通过`stepField`设为其他字段 |
| stepField         | string                                                                                        | -        | "step"  | 与列中的 key 匹配的字段，默认为 step                                   |
| useBrick          | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | -        | -       | 支持为每个卡片项自定义展示构件                                         |
| shouldAdaptHeight | boolean                                                                                       | -        | false   | 是否自适应高度为撑满浏览器窗口                                         |
| bottomSize        | number                                                                                        | -        | 44      | 容器底部距离浏览器窗口底部的大小                                       |
| columnWidth       | number                                                                                        | -        | 290     | 列宽度                                                                 |
| containerStyle    | React.CSSProperties                                                                           |          | -       | 自定义容器的样式                                                       |
| isHiddenNumber    | boolean                                                                                       |          | false   | 是否显示当前用到的卡片数量                                             |

`<agile.kanban-container>` 为卡片项自定义展示构件传递的数据源为：

| field    | type | description |
| -------- | ---- | ----------- |
| itemData | any  | 卡片项数据  |

## Column

| property    | type    | required | default | description                                  |
| ----------- | ------- | -------- | ------- | -------------------------------------------- |
| key         | string  | ✔️       | -       | 列的 key，对应 `data` 中的 `stepField`的数据 |
| title       | string  | ✔️       | -       | 列的标题                                     |
| regex       | string  | -        | -       | 该列匹配的正则                               |
| disableDrag | boolean | -        | false   | 是否禁止该列拖拽                             |

# EVENTS

| type           | detail                                                                                                  | description                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| drag.end       | { source: Record<string, any>; target: Record<string, any>; }                                           | 拖拽成功发出的事件，`source`为卡片源状态，`target`为目标状态信息 |
| drag.end.regex | { source: Record<string, any>; target: Record<string, any>;sourceColumn: Column;targetColumn: Column; } | 拖拽成功发出的事件，`source`为卡片源状态，`target`为目标状态信息 |
