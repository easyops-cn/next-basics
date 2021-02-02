[//]: # "atom-bricks/form-input/general-radio.ts"

# INPUTS

> Tips: 单选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。

| property | type                                 | required | default | description        |
| -------- | ------------------------------------ | -------- | ------- | ------------------ |
| name     | `string`                             | ✔️       | -       | 单选框字段名       |
| label    | `string`                             | -        | -       | 单选框字段说明     |
| required | `boolean`                            | -        | false   | 是否是必填项       |
| options  | `string[]\|number[]\|LabeledValue[]` | ✔️       | -       | 单选框选项表       |
| value    | `string[]`                           | -        | -       | 单选框当前选中始值 |
| type     | `default \| button`                  | -        | default | 单选框样式类型     |
| message  | `Record<string,string>`              | -        | -       | 校验文本信息       |
| disabled | `boolean`                            | -        | false   | 是否禁用           |

```typescript
interface LabeledValue {
  label: string;
  value: string | number;
}
```

# EVENTS

| type                   | detail             | description                                 |
| ---------------------- | ------------------ | ------------------------------------------- |
| `general.radio.change` | `string \| number` | 单选框变化时被触发，`event.detail` 为选项值 |

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
