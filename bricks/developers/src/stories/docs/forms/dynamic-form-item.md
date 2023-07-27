[//]: # "atom-bricks/form-input/dynamic-form-item.ts"

<details>
<summary>History</summary>

| Version | Change                                                 |
| ------- | ------------------------------------------------------ |
| 1.99.0  | 新增类型 `password` 和属性 `encrypt`                   |
| 1.91.0  | 新增属性 `disabledAddButton` 和 `disabledDeleteButton` |
| 1.76.0  | 新增构件 `forms.dynamic-form-item`                     |

</details>

# INPUTS

| property             | type           | required | default | description                                                                                                                                                                            |
| -------------------- | -------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns              | `ColumnsProps` | ✔️       | -       | 每一列表单项的配置， 详见下表                                                                                                                                                          |
| value                | `any[]`        | -️       | -       | 动态表单项的初始值，一般跟 `general-form` 搭配使用，则初始值的赋值在 `general-form` 的 `values` 属性上设置，具体格式如 demo 所示，把每一列 `name` 值作为 `key`，`value` 为该列的具体值 |
| name                 | `string`       | ️ ✔️     | -       | 整个表单项的 name， 动态表单项的数据都会赋值在该 `name` 字段上                                                                                                                         |
| label                | `string`       | ️ -      | -       | 表单项 label                                                                                                                                                                           |
| disabledAddButton    | `boolean`      | ️ -      | false   | 是否禁止添加的按钮                                                                                                                                                                     |
| disabledDeleteButton | `boolean`      | ️ -      | false   | 是否禁止每一行删除的按钮                                                                                                                                                               |

> Tips: 另外个表单项的 `required`, `message` 等这些校验属性，在每一列的表单子项 `columns.rules` 去配置

# ColumnsProps

| property     | type                          | required | default | description                                                                                                                                                                                                                                                                                          |
| ------------ | ----------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | `string`                      | ✔️       | -       | 配置该列的 name                                                                                                                                                                                                                                                                                      |
| label        | `string`                      | -        | -       | 配置该列的 lable，在一列的头部显示                                                                                                                                                                                                                                                                   |
| defaultValue | `any`                         | -        | -       | 配置该列表单项的初始值，每次动态添加会显示该默认值，需要注意该属性不是配置在相关列组件的 `props` 中，因为它是所有列表单项共有的属性                                                                                                                                                                  |
| rules        | `any[]`                       | -        | -       | 配置该列的的校验规则，同 [antd 的 rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99), 不支持配置自定义的校验                                                                                                                                                     |
| type         | `input \| select \| password` | -        | input   | 配置表单项的类型, 目前仅支持 input, select 和 password                                                                                                                                                                                                                                               |
| encrypt      | `boolean`                     | -        | false   | 是否需要加密传输                                                                                                                                                                                                                                                                                     |
| inputProps   | `InputProps`                  | -        | -       | 当 `type = input` 时， 配置 input 相关的属性, 具体支持的属性见下图所示                                                                                                                                                                                                                               |
| selectProps  | `SelectProps`                 | -        | -       | 当 `type = select` 时， 配置 select 相关的属性, 具体支持的属性见下图所示                                                                                                                                                                                                                             |
| flex         | `number \| string`            | -        | 1       | 配置每一列的宽度，数字表示每一列所占的份额，例如在三列中如果每一列配置 `flex: 1`, 代表这三列平均等分这一行的宽度, 如果第一列配置 `flex: 2`, 其他列配置 `flex: 1`，代表第一列宽度是其他列的两倍，其余列的宽度都一样, 更多详情信息可查看 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) |

### rules 支持的校验类型

| field    | type      | description                              |
| -------- | --------- | ---------------------------------------- |
| required | `boolean` | 是否必选                                 |
| len      | `number`  | 字段长度校验                             |
| max      | `number`  | 最大长度校验                             |
| min      | `number`  | 最小长度校验                             |
| pattern  | `RegExp`  | 正则表达式校验                           |
| uniq     | `boolean` | 内置的自定义校验，会校验该列的值是否唯一 |

### InputProps

| property    | type                              | required | default | description                                                                                                                       |
| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| placeholder | `string`                          | -        | -       | 配置该列 placeholder                                                                                                              |
| type        | `text`\| `checkbox`\| `number`... | -        | -       | 该列表单项的类型，详情可查看 [\<input\> types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types) |
| disabled    | `boolean`                         | -        | -       | 该列表单项是否禁止                                                                                                                |

### SelectProps

| property    | type                                    | required | default | description                  |
| ----------- | --------------------------------------- | -------- | ------- | ---------------------------- |
| placeholder | `string`                                | -        | -       | 配置该列 placeholder         |
| disabled    | `boolean`                               | -        | -       | 该列表单项是否禁止           |
| options     | `Array<{label: string, value: string}>` | ✔️       | -       | 下拉框后选项                 |
| mode        | `multiple \| tags`                      | -        | -       | 设置下拉框的模式为多选或标签 |
| allowClear  | `boolean`                               | -        | false   | 是否支持清除                 |

# EVENTS

| type        | detail                  | description                                         |
| ----------- | ----------------------- | --------------------------------------------------- |
| item.add    | -                       | 增加一行时触发                                      |
| item.remove | `Record<string, any>`   | 增删除某一行时触发，detail 为该行的数据             |
| item.change | `Record<string, any>[]` | 修改每一列数据时触发，detail 该动态表单项全部的数据 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
