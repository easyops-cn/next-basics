[//]: # "business-bricks/ci/log-viewer.ts"

# INPUTS

| property | type   | required | default | description            |
| -------- | ------ | -------- | ------- | ---------------------- |
| step     | object | true     | -       | 步骤详情，具体项见下表 |

### step

| property  | type   | required | default | description    |
| --------- | ------ | -------- | ------- | -------------- |
| name      | string | true     | -       | step 名称      |
| log       | string | true     | -       | 日志信息       |
| yaml      | string | true     | -       | 步骤 yaml 定义 |
| log_id    | string | true     | -       | 日志 ID        |
| state     | string | true     | -       | 状态           |
| stageName | string | true     | -       | stage 名称     |
| started   | number | true     | -       | 开始时间       |
| finished  | number | true     | -       | 结束时间       |
