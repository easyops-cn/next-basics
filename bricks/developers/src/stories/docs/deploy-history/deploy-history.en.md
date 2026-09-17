[//]: # "business-bricks/deploy/deploy-list.ts"

<details>
<summary>History</summary>

| Version | Change                            |
| ------- | --------------------------------- |
| 1.0.4   | Added the params `showCard` and `cardProps` |

</details>

# INPUTS

| property   | type                                                     | required | default | description                                                                                                              |
| ---------- | -------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| app_id     | string                                                   | -        | -       | Deployment information of a specific application; all are displayed by default when it is not filled                    |
| start_time | number \| now-1h \| now-1d \| now/d \| now-7d \| now-30d | -        | -       | Start of the time range to query                                                                                         |
| end_time   | number                                                   | -        | -       | End of the time range to query; used together when the start is a timestamp                                              |
| query      | string                                                   | -        | `''`    | Query related deployment information by keyword                                                                          |
| page_size  | number                                                   | -        | 10      | Configure the number of items displayed on each page of the deployment list                                              |
| page       | number                                                   | -        | 1       | Page number for querying deployment information                                                                          |
| linkUrl    | string                                                   | -        | -       | Configure the redirect route of the first column of the deployment list. Variables are supported, such as `/developers/#{app_id}`; variables can be replaced with specific values according to the information of each deployment entry. |
| showCard   | boolean                                                  | -        | true    | Whether to display the outer card                                                                                        |
| cardProps  | Record<string, any>                                      | -        | -       | Configure properties related to the outer card. For details, see [general card brick](developers/brick-book/brick/basic-bricks.general-card) |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
