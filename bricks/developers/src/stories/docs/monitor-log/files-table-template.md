[//]: # "business-bricks/monitor-log/files-table-template.ts"

# INPUTS

| params            | type                         | required | default | description        |
| ----------------- | ---------------------------- | -------- | ------- | ------------------ |
| fPath             | string                       | ✔️       | -       | 目录的路径         |
| targets           | Arrary<{instanceId: string}> | ✔️       | -       | 执行统计的目标主机 |
| detailUrlTemplate | string                       | -        | -       | 跳转 url           |
