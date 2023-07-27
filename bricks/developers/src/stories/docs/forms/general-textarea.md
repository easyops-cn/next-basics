[//]: # "atom-bricks/form-input/general-textarea.ts"

<details>
<summary>History</summary>

| Version | Change                                                    |
| ------- | --------------------------------------------------------- |
| 1.70.0  | 新增 `general.textarea.blur.V2` 事件                      |
| 1.91.0  | 新增 `disabled` 属性，构件正名为 `forms.general-textarea` |

</details>

# INPUTS

| property    | type                     | required | default | description                                                                                             |
| ----------- | ------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name        | `string`                 | ✔️       | -       | 字段名                                                                                                  |
| label       | `string`                 | -        | -       | 字段说明                                                                                                |
| placeholder | `string`                 | -        | -       | 占位说明                                                                                                |
| required    | `boolean`                | -        | false   | 是否是必填项                                                                                            |
| disabled    | `boolean`                | -        | false   | 是否禁用                                                                                                |
| value       | `string`                 | -        | -       | 初始值                                                                                                  |
| autoSize    | `boolean / AutoSizeType` | -        | -       | 自适应内容高度，或自配置                                                                                |
| min         | `number`                 | -        | -       | 最小长度                                                                                                |
| max         | `number`                 | -        | -       | 最大长度                                                                                                |
| pattern     | `string`                 | -        | -       | 正则表达式校验, 由于在 json 中配置仅支持 string 类型， 对于特殊字符需要额外再转义 `/\w{3}/ -> '\\w{3}'` |
| message     | `Record<string,string>`  | -        | -       | 校验文本信息                                                                                            |

```typescript
interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

interface handleBlurReturn {
  startPos: number;
  endPos: number;
  startStr: string;
  endStr: string;
  wholeStr: string;
}
```

# EVENTS

| type                       | detail           | description                                        |
| -------------------------- | ---------------- | -------------------------------------------------- |
| `general.textarea.change`  | `string`         | 输入变化时被触发，`event.detail` 为当前值          |
| `general.textarea.focus`   | `null`           | 获得焦点时触发                                     |
| `general.textarea.blur`    | `string`         | 失焦时触发，而且会传出当前输入框当前值             |
| `general.textarea.blur.V2` | handleBlurReturn | 失焦时触发，而且会传出当前输入框光标所在的前后部分 |

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
