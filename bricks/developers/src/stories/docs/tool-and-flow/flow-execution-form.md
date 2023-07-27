[//]: # "business-bricks/tool-and-flow/flow-execution-form-template.ts"

# 描述

基于 CMDB 数据渲染的流程执行场景，通过通用的表单来显示流程的输入参数字段

# INPUTS

| property      | type                                                                                    | required | default | description                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| flowId        | string                                                                                  | ✔️       | -       | 流程 id                                                                                        |
| event         | BrickEventsMap                                                                          | -️       | -       | 工具执行 api 触发的事件 "response.success" 和 "response.error", 可以通过监听这些事件做相应处理 |
| submitBtnText | string                                                                                  | -️       | 提交    | 提交按钮名称                                                                                   |
| submitBtnType | 'default' &#124; "primary" &#124; "ghost" &#124; "dashed" &#124; "danger" &#124; "link" | -️       | primary | 提交按钮样式                                                                                   |
