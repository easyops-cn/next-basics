[//]: # "atom-bricks/data-view/log-keywords-statistics.ts"

# INPUTS

为了更快捷的使用，我们把相关的接口调用和数据处理封装成了[模板](developers/brick-book/template/monitor-log.keywords-statistics)，推荐使用。

| property   | type                | required | default | description                                                                                                                                                                         |
| ---------- | ------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSource | Record<string, any> | -        | -       | 数据源                                                                                                                                                                              |
| textConfig | Record<string, any> | ✔️       | -       | 配置文本的显示，其中该对象的 key 值配置的 label 项，value 配置的是值， 存在 dataSource 时， value 取的是 dataSource 上相应的属性的值， 不存在 dataSource 时，value 就代表真实数据。 |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
