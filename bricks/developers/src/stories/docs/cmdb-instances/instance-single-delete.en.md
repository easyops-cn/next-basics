[//]: # "business-bricks/cmdb-instances/instance-single-delete.ts"

# INPUTS

| property   | type   | required | default | description |
| ---------- | ------ | -------- | ------- | ----------- |
| objectId   | string | true     | -       | Model ID     |
| instanceId | string | true     | -       | Instance ID     |

# EVENTS

| type                   | detail     | description    |
| ---------------------- | ---------- | -------------- |
| delete.single.success  | 'success'  | Single instance deleted successfully |
| delete.single.canceled | 'canceled' | Single instance deletion canceled |
| delete.single.failed   | 'error'    | Failed to delete the single instance |
