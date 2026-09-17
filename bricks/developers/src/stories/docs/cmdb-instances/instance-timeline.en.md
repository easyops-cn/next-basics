[//]: # "business-bricks/cmdb-instances/instance-timeline.ts"

# INPUTS

| property     | type    | required | default | description                  |
| ------------ | ------- | -------- | ------- | ---------------------------- |
| objectId     | string  | true     | -       | Model ID                     |
| instanceId   | string  | true     | -       | Instance ID                  |
| showFilter   | boolean | false    | false   | Whether to show the filter   |
| showRollback | boolean | false    | false   | Whether to show rollback     |

# EVENTS

| type                    | detail     | description           |
| ----------------------- | ---------- | --------------------- |
| read.multiple.clickItem | instanceId | List item click event |
