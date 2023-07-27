[//]: # "atom-bricks/form-input/general-form.ts"

<details>
<summary>History</summary>

| Version | Change                  |
| ------- | ----------------------- |
| 1.58.0  | 新增 `name` 属性        |
| 1.63.0  | 新增 `resetFields` 方法 |

</details>

# INPUTS

| property     | type                                 | required | default        | description                                                                                                                                                                                                                                                                                                                           |
| ------------ | ------------------------------------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout       | `'horizontal'\|'vertical'\|'inline'` | -        | `'horizontal'` | 表单布局                                                                                                                                                                                                                                                                                                                              |
| noColon      | `boolean`                            | -        | `false`        | 是否不显示冒号                                                                                                                                                                                                                                                                                                                        |
| values       | `Record<string, any>`                | -        | -              | 默认值。因为目前使用了 `mapPropsToFields` 来将 `values` 映射到表单项的值，当 `values` 有多个层级时，需要按表单项的 `name` 平铺。如源数据为 `{a: {b: 123}}` ，表单项的 `name` 为 `a.b`，那么需要将源数据转换为 `{"a.b": 123}` 传给 `values`                                                                                            |
| valueTypes   | `object`                             | -        | -              | 对 `values` 属性的数据进行申明和格式化，提供了表单提交后格式化表单项数据的功能。目前仅支持时间相关的表单项数据的格式化（因为时间相关的表单项构件提交后的数据为 moment 对象，需要根据不同场景定义给后台的数据），`{time: moment\|YYYY-MM-DD}` 表示该字段为 moment 类型，数据提交后格式化为 `YYYY-MM-DD` 字符串的形式，详情如 demo 所示 |
| staticValues | `Record<string, any>`                | -        | -              | 静态值（在 `validate.success` 中将和表单值合并作为事件详情传递出去）                                                                                                                                                                                                                                                                  |
| labelCol     | `ColProps`                           | -        | -              | 标签列布局样式（仅当 `layout="horizontal"` 时有效）                                                                                                                                                                                                                                                                                   |
| wrapperCol   | `ColProps`                           | -        | -              | 输入控件列布局样式（仅当 `layout="horizontal"` 时有效）                                                                                                                                                                                                                                                                               |
| name         | `string`                             | -        | -              | 设置表单域内字段 id 的前缀                                                                                                                                                                                                                                                                                                            |

```typescript
interface ColProps {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  order?: number;
}
```

# ITEM INPUTS

下列属性是 form 为表单子项所申明的共有属性，但并不是所有属性都被每个表单项所实现，如 `placeholder,pattern` 只在 `input` 相关的表单项中使用才行。

| property     | type                                                                                                 | required                                                               | default | description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| name         | `string`                                                                                             | ✔️                                                                     | -       | 字段名                                                                                                           |
| label        | `string`                                                                                             | ✔️                                                                     | -       | 字段名说明                                                                                                       |
| required     | `string`                                                                                             | -️                                                                     | -       | 字段名说明                                                                                                       |
| placeholder  | `string`                                                                                             | -                                                                      | -       | 占位说明                                                                                                         |
| pattern      | `string`                                                                                             | -️                                                                     | -       | 正则表达式校验, 由于在 json 中配置仅支持 string 类型， 对于特殊字符需要额外再转义 /\w{3}/ -> '\\w{3}'            |
| message      | `Record<string,string>`                                                                              | -️                                                                     | -       | 校验文本信息                                                                                                     |
| validator    | `Pick<ValidationRule, "validator" \| "message"> \| Pick<ValidationRule, "validator" \| "message">[]` | -️                                                                     | -       | 自定义校验方法，[ValidationRule](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) |
| labelTooltip | `LabelTooltipProps`                                                                                  | -️                                                                     | -       | 表单项 label 支持 tooltip，具体如 demo 所示                                                                      |
| helpBrick    | `HelpBrickProps`                                                                                     |
| -️           | -                                                                                                    | 在每个表单项的右侧或者下侧插入一些文案或者复杂的提示, 配置如 demo 所示 |
| labelBrick   | `LabelBrick`                                                                                         |
| -️           | -                                                                                                    | 表单项 label 支持 useBrick，具体如 demo 所示                           |

| labelCol | `ColProps` | - | - | 标签列布局样式（仅当 `layout="horizontal"` 时有效） |
| wrapperCol | `ColProps` | - | - | 输入控件列布局样式（仅当 `layout="horizontal"` 时有效） |

```typescript
export interface LabelTooltipProps {
  /** tooltip 的文本内容   */
  content: string;
  /** 图标设值跟平台图标设置一致   */
  icon: MenuIcon;
  /** tooltip 的样式设置   */
  style?: React.CSSProperties;
  /** 图标的样式设置   */
  iconStyle?: React.CSSProperties;
}

export interface HelpBrickProps {
  /** 支持自定义组件  */
  useBrick: UseBrickConf;
  /** 所放的位置，目前仅支持右侧和底部显示  */
  placement?: "right" | "bottom";
  /** 组件容器的样式 可通过 top, bottom, left, right 精确调整位置 */
  containerStyle?: React.CSSProperties;
}

export interface LabelBrick {
  /** 支持自定义组件  */
  useBrick: UseBrickConf;
}
```

# EVENTS

| type                 | detail                | description |
| -------------------- | --------------------- | ----------- |
| `"validate.success"` | `Record<string, any>` | -           |
| `"validate.error"`   | `Record<string, any>` | -           |

# METHODS

| name         | params     | description                                                                         |
| ------------ | ---------- | ----------------------------------------------------------------------------------- |
| validate     | -          | 验证表单                                                                            |
| setInitValue | value      | 表单设置初始值                                                                      |
| resetFields  | `string[]` | 重置表单项的值，传入的是每个表单项的 `name`, 如果需要重置所有表单项传递 `null` 即可 |
