[//]: # "business-bricks/tool-and-flow/enhanced-tools-input-form.ts"

# 描述

基于 CMDB 数据渲染的工具执行场景，通过通用的表单来显示工具的输入参数字段

# INPUTS

| property           | type                    | required | default | description                                                                |
| ------------------ | ----------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| tId                | string                  | ✔️       | -       | -                                                                          |
| vId                | string                  | ✔️       | -       | -                                                                          |
| toolData           | `Record<string, any>`   | ✔️       | -       | 工具的详情信息                                                             |
| mode               | "preview" &#124; "edit" | -        | "edit"  | -                                                                          |
| value              | `Record<string, any>`   | -        | -       | 表单的初始值                                                               |
| defaultInputsValue | `Record<string, any>`   | -        | -       | 处理工具输入参数                                                           |
| isEdit             | boolean                 | -        | false   | -                                                                          |
| isSetValue         | boolean                 | -        | false   | -                                                                          |
| hideExecuteUser    | boolean                 | -        | false   | -                                                                          |
| isExecute          | boolean                 | -️       | false   | -                                                                          |
| isNoAllowModify    | boolean                 | -️       | false   | 是否不允许表单修改（当为`true`,表单全部`disabled`,目前`执行用户`不受控制） |
| layout             | FormLayout              | -️       | -       | -                                                                          |
| wrapperCol         | object                  | -️       | -       | -                                                                          |
| labelCol           | object                  | -️       | -       | -                                                                          |

# EVENTS

| type             | detail | description |
| ---------------- | ------ | ----------- |
| validate.success | -      | 验证成功    |
| validate.error   | -      | 验证失败    |

# METHODS

| name           | params | description |
| -------------- | ------ | ----------- |
| validate       | -      | -           |
| setFieldsValue | value  | -           |
