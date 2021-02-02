[//]: # "business-bricks/ci/project-build-btn.ts"

# INPUTS

| property       | type                                         | required | default | description                       |
| -------------- | -------------------------------------------- | -------- | ------- | --------------------------------- |
| btnText        | string                                       | true     | -       | 按钮名称                          |
| btnDisabled    | boolean                                      | false    | -       | 按钮是否禁用                      |
| projectId      | string                                       | true     | -       | 项目 Id                           |
| originBtnProps | Object(the same as antd Button)              | false    | -       | 按钮属性与 antd Button 相同的属性 |
| pipelineList   | PipelineModels.ModelPipeline[](具体如下所示) | true     | -       | 流水线信息                        |
| pipelineId     | string                                       | false    | -       | 流水线 id                         |

# pipeline 配置项

| property      | type                         | required | default | description            |
| ------------- | ---------------------------- | -------- | ------- | ---------------------- |
| alias_name    | string                       | true     | -       | 流水线名称             |
| id            | string                       | true     | -       | 流水线 Id              |
| workflow_type | string                       | true     | -       | yaml 文件内容          |
| yaml_path     | string                       | true     | -       | workflow yaml 存放位置 |
| yaml_string   | string                       | true     | -       | workflow 定义字符串    |
| yaml_url      | string                       | true     | -       | workflow 定义 url      |
| variables     | {key: string, value: string} | false    | -       | 流水线全局变量         |

# EVENTS

| type          | detail | description    |
| ------------- | ------ | -------------- |
| project.build | null   | 项目构建 event |
