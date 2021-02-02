[//]: # "atom-bricks/form-input/cmdb-instance-select.ts"

<details>
<summary>History</summary>

| Version | Change                                          |
| ------- | ----------------------------------------------- |
| 1.44.0  | 新增属性 `allowClear`                           |
| 1.49.0  | 新增属性 `inputBoxStyle`                        |
| 1.77.0  | 新增属性 `extraSearchKey`                       |
| 1.79.0  | 新增事件 `forms.cmdb-instance-select.change.v2` |

</details>

# 注意

该构件是下拉框对 cmdb 列表的一个简单封装，只适用于于简单的数据选择和搜索，如果涉及到复杂的数据选择，可能需要有高级的过滤（比如主机数据，需要按 IP，按主机名，按状态等过滤），则建议用：[CMDB 实例输入表单项 ](developers/brick-book/brick/cmdb-instances.cmdb-instances-input-form)

# INPUTS

| property           | type                               | required | default                           | description                                                                                                                                                               |
| ------------------ | ---------------------------------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name               | `string`                           | ✔️       | -                                 | 下拉框字段名                                                                                                                                                              |
| label              | `string`                           | -        | -                                 | 下拉框字段说明                                                                                                                                                            |
| placeholder        | `string`                           | -        | -                                 | 下拉框占位说明                                                                                                                                                            |
| required           | `boolean`                          | -        | false                             | 是否是必填项                                                                                                                                                              |
| value              | `string`                           | -        | -                                 | 下拉框初始值                                                                                                                                                              |
| objectId           | `string`                           | -        | -                                 | 模型 id                                                                                                                                                                   |
| mode               | `multiple \| tags`                 | -        | -                                 | 多选模式，不是多选不需要填写                                                                                                                                              |
| fields             | `{label: string, value?: string]}` | -        | {label: name , value: instanceId} | 自定义 select 下拉选项的 label 和 value 字段， 默认 label 显示为模型的 name 值，value 为 instanceId                                                                       |
| instanceQuery      | `object \| array`                  | -        | -                                 | 下拉框选项的过滤条件， 参数同 InstanceApi.postSearch 中的 query， 其中内置了关键字搜索的过滤条件，再根据用户输入合并 query 最终格式为 `$and: [internalQuery， userQuery]` |
| message            | `Record<string,string>`            | -        | -                                 | 校验文本信息                                                                                                                                                              |
| minimumInputLength | `number`                           | -        | 0                                 | 输入多少个字符才触发搜索动作， 默认 0 表示在点击下拉框时触发一次，后面每次输入都会进行搜索操作。                                                                          |
| allowClear         | `boolean`                          | -        | false                             | 支持清除选项                                                                                                                                                              |
| inputBoxStyle      | `object`                           | -        | -                                 | 输入框样式                                                                                                                                                                |
| extraSearchKey     | `string[]`                         | -        | -                                 | 配置额外的字段进行搜索，默认的是 label，若配置为 ["memo"]，则会基于 memo 和 label 两个字段进行联合搜索                                                                    |

# EVENTS

| type                                 | detail                                               | description                                           |
| ------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------- |
| forms.cmdb-instance-select.change    | `string`                                             | 选项改变触发事件, 传出的数据为当前项的值              |
| forms.cmdb-instance-select.change.v2 | `{label: string, value: string, [key: string]: any}` | 选项改变时触发，传出的数据为当前项的值所对应的 option |

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
