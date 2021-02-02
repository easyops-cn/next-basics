[//]: # "atom-bricks/form-input/general-cascader.ts"

<details>
<summary>History</summary>

| Version | Change                            |
| ------- | --------------------------------- |
| 1.x.0   | 新增构件 `forms.general-cascader` |

</details>

# INPUTS

| property        | type                                               | required | default                                                  | description                                                                                                                  |
| --------------- | -------------------------------------------------- | -------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| name            | `string`                                           | ✔️       | -                                                        | 级联选择框字段名                                                                                                             |
| label           | `string`                                           | -        | -                                                        | 级联选择框字段说明                                                                                                           |
| required        | `boolean`                                          | -        | false                                                    | 是否是必填项                                                                                                                 |
| message         | `Record<string,string>`                            | -        | -                                                        | 校验文本信息                                                                                                                 |
| value           | `string[]`                                         | -        | -                                                        | 指定选中项                                                                                                                   |
| options         | `CascaderOptionType[]`                             | ✔️       | -                                                        | 可选项数据源                                                                                                                 |
| disabled        | `boolean`                                          | -        | false                                                    | 表单项禁用                                                                                                                   |
| allowClear      | `boolean`                                          | -        | true                                                     | 是否允许删除                                                                                                                 |
| expandTrigger   | `click \| hover`                                   | -        | click                                                    | 次级菜单的展开方式                                                                                                           |
| fieldNames      | `{label: string, value: string, children: string}` | -        | { label: 'label', value: 'value', children: 'children' } | 自定义 options 中 label name children 的字段，相关详情可查看 [fieldNames](https://3x.ant.design/components/cascader-cn/#API) |
| notFoundContent | `string`                                           | -        | 暂无数据                                                 | 当下拉列表为空时显示的内容                                                                                                   |
| placeholder     | `string`                                           | -        | -                                                        | 输入框占位文本                                                                                                               |
| popupPlacement  | `bottomLeft \| bottomRight \| topLeft \| topRight` | -        | bottomLeft                                               | 浮层的显示位置                                                                                                               |
| showSearch      | `boolean`                                          | -        | true                                                     | 是否开启搜索                                                                                                                 |
| size            | `large \| default \| small`                        | -        | default                                                  | 输入框大小                                                                                                                   |
| cascaderStyle   | `Object`                                           | -        | -                                                        | 级联选择器自定义样式                                                                                                         |
| suffixIcon      | `string`                                           | -        | -                                                        | 自定义的选择框后缀图标，仅支持 [antd 图标库](developers/icon?type=antd)， 配置图标的 `icon` 字段即可                         |

```typescript
interface CascaderOptionType {
  value?: string;
  label?: string;
  disabled?: boolean;
  children?: Array<CascaderOptionType>;
  [key: string]: any;
}
```

# EVENTS

| type            | detail                                                   | description                                                                            |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| cascader.change | {value: string[], selectedOptions: CascaderOptionType[]} | 级联选择项输入变化时触发，value 为选择的值，selectedOptions 为选择的值所对应的 options |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
