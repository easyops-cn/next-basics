[//]: # "atom-bricks/data-view/code-display.ts"

<details>
<summary>History</summary>

| Version | Change                                                          |
| ------- | --------------------------------------------------------------- |
| 1.1.0   | 新增构件 `code-bricks.code-display`                             |
| 1.5.0   | 新增属性 `maxLines`,`minLines`                                  |
| 1.11.0  | 新增属性 `showExportButton`, `showCopyButton`, `exportFileName` |
| 1.21.0  | 新增属性 `highlightWords`, `highlightCaseSensitive`             |

</details>

> 使用 prismjs 库，具体查阅：<a href="https://prismjs.com/" target="_blank">https://prismjs.com/</a>

# INPUTS

| property               | type     | required | default      | description                                                               |
| ---------------------- | -------- | -------- | ------------ | ------------------------------------------------------------------------- |
| language               | string   | -        | -            | 语言，支持语言如下                                                        |
| showLineNumber         | boolean  | -        | true         | 展示代码行                                                                |
| value                  | string   | -        | -            | 代码内容                                                                  |
| maxLines               | number   | -        | -            | 最大行号，超出就显示滚动条，注意应该为正数                                |
| minLines               | number   | -        | 3            | 最小行号，即最小高度为多少行，注意应该为正数                              |
| showCopyButton         | boolean  | -        | true         | 是否显示复制按钮                                                          |
| showExportButton       | boolean  | -        | false        | 是否显示导出按钮                                                          |
| exportFileName         | string   | -        | download.txt | 当 `showExportButton = true` 时， 配置导出的文件名称, 默认为 download.txt |
| highlightWords         | string[] | -        | -            | 高亮的词，设置后会高亮出对应的词，效果同浏览器搜索的效果一样。            |
| highlightCaseSensitive | boolean  | -        | false        | 高亮词的时候是否区分大小写，默认不区分大小写。                            |

# 支持语言：

- javascript
- css
- markup
- bash
- shell
- c
- git
- go
- ini
- java
- json
- php
- powershell
- python
- sql
- typescript
- vim
- xml
- yaml
