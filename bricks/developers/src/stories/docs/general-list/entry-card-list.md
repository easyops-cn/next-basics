[//]: # "atom-bricks/card/entry-card-list.ts"

# 描述

入口卡片列表，当不设置 iconColor 的时候，会按照设计师的设计生成图标颜色。

# INPUTS

| property            | type                                                                              | required | default | description                                                                                             |
| ------------------- | --------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| showCard            | boolean                                                                           | -        | true    | 是否显示外层卡片                                                                                        |
| cardProps           | object                                                                            | -        | -       | 配置外层卡片相关属性 具体详情参考 [通用卡片构件](developers/brick-book/brick/basic-bricks.general-card) |
| dataSource          | Record<string, any>[]                                                             | ✔️       | -       | 卡片信息数据源                                                                                          |
| fields              | { cardTitle?: string; icon?:string;iconColor?:string; }                           | -        | -       | 字段映射, 跟 dataSource 一起使用来获得运行时 cardTitle、icon、iconColor                                 |
| iconColor           | 'purple'/'red'/'softOrange'/'cyan'/'blue'/'darkPurple'/'lightCyan'/'brightOrange' | -        | -       | icon 的颜色。如果所有卡片项的图标颜色一样，才在这里设置，否则在 fields 和 dataSource 中设置             |
| urlTemplate         | string                                                                            | -        | -       | 卡片跳转 url，支持模版变量                                                                              |
| emptyResultSubTitle | string                                                                            | -        | -       | 结果提示标题文字                                                                                        |
