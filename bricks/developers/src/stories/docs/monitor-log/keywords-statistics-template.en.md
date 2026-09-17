[//]: # "business-bricks/monitor-log/log-keywords-statistics-template.ts"

# INPUTS

| params    | type                         | required | default | description                       |
| --------- | ---------------------------- | -------- | ------- | --------------------------------- |
| fPath     | string                       | ✔️       | -       | File path to collect statistics on |
| keywords  | string[]                     | ✔️       | -       | Keywords to collect statistics on; can be multiple |
| lastLines | number                       | ✔️       | -       | Indicates collecting statistics on the last few lines |
| targets   | Arrary<{instanceId: string}> | ✔️       | -       | Target hosts on which to run the statistics |

