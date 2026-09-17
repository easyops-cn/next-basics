[//]: # "atom-bricks/general-tables/searchable-table.ts"

# Description

A general table with a search box (backend search)

<details>
<summary>History</summary>

| Version | Change                                                                                                                           |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1.8.0   | Supports custom bricks for table row expansion, see [brick-table](developers/brick-book/brick/presentational-bricks.brick-table) |
| 1.7.0   | New properties `searchEvents` and `showSearch`                                                                                   |
| 1.5.0   | New property `tableEvents`                                                                                                       |
| 1.4.0   | New property `belowSearchBricks`                                                                                                 |

</details>

# INPUTS

| property           | type                                                                                              | required | default | description                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| showSearch         | boolean                                                                                           | -        | true    | Whether to show the search box                                                                                             |
| searchProps        | Record<string, any>                                                                               | -        | -       | Some properties of [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)          |
| searchEvents       | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | Events of [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)                   |
| columns            | CustomColumn[]                                                                                    | ✔️       | -       | Same as the `columns` of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                      |
| fields             | object                                                                                            | -        | -       | Same as the `fields` of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                       |
| tableProps         | any                                                                                               | -        | -       | Some properties of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                            |
| tableEvents        | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | Events of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                                     |
| dataSource         | Record<string, any>                                                                               | ✔️       | -       | Same as the `dataSource` of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table)                   |
| showCard           | boolean                                                                                           | -        | true    | Whether to show the outer card                                                                                             |
| cardProps          | object                                                                                            | -        | -       | Properties of the outer card. For details, see [General Card brick](developers/brick-book/brick/basic-bricks.general-card) |
| toolbarBricks      | BrickConf[]                                                                                       | -        | -       | The bricks in the top-right action area.                                                                                   |
| beforeSearchBricks | BrickConf[]                                                                                       | -        | -       | The bricks inserted before the search box.                                                                                 |
| afterSearchBricks  | BrickConf[]                                                                                       | -        | -       | The bricks inserted after the search box.                                                                                  |
| belowSearchBricks  | BrickConf[]                                                                                       | -        | -       | The bricks inserted below the search box.                                                                                  |
