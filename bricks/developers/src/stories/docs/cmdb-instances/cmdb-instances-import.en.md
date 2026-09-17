[//]: # "business-bricks/cmdb-instances/cmdb-instances-import.ts"

# INPUTS

| property    | type       | required | default | description                                                                                                                                    |
| ----------- | ---------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| objectId    | string     | ✔️       | -       | The model Id for importing instances                                                                                                           |
| configProps | ModalProps | -        | -       | Modal properties passed through completely to antd, see: [https://ant.design/components/modal-cn/#API](https://ant.design/components/modal-cn/#API) |
| modalMode   | boolean    | -        | false   | Modal mode; you need to call the open and close methods to open and close the modal                                                           |

# METHODS

| name  | params | description                                          |
| ----- | ------ | ---------------------------------------------------- |
| open  | -      | Open the modal, only available when modalMode is true |
| close | -      | Close the modal, only available when modalMode is true |

# EVENTS

| type              | detail            | description                                                          |
| ----------------- | ----------------- | -------------------------------------------------------------------- |
| modal.open        | any               | Emitted when the modal is opened; the detail contains objectId and other information |
| modal.close       | any               | Emitted when the modal is closed; the detail contains objectId and other information |
| import.cancel     | any               | Emitted when the import is cancelled; the detail contains objectId and other information |
| import.success.ok | -                 | Emitted when confirm is clicked after a successful import            |
| import.error.ok   | HttpResponseError | Emitted when confirm is clicked after a failed import                |
