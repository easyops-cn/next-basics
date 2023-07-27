[//]: # "business-bricks/ci/flow-chart.ts"

# INPUTS

| property    | type                       | required | default | description  |
| ----------- | -------------------------- | -------- | ------- | ------------ |
| build       | BuildApi.GetResponseBody   | true     | -       | 构建信息     |
| projectData | ProjectApi.GetResponseBody | true     | -       | 项目信息     |
| showCard    | boolean                    | -        | -       | 是否显示卡片 |

# EVENTS

| type           | detail             | description                |
| -------------- | ------------------ | -------------------------- |
| select.success | object             | 选择某个步骤，具体项见下表 |
| action.refresh | cancelable:boolean | 构建刷新后触发             |

### step

| property  | type     | required | default | description        |
| --------- | -------- | -------- | ------- | ------------------ |
| name      | string   | true     | -       | step 名称          |
| log       | string   | true     | -       | 日志信息           |
| logs      | string[] | true     | -       | 日志信息, 数组形式 |
| yaml      | string   | true     | -       | 步骤 yaml 定义     |
| log_id    | string   | true     | -       | 日志 ID            |
| state     | string   | true     | -       | 状态               |
| stageName | string   | true     | -       | stage 名称         |
| started   | number   | true     | -       | 开始时间           |
| finished  | number   | true     | -       | 结束时间           |
