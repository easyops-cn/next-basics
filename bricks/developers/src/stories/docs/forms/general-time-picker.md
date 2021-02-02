[//]: # "atom-bricks/form-input/general-time-picker.ts"

<details>
<summary>History</summary>

| Version | Change                                                |
| ------- | ----------------------------------------------------- |
| 1.29.0  | 新增 `general.time.open` 和 `general.time.close` 事件 |
| 1.87.0  | 新增 configProps 透传                                 |

</details>

> Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给时间选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化时间的选项，以`|`分隔。（如上述 demo 所示）

# INPUTS

| property    | type                                                                | required | default | description               |
| ----------- | ------------------------------------------------------------------- | -------- | ------- | ------------------------- |
| name        | `string`                                                            | ✔️       | -       | 时间选择框框字段名        |
| label       | `string`                                                            | -        | -       | 时间选择框框字段说明      |
| placeholder | `string`                                                            | -        | -       | 时间选择框框占位说明      |
| value       | `string`                                                            | -        | -       | 时间选择框框初始值        |
| required    | `boolean`                                                           | -        | false   | 是否必填                  |
| message     | `Record<string,string>`                                             | -        | -       | 校验文本信息              |
| configProps | [timePickerProps](https://3x.ant.design/components/time-picker-cn/) | -        | -       | 透传 antd timePicker 属性 |

# EVENTS

| type                  | detail   | description                     |
| --------------------- | -------- | ------------------------------- |
| `general.time.change` | `string` | 时间变化时触发                  |
| `general.time.open`   | `value`  | 面板打开时触发， 传出当前时间值 |
| `general.time.close`  | `value`  | 面板关闭时触发，传出当前时间值  |

# METHODS

| name           | params | description                |
| -------------- | ------ | -------------------------- |
| getFormElement | -      | 获得时间选择框所属表单元素 |
