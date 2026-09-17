[//]: # "atom-bricks/form-input/general-form.ts"

<details>
<summary>History</summary>

| Version | Change                  |
| ------- | ----------------------- |
| 1.58.0  | Add `name` property        |
| 1.63.0  | Add `resetFields` method |

</details>

# INPUTS

| property     | type                                 | required | default        | description                                                                                                                                                                                                                                                                                                                           |
| ------------ | ------------------------------------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout       | `'horizontal'\|'vertical'\|'inline'` | -        | `'horizontal'` | Form layout                                                                                                                                                                                                                                                                                                                              |
| noColon      | `boolean`                            | -        | `false`        | Whether to hide the colon                                                                                                                                                                                                                                                                                                                        |
| values       | `Record<string, any>`                | -        | -              | Default values. Since `mapPropsToFields` is currently used to map `values` to the values of form items, when `values` has multiple levels it must be flattened by the `name` of the form item. For example, if the source data is `{a: {b: 123}}` and the `name` of the form item is `a.b`, then the source data must be converted to `{"a.b": 123}` before being passed to `values`                                                                                            |
| valueTypes   | `object`                             | -        | -              | Declares and formats the data of the `values` property, providing the ability to format form item data after the form is submitted. Currently only the formatting of time-related form item data is supported (because the data submitted by time-related form item bricks is a moment object, and the data sent to the backend has to be defined per scenario). `{time: moment\|YYYY-MM-DD}` means the field is of moment type, and after submission the data is formatted as a `YYYY-MM-DD` string. See the demo for details |
| staticValues | `Record<string, any>`                | -        | -              | Static values (merged with the form values in `validate.success` and passed out as the event detail)                                                                                                                                                                                                                                                                  |
| labelCol     | `ColProps`                           | -        | -              | Label column layout style (only effective when `layout="horizontal"`)                                                                                                                                                                                                                                                                                   |
| wrapperCol   | `ColProps`                           | -        | -              | Input control column layout style (only effective when `layout="horizontal"`)                                                                                                                                                                                                                                                                               |
| name         | `string`                             | -        | -              | Sets the id prefix of the fields inside the form                                                                                                                                                                                                                                                                                                            |

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

The following properties are the common properties that form declares for its form items, but not all of them are implemented by every form item. For example, `placeholder,pattern` only work in `input`-related form items.

| property     | type                                                                                                 | required                                                               | default | description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| name         | `string`                                                                                             | ✔️                                                                     | -       | Field name                                                                                                           |
| label        | `string`                                                                                             | ✔️                                                                     | -       | Field label                                                                                                       |
| required     | `string`                                                                                             | -️                                                                     | -       | Field label                                                                                                       |
| placeholder  | `string`                                                                                             | -                                                                      | -       | Placeholder text                                                                                                         |
| pattern      | `string`                                                                                             | -️                                                                     | -       | Regular expression validation. Since the json configuration only supports the string type, special characters need extra escaping: /\w{3}/ -> '\\w{3}'            |
| message      | `Record<string,string>`                                                                              | -️                                                                     | -       | Validation message text                                                                                                     |
| validator    | `Pick<ValidationRule, "validator" \| "message"> \| Pick<ValidationRule, "validator" \| "message">[]` | -️                                                                     | -       | Custom validation method, [ValidationRule](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) |
| labelTooltip | `LabelTooltipProps`                                                                                  | -️                                                                     | -       | The form item label supports tooltip, as shown in the demo                                                                      |
| helpBrick    | `HelpBrickProps`                                                                                     |
| -️           | -                                                                                                    | Insert some text or complex hints on the right side or below each form item. The configuration is shown in the demo |
| labelBrick   | `LabelBrick`                                                                                         |
| -️           | -                                                                                                    | The form item label supports useBrick, as shown in the demo                           |

| labelCol | `ColProps` | - | - | Label column layout style (only effective when `layout="horizontal"`) |
| wrapperCol | `ColProps` | - | - | Input control column layout style (only effective when `layout="horizontal"`) |

```typescript
export interface LabelTooltipProps {
  /** The text content of the tooltip   */
  content: string;
  /** The icon setting is the same as the platform icon setting   */
  icon: MenuIcon;
  /** The style setting of the tooltip   */
  style?: React.CSSProperties;
  /** The style setting of the icon   */
  iconStyle?: React.CSSProperties;
}

export interface HelpBrickProps {
  /** Supports custom components  */
  useBrick: UseBrickConf;
  /** The placement. Currently only right and bottom are supported  */
  placement?: "right" | "bottom";
  /** The style of the component container. The position can be adjusted precisely through top, bottom, left, right */
  containerStyle?: React.CSSProperties;
}

export interface LabelBrick {
  /** Supports custom components  */
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
| validate     | -          | Validate the form                                                                            |
| setInitValue | value      | Set the initial value of the form                                                                      |
| resetFields  | `string[]` | Reset the values of form items. Pass the `name` of each form item; pass `null` to reset all form items |
