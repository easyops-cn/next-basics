[//]: # "business-bricks/ci/workflow-stage-editor.ts"

# INPUTS

| property    | type    | required | default | description                        |
| ----------- | ------- | -------- | ------- | ---------------------------------- |
| fixedLayout | boolean | -        | -       | Fixed layout or responsive layout of the stage edit form |
| onlyFields  | boolean | -        | -       | Whether to show only the form fields                 |
| stage       | Stage   | true     | -       | A stage of the workflow                       |

##### Stage

| property | type    | required | default | description  |
| -------- | ------- | -------- | ------- | ------------ |
| name     | string  | true     | -       | Stage name     |
| parallel | boolean | true     | -       | Whether the stage is parallel |
| steps    | Step[]  | true     | -       | The steps of the stage     |

# EVENTS

| type             | detail                        | description      |
| ---------------- | ----------------------------- | ---------------- |
| validate.success | Stage                         | Triggered when the stage is edited successfully |
| validate.error   | { errors: any, stage: Stage } | Triggered when editing the stage fails |
