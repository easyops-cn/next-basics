[//]: # "atom-bricks/card/searchable-card-list.ts"

<details>
<summary>History</summary>

| Version | Change                                           |
| ------- | ------------------------------------------------ |
| 1.27.0  | New properties `target`,`href`,`fields.disabled` |

</details>

# INPUTS

Extends `general-card-list`. For other properties, see [general-card-list](developers/brick-book/template/general-list.general-card-list).

| property              | type                 | required | default | description                                                                                                                                                                                                                                                                 |
| --------------------- | -------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showCard              | boolean              | -        | true    | Whether to show the outer card                                                                                                                                                                                                                                              |
| cardProps             | object               | -        | -       | Configure the related properties of the outer card. For details, see [General Card Brick](developers/brick-book/brick/basic-bricks.general-card)                                                                                                                            |
| toolbarBricks         | BrickConf[]          | -        | -       | The bricks of the top-right operation area toolbar slots.                                                                                                                                                                                                                   |
| beforeSearchBricks    | BrickConf[]          | -        | -       | The bricks inserted before the search box.                                                                                                                                                                                                                                  |
| afterSearchBricks     | BrickConf[]          | -        | -       | The bricks inserted after the search box.                                                                                                                                                                                                                                   |
| belowSearchBricks     | BrickConf[]          | -        | -       | The bricks inserted below the search box.                                                                                                                                                                                                                                   |
| searchProps           | Record<string, any>  | -        | -       | Some properties of [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)                                                                                                                                                           |
| showRecent            | boolean              | -        | false   | Whether to show the recent visits brick                                                                                                                                                                                                                                     |
| namespace             | string               | -        | -       | The namespace stored in brick-next-history in localStorage                                                                                                                                                                                                                  |
| property              | string               | -        | -       | The property stored in brick-next-history in localStorage                                                                                                                                                                                                                   |
| visitCountLimit       | number               | -        | -       | The number of recent visits to read                                                                                                                                                                                                                                         |
| label                 | string               | -        | -       | Which field of the list data is used as the label text                                                                                                                                                                                                                      |
| compareSource         | Record<string,any>[] | -        | -       | The comparison source of the recent visit data. When not passed, the recent visit data is returned directly; when passed, the visit data is filtered to exclude data that does not exist in the comparison source, for example, deleted data will not be shown on the page. |
| compareSourceProperty | string               | -        | -       | Configure which data in compareSource is used as the property. Usually no configuration is needed.                                                                                                                                                                          |
| emptyInnerHtml        | string               | -        | -       | The extra tip when there is no data, HTML format is supported                                                                                                                                                                                                               |
