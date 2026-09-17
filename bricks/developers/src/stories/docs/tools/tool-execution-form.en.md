[//]: # "business-bricks/tool-and-flow/tool-execution-form-template.ts"

# Description

A tool execution scenario rendered based on CMDB data. A general form is used to display the input params of the tool

# INPUTS

| property      | type                                                                        | required | default | description                                                                |
| ------------- | --------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| toolData      | { toolId: string; vId: string; inputs: any[] }                              | ✔️       | -       | The detail information of the tool, obtained externally through a provider |
| submitBtnText | string                                                                      | -️       | Submit  | The text of the submit button                                              |
| submitBtnType | default &#124; primary &#124; ghost &#124; dashed &#124; danger &#124; link | -️       | primary | The style of the submit button                                             |

# EVENTS

| type             | detail | description                      |
| ---------------- | ------ | -------------------------------- |
| response.success | -      | The tool execution api succeeded |
| response.error   | -      | The tool execution api failed    |
