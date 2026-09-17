[//]: # "business-bricks/cmdb-instances/instance-export-modal.ts"

# INPUTS

| property     | type   | required | default | description                                                                                                                          |
| ------------ | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| objectId     | string | ✔️       | -       | CMDB model id                                                                                                                        |
| exportParams | object | -        | -       | CMDB instance query statement. If not provided, it must be used together with the cmdb-instance.instances-list brick, and the query conditions are obtained from the querystring in the url |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description                                                        |
| ---- | ------ | ------------------------------------------------------------------ |
| open | -      | Call this method to pop up a modal that guides exporting instance data |
