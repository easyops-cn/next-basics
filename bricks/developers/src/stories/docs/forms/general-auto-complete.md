[//]: # "atom-bricks/form-input/general-auto-complete.ts"

<details>
<summary>History</summary>

| Version | Change                                 |
| ------- | -------------------------------------- |
| 1.36.0  | 新增构件 `forms.general-auto-complete` |

</details>

# INPUTS

| property      | type                    | required | default | description  |
| ------------- | ----------------------- | -------- | ------- | ------------ |
| name          | `string`                | ✔️       | -       | 字段名       |
| label         | `string`                | -        | -       | 字段说明     |
| required      | `boolean`               | -        | false   | 是否是必填项 |
| options       | `string[]`              | ✔️       | -       | 补全选项列表 |
| value         | `string`                | -        | -       | 当前值       |
| message       | `Record<string,string>` | -        | -       | 校验文本信息 |
| placeholder   | `string`                | -        | -       | 占位说明     |
| inputBoxStyle | `object`                | -        |         | 输入框样式   |

# EVENTS

| type                           | detail   | description          |
| ------------------------------ | -------- | -------------------- |
| `general.auto-complete.change` | `string` | 补全输入框变化时触发 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
