[//]: # "business-bricks/cmdb-instances/cmdb-instances-export.ts"

# INPUTS

| property         | type                  | required | default | description                                                                                                                     |
| ---------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| objectId         | string                | ✔️       | -       | 导出实例的模型 Id                                                                                                               |
| configProps      | ModalProps            | -        | -       | 完全透传给 antd 的 Modal 属性，详见：[https://ant.design/components/modal-cn/#API](https://ant.design/components/modal-cn/#API) |
| modalMode        | boolean               | -        | false   | 弹窗模式，需要调用 open、close 方法来打开、关闭模态框                                                                           |
| instanceIds      | string[]              | -        | -       | 导出实例的 instanceId 列表，会覆盖 only_my_instance 和 query                                                                    |
| selectFields     | string[]              | -        | -       | 选择`导出当前显示列`时，指定导出字段（列）                                                                                      |
| only_my_instance | boolean               | -        | false   | 仅导出`我的实例`                                                                                                                |
| query            | `Record<string, any>` | -        | -       | 导出实例的查询条件, 只会导出符合查询条件的实例                                                                                  |

# METHODS

| name  | params | description                             |
| ----- | ------ | --------------------------------------- |
| open  | -      | 弹出模态框，仅 modalMode 为 true 时可用 |
| close | -      | 关闭模态框，仅 modalMode 为 true 时可用 |

# EVENTS

| type           | detail            | description                                                                                            |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| modal.open     | any               | 打开 modal 时发出该事件, detail 为 objectId、instanceIds、query、selectFields、only_my_instance 等信息 |
| modal.close    | any               | 关闭 modal 时发出该事件，detail 为 objectId、instanceIds、query、selectFields、only_my_instance 等信息 |
| export.cancel  | any               | 取消导出时发出该事件，detail 为 objectId、instanceIds、query、selectFields、only_my_instance 等信息    |
| export.success | -                 | 导出成功时发出该事件                                                                                   |
| export.error   | HttpResponseError | 导出失败时发出该事件                                                                                   |
