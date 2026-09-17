[//]: # "atom-bricks/form-input/dynamic-form-input-item.ts"

<details>
<summary>History</summary>

| Version | Change                                            |
| ------- | ------------------------------------------------- |
| 1.x.0   | Added the `forms.dynamic-form-input-item` brick   |

</details>

This brick only supports the input type. If you need to support both the input and select types, use the advanced version [Dynamic Form Item](developers/brick-book/brick/forms.dynamic-form-item).

# INPUTS

| property | type           | required | default | description                                                                                                                                                                                                                                     |
| -------- | -------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| columns  | `ColumnsProps` | ✔️       | -       | Configuration of each column's form item, see the table below                                                                                                                                                                                    |
| value    | `any[]`        | -️       | -       | Initial value of the dynamic form item. It is usually used together with `general-form`, in which case the initial value is set via the `values` property of `general-form`. The format is as shown in the demo: each column's `name` value is used as the `key`, and `value` is the specific value of that column |
| name     | `string`       | ️ ✔️     | -       | Name of the whole form item; all the data of the dynamic form item is assigned to this `name` field                                                                                                                                              |
| label    | `string`       | ️ -      | -       | Form item label                                                                                                                                                                                                                                  |

> Tips: Validation properties such as `required` and `message` of other form items are configured per column in the form sub-item `columns.rules`.

# ColumnsProps

| property    | type                              | required | default | description                                                                                                                                             |
| ----------- | --------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                          | ✔️       | -       | Configure the name of the column                                                                                                                        |
| label       | `string`                          | -        | -       | Configure the label of the column, displayed at the head of the column                                                                                   |
| rules       | `any[]`                           | -        | -       | Configure the validation rules of the column, same as [antd's rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)    |
| placeholder | `string`                          | -        | -       | Configure the column placeholder                                                                                                                         |
| type        | `text`\| `checkbox`\| `number`... | -        | -       | Type of the column's form item; see [\<input\> types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types) for details     |
| disabled    | `boolean`                         | -        | -       | Whether the column's form item is disabled                                                                                                               |

# EVENTS

| type        | detail                  | description                                                          |
| ----------- | ----------------------- | -------------------------------------------------------------------- |
| item.add    | -                       | Triggered when a row is added                                        |
| item.remove | `Record<string, any>`   | Triggered when a row is deleted; detail is the data of that row      |
| item.change | `Record<string, any>[]` | Triggered when each column's data is modified; detail is all the data of the dynamic form item |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
