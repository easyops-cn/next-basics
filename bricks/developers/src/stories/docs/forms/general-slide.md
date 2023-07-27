[//]: # "atom-bricks/form-input/general-slide.ts"

<details>
<summary>History</summary>

| Version | Change                          |
| ------- | ------------------------------- |
| 1.x.0   | 新增构件 `forms.general-slide`  |
| 1.100.0 | 新增属性 `onlyShowMode`、`size` |

</details>

# INPUTS

| property     | type                                                                | required | default | description                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | `string`                                                            | ✔️       | -       | 表单项字段名                                                                                                                                                        |
| label        | `string`                                                            | -️       | -       | 表单项字段说明                                                                                                                                                      |
| required     | `string`                                                            | -️       | false   | 是否是必填项                                                                                                                                                        |
| value        | `number \| [number, number]`                                        | -️       | false   | 指定滑动条的值， 需要注意的是当 `range = false` 时值的类型为 `string` 格式， 当 `range = true` 时，值的类型为 `[number,number]` 的格式                              |
| disabled     | `boolean`                                                           | -️       | false   | 是否禁止滑动                                                                                                                                                        |
| dots         | `boolean`                                                           | -️       | false   | 是否只能拖拽到刻度上                                                                                                                                                |
| max          | `number`                                                            | -️       | 100     | 滑动条的最大值                                                                                                                                                      |
| min          | `number`                                                            | -️       | 0       | 滑动条的最小值                                                                                                                                                      |
| range        | `boolean`                                                           | -️       | false   | 是否显示双滑块模式，双滑块模式时，value 的格式为 `[number, number]` 分别代表所选择的起始值和终点值                                                                  |
| marks        | `{number: string} \| number: {style: CSSProperties, label: string}` | -️       | -       | 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式                                                                            |
| step         | `number \| null`                                                    | -️       | 1       | 步长，当 marks 不为空对象时有效，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时滑动条的可选值仅有 marks 标出来的部分 |
| included     | `boolean`                                                           | -️       | true    | marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列                                                                                                |
| onlyShowMode | `boolean`                                                           | -️       | false   | 只用展示不能改变任何值的模式，该属性与 `disabled` 不同的地方在于呈现的样式不一样                                                                                    |
| size         | `string`                                                            | -️       | -       | 为空则默认，也可为 large 模式，仅在 onlyShowMode 模式下有效                                                                                                         |

# EVENTS

| type          | detail                       | description                                                                                                                                   |
| ------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange      | `number \| [number, number]` | 当滑动条被拖动的时候触发，`range = false` detail 传出值 为 `string`, `range = true` detail 传出值为 `[number, number]` 连续拖动时会触发不同值 |
| onAfterChange | `number \| [number, number]` | 滑动条被拖动并且鼠标松开后才被触发， 其余跟 onChange 事件相同                                                                                 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
