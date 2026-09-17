[//]: # "business-bricks/tool-and-flow/enhanced-tools-input-form.ts"

# Description

A tool execution scenario rendered based on CMDB data, which displays the input parameter fields of the tool through a general form

# INPUTS

| property           | type                    | required | default | description                                                                |
| ------------------ | ----------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| tId                | string                  | ✔️       | -       | -                                                                          |
| vId                | string                  | ✔️       | -       | -                                                                          |
| toolData           | `Record<string, any>`   | ✔️       | -       | Detailed information of the tool                                                             |
| mode               | "preview" &#124; "edit" | -        | "edit"  | -                                                                          |
| value              | `Record<string, any>`   | -        | -       | Initial values of the form                                                               |
| defaultInputsValue | `Record<string, any>`   | -        | -       | Handles the input parameters of the tool                                                           |
| isEdit             | boolean                 | -        | false   | -                                                                          |
| isSetValue         | boolean                 | -        | false   | -                                                                          |
| hideExecuteUser    | boolean                 | -        | false   | -                                                                          |
| isExecute          | boolean                 | -️       | false   | -                                                                          |
| isNoAllowModify    | boolean                 | -️       | false   | Whether form modification is disallowed (when it is `true`, the whole form is `disabled`; currently `execution user` is not controlled) |
| layout             | FormLayout              | -️       | -       | -                                                                          |
| wrapperCol         | object                  | -️       | -       | -                                                                          |
| labelCol           | object                  | -️       | -       | -                                                                          |

# EVENTS

| type             | detail | description |
| ---------------- | ------ | ----------- |
| validate.success | -      | Validation succeeded    |
| validate.error   | -      | Validation failed    |

# METHODS

| name           | params | description |
| -------------- | ------ | ----------- |
| validate       | -      | -           |
| setFieldsValue | value  | -           |
