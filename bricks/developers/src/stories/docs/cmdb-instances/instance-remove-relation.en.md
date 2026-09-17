[//]: # "business-bricks/cmdb-instances/instance-remove-relation.ts"

# INPUTS

| property       | type     | required | default | description                              |
| -------------- | -------- | -------- | ------- | ---------------------------------------- |
| objectId       | string   | ✔️       | -       | CMDB model ID                            |
| instanceId     | string   | ✔️       | -       | Instance ID                              |
| relationSideId | string   | ✔️       | -       | Related instance ID                      |
| selectedKeys   | string[] | -        | -       | Instances selected by default            |
| configProps    | object   | -        | -       | Related configuration items of the ant-design Button |

# EVENTS

| type                  | detail            | description                       |
| --------------------- | ----------------- | --------------------------------- |
| update.single.success | result: 'success' | Event of successfully deleting the relation |
| update.single.failed  | result: 'failed'  | Event of failing to delete the relation |
| update.single.cancel  | result: 'cancel'  | Event of cancelling the relation deletion |
