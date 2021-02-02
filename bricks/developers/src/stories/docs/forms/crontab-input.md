[//]: # "atom-bricks/form-input/form-crontab-input.ts"

<details>
<summary>History</summary>

| Version | Change                     |
| ------- | -------------------------- |
| 1.28.0  | 新增 `crontab.change` 事件 |

</details>

# INPUTS

> Tips: 定时器与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。

| property | type   | required | default                | description                                                                        |
| -------- | ------ | -------- | ---------------------- | ---------------------------------------------------------------------------------- |
| name     | string | ✔️       | -                      | 定时器字段名                                                                       |
| label    | string | -️       | -                      | 定时器字说明                                                                       |
| required | string | -️       | -                      | 是否必填                                                                           |
| value    | string | -        | \* \* \* \* \*(每分钟) | 定时器时间，格式为以空格为分隔的五位字符, 按顺序分别代表分钟，小时，天，月，星期。 |

# EVENTS

| type             | detail   | description                                               |
| ---------------- | -------- | --------------------------------------------------------- |
| `crontab.change` | `string` | 定时器输入变化时触发，`event.detail` 为当前定时器选择的值 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
