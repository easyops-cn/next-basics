[//]: # "business-bricks/tool-and-flow/flow-execution-form-template.ts"

# Description

A flow execution scenario rendered based on CMDB data, displaying the flow's input params fields through a generic form

# INPUTS

| property      | type                                                                                    | required | default | description                                                                                   |
| ------------- | --------------------------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| flowId        | string                                                                                  | ✔️       | -       | Flow id                                                                                       |
| event         | BrickEventsMap                                                                          | -️       | -       | Events triggered by the tool execution api, "response.success" and "response.error". You can listen to these events and handle them accordingly |
| submitBtnText | string                                                                                  | -️       | Submit  | Submit button text                                                                            |
| submitBtnType | 'default' &#124; "primary" &#124; "ghost" &#124; "dashed" &#124; "danger" &#124; "link" | -️       | primary | Submit button style                                                                           |
