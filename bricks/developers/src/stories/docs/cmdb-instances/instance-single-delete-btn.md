[//]: # "business-bricks/cmdb-instances/instance-single-delete-btn.ts"

<details>
<summary>History</summary>

| Version | Change                 |
| ------- | ---------------------- |
| 1.10.0  | 新增 `events` 事件配置 |

</details>

# INPUTS

| property    | type                                                                                              | required | default | description                                                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| objectId    | string                                                                                            | ✔️       | -       | 模型 id                                                                                                                                                                                                                  | - |
| instanceId  | string                                                                                            | ✔️       | -       | 实例 id                                                                                                                                                                                                                  | - |
| redirectUrl | string                                                                                            | ✔️       | -       | 删除成功后跳转的 url, 也可以通过 event 配置跳转，需要注意的是当配置该属性后，不要在 events 中额外再调用相关跳转的事件避免冲突                                                                                            | - |
| btnName     | string                                                                                            | -        | 删除    | 按钮名称                                                                                                                                                                                                                 | - |
| type        | `default \| primary \| ghost \| dashed \| danger \| link`                                         | -️       | danger  | 按钮样式类型                                                                                                                                                                                                             | - |
| style       | Object                                                                                            | -        | -       | 样式                                                                                                                                                                                                                     | - |
| events      | [BrickEventsMap](http://docs.developers.easyops.cn/docs/api-reference/brick-types.brickeventsmap) | -        | -       | 事件配置, 这里直接配置事件动作不需要指定事件名（如 demo 所示），该事件内部会在点击删除按钮后直接调用，该构件也支持直接快捷的设置 url 跳转的属性 redirectUrl， 当配置该属性时不要再 events 中额外再配置路由跳转的相关事件 | - |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
