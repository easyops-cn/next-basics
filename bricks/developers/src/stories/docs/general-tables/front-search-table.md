[//]: # "atom-bricks/general-tables/front-search-table.ts"

# 描述

通用的前端搜索表格

<details>
<summary>History</summary>

| Version | Change                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| 1.9.0   | 新属性 `shouldUpdateUrlParams`                                                                             |
| 1.8.0   | 支持表格行展开自定义构件，详见[brick-table](developers/brick-book/brick/presentational-bricks.brick-table) |
| 1.6.0   | 新属性 `debounceTime`、`searchProps`                                                                       |
| 1.5.0   | 新属性 `tableEvents`                                                                                       |
| 1.4.0   | 新属性 `belowSearchBricks`                                                                                 |

</details>

# INPUTS

| property              | type                                                                                              | required | default | description                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| dataSource            | Record<string, any>                                                                               | ✔️       | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 dataSource                         |
| columns               | CustomColumn[]                                                                                    | ✔️       | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 columns                            |
| fields                | object                                                                                            | -        | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 fields                             |
| tableProps            | any                                                                                               | -        | -       | [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的一些属性                              |
| tableEvents           | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的事件                                  |
| defaultValKey         | string                                                                                            | -        | q       | 指定 key，从 url 获取搜索默认值。当`shouldUpdateUrlParams`为 false 时，该属性不生效。                               |
| debounceTime          | number                                                                                            | false    | 500     | 搜索默认延迟时间                                                                                                    |
| searchProps           | any                                                                                               | -        | -       | 搜索框[brick-input](developers/brick-book/brick/presentational-bricks.brick-input)的一些属性                        |
| placeholder           | string                                                                                            | -        | -       | 输入提示语                                                                                                          |
| trigger               | enum                                                                                              | -        | change  | 触发方式，可选`change、enter`                                                                                       |
| frontSearchFilterKeys | string[]                                                                                          | -        | -       | 进行前端搜索的字段，支持嵌套的写法如["name","value.a"]，不配置的时候默认为对所有 columns 的 dataIndex[]进行前端搜索 |
| showCard              | boolean                                                                                           | -        | true    | 是否显示外层卡片                                                                                                    |
| cardProps             | object                                                                                            | -        | -       | 配置外层卡片相关属性 具体详情参考 [通用卡片构件](developers/brick-book/brick/basic-bricks.general-card)             |
| toolbarBricks         | BrickConf[]                                                                                       | -        | -       | 右上角操作区的 bricks。                                                                                             |
| beforeSearchBricks    | BrickConf[]                                                                                       | -        | -       | 搜索框前面插入的 bricks。                                                                                           |
| afterSearchBricks     | BrickConf[]                                                                                       | -        | -       | 搜索框后面插入的 bricks。                                                                                           |
| belowSearchBricks     | BrickConf[]                                                                                       | -        | -       | 搜索框下面插入的 bricks。                                                                                           |
| shouldUpdateUrlParams | boolean                                                                                           | -        | true    | 是否更新 url 参数。                                                                                                 |
