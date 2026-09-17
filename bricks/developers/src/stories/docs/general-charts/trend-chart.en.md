[//]: # "atom-bricks/chart/trend-chart.ts"

# INPUTS

| property    | type                        | required | default                | description                                                                          |
| ----------- | --------------------------- | -------- | ---------------------- | ------------------------------------------------------------------------------------ |
| grid        | false / Grid                | -        | { row: 1, column: 12 } | The number of rows and columns occupied by the trend brick in the Grid layout container |
| showCard    | boolean                     | -        | true                   | Whether to show the card background                                                  |
| title       | string                      | -        | -                      | Title                                                                                |
| dataSource  | object                      | -        | -                      | Data source                                                                          |
| fields      | Fields                      | -        | -                      | Data field mapping, supports specifying a path                                       |
| data        | TrendChartData              | -        | -                      | Data                                                                                 |
| nullValue   | "null" / "zero" / "connect" | -        | "null"                 | How to display when the value is null. When set to "null", no value is filled; when set to "zero", the value is filled with 0; when set to "connect", the previous and next values are connected |
| format      | Format                      | -        | -                      | The transformation format of the data                                                |
| yAxis       | YAxis                       | -        | -                      | Y axis features                                                                      |
| colorList   | string[]                    | -        | -                      | List of area fill colors                                                             |  |
| configProps | ChartProps                  | -        | {}                     | Custom ECharts configuration, see below for details                                  |

### Grid

| property | type   | required | default | description                                            |
| -------- | ------ | -------- | ------- | ------------------------------------------------------ |
| row      | number | -        | 1       | Number of rows occupied in the Grid layout container   |
| column   | number | -        | 12      | Number of columns occupied in the Grid layout container |

### Fields

| property | type   | required | default | description                                        |
| -------- | ------ | -------- | ------- | -------------------------------------------------- |
| data     | string | -        | -       | Mapping of the data property, supports specifying a path |

### TrendChartData

| property      | type        | required | default | description |
| ------------- | ----------- | -------- | ------- | ----------- |
| timeSeries    | number[]    | ✔️       | -       | Time series |
| legendList    | string[]    | ✔️       | -       | Legend list |
| trendDataList | TrendData[] | ✔️       | -       | Data series |

### YAxis

| property | type   | required | default | description   |
| -------- | ------ | -------- | ------- | ------------- |
| name     | string | -        | -       | Y axis label  |

### TrendData

| property | type   | required | default | description       |
| -------- | ------ | -------- | ------- | ----------------- |
| id       | string | ✔️       | -       | ID                |
| name     | string | ✔️       | -       | Data series name  |
| data     | number | ✔️       | -       | Data series value |

### Format

| property  | type   | required | default | description                                                                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | Precision                                                                                                           |
| unit      | string | -        | -       | Unit. If a unit is set, it will be adaptive. Click to view the supported [unit list](http://docs.developers.easyops.cn/docs/brick-next/units) |

### ChartProps

| property   | type       | required | default | description                                                  |
| ---------- | ---------- | -------- | ------- | ------------------------------------------------------------ |
| type       | string     | -        | -       | Currently supports `line` and `bar`                          |
| symbolSize | number     | -        | -       | The circle marker on the curve, defaults to 0, meaning not displayed |
| yAxis      | yAxisProps | -        | -       | Y axis configuration                                         |

The above extracts some common configurations. More properties can be configured according to the official documentation; click [here](https://www.echartsjs.com/zh/option.html) to view more, e.g.:

```
"configProps": {
  "toolbox": {
    "show": true,
    "feature": {
      "magicType": {
        "type": [
          "line",
          "bar"
        ]
      },
      "saveAsImage": {}
    }
  }
}
```

#### yAxisProps

| property    | type   | required | default | description       |
| ----------- | ------ | -------- | ------- | ----------------- |
| minInterval | number | -        | -       | Minimum interval  |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
