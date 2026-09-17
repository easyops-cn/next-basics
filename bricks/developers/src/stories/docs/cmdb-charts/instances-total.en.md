[//]: # "business-bricks/cmdb-charts/instances-total.ts"

<details>
<summary>History</summary>

| Version | Change                                 |
| ------- | -------------------------------------- |
| 1.x.0   | New brick `cmdb-charts.instances-total` |

</details>

# INPUTS

| property   | type                                            | required | default | description    |
| ---------- | ----------------------------------------------- | -------- | ------- | -------------- |
| objectId   | string                                          | ✔️       | -       | Model ID        |
| query      | any                                             | -        | -       | Filter condition       |
| format     | Format                                          | -        | -       | The conversion format of the data |
| title      | string                                          | -        | -       | Title           |
| valueColor | string                                          | -        | -       | Value color         |
| icon       | Icon extends ( AntdIcon & FaIcon & EasyopsIcon) | -        | -       | Icon           |

### Format

| property  | type   | required | default | description                                                |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------- |
| type      | string | -        | -       | Format type (currently supports "none", "percent", "data" and "data_tate") |
| precision | number | -        | -       | Precision                                                       |
| unit      | string | -        | -       | Unit                                                       |

### Icon

| property   | type   | required | default | description |
| ---------- | ------ | -------- | ------- | ----------- |
| color      | string | -        | -       | Color        |
| size       | number | -        | -       | Size        |
| background | string | -        | -       | Background        |

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
