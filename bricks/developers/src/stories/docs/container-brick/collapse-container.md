[//]: # "atom-bricks/layout-and-container/collapse-container.ts"

<details>
<summary>History</summary>

| Version | Change                       |
| ------- | ---------------------------- |
| 2.10.0  | 新增属性 `panelProps.hidden` |

</details>

# INPUTS

| property           | type                                                                                                                                             | required | default                          | description                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| panelsList         | panelProps[]                                                                                                                                     | ✔️       | -                                | 面板列表项，具体看下表                                                                                                                                               |
| type               | "grey-header-with-white-content"\|"white-header-with-gray-content"\| "white-header-with-white-content"\| "small-white-header-with-white-content" | -        | "grey-header-with-white-content" | 支持四种类型的折叠面板：灰色头部白色内容区、白色头部灰色内容区、白色头部白色内容区、小间距的白色头部白色内容区（一般用于内容为卡片的情况），可根据场景选择所需类型。 |
| expandAll          | boolean                                                                                                                                          | -        | false                            | 是否全部默认展开                                                                                                                                                     |
| activeKey          | (string \| number)[]                                                                                                                             | -        | false                            | 默认展开的面板的 key                                                                                                                                                 |
| accordion          | boolean                                                                                                                                          | -        | false                            | 是否为手风琴模式                                                                                                                                                     |
| expandIconPosition | "left" \| "right"                                                                                                                                | -        | "left"                           | 面板展开折叠 Icon 的位置                                                                                                                                             |

## panelProps

| property   | type    | required | default | description                              |
| ---------- | ------- | -------- | ------- | ---------------------------------------- |
| panelTitle | string  | ✔️       | -       | 面板标题                                 |
| key        | boolean | ✔️       | -       | 面板的唯一 key，需配置，与 slot 一一对应 |
| desc       | string  | -        | -       | 面板描述信息                             |
| showArrow  | boolean | -        | true    | 面板是否展示箭头                         |
| disabled   | boolean | -        | -       | 面板是否禁用                             |
| hidden     | boolean | -        | -       | 面板是否隐藏                             |
