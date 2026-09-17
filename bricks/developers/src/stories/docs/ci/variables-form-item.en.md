[//]: # "business-bricks/ci/variables-form-item.ts"

# INPUTS

| property          | type        | required | default | description                |
| ----------------- | ----------- | -------- | ------- | -------------------------- |
| value             | Variables[] | -        | -       | Pipeline variables         |
| templateVariables | Variables[] | -        | -       | Template variables used by the pipeline |

### Variables Configurations

| property | type   | required | default | description   |
| -------- | ------ | -------- | ------- | ------------- |
| name     | string | -        | -       | Variable name |
| value    | string | -        | -       | Variable value |

# EVENTS

| type             | detail                                                 | description                        |
| ---------------- | ------------------------------------------------------ | ---------------------------------- |
| variables.change | { variables:Variables[], originVariables:Variables[] } | Triggered when the variables change |
