[//]: # "atom-bricks/chart/pie-chart.ts"

# INPUTS

| property    | type         | required | default                | description                            |
| ----------- | ------------ | -------- | ---------------------- | -------------------------------------- |
| grid        | false / Grid | -        | { row: 1, column: 12 } | 饼图构件在 Grid 布局容器中所占的行列数 |
| showCard    | boolean      | -        | true                   | 是否展示卡片背景                       |
| title       | string       | -        | -                      | 标题                                   |
| dataSource  | object       | -        | -                      | 数据源                                 |
| fields      | Fields       | -        | -                      | 数据字段映射，支持 path 指定           |
| data        | PieChartData | -        | -                      | 数据                                   |
| format      | Format       | -        | -                      | 数据的转换格式                         |
| colorList   | string[]     | -        | -                      | 区域填充颜色列表                       |
| configProps | object       | -        | {}                     | 自定义 ECharts 的配置                  |

### Grid

| property | type   | required | default | description                  |
| -------- | ------ | -------- | ------- | ---------------------------- |
| row      | number | -        | 1       | 在 Grid 布局容器中所占的行数 |
| column   | number | -        | 12      | 在 Grid 布局容器中所占的列数 |

### Fields

| property | type   | required | default | description                   |
| -------- | ------ | -------- | ------- | ----------------------------- |
| data     | string | -        | -       | data 属性映射，支持 path 指定 |

### PieChartData

| property   | type         | required | default | description |
| ---------- | ------------ | -------- | ------- | ----------- |
| legendList | string[]     | ✔️       | -       | 图例列表    |
| seriesData | SeriesData[] | ✔️       | -       | 数据序列    |

### SeriesData

| property | type   | required | default | description  |
| -------- | ------ | -------- | ------- | ------------ |
| name     | string | ✔️       | -       | 数据序列名称 |
| value    | number | ✔️       | -       | 数据序列值   |

### Format

| property  | type   | required | default | description                                                                                                     |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | 精度                                                                                                            |
| unit      | string | -        | -       | 单位，如果设置了单位会做自适应，点击查看支持[单位列表](http://docs.developers.easyops.cn/docs/brick-next/units) |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
