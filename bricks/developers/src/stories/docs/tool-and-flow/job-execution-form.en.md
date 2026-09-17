[//]: # "business-bricks/tool-and-flow/job-execution-form-template.ts"

# Description

A job execution scenario rendered based on CMDB data, which automatically fills in the params of the flow and tool types

# INPUTS

| property      | type                                                                                    | required | default | description                                                                                          |
| ------------- | --------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| taskId        | string                                                                                  | ✔️       | -       | Job id                                                                                               |
| event         | BrickEventsMap                                                                          | -️       | -       | Events triggered by the tool execution api, "response.success" and "response.error". You can listen to these events and handle them accordingly |
| submitBtnText | string                                                                                  | -️       | Submit  | Submit button name                                                                                   |
| submitBtnType | 'default' &#124; "primary" &#124; "ghost" &#124; "dashed" &#124; "danger" &#124; "link" | -️       | primary | Submit button style                                                                                  |
