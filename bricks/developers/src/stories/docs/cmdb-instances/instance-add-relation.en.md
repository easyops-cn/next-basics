[//]: # "business-bricks/cmdb-instances/instance-add-relation.ts"

# INPUTS

| property       | type     | required | default | description                          |
| -------------- | -------- | -------- | ------- | ------------------------------------ |
| objectId       | string   | true     | -       | CMDB model ID                        |
| instanceId     | string   | true     | -       | Instance ID                          |
| relationSideId | string   | true     | -       | Peer relation ID                     |
| selectedKeys   | string[] | false    | -       | List of associated instance IDs      |
| visible        | boolean  | true     | -       | Whether to display the add relation button |

# EVENTS

| type                   | detail                               | description                    |
| ---------------------- | ------------------------------------ | ------------------------------ |
| open.instanceListModal | objectId: string, presetConfigs: any | Open modal event               |
| update.single.success  | result: 'success'                    | Add relation success event     |
| update.single.failed   | result: 'failed'                     | Add relation failure event     |
