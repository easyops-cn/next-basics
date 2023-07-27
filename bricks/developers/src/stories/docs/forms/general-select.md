[//]: # "atom-bricks/form-input/general-select.ts"

<details>
<summary>History</summary>

| Version | Change                                    |
| ------- | ----------------------------------------- |
| 1.33.0  | 新增属性 `suffix`，废弃属性 `suffixBrick` |
| 1.56.0  | 新增属性 `size`                           |
| 1.59.0  | 新增属性 `emptyOption`                    |
| 1.72.0  | 新增属性 `groupBy`                        |
| 1.77.0  | 新增属性 `tokenSeparators`                |

</details>

# INPUTS

| property                    | type                                                                                                              | required | default   | description                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------ |
| name                        | `string`                                                                                                          | ✔️       | -         | 选择框字段名                                                 |
| options                     | `string[]\|number[]\|LabeledValue[]`                                                                              | ✔️       | -         | 候选项列表                                                   |
| label                       | `string`                                                                                                          | -        | -         | 选择框字段说明                                               |
| mode                        | `"multiple"\|"tags"`                                                                                              | -        | -         | 选择框模式                                                   |
| placeholder                 | `string`                                                                                                          | -        | -         | 选择框占位说明                                               |
| value                       | `string\|number\|string[]\|number[]`                                                                              | -        | -         | 选择框初始值                                                 |
| required                    | `boolean`                                                                                                         | -        | false     | 是否是必填项                                                 |
| message                     | `Record<string,string>`                                                                                           | -        | -         | 校验文本信息                                                 |
| fields                      | `{label: string, value: string}`                                                                                  | -        | -         | 列表指定字段作为 label 和 value                              |
| dropdownMatchSelectWidth    | `boolean`                                                                                                         | -        | true      | 下拉菜单和选择器同宽                                         |
| inputBoxStyle               | `object`                                                                                                          | -        |           | 输入框样式                                                   |
| allowClear                  | `boolean`                                                                                                         | -        | true      | 支持清除选项                                                 |
| showSearch                  | `boolean`                                                                                                         | -        | true      | 支持搜索                                                     |
| suffix                      | <code>{ useBrick: <a href="http://docs.developers.easyops.cn/docs/brick-next/transform">UseBrickConf</a> }</code> | -        | -         | 支持在文本后添加自定义构件                                   |
| suffixStyle                 | `object`                                                                                                          | -        | -         | 设置后置构件容器的样式                                       |
| <del>suffixBrick</del>      | [UseBrickConf](http://docs.developers.easyops.cn/docs/brick-next/transform)                                       | -        | -         | Deprecated. 支持在文本后添加自定义构件                       |
| <del>suffixBrickStyle</del> | `object`                                                                                                          | -        | -         | Deprecated. 设置后置构件容器的样式                           |
| size                        | `"small" \| "default" \| "large"`                                                                                 | -        | "default" | 选择框大小                                                   |
| emptyOption                 | `LabeledValue`                                                                                                    | -        | -         | 空候选项，将插入到候选项列表最前面                           |
| groupBy                     | `string`                                                                                                          | -        | -         | 基于 `options` 列表中的某个字段进行分组显示                  |
| tokenSeparators             | `string[]`                                                                                                        | -        | -         | 在 mode 为 `tags` 和 `multiple` 的模式下定义自动分词的分隔符 |

```typescript
interface LabeledValue {
  label: string;
  value: string | number;
}
```

# EVENTS

| type                       | detail                        | description                                                                             |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| `general.select.change`    | `any`                         | 下拉选中变化时被触发，`event.detail` 为当前选择项的值                                   |
| `general.select.change.v2` | `{label: string, value: any}` | 下拉选中变化时被触发，`event.detail` 为当前选择项的值和标签                             |
| `general.select.focus`     | `null`                        | 获得焦点时触发                                                                          |
| `general.select.blur`      | `null`                        | 失焦时触发                                                                              |
| `general.select.search`    | `string`                      | 文本框值变化时触发，只在 mode 为 'multiple' \| 'tags' 有效，`event.detail` 为当前输入值 |

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得选择框所属表单元素 |
