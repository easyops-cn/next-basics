[//]: # "atom-bricks/form-input/general-switch.ts"

<details>
<summary>History</summary>

| Version | Change                            |
| ------- | --------------------------------- |
| 1.28.0  | 新增 `general.switch.change` 事件 |

</details>

# INPUTS

| property | type                   | required | default   | description |
| -------- | ---------------------- | -------- | --------- | ----------- |
| name     | `string`               | ✔️       | -         | 字段名      |
| value    | `boolean`              | -        | false     | 初始值      |
| label    | `string`               | -        | -         | 字段说明    |
| size     | `'default' \| 'small'` | -        | 'default' | 开关大小    |

# EVENTS

| type                    | detail    | description                                   |
| ----------------------- | --------- | --------------------------------------------- |
| `general.switch.change` | `boolean` | 开关改变时触发, `event.detail` 为当前选择的值 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
