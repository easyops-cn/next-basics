[//]: # "atom-bricks/form-input/dynamic-form-input-item.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.x.0   | 新增构件 `forms.dynamic-form-input-item` |

</details>

该构件仅支持 input 类型，如果需要同时支持 input/select 的类型可使用进阶版 [动态表单项](developers/brick-book/brick/forms.dynamic-form-item)

# INPUTS

| property | type           | required | default | description                                                                                                                                                                            |
| -------- | -------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns  | `ColumnsProps` | ✔️       | -       | 每一列表单项的配置， 详见下表                                                                                                                                                          |
| value    | `any[]`        | -️       | -       | 动态表单项的初始值，一般跟 `general-form` 搭配使用，则初始值的赋值在 `general-form` 的 `values` 属性上设置，具体格式如 demo 所示，把每一列 `name` 值作为 `key`，`value` 为该列的具体值 |
| name     | `string`       | ️ ✔️     | -       | 整个表单项的 name， 动态表单项的数据都会赋值在该 `name` 字段上                                                                                                                         |
| label    | `string`       | ️ -      | -       | 表单项 label                                                                                                                                                                           |

> Tips: 另外个表单项的 `required`, `message` 等这些校验属性，下放到每一列的表单子项 `columns.rules` 去配置

# ColumnsProps

| property    | type                              | required | default | description                                                                                                                       |
| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                          | ✔️       | -       | 配置该列的 name                                                                                                                   |
| label       | `string`                          | -        | -       | 配置该列的 lable，在一列的头部显示                                                                                                |
| rules       | `any[]`                           | -        | -       | 配置该列的的校验规则，同 [antd 的 rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)          |
| placeholder | `string`                          | -        | -       | 配置该列 placeholder                                                                                                              |
| type        | `text`\| `checkbox`\| `number`... | -        | -       | 该列表单项的类型，详情可查看 [\<input\> types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types) |
| disabled    | `boolean`                         | -        | -       | 该列表单项是否禁止                                                                                                                |

# EVENTS

| type        | detail                  | description                                         |
| ----------- | ----------------------- | --------------------------------------------------- |
| item.add    | -                       | 增加一行时触发该                                    |
| item.remove | `Record<string, any>`   | 增删除某一行时触发，detail 为该行的数据             |
| item.change | `Record<string, any>[]` | 修改每一列数据时触发，detail 该动态表单项全部的数据 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
