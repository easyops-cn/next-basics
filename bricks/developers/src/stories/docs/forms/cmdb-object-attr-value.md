[//]: # "atom-bricks/form-input/cmdb-object-attr-value.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.83.0  | 新增构件 `forms.cmdb-object-attr-value` |

</details>

# INPUTS

| property      | type        | required | default                                                                                     | description              |
| ------------- | ----------- | -------- | ------------------------------------------------------------------------------------------- | ------------------------ |
| valueType     | ValueType[] | false    | ['str','int','date','datetime','enum','enums','arr','struct','structs','ip','bool','float'] | 模型属性值可选择的值类型 |
| name          | string      | ✔️       | -                                                                                           | 表单项名称               |
| label         | string      | -        | -                                                                                           | 表单项标签               |
| value         | string[]    | -        | -                                                                                           | 值类型初始值             |
| required      | boolean     | -        | false                                                                                       | 值类型是否必填           |
| inputBoxStyle | `object`    | -        |                                                                                             | 输入框样式               |

### valueType

```typescript
type valueType =
  | "str"
  | "int"
  | "date"
  | "datetime"
  | "enum"
  | "enums"
  | "arr"
  | "struct"
  | "structs"
  | "ip"
  | "bool"
  | "float";
```

# EVENTS

| type                                  | detail   | description            |
| ------------------------------------- | -------- | ---------------------- |
| `forms.cmdb-object-attr-value.change` | `Object` | 值类型表单项改变时触发 |
