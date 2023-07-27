[//]: # "atom-bricks/form-input/code-editor.ts"

<details>
<summary>History</summary>

| Version | Change                                                          |
| ------- | --------------------------------------------------------------- |
| 1.0.2   | 新增构件 `code-bricks.code-editor`                              |
| 1.7 .0  | 新增属性 `readOnly`，新增功能 `语法校验表单联动`                |
| 1.11 .0 | 新增属性 `showExportButton`, `showCopyButton`, `exportFileName` |
| 1.17.0  | 支持模式 `terraform`                                            |

</details>

# INPUTS

| property            | type                    | required | default      | description                                                                                                                                                                                                                                                                   |
| ------------------- | ----------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                | `string`                | ✔️       | -            | 输入框字段名                                                                                                                                                                                                                                                                  |
| label               | `string`                | -        | -            | 输入框字段说明                                                                                                                                                                                                                                                                |
| placeholder         | `string`                | -        | -            | 输入框占位说明                                                                                                                                                                                                                                                                |
| mode                | string                  | -        | text         | 语言模式，支持语言如下                                                                                                                                                                                                                                                        |
| theme               | string                  | -        | monokai      | 主题，支持 tomorrow、monokai、github                                                                                                                                                                                                                                          |
| value               | string                  | -        | -            | 代码内容                                                                                                                                                                                                                                                                      |
| required            | boolean                 | -        | -            | 是否必填                                                                                                                                                                                                                                                                      |
| message             | `Record<string,string>` | -        | -            | 校验文本信息                                                                                                                                                                                                                                                                  |
| showLineNumbers     | boolean                 | -        | true         | 是否显示行号                                                                                                                                                                                                                                                                  |
| maxLines            | number \| "Infinity"    | -        | -            | 最大行号，超出就显示滚动条，注意应该为正数或者无穷大                                                                                                                                                                                                                          |
| minLines            | number                  | -        | 3            | 最小行号，即最小高度为多少行                                                                                                                                                                                                                                                  |
| tabSize             | number                  | -        | 2            | 一个 tab 代表多少个空格                                                                                                                                                                                                                                                       |
| printMargin         | boolean                 | -        | -            | 显示打印边距                                                                                                                                                                                                                                                                  |
| highlightActiveLine | boolean                 | -        | true         | 高亮激活的行                                                                                                                                                                                                                                                                  |
| readOnly            | boolean                 | -        | false        | 是否只能读，不能编辑。如果一个页面同时需要编辑和查看，可以使用该属性，以保证代码构件的一致性。而如果一个页面只有查看的功能，建议直接使用轻量级[代码展示构件 code-bricks.code-display](developers/brick-book/brick/code-bricks.code-display)，避免代码内容过多的时候页面卡顿。 |
| showCopyButton      | boolean                 | -        | true         | 是否显示复制按钮                                                                                                                                                                                                                                                              |
| showExportButton    | boolean                 | -        | false        | 是否显示导出按钮                                                                                                                                                                                                                                                              |
| exportFileName      | string                  | -        | download.txt | 当 `showExportButton = true` 时， 配置导出的文件名称, 默认为 download.txt                                                                                                                                                                                                     |

# EVENTS

| type         | detail                                      | description                                                           |
| ------------ | ------------------------------------------- | --------------------------------------------------------------------- |
| code.change  | value                                       | 值变化的时候发出的事件，detail 为值                                   |
| error.change | {err:Record<string,any>[],hasError:boolean} | 值错误变化的时候发出的事件，err 为具体错误信息，hasError 为是否有错误 |
| editor.blur  | value                                       | 编辑器失去焦点的时候发出的事件，detail 为值                           |

# 支持语言：

- json
- sh
- text
- yaml
- javascript
- markdown
- python
- java
- xml
- mysql
- golang
- terraform
- brick_next
- brick_next_yaml
