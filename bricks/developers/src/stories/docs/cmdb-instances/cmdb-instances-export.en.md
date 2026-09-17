[//]: # "business-bricks/cmdb-instances/cmdb-instances-export.ts"

# INPUTS

| property         | type                  | required | default | description                                                                                                                                      |
| ---------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| objectId         | string                | ✔️       | -       | The model Id of the exported instances                                                                                                           |
| configProps      | ModalProps            | -        | -       | Modal props passed through to antd. For details, see: [https://ant.design/components/modal-cn/#API](https://ant.design/components/modal-cn/#API) |
| modalMode        | boolean               | -        | false   | Modal mode. You need to call the `open` and `close` methods to open and close the modal                                                          |
| instanceIds      | string[]              | -        | -       | List of instanceIds of the exported instances, which overrides `only_my_instance` and `query`                                                    |
| selectFields     | string[]              | -        | -       | When `export current displayed columns` is selected, specifies the exported fields (columns)                                                     |
| only_my_instance | boolean               | -        | false   | Only export `my instances`                                                                                                                       |
| query            | `Record<string, any>` | -        | -       | Query conditions of the exported instances. Only instances matching the query conditions are exported                                            |

# METHODS

| name  | params | description                                               |
| ----- | ------ | --------------------------------------------------------- |
| open  | -      | Pop up the modal. Only available when `modalMode` is true |
| close | -      | Close the modal. Only available when `modalMode` is true  |

# EVENTS

| type           | detail            | description                                                                                                                                   |
| -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| modal.open     | any               | Emitted when the modal is opened. The detail contains information such as objectId, instanceIds, query, selectFields and only_my_instance     |
| modal.close    | any               | Emitted when the modal is closed. The detail contains information such as objectId, instanceIds, query, selectFields and only_my_instance     |
| export.cancel  | any               | Emitted when the export is cancelled. The detail contains information such as objectId, instanceIds, query, selectFields and only_my_instance |
| export.success | -                 | Emitted when the export succeeds                                                                                                              |
| export.error   | HttpResponseError | Emitted when the export fails                                                                                                                 |
