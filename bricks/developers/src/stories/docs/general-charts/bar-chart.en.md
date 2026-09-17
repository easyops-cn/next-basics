[//]: # "atom-bricks/chart/bar-chart.ts"

# INPUTS

| property    | type         | required | default                | description                                                                              |
| ----------- | ------------ | -------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| grid        | false / Grid | -        | { row: 1, column: 12 } | The number of rows and columns the bar chart brick occupies in the Grid layout container |
| showCard    | boolean      | -        | true                   | Whether to show the card background                                                      |
| title       | string       | -        | -                      | Title                                                                                    |
| dataSource  | object       | -        | -                      | Data source                                                                              |
| fields      | Fields       | -        | -                      | Data field mapping, `path` is supported                                                  |
| data        | number[][]   | -        | -                      | Data                                                                                     |
| format      | Format       | -        | -                      | The conversion format of the data                                                        |
| valueAxis   | ValueAxis    | -        | {}                     | Configurations of the y-axis                                                             |
| stack       | boolean      | -        | false                  | Whether the data is stacked                                                              |
| colorList   | string[]     | -        | -                      | List of area fill colors                                                                 |
| configProps | object       | -        | {}                     | Custom ECharts configurations                                                            |

### Grid

| property | type   | required | default | description                                                 |
| -------- | ------ | -------- | ------- | ----------------------------------------------------------- |
| row      | number | -        | 1       | The number of rows occupied in the Grid layout container    |
| column   | number | -        | 12      | The number of columns occupied in the Grid layout container |

### Fields

| property | type   | required | default | description                                         |
| -------- | ------ | -------- | ------- | --------------------------------------------------- |
| data     | string | -        | -       | Mapping of the `data` property, `path` is supported |

### Format

| property  | type   | required | default | description                                                                                                                                              |
| --------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | Precision                                                                                                                                                |
| unit      | string | -        | -       | Unit. If a unit is set, adaptive formatting is applied. Click to view the supported [unit list](http://docs.developers.easyops.cn/docs/brick-next/units) |

### ValueAxis

| property | type   | required | default | description  |
| -------- | ------ | -------- | ------- | ------------ |
| name     | string | -        | -       | y-axis label |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
