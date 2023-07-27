[//]: # "atom-bricks/form-input/general-modal.ts"

该构件既可以作为一个独立的模态框表单，也可以作为表单里面的某个表单项存在，具体查看实例。

1. 当作为独立模态框表单，可由其他触发，比如按钮。与`general-modal+general-form`组合起来不一样的是，这个模态框表单已经默认有了提交按钮及校验失败模态框不关闭的能力
2. 当作为表单里面的表单项存在，可用于某个字段较复杂配置的情况下，配置构件收集数据

<details>
<summary>History</summary>

| Version | Change                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------- |
| 1.65.0  | 新增属性 `okDisabled`                                                                             |
| 1.74.0  | 新增属性 `notResetWhenClose`、`dataSource`、`disableAfterClick`，事件 `modal.open`、`modal.close` |
| 1.76.0  | `open` 和 `close` 方法新增 `noEvent` 选项                                                         |

</details>

> Tips: slots.content 中的构件，如果不是用 general-forms，那么希望点击确认按钮有校验操作，则需自己实现类似于 general-forms 中的 validate 方法；希望点击取消按钮有重置操作，则需自己实现类似于 general-forms 中的 reset 方法。

# INPUTS

| property          | type                                                                                | required | default     | description                            |
| ----------------- | ----------------------------------------------------------------------------------- | -------- | ----------- | -------------------------------------- |
| name              | `string`                                                                            | ✔️       | -           | 表单模态框字段名                       |
| label             | `string`                                                                            | -        | -           | 表单模态框字段说明                     |
| modalTitle        | `string`                                                                            | -        | -           | 表单模态框标题                         |
| modalWidth        | string \| number                                                                    | -        | `"520px"`   | 表单模态框宽度                         |
| maskClosable      | `boolean`                                                                           | -        | `false`     | 是否点击背景关闭模态框                 |
| btnText           | `string`                                                                            | -        | -           | 点击打开模态框的按钮文字               |
| okText            | `string`                                                                            | -        | `"确定"`    | 模态框确认按钮文字                     |
| okType            | `ButtonType`\("link" \| "default" \| "primary" \| "ghost" \| "dashed" \| "danger"\) | -        | `"primary"` | 模态框确认按钮类型                     |
| okDisabled        | `boolean`                                                                           | -        | `false`     | 是否禁用确认按钮                       |
| cancelText        | `string`                                                                            | -        | `"取消"`    | 模态框取消按钮文字                     |
| notResetWhenClose | `boolean`                                                                           | -        | `false`     | 关闭模态框时不重置表单                 |
| dataSource        | `Record<string, any>`                                                               | -        | -           | 打开和关闭弹窗事件的 `detail` 的数据源 |
| disableAfterClick | `boolean`                                                                           | -        | `false`     | 点击确定按钮后自动禁用                 |

# EVENTS

| type          | detail                | description                                |
| ------------- | --------------------- | ------------------------------------------ |
| `modal.open`  | `Record<string, any>` | 打开模态框，`event.detail` 是 `dataSource` |
| `modal.close` | `Record<string, any>` | 关闭模态框，`event.detail` 是 `dataSource` |

# slots

| property | type | required | default | description      |
| -------- | ---- | -------- | ------- | ---------------- |
| content  | slot | ✔️       | -       | 模态框里面的内容 |

# METHODS

| name           | params                     | description                                                                                                                                                        |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| open           | `option?: OpenCloseOption` | 打开模态框                                                                                                                                                         |
| close          | `option?: OpenCloseOption` | 关闭模态框                                                                                                                                                         |
| updateValue    | -                          | 更新该表单项数据。通常在子构件为 general-form 的时候，校验成功事件"validate.success"中进行更新数据，参考[通用表单](developers/brick-book/brick/forms.general-form) |
| getFormElement | -                          | 获得表单模态框所属表单元素                                                                                                                                         |

## OpenCloseOption

| property | type      | required | default | description |
| -------- | --------- | -------- | ------- | ----------- |
| noEvent  | `boolean` | -        | -       | 不触发事件  |
