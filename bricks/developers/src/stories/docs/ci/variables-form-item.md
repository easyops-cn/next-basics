[//]: # "business-bricks/ci/variables-form-item.ts"

# INPUTS

| property          | type        | required | default | description          |
| ----------------- | ----------- | -------- | ------- | -------------------- |
| value             | Variables[] | -        | -       | 流水线变量           |
| templateVariables | Variables[] | -        | -       | 流水线使用的模板变量 |

### Variables 配置项

| property | type   | required | default | description |
| -------- | ------ | -------- | ------- | ----------- |
| name     | string | -        | -       | 变量名      |
| value    | string | -        | -       | 变量值      |

# EVENTS

| type             | detail                                                 | description    |
| ---------------- | ------------------------------------------------------ | -------------- |
| variables.change | { variables:Variables[], originVariables:Variables[] } | 变量改变时触发 |
