[//]: # "atom-bricks/general-tables/searchable-table.ts"

# 描述

带搜索框的通用表格（后台搜索）

<details>
<summary>History</summary>

| Version | Change                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| 1.8.0   | 支持表格行展开自定义构件，详见[brick-table](developers/brick-book/brick/presentational-bricks.brick-table) |
| 1.7.0   | 新属性 `searchEvents` 和 `showSearch`                                                                      |
| 1.5.0   | 新属性 `tableEvents`                                                                                       |
| 1.4.0   | 新属性 `belowSearchBricks`                                                                                 |

</details>

# INPUTS

| property           | type                                                                                              | required | default | description                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| showSearch         | boolean                                                                                           | -        | true    | 是否显示搜索框                                                                                           |
| searchProps        | Record<string, any>                                                                               | -        | -       | [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)的一些属性 |
| searchEvents       | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)的事件     |
| columns            | CustomColumn[]                                                                                    | ✔️       | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 columns                 |
| fields             | object                                                                                            | -        | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 fields                  |
| tableProps         | any                                                                                               | -        | -       | [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的一些属性                   |
| tableEvents        | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的事件                       |
| dataSource         | Record<string, any>                                                                               | ✔️       | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 dataSource              |
| showCard           | boolean                                                                                           | -        | true    | 是否显示外层卡片                                                                                         |
| cardProps          | object                                                                                            | -        | -       | 配置外层卡片相关属性 具体详情参考 [通用卡片构件](developers/brick-book/brick/basic-bricks.general-card)  |
| toolbarBricks      | BrickConf[]                                                                                       | -        | -       | 右上角操作区的 bricks。                                                                                  |
| beforeSearchBricks | BrickConf[]                                                                                       | -        | -       | 搜索框前面插入的 bricks。                                                                                |
| afterSearchBricks  | BrickConf[]                                                                                       | -        | -       | 搜索框后面插入的 bricks。                                                                                |
| belowSearchBricks  | BrickConf[]                                                                                       | -        | -       | 搜索框下面插入的 bricks。                                                                                |
