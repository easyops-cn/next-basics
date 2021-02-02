[//]: # "atom-bricks/form-input/code-editor-legacy.ts"

Tips: 该不符合 form 表单项的原则，且只支持少部分语言高亮，现已废弃，请使用新的[代码编辑构件](developers/brick-book/brick/code-bricks.code-editor)

# INPUTS

| property              | type                               | required | default  | description                                                                                                                |
| --------------------- | ---------------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| mode                  | string                             | ✔️       | -        | 语言模式，支持语言如下                                                                                                     |
| theme                 | string                             | -        | tomorrow | 主题，支持 tomorrow、monokai、github                                                                                       |
| value                 | string                             | -        | -        | 代码内容                                                                                                                   |
| required              | boolean                            | -        | -        | 是否必填，必填的时候如果没有值，编辑框会标红报错                                                                           |
| setOptions            | object                             | -        | -        | 设置选项，例如 tabSize、maxLines 等，参考[react-ace](https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md) |
| editorStyle           | Record<string,any>                 | -        | -        | 代码编辑器的样式，一般不用设置                                                                                             |
| <del>dataSource</del> | Record<string, any>                | -        | -        | Deprecated。数据来源，通常来源于后台                                                                                       |
| <del>field</del>      | { value?: string; mode?: string; } | -        | -        | Deprecated。字段映射, 跟 dataSource 一起使用来获得运行时 value                                                             |

# EVENTS

| type              | detail  | description                                     |
| ----------------- | ------- | ----------------------------------------------- |
| code.change       | value   | 值变化的时候发出的事件，detail 为值             |
| code.error.change | boolean | 值错误变化的时候发出的事件，detail 为是否有错误 |
| editor.blur       | value   | 编辑器失去焦点的时候发出的事件，detail 为值     |

# 支持语言：

- json
- sh
- text
- yaml
