[//]: # "atom-bricks/topology-v2/header-with-dropdown.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.4.0   | 新增事件 `header.click`               |
| 1.2.0   | 新增构件 `graph.header-with-dropdown` |

</details>

# INPUTS

| property           | type                    | required | default | description                                                 |
| ------------------ | ----------------------- | -------- | ------- | ----------------------------------------------------------- |
| header             | string                  | ✔️       | -       | 头部文案                                                    |
| contentItemActions | {useBrick:UseBrickConf} | -        | -       | 支持为下拉框自定义构件                                      |
| item               | Record<string,any>      | -        | -       | 数据，如果需要根据数据的不同渲染下拉框的选项，可以传入 item |

### UseBrickConf

| property   | type           | required | default | description                                    |
| ---------- | -------------- | -------- | ------- | ---------------------------------------------- |
| brick      | string         | ✔️       | -       | 构件名称                                       |
| properties | object         | -        | -       | 构件属性                                       |
| events     | BrickEventsMap | -        | -       | 事件                                           |
| transform  | string\|object | -        | -       | 属性数据转换                                   |
| if         | string         | -        | -       | 支持写 if 表达式，可以根据 item 的数据进行计算 |

# EVENTS

| type         | detail | description            |
| ------------ | ------ | ---------------------- |
| header.click | -      | 点击 header 发出的事件 |
