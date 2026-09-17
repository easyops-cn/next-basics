[//]: # "atom-bricks/general-tables/front-search-table.ts"

# Description

A general front-end search table.

<details>
<summary>History</summary>

| Version | Change                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1.9.0   | New property `shouldUpdateUrlParams`                                                                                            |
| 1.8.0   | Support custom bricks for table row expansion, see [brick-table](developers/brick-book/brick/presentational-bricks.brick-table) |
| 1.6.0   | New properties `debounceTime`, `searchProps`                                                                                    |
| 1.5.0   | New property `tableEvents`                                                                                                      |
| 1.4.0   | New property `belowSearchBricks`                                                                                                |

</details>

# INPUTS

| property              | type                                                                                              | required | default | description                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSource            | Record<string, any>                                                                               | ✔️       | -       | Same as the dataSource of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                                                                    |
| columns               | CustomColumn[]                                                                                    | ✔️       | -       | Same as the columns of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                                                                       |
| fields                | object                                                                                            | -        | -       | Same as the fields of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                                                                        |
| tableProps            | any                                                                                               | -        | -       | Some properties of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                                                                           |
| tableEvents           | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | The events of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                                                                                |
| defaultValKey         | string                                                                                            | -        | q       | Specify the key to obtain the default search value from the url. When `shouldUpdateUrlParams` is false, this property does not take effect.                                               |
| debounceTime          | number                                                                                            | false    | 500     | The default delay time of search                                                                                                                                                          |
| searchProps           | any                                                                                               | -        | -       | Some properties of the search box [brick-input](developers/brick-book/brick/presentational-bricks.brick-input)                                                                            |
| placeholder           | string                                                                                            | -        | -       | The input placeholder                                                                                                                                                                     |
| trigger               | enum                                                                                              | -        | change  | The trigger type, can be `change` or `enter`                                                                                                                                              |
| frontSearchFilterKeys | string[]                                                                                          | -        | -       | The fields for front-end search, nested notation such as ["name","value.a"] is supported. When not configured, front-end search is performed on the dataIndex[] of all columns by default |
| showCard              | boolean                                                                                           | -        | true    | Whether to show the outer card                                                                                                                                                            |
| cardProps             | object                                                                                            | -        | -       | Configure the related properties of the outer card. For details, see [General Card Brick](developers/brick-book/brick/basic-bricks.general-card)                                          |
| toolbarBricks         | BrickConf[]                                                                                       | -        | -       | The bricks of the top-right operation area.                                                                                                                                               |
| beforeSearchBricks    | BrickConf[]                                                                                       | -        | -       | The bricks inserted before the search box.                                                                                                                                                |
| afterSearchBricks     | BrickConf[]                                                                                       | -        | -       | The bricks inserted after the search box.                                                                                                                                                 |
| belowSearchBricks     | BrickConf[]                                                                                       | -        | -       | The bricks inserted below the search box.                                                                                                                                                 |
| shouldUpdateUrlParams | boolean                                                                                           | -        | true    | Whether to update the url params.                                                                                                                                                         |
