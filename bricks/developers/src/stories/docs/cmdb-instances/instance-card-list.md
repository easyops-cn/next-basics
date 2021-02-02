[//]: # "business-bricks/cmdb-instances/instance-card-list.ts"

# INPUTS

| property           | type                                                                              | required | default | description                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| objectId           | string                                                                            | true     | -       | CMDB 模型 ID                                                                                                                             |
| column             | 1 &#124; 2 &#124; 3 &#124; 4 &#124; 6 &#124; 8 &#124; 12 &#124; 24                | false    | 3       | 每行列数                                                                                                                                 |
| q                  | string                                                                            | false    | -       | 搜索框指定搜索值                                                                                                                         |
| showStatistics     | boolean                                                                           | false    | -       | 显示统计信息                                                                                                                             |
| selectedCategory   | string                                                                            | false    | -       | 默认选中的分类                                                                                                                           |
| detailUrlTemplates | Record&lt;string, string&gt;;                                                     | false    | -       | 自定义卡片 url                                                                                                                           |
| card               | Object(可配置字段见 [card 配置项](# card 配置项) )                                | true     | -       | 卡片配置项                                                                                                                               |
| category           | {field: string;theme?: "button"&#124;"tag";showCount?: number;pageSize?: number;} | false    | -       | 分类配置项。field：分类字段；theme：显示样式；showCount：初始化时显示内容的分类数量，为`0`时显示全部分类；pageSize：分类内分页的每页数量 |  |
| features           | Object(可配置字段见 [features 配置项](# features 配置项) )                        | false    | -       | 功能配置项                                                                                                                               |

# card 配置项

| property | type                                                                                                                                                                    | required | default     | description                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| title    | { field?: string; text?: string;}                                                                                                                                       | false    | name 字段值 | field: 指定卡片标题展示的字段；text: 指定卡片标题展示的文本，优先展示                                                      |
| fields   | string[]                                                                                                                                                                | false    | -           | 卡片展示的内容字段                                                                                                         |
| icon     | { name?: string; style?: Record&lt;string, string&gt;;}                                                                                                                 | false    | -           | 卡片图标（暂只支出 antd 内置图标）。name 为 Icon 对应 type，style 为图标自定义样式                                         |
| btnLeft  | { text?: string; style?: Record&lt;string, string&gt;;}                                                                                                                 | false    | -           | 左侧按钮配置项。text 为按钮文本，style 为按钮自定义样式                                                                    |
| btnRight | { text?: string; style?: Record&lt;string, string&gt;;}                                                                                                                 | false    | -           | 右侧按钮配置项。text 为按钮文本，style 为按钮自定义样式                                                                    |
| badge    | { field?: string; default: {text: string; style?: Record&lt;string, string&gt;;};custom?: Record&lt;string, {text: string; style?: Record&lt;string, string&gt;;}&gt;;} | false    | -           | 卡片右上角标配置项。field 为指定字段，custom 为对于 field 字段的不同值的配置。default 为当  未匹配到 custom 值时的默认配置 |

# features 配置项

| property | type                                  | required | default | description |
| -------- | ------------------------------------- | -------- | ------- | ----------- |
| search   | {placeholder?: string} &#124; boolean | false    | true    | 搜索功能    |
| create   | boolean                               | false    | true    | 创建功能    |

# EVENTS

| type                     | detail                                       | description          |
| ------------------------ | -------------------------------------------- | -------------------- |
| read.search.change       | q: string                                    | 搜索事件             |
| read.category.change     | selected: string                             | 筛选分类事件         |
| read.multiple.clickItem  | id: string                                   | 点击卡片事件         |
| read.card.leftBtn.click  | data: {instanceId: string, objectId: string} | 点击卡片左侧按钮事件 |
| read.card.rightBtn.click | data: {instanceId: string, objectId: string} | 点击卡片右侧按钮事件 |
| read.multiple.create     |                                              | 点击创建按钮事件     |
