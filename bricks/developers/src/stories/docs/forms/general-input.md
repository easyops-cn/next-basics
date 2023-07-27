[//]: # "atom-bricks/form-input/general-input.ts"

<details>
<summary>History</summary>

| Version | Change                              |
| ------- | ----------------------------------- |
| 1.61.0  | 新增属性 `addonBefore`,`addonAfter` |

</details>

# INPUTS

| property      | type                    | required | default | description                                                                                             |
| ------------- | ----------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name          | `string`                | ✔️       | -       | 输入框字段名                                                                                            |
| label         | `string`                | -        | -       | 输入框字段说明                                                                                          |
| placeholder   | `string`                | -        | -       | 输入框占位说明                                                                                          |
| value         | `string`                | -        | -       | 输入框初始值                                                                                            |
| required      | `boolean`               | -        | false   | 是否必填                                                                                                |
| min           | `number`                | -        | -       | 最小长度                                                                                                |
| max           | `number`                | -        | -       | 最大长度                                                                                                |
| pattern       | `string`                | -        | -       | 正则表达式校验, 由于在 json 中配置仅支持 string 类型， 对于特殊字符需要额外再转义 `/\w{3}/ -> '\\w{3}'` |
| message       | `Record<string,string>` | -        | -       | 校验文本信息                                                                                            |
| disabled      | `boolean`               | -        | -       | 是否禁用                                                                                                |
| inputBoxStyle | `object`                | -        |         | 输入框样式                                                                                              |
| addonBefore   | string                  | -        |         | 设置前置标签                                                                                            |
| addonAfter    | string                  | -        |         | 设置后置标签                                                                                            |

# EVENTS

| type                        | detail   | description                                                                                                         |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `general.input.change`      | `string` | 输入改变，`event.detail` 是当前值                                                                                   |
| `general.input.keydown`     | `object` | 按下键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)    |
| `general.input.keyup`       | `object` | 释放键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)    |
| `general.input.press.enter` | `object` | 按下 enter 键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events) |
| `general.input.focus`       | `null`   | 获得焦点时触发                                                                                                      |
| `general.input.blur`        | `string` | 失焦时触发, 而且会传出当前输入框当前值                                                                              |

> Tips: 对于 event.detail 为 `Keyboard Event` 时， 由于 react 对于合成事件的处理，打印出来的整个 `Keyboard Event` 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可[查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
