[//]: # "business-bricks/ci/log-viewer.ts"

# INPUTS

| property | type   | required | default | description                          |
| -------- | ------ | -------- | ------- | ------------------------------------ |
| step     | object | true     | -       | Step details. See the table below for specific items |

### step

| property  | type   | required | default | description  |
| --------- | ------ | -------- | ------- | ------------ |
| name      | string | true     | -       | step name    |
| log       | string | true     | -       | Log information |
| yaml      | string | true     | -       | Step yaml definition |
| log_id    | string | true     | -       | Log ID       |
| state     | string | true     | -       | State        |
| stageName | string | true     | -       | stage name   |
| started   | number | true     | -       | Start time   |
| finished  | number | true     | -       | End time     |
