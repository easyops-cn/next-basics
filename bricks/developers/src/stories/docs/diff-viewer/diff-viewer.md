[//]: # "atom-bricks/data-view/diff-viewer.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.1.0   | 新增属性 `showCard`           |
| 1.2.0   | 新增事件 `diffViewer.stepOut` |

</details>

# INPUTS

| property         | type      | required | default | description                                                                                           |
| ---------------- | --------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| oldValue         | `string`  | ✔️       | `""`    | 未修改的值                                                                                            | - |
| newValue         | `string`  | ✔️       | `""`    | 修改后的值                                                                                            | - |
| OriginDiffFields | `object`  | -        | -       | 准备废弃，使用 `configProps` 代替                                                                     | - |
| showCard         | `boolean` | -        | `true`  | 是否显示边框                                                                                          | - |
| configProps      | `object`  | -        | -       | 透传到 react-diff-viewer 属性 具体详情查看[官方文档](https://www.npmjs.com/package/react-diff-viewer) | - |
| splitView        | `boolean` | -        | `true`  | 视图的类型 `false` 为统一(不区分左右整栏进行对比), `true` 为拆分(分为左右两栏进行对比)                | - |
| showDiffOnly     | `boolean` | -        | `true`  | 显示相关变化的行折叠没有变化的行                                                                      | - |
| disableWordDiff  | `boolean` | -        | `false` | 是否关闭单词的变化对比                                                                                | - |
| hideLineNumbers  | `boolean` | -        | `false` | 是否隐藏行数                                                                                          | - |
| leftTitle        | `string`  | -        | -       | 左边栏标题                                                                                            | - |
| rightTitle       | `string`  | -        | -       | 右边栏标题                                                                                            | - |

# EVENTS

| type               | detail                                   | description                                                                                                                                  |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| diffViewer.stepOut | `{ oldValue: string, newValue: string }` | `stepOut` 方法被调用时，发出的事件。`stepOut` 方法根据是否调用了事件的 `preventDefault` 方法，返回 `Promise.reject()` 或 `Promise.resolve()` |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
