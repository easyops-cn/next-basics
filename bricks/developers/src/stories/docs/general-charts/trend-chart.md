[//]: # "atom-bricks/chart/trend-chart.ts"

# INPUTS

| property    | type                        | required | default                | description                                                                                                   |
| ----------- | --------------------------- | -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| grid        | false / Grid                | -        | { row: 1, column: 12 } | 趋势构件在 Grid 布局容器中所占的行列数                                                                        |
| showCard    | boolean                     | -        | true                   | 是否展示卡片背景                                                                                              |
| title       | string                      | -        | -                      | 标题                                                                                                          |
| dataSource  | object                      | -        | -                      | 数据源                                                                                                        |
| fields      | Fields                      | -        | -                      | 数据字段映射，支持 path 指定                                                                                  |
| data        | TrendChartData              | -        | -                      | 数据                                                                                                          |
| nullValue   | "null" / "zero" / "connect" | -        | "null"                 | 数值为空值时如何展示。指定为"null"时不进行数值填充，指定为"zero"时填充数值为 0，指定为"connect"则连接前后数值 |
| format      | Format                      | -        | -                      | 数据的转换格式                                                                                                |
| yAxis       | YAxis                       | -        | -                      | Y 轴特性                                                                                                      |
| colorList   | string[]                    | -        | -                      | 区域填充颜色列表                                                                                              |  |
| configProps | ChartProps                  | -        | {}                     | 自定义 ECharts 的配置，详见下文                                                                               |

### Grid

| property | type   | required | default | description                  |
| -------- | ------ | -------- | ------- | ---------------------------- |
| row      | number | -        | 1       | 在 Grid 布局容器中所占的行数 |
| column   | number | -        | 12      | 在 Grid 布局容器中所占的列数 |

### Fields

| property | type   | required | default | description                   |
| -------- | ------ | -------- | ------- | ----------------------------- |
| data     | string | -        | -       | data 属性映射，支持 path 指定 |

### TrendChartData

| property      | type        | required | default | description |
| ------------- | ----------- | -------- | ------- | ----------- |
| timeSeries    | number[]    | ✔️       | -       | 时间序列    |
| legendList    | string[]    | ✔️       | -       | 图例列表    |
| trendDataList | TrendData[] | ✔️       | -       | 数据序列    |

### YAxis

| property | type   | required | default | description |
| -------- | ------ | -------- | ------- | ----------- |
| name     | string | -        | -       | Y 轴标签    |

### TrendData

| property | type   | required | default | description  |
| -------- | ------ | -------- | ------- | ------------ |
| id       | string | ✔️       | -       | ID           |
| name     | string | ✔️       | -       | 数据序列名称 |
| data     | number | ✔️       | -       | 数据序列值   |

### Format

| property  | type   | required | default | description                                                                                                     |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | 精度                                                                                                            |
| unit      | string | -        | -       | 单位，如果设置了单位会做自适应，点击查看支持[单位列表](http://docs.developers.easyops.cn/docs/brick-next/units) |

### ChartProps

| property   | type       | required | default | description                          |
| ---------- | ---------- | -------- | ------- | ------------------------------------ |
| type       | string     | -        | -       | 目前支持`line`和`bar`                |
| symbolSize | number     | -        | -       | 曲线上的圆圈标记，默认为 0，即不显示 |
| yAxis      | yAxisProps | -        | -       | Y 轴的配置                           |

上述是将一些常见的配置抽了出来，可按官方文档配置更多的属性，更多点击[查看](https://www.echartsjs.com/zh/option.html)，如：

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

| property    | type   | required | default | description |
| ----------- | ------ | -------- | ------- | ----------- |
| minInterval | number | -        | -       | 最小间隔    |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
