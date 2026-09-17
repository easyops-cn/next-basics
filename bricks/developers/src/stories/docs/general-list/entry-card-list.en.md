[//]: # "atom-bricks/card/entry-card-list.ts"

# Description

The entry card list. When iconColor is not set, the icon color is generated according to the designer's design.

# INPUTS

| property            | type                                                                              | required | default | description                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| showCard            | boolean                                                                           | -        | true    | Whether to show the outer card                                                                                                                   |
| cardProps           | object                                                                            | -        | -       | Configure the related properties of the outer card. For details, see [General Card Brick](developers/brick-book/brick/basic-bricks.general-card) |
| dataSource          | Record<string, any>[]                                                             | ✔️       | -       | The data source of card information                                                                                                              |
| fields              | { cardTitle?: string; icon?:string;iconColor?:string; }                           | -        | -       | Field mapping. Used together with dataSource to obtain the runtime cardTitle, icon and iconColor                                                 |
| iconColor           | 'purple'/'red'/'softOrange'/'cyan'/'blue'/'darkPurple'/'lightCyan'/'brightOrange' | -        | -       | The color of the icon. Set it here only when all card items have the same icon color; otherwise set it in fields and dataSource                  |
| urlTemplate         | string                                                                            | -        | -       | The card redirect url. Supports template variables                                                                                               |
| emptyResultSubTitle | string                                                                            | -        | -       | The title text of the result tip                                                                                                                 |
