[//]: # "atom-bricks/form-input/brick-form.ts"

该构件即将废弃，请使用最新的 [通用表单](developers/brick-book/brick/forms.general-form) 代替

# INPUTS

| property          | type                                           | required | default    | description                                                                                                |
| ----------------- | ---------------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| fields            | Object                                         | true     | -          | 每个表单子项的字段配置项, 详情见下表 fields 配置项                                                         |
| showCancel        | boolean                                        | false    | true       | 是否显示取消按钮                                                                                           |
| cancelText        | string                                         | false    | 取消       | 取消按钮文本信息                                                                                           |
| showConfirm       | boolean                                        | false    | true       | 是否显示确认按钮                                                                                           |
| confirmText       | string                                         | false    | 确定       | 确认按钮文本                                                                                               |
| layout            | 'horizontal' &#124; 'vertical' &#124; 'inline' | false    | horizontal | 表单布局类型                                                                                               |
| labelCol          | ColProps                                       | false    | -          | label 标签布局 同 antd Form 的 [labelCol](https://ant.design/components/form-cn/#Form.Item) 配置           |
| wrapperCol        | ColProps                                       | false    | -          | 输入控件设置布局样式 同 antd Form 的 [wrapperCol](https://ant.design/components/form-cn/#Form.Item) 配置   |
| tailFormBtnLayout | Record<"wrapperCol", ColProps>                 | false    | -          | 表单底部提交栏布局样式 同 antd Form 的 [wrapperCol](https://ant.design/components/form-cn/#Form.Item) 配置 |
| showCard          | boolean                                        | false    | true       | 是否显示 card 边框                                                                                         |

## fields

| property            | type                                | required | default | description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ----------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field               | string                              | true     | -       | 输入控件 id 传入 `form.getFieldDecorator(id, options)`                                                                                                                                                                                                                                                                                                                                                                                                               |
| label               | string                              | false    | -       | 输入控件 label                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| fieldPath           | string                              | true     | -       | 提交数据的路径, 当表单提交的时候，每个控件的数据会根据这个路径填充到 api 请求的参数中                                                                                                                                                                                                                                                                                                                                                                                |
| component           | string                              | true     | -       | 输入控件使用的 component，支持内置和自定义，内置组件目前支持（Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch, TimePicker），每个组件有属于自己 property 时， 可直接在与 component 字段同级去配置。                                                                                                                                                                                                                                                  |
| configProps         | object                              | false    | -       | 当 component 为内置组件时，透传到 antd 相应组件的 property                                                                                                                                                                                                                                                                                                                                                                                                           |
| valuePropName       | string                              | false    | value   | 控件的值映射到的属性 同 antd valuePropName 配置                                                                                                                                                                                                                                                                                                                                                                                                                      |
| rules               | Object[]                            | false    | false   | 该字段的校验规则，用法跟 antd [options.rules](<https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0>) 相同, 但不支持自定义的校验器。其中 pattern 配置输入为正则表达式字符串，需对元字符进行双重转义，例如希望匹配/\.at/，则写成"\\.at"，规则同 jest，另外增加 flags 参数，可配置正则的 flags。参考[RegExp constructor mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description) |
| defaultValue        | boolean &#124; string &#124; number | false    | -       | 设置默认值目前仅支持原始类型的数据                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| computeDefaultValue | Object                              | false    | -       | defaultValue 不满足要求时，需要设置复杂类型的默认值（array 和 object），通过调用方法的方式返回具体默认值，设置该字段后不需要再设置 defaultValue                                                                                                                                                                                                                                                                                                                      |
| hideFromField       | string                              | false    | -       | 根据其他字段的值（boolean 类型）来设置该表单项是否显示隐藏                                                                                                                                                                                                                                                                                                                                                                                                           |
| optionList          | {text: string, id: string}          | false    | -       | 某些内置 component 的数据源 如 Select, Checkbox, Radio 等                                                                                                                                                                                                                                                                                                                                                                                                            |
| emitChangeEvent     | string                              | false    | -       | 配置该表单项控件输入变化时是否触发你所命名的 change 事件                                                                                                                                                                                                                                                                                                                                                                                                             |
| dataSource          | object                              | false    | -       | 每个表单控件可以指定一个数据源，用来展示该控件数据，详情见下表 dataSource 配置                                                                                                                                                                                                                                                                                                                                                                                       |

> Tips: 当使用自定义的外部构件作为 component 时，默认会把 field, form, onFieldChange 三个字段数据传到构件的实例上, 该外部构件需实现自己的数据校验和 onChange 事件等，代码详情可参考 bricks/contract-container/src/demo/common-method-container/index.tsx,
> storyboard 参考 micro-apps/contract-container/src/storyboard/appTimeline.ts

### computeDefaultValue

| property | type   | required | default | description            |
| -------- | ------ | -------- | ------- | ---------------------- |
| target   | string | true     | -       | 指定具体构件的 tagName |
| method   | string | true     | -       | 指定具体构件的方法     |
| args     | array  | false    | -       | 方法参数               |

### dataSource

| property     | type   | required | default | description                                                               |
| ------------ | ------ | -------- | ------- | ------------------------------------------------------------------------- |
| resolveName  | string | true     | -       | 指定使用数据源的 resolve name                                             |
| path         | string | false    | -       | 使用该 resolve 哪个字段下的数据                                           |
| useIdField   | string | false    | -       | 与 optionList 搭配， 指定该 optionList 下的 id 字段映射到该数据某个字段   |
| useTextField | string | false    | -       | 与 optionList 搭配， 指定该 optionList 下的 text 字段映射到该数据某个字段 |

# EVENTS

| type                         | detail | description                                                                    |
| ---------------------------- | ------ | ------------------------------------------------------------------------------ |
| brick.form.submit            | -      | 表单提交，传递该表单下的所有控件数据，点击提交按钮触发改事件                   |
| brick.form.update            | -      | 表单数据更新，并校验，成功传递表单更新的数据，失败传递 error                   |
| form.validate.failed         | -      | 表单检验失败触发该事件，传递 error 信息                                        |
| form.validate.success        | -      | 表单检验成功触发该事件，传递修改的表单项信息                                   |
| 用户自定义的控件 change 事件 | -      | 通过 field.emitChangeEvent 配置事件名称， 该字段下的控件输入变化时会触发该事件 |

# METHODS

| name               | params | description                                                                                                                                                      |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validateFormFields | -      | 触发表单校验的方法，当被外部构件调用时会对表单进行校验，成功触发 form.validate.success 事件，并传递表单数据，失败触发 form.validate.failed 事件，传递 error 信息 |
| stepOut            | -      | 供分步向导容器调用的方法，当分步向导容器切换步骤时，会调用该方法进行表单校验，校验失败禁止进入下一步，并触发相应的事件名默认为 brick.form.update，也可自定义配置 |
