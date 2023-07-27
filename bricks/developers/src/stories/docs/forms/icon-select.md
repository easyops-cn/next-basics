[//]: # "atom-bricks/form-input/icon-select.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.102.0 | 新增属性 ` bg``setColor `，支持选择颜色 |
| 1.67.0  | 新增构件 `forms.icon-select`            |

</details>

# INPUTS

| property | type                                                               | required | default | description                                                                                                                                                                                                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`                                                           | ✔️       | -       | 字段名                                                                                                                                                                                                                                                                                                                                                          |
| label    | `string`                                                           | -        | -       | 字段说明                                                                                                                                                                                                                                                                                                                                                        |
| value    | [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon) | -        | -       | 值                                                                                                                                                                                                                                                                                                                                                              |
| required | `boolean`                                                          | -        | false   | 是否必填                                                                                                                                                                                                                                                                                                                                                        |
| disabled | `boolean`                                                          | -        | -       | 是否禁用                                                                                                                                                                                                                                                                                                                                                        |
| bg       | `boolean`                                                          | -        | true    | 是否显示背景。当 bg 为 false 时，选择颜色的输出为 icon 的字体颜色，数值为平台颜色变量，形如 `var(--theme-red-color)`。当 bg 为 true 时，选择颜色的输出为颜色描述字符串，形如 "green" \| "red" \| "blue" \| "orange" \| "cyan" \| "purple" \| "geekblue" \| "gray"，可搭配 [card-item](developers/brick-book/brick/presentational-bricks.card-item) 等构件使用。 |
| setColor | `boolean`                                                          | -        | true    | 是否支持设置颜色                                                                                                                                                                                                                                                                                                                                                |

# EVENTS

| type        | detail                                                             | description            |
| ----------- | ------------------------------------------------------------------ | ---------------------- |
| icon.change | [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon) | 图标选择变化触发的事件 |

# METHODS

| name  | params | description        |
| ----- | ------ | ------------------ |
| open  | -      | 打开图标选择模态框 |
| close | -      | 关闭图标选择模态框 |
