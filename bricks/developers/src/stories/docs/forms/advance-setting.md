[//]: # "atom-bricks/form-input/advance-setting.ts"

<details>
<summary>History</summary>

| Version | Change                           |
| ------- | -------------------------------- |
| 1.87.0  | 新增构件 `forms.advance-setting` |

</details>

# INPUTS

| property           | type            | required | default | description        |
| ------------------ | --------------- | -------- | ------- | ------------------ |
| foldName           | string          | true     | -       | 折叠展示名称       |
| show               | boolean         | -        | -       | 是否展开           |
| foldStyle          | object          | -        | -       | 折叠展示的样式编写 |
| dividerOrientation | "left"\|"right" | -        | center  | 分割线标题的位置   |
| dividerDashed      | boolean         | -        | false   | 是否虚线           |
| showDivider        | boolean         | -        | true    | 是否分割线         |
| showFoldIcon       | boolean         | -        | true    | 是否显示折叠图标   |

# slots

| type    | description |
| ------- | ----------- |
| content | 内容插槽    |

# EVENTS

| type                     | detail        | description    |
| ------------------------ | ------------- | -------------- |
| advance.setting.expand   | {show: true}  | 展开时发生事件 |
| advance.setting.collapse | {show: false} | 折叠时发生事件 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
