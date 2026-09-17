[//]: # "business-bricks/ci/project-build-btn.ts"

# INPUTS

| property       | type                                            | required | default | description                                                  |
| -------------- | ----------------------------------------------- | -------- | ------- | ------------------------------------------------------------ |
| btnText        | string                                          | true     | -       | Button name                                                  |
| btnDisabled    | boolean                                         | false    | -       | Whether the button is disabled                               |
| projectId      | string                                          | true     | -       | Project Id                                                   |
| originBtnProps | Object(the same as antd Button)                 | false    | -       | Button properties, the same as the properties of antd Button |
| pipelineList   | PipelineModels.ModelPipeline[] (as shown below) | true     | -       | Pipeline information                                         |
| pipelineId     | string                                          | false    | -       | Pipeline id                                                  |

# pipeline Configuration

| property      | type                         | required | default | description                                    |
| ------------- | ---------------------------- | -------- | ------- | ---------------------------------------------- |
| alias_name    | string                       | true     | -       | Pipeline name                                  |
| id            | string                       | true     | -       | Pipeline Id                                    |
| workflow_type | string                       | true     | -       | yaml file content                              |
| yaml_path     | string                       | true     | -       | The location where the workflow yaml is stored |
| yaml_string   | string                       | true     | -       | The workflow definition string                 |
| yaml_url      | string                       | true     | -       | The workflow definition url                    |
| variables     | {key: string, value: string} | false    | -       | The global variables of the pipeline           |

# EVENTS

| type          | detail | description         |
| ------------- | ------ | ------------------- |
| project.build | null   | Project build event |
