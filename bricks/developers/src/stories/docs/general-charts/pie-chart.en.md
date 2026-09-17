[//]: # "atom-bricks/chart/pie-chart.ts"

# INPUTS

| property    | type         | required | default                | description                            |
| ----------- | ------------ | -------- | ---------------------- | -------------------------------------- |
| grid        | false / Grid | -        | { row: 1, column: 12 } | Number of rows and columns occupied by the pie chart brick in the Grid layout container |
| showCard    | boolean      | -        | true                   | Whether to show the card background                       |
| title       | string       | -        | -                      | Title                                   |
| dataSource  | object       | -        | -                      | Data source                                 |
| fields      | Fields       | -        | -                      | Data field mapping, supports specifying by path           |
| data        | PieChartData | -        | -                      | Data                                   |
| format      | Format       | -        | -                      | Conversion format of the data                         |
| colorList   | string[]     | -        | -                      | List of area fill colors                       |
| configProps | object       | -        | {}                     | Custom ECharts configuration                  |

### Grid

| property | type   | required | default | description                  |
| -------- | ------ | -------- | ------- | ---------------------------- |
| row      | number | -        | 1       | Number of rows occupied in the Grid layout container |
| column   | number | -        | 12      | Number of columns occupied in the Grid layout container |

### Fields

| property | type   | required | default | description                   |
| -------- | ------ | -------- | ------- | ----------------------------- |
| data     | string | -        | -       | Mapping of the data property, supports specifying by path |

### PieChartData

| property   | type         | required | default | description |
| ---------- | ------------ | -------- | ------- | ----------- |
| legendList | string[]     | ✔️       | -       | Legend list    |
| seriesData | SeriesData[] | ✔️       | -       | Data series    |

### SeriesData

| property | type   | required | default | description  |
| -------- | ------ | -------- | ------- | ------------ |
| name     | string | ✔️       | -       | Data series name |
| value    | number | ✔️       | -       | Data series value   |

### Format

| property  | type   | required | default | description                                                                                                     |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | Precision                                                                                                            |
| unit      | string | -        | -       | Unit. If a unit is set, it will be adapted automatically. Click to view the supported [unit list](http://docs.developers.easyops.cn/docs/brick-next/units) |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
