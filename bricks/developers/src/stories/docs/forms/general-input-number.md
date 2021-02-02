[//]: # "atom-bricks/form-input/general-input-number.ts"

# INPUTS

| property      | type                    | required | default | description        |
| ------------- | ----------------------- | -------- | ------- | ------------------ |
| name          | `string`                | ✔️       | -       | 数字输入框字段名   |
| label         | `string`                | -        | -       | 数字输入框字段说明 |
| placeholder   | `string`                | -        | -       | 数字输入框占位说明 |
| value         | `number`                | -        | -       | 数字输入框初始值   |
| required      | `boolean`               | -        | false   | 是否是必填项       |
| step          | `number`                | -        | -       | 数字输框入步长     |
| min           | `number`                | -        | -       | 数字输入框最小值   |
| max           | `number`                | -        | -       | 数字输入框最大值   |
| message       | `Record<string,string>` | -        | -       | 校验文本信息       |
| inputBoxStyle | `object`                | -        |         | 输入框样式         |

# EVENTS

| type                        | detail   | description                                                                                                         |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `general.input.change`      | `number` | 输入改变，`event.detail` 是当前值                                                                                   |
| `general.input.press.enter` | `object` | 按下 enter 键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events) |
| `general.input.focus`       | `null`   | 获得焦点时触发                                                                                                      |
| `general.input.blur`        | `string` | 失焦时触发，而且会传出当前输入框当前值                                                                              |

> Tips: 对于 event.detail 为 `Keyboard Event` 时， 由于 react 对于合成事件的处理，打印出来的整个 `Keyboard Event` 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可[查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。

# METHODS

| name           | params | description            |
| -------------- | ------ | ---------------------- |
| getFormElement | -      | 获得输入框所属表单元素 |
