[//]: # "atom-bricks/form-input/general-date-picker.ts"

<details>
<summary>History</summary>

| Version | Change                                                                |
| ------- | --------------------------------------------------------------------- |
| 1.35.0  | 新增 `format` 属性                                                    |
| 1.125.0 | 新增 `picker` 属性,属性值为 `week` 时支持周，周默认格式为 `gggg-ww周` |

</details>

> Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给日期选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化日期的选项，以`|`分隔。（如上述 demo 所示）

# INPUTS

| property    | type                    | required | default      | description                                                                                                                                                                                                                                     |
| ----------- | ----------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                | ✔️       | -            | 日期选择框框字段名                                                                                                                                                                                                                              |
| label       | `string`                | -        | -            | 日期选择框框字段说明                                                                                                                                                                                                                            |
| placeholder | `string`                | -        | -            | 日期选择框框占位说明                                                                                                                                                                                                                            |
| value       | `string`                | -        | -            | 日期选择框框初始值                                                                                                                                                                                                                              |
| showTime    | `boolean`               | -        | `false`      | 是否显示时间, 当设为 `true` 时, 请同时设置 `format` 为 `YYYY-MM-DD HH:mm:ss` 使其也显示具体时，分，秒 的时间                                                                                                                                    |
| message     | `Record<string,string>` | -        | -            | 校验文本信息                                                                                                                                                                                                                                    |
| required    | `boolean`               | -        | false        | 是否必填                                                                                                                                                                                                                                        |
| format      | string                  | -        | `YYYY-MM-DD` | 显示预览的格式，具体配置参考 [moment](https://momentjs.com/docs/#/displaying/format/)，注意，这里并非是定义给后台的数据格式，给后台的数据格式定义请参考 `general-form` 构件的 [valueTypes](developers/brick-book/brick/forms.general-form) 属性 |
| picker      | `date\|week`            | -        | `date`       | 设为`week` 时，支持周，周默认格式 `format` 为 `gggg-ww周`                                                                                                                                                                                       |

# EVENTS

| type                  | detail   | description                               |
| --------------------- | -------- | ----------------------------------------- |
| `general.date.change` | `string` | 日期变化时触发                            |
| `general.date.ok`     | `string` | 点击确定按钮触发（showTime 为 true 使用） |

# METHODS

| name           | params | description                |
| -------------- | ------ | -------------------------- |
| getFormElement | -      | 获得日期选择框所属表单元素 |
