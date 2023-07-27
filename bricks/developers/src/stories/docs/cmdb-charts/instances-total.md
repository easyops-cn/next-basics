[//]: # "business-bricks/cmdb-charts/instances-total.ts"

<details>
<summary>History</summary>

| Version | Change                                 |
| ------- | -------------------------------------- |
| 1.x.0   | 新增构件 `cmdb-charts.instances-total` |

</details>

# INPUTS

| property   | type                                            | required | default | description    |
| ---------- | ----------------------------------------------- | -------- | ------- | -------------- |
| objectId   | string                                          | ✔️       | -       | 模型 ID        |
| query      | any                                             | -        | -       | 过滤条件       |
| format     | Format                                          | -        | -       | 数据的转换格式 |
| title      | string                                          | -        | -       | 标题           |
| valueColor | string                                          | -        | -       | 值颜色         |
| icon       | Icon extends ( AntdIcon & FaIcon & EasyopsIcon) | -        | -       | 图标           |

### Format

| property  | type   | required | default | description                                                |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------- |
| type      | string | -        | -       | 格式类型（目前支持“none”、“percent”、“data”、“data_tate”） |
| precision | number | -        | -       | 精度                                                       |
| unit      | string | -        | -       | 单位                                                       |

### Icon

| property   | type   | required | default | description |
| ---------- | ------ | -------- | ------- | ----------- |
| color      | string | -        | -       | 颜色        |
| size       | number | -        | -       | 大小        |
| background | string | -        | -       | 背景        |

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
