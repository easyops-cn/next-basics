[//]: # "business-bricks/ci/workflow-stage-editor.ts"

# INPUTS

| property    | type    | required | default | description                        |
| ----------- | ------- | -------- | ------- | ---------------------------------- |
| fixedLayout | boolean | -        | -       | 编辑阶段表单固定布局 or 响应式布局 |
| onlyFields  | boolean | -        | -       | 是否只展示表单字段                 |
| stage       | Stage   | true     | -       | 工作流某阶段                       |

##### Stage

| property | type    | required | default | description  |
| -------- | ------- | -------- | ------- | ------------ |
| name     | string  | true     | -       | 阶段名称     |
| parallel | boolean | true     | -       | 阶段是否并行 |
| steps    | Step[]  | true     | -       | 阶段步骤     |

# EVENTS

| type             | detail                        | description      |
| ---------------- | ----------------------------- | ---------------- |
| validate.success | Stage                         | 编辑阶段成功触发 |
| validate.error   | { errors: any, stage: Stage } | 编辑阶段失败触发 |
