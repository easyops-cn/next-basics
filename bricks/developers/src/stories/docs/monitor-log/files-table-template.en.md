[//]: # "business-bricks/monitor-log/files-table-template.ts"

# INPUTS

| params            | type                         | required | default | description                               |
| ----------------- | ---------------------------- | -------- | ------- | ----------------------------------------- |
| fPath             | string                       | ✔️       | -       | The path of the directory                 |
| targets           | Arrary<{instanceId: string}> | ✔️       | -       | The target hosts for executing statistics |
| detailUrlTemplate | string                       | -        | -       | The navigation url                        |
