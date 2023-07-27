[//]: # "business-bricks/monitor-log/log-keywords-statistics-template.ts"

# INPUTS

| params    | type                         | required | default | description            |
| --------- | ---------------------------- | -------- | ------- | ---------------------- |
| fPath     | string                       | ✔️       | -       | 统计的文件路径         |
| keywords  | string[]                     | ✔️       | -       | 统计的关键字可以是多个 |
| lastLines | number                       | ✔️       | -       | 表示统计最后几行       |
| targets   | Arrary<{instanceId: string}> | ✔️       | -       | 执行统计的目标主机     |
