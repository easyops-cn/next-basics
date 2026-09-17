[//]: # "business-bricks/ci/flow-chart.ts"

# INPUTS

| property    | type                       | required | default | description  |
| ----------- | -------------------------- | -------- | ------- | ------------ |
| build       | BuildApi.GetResponseBody   | true     | -       | Build information     |
| projectData | ProjectApi.GetResponseBody | true     | -       | Project information     |
| showCard    | boolean                    | -        | -       | Whether to show the card |

# EVENTS

| type           | detail             | description                |
| -------------- | ------------------ | -------------------------- |
| select.success | object             | Select a certain step; see the table below for the specific fields |
| action.refresh | cancelable:boolean | Triggered after the build is refreshed             |

### step

| property  | type     | required | default | description        |
| --------- | -------- | -------- | ------- | ------------------ |
| name      | string   | true     | -       | Step name          |
| log       | string   | true     | -       | Log information           |
| logs      | string[] | true     | -       | Log information, in array form |
| yaml      | string   | true     | -       | Step yaml definition     |
| log_id    | string   | true     | -       | Log ID            |
| state     | string   | true     | -       | State               |
| stageName | string   | true     | -       | Stage name         |
| started   | number   | true     | -       | Start time           |
| finished  | number   | true     | -       | End time           |
