[//]: # "atom-bricks/form-input/general-buttons.ts"

<details>
<summary>History</summary>

| Version | Change                           |
| ------- | -------------------------------- |
| 1.39.0  | 新增 `submitDisabled` 属性       |
| 1.42.0  | 新增 `submitTooltip` 属性        |
| 1.75.0  | 新增属性 `disableAfterClick`     |
| 1.77.0  | `cancelType` 的默认值改为 `link` |

</details>

# INPUTS

| property          | type                                                                  | required | default     | description                            |
| ----------------- | --------------------------------------------------------------------- | -------- | ----------- | -------------------------------------- |
| submitText        | `string`                                                              | -        | -           | 提交按钮的文字，不设置则不显示提交按钮 |
| cancelText        | `string`                                                              | -        | -           | 取消按钮的文字，不设置则不显示取消按钮 |
| submitType        | `"default" \| "primary" \| "ghost" \| "dashed" \| "danger" \| "link"` | -        | `"primary"` | 提交按钮的类型                         |
| submitDisabled    | `boolean`                                                             | -        | `false`     | 禁用提交按钮                           |
| submitTooltip     | `string`                                                              | -        | -           | 提交按钮文字提示                       |
| cancelType        | `"default" \| "primary" \| "ghost" \| "dashed" \| "danger" \| "link"` | -        | `"link"`    | 取消按钮的类型                         |
| showCancelButton  | `boolean`                                                             | -        | `false`     | 显示取消按钮                           |
| disableAfterClick | `boolean`                                                             | -        | `false`     | 点击确定按钮后自动禁用                 |

# EVENTS

| type                | detail | description                                                                                                                               |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| submit.button.click | -      | 点击提交按钮触发的事件，tips:点击提交按钮会先自动触发表单的 validate 方法，参考[通用表单](developers/brick-book/brick/forms.general-form) |
| cancel.button.click | -      | 点击取消按钮触发的事件                                                                                                                    |
