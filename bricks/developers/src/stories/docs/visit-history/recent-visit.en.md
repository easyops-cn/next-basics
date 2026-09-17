[//]: # "atom-bricks/other/recent-visit.ts"

> Tips: It can be used together with the brick [visit-history.push-history-record](developers/brick-book/brick/visit-history.push-history-record). Place that brick on the page where a new record needs to be added (commonly a detail page), and a visit record will be added automatically. The recent visit brick is used directly to display visit records.

# INPUTS

| property          | type                                             | required | default | description                                                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| namespace         | string                                           | ✔️       | -       | The namespace stored in brick-next-history of localStorage                                                                                                                                                                                                                  |
| property          | string                                           | ✔️       | -       | The property name stored in brick-next-history of localStorage, commonly set to `id`                                                                                                                                                                                        |
| visitCountLimit   | string                                           | -        | 5       | The number of recent visits to read                                                                                                                                                                                                                                         |
| fields            | { label?: string;compareSourceProperty?:string;} | -        | -       | Which field of the list data is used as the label text. compareSourceProperty configures which data of compareSource is used as the property. Usually no configuration is needed.                                                                                           |
| detailUrlTemplate | string                                           | -        | -       | The url to navigate to when a label is clicked. Template variables are supported                                                                                                                                                                                            |
| compareSource     | Record<string,any>[]                             | -        | -       | The comparison source of the recent visit data. When not passed, the recent visit data is returned directly. When passed, the visit data is filtered to exclude data that does not exist in the comparison source; for example, deleted data will not be shown on the page. |

> Tips: Can be used with the following providers

| provider name                          | args                                                        | description         |
| -------------------------------------- | ----------------------------------------------------------- | ------------------- |
| "visit-history.provider-push-history"  | (namespace: string, property: any, data: any)               | Add a visit record  |
| "visit-history.provider-get-history"   | (namespace: string, property: any, visitCountLimit: number) | Get visit records   |
| "visit-history.provider-clear-history" | (namespace: string, property: any)                          | Clear visit records |

# EVENTS

| type               | detail | description                                                                                     |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------- |
| recent.visit.click | object | The click event of a recent visit label. The event content is the visit record that was clicked |
