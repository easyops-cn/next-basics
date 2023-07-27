[//]: # "business-bricks/cmdb-instances/cmdb-instances-import.ts"

# INPUTS

| property    | type       | required | default | description                                                                                                                     |
| ----------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| objectId    | string     | ✔️       | -       | 导入实例的模型 Id                                                                                                               |
| configProps | ModalProps | -        | -       | 完全透传给 antd 的 Modal 属性，详见：[https://ant.design/components/modal-cn/#API](https://ant.design/components/modal-cn/#API) |
| modalMode   | boolean    | -        | false   | 弹窗模式，需要调用 open、close 方法来打开、关闭模态框                                                                           |

# METHODS

| name  | params | description                             |
| ----- | ------ | --------------------------------------- |
| open  | -      | 弹出模态框，仅 modalMode 为 true 时可用 |
| close | -      | 关闭模态框，仅 modalMode 为 true 时可用 |

# EVENTS

| type              | detail            | description                                        |
| ----------------- | ----------------- | -------------------------------------------------- |
| modal.open        | any               | 打开 modal 时发出该事件, detail 为 objectId 等信息 |
| modal.close       | any               | 关闭 modal 时发出该事件, detail 为 objectId 等信息 |
| import.cancel     | any               | 取消导入时发出该事件, detail 为 objectId 等信息    |
| import.success.ok | -                 | 导入成功后，按确认时发出该事件                     |
| import.error.ok   | HttpResponseError | 导入失败后，按确认时发出该事件                     |
