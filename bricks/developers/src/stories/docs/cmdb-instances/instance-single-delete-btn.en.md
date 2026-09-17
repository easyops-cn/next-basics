[//]: # "business-bricks/cmdb-instances/instance-single-delete-btn.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.10.0  | Added the `events` event configuration |

</details>

# INPUTS

| property    | type                                                                                              | required | default | description                                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| objectId    | string                                                                                            | ✔️       | -       | Model id                                                                                                                                                                                                                                                                                                                       | - |
| instanceId  | string                                                                                            | ✔️       | -       | Instance id                                                                                                                                                                                                                                                                                                                    | - |
| redirectUrl | string                                                                                            | ✔️       | -       | The URL to redirect to after a successful deletion. The redirect can also be configured via events. Note that when this property is configured, do not additionally call related redirect events in events to avoid conflicts                                                                                                   | - |
| btnName     | string                                                                                            | -        | Delete  | Button name                                                                                                                                                                                                                                                                                                                    | - |
| type        | `default \| primary \| ghost \| dashed \| danger \| link`                                         | -️       | danger  | Button style type                                                                                                                                                                                                                                                                                                              | - |
| style       | Object                                                                                            | -        | -       | Style                                                                                                                                                                                                                                                                                                                          | - |
| events      | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | Event configuration. Here you configure the event action directly without specifying the event name (as shown in the demo). This event is called internally right after the delete button is clicked. This brick also supports directly and conveniently setting the URL redirect property redirectUrl. When that property is configured, do not additionally configure related route redirect events in events | - |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
