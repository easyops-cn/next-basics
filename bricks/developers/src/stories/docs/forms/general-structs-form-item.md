[//]: # "atom-bricks/form-input/general-structs-form-item.ts"

该构件既可以作为一个独立的模态框表单，也可以作为表单里面的某个表单项存在，作为表单项时，可在`forms.general-form`中的`values`里赋初始值

<details>
<summary>History</summary>

| Version | Change                                     |
| ------- | ------------------------------------------ |
| 1.x.0   | 新增构件 `forms.general-structs-form-item` |

</details>

# INPUTS

| property            | type             | required | default                | description                              |
| ------------------- | ---------------- | -------- | ---------------------- | ---------------------------------------- |
| value               | `any[]`          | true     | -                      | 结构体数组数据源                         |
| name                | `string`         | -        | -                      | 作为表单项时的字段名                     |
| label               | `string`         | -        | -                      | 添加结构体作为表单项时在表单中的字段说明 |
| structDefaultValues | `any`            | -        | -                      | 新建结构体时给表单设置默认值             |
| btnText             | `string`         | -        | 添加                   | 点击打开模态框的按钮文字                 |
| fieldsMap           | `any`            | true     | -                      | 结构体表格中字段与标签的键值对，见示例   |
| maskClosable        | `boolean`        | -        | false                  | 是否点击背景关闭模态框                   |
| createModalTitle    | `string`         | -        | 添加结构体             | 添加结构体时模态框的标题                 |
| editModalTitle      | `string`         | -        | 编辑结构体             | 编辑结构体时模态框的标题                 |
| modalWidth          | `string\|number` | -        | 520px                  | 模态框宽度                               |
| okText              | `string`         | -        | 确定                   | 模态框确认按钮文字                       |
| cancelText          | `string`         | -        | 取消                   | 模态框取消按钮文字                       |
| deleteText          | `string`         | -        | 确定要删除该结构体吗？ | 删除确认框标题                           |
| multiple            | `boolean`        | -        | true                   | 能否添加多个结构体                       |

# SLOTS

| property | type   | required | default | description                                                                                                   |
| -------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| items    | `slot` | true     | -       | 添加/编辑结构体模态框里面的内容，应为一个表单，参考[通用表单](developers/brick-book/brick/forms.general-form) |

# EVENTS

| type              | detail                | description         |
| ----------------- | --------------------- | ------------------- |
| "struct.change"   | `Record<string, any>` | 增删改结构体时触发  |
| "struct.data.get" | `Record<string, any>` | 调用`getData`时触发 |

# METHODS

| name    | params | description    |
| ------- | ------ | -------------- |
| getData | -      | 获得结构体数组 |
