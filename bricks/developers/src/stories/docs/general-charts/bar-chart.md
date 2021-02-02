[//]: # "atom-bricks/chart/bar-chart.ts"

# INPUTS

| property    | type         | required | default                | description                              |
| ----------- | ------------ | -------- | ---------------------- | ---------------------------------------- |
| grid        | false / Grid | -        | { row: 1, column: 12 } | 柱状图构件在 Grid 布局容器中所占的行列数 |
| showCard    | boolean      | -        | true                   | 是否展示卡片背景                         |
| title       | string       | -        | -                      | 标题                                     |
| dataSource  | object       | -        | -                      | 数据源                                   |
| fields      | Fields       | -        | -                      | 数据字段映射，支持 path 指定             |
| data        | number[][]   | -        | -                      | 数据                                     |
| format      | Format       | -        | -                      | 数据的转换格式                           |
| valueAxis   | ValueAxis    | -        | {}                     | y 轴的相关配置                           |
| stack       | boolean      | -        | false                  | 数据是否堆叠                             |
| colorList   | string[]     | -        | -                      | 区域填充颜色列表                         |
| configProps | object       | -        | {}                     | 自定义 ECharts 的配置                    |

### Grid

| property | type   | required | default | description                  |
| -------- | ------ | -------- | ------- | ---------------------------- |
| row      | number | -        | 1       | 在 Grid 布局容器中所占的行数 |
| column   | number | -        | 12      | 在 Grid 布局容器中所占的列数 |

### Fields

| property | type   | required | default | description                   |
| -------- | ------ | -------- | ------- | ----------------------------- |
| data     | string | -        | -       | data 属性映射，支持 path 指定 |

### Format

| property  | type   | required | default | description                                                                                                     |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| precision | number | -        | -       | 精度                                                                                                            |
| unit      | string | -        | -       | 单位，如果设置了单位会做自适应，点击查看支持[单位列表](http://docs.developers.easyops.cn/docs/brick-next/units) |

### ValueAxis

| property | type   | required | default | description |
| -------- | ------ | -------- | ------- | ----------- |
| name     | string | -        | -       | y 轴标签    |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
