[//]: # "atom-bricks/form-input/general-checkbox.ts"

# INPUTS

> Tips: 多选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。

| property | type                                 | required | default | description                                                                                                                                                                                                                    |
| -------- | ------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | `string`                             | ✔️       | -       | 多选框字段名                                                                                                                                                                                                                   |
| label    | `string`                             | -        | -       | 多选框字段说明                                                                                                                                                                                                                 |
| required | `boolean`                            | -        | false   | 是否是必填项                                                                                                                                                                                                                   |
| colSpan  | `number`                             | -        | -       | 配置多选框栅格布局, 用数字表示多选框所占宽度比，配置同 antd 中 [span 配置](https://ant.design/components/grid-cn/#Col), 在 antd 栅格布局中把一行按照 24 等分，可以基于此控制每一行显示多少列多选框。不配置该字段按默认方式排列 |
| options  | `string[]\|number[]\|LabeledValue[]` | ✔️       | -       | 多选框选项表                                                                                                                                                                                                                   |
| value    | `string[]`                           | -        | -       | 输入框当前选中始值                                                                                                                                                                                                             |
| message  | `Record<string,string>`              | -        | -       | 校验文本信息                                                                                                                                                                                                                   |

```typescript
interface LabeledValue {
  label: string;
  value: string | number;
  disabled: boolean;
}
```

# EVENTS

| type                      | detail  | description                                         |
| ------------------------- | ------- | --------------------------------------------------- |
| `general.checkbox.change` | `any[]` | 复选框变化时触发，`event.detail` 为当前选中的值列表 |

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
