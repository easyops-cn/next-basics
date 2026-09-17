[//]: # "business-bricks/cmdb-instances/instance-multi-edit.ts"

# INPUTS

| property     | type     | required | default | description                        |
| ------------ | -------- | -------- | ------- | ---------------------------------- |
| objectId     | string   | true     | -       | Model ID                           |
| selectedKeys | string[] | true     | -       | The instance IDs for batch editing |
| isApprove    | boolean  | false    | -       | Whether to batch approve           |

# EVENTS

| type                  | detail     | description                       |
| --------------------- | ---------- | --------------------------------- |
| update.multi.success  | 'success'  | Batch editing instances succeeded |
| update.multi.canceled | 'canceled' | Batch editing instances canceled  |

# METHODS

| name            | params  | description                |
| --------------- | ------- | -------------------------- |
| onHandleVisible | boolean | Open&#124;close the dialog |
