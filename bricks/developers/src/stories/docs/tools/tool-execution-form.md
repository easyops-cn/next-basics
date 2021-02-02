[//]: # "business-bricks/tool-and-flow/tool-execution-form-template.ts"

# 描述

基于 CMDB 数据渲染的工具执行场景，通过通用的表单来显示工具的输入参数字段

# INPUTS

| property      | type                                                                                    | required | default | description                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| toolData      | object                                                                                  | ✔️       | -       | 工具的详情信息，外层通过 provider 获取                                                         |
| event         | BrickEventsMap                                                                          | -️       | -       | 工具执行 api 触发的事件 "response.success" 和 "response.error", 可以通过监听这些事件做相应处理 |
| submitBtnText | string                                                                                  | -️       | 提交    | 提交按钮名称                                                                                   |
| submitBtnType | 'default' &#124; "primary" &#124; "ghost" &#124; "dashed" &#124; "danger" &#124; "link" | -️       | primary | 提交按钮样式                                                                                   |
