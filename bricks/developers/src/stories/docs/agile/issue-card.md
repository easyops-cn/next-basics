[//]: # "business-bricks/agile/issue-card.ts"

<details>
<summary>History</summary>

| Version | Change                                                                               |
| ------- | ------------------------------------------------------------------------------------ |
| 1.11.1  | 新增 `resolution` 属性                                                               |
| 1.9.19  | 增加测试人头像的显示                                                                 |
| 1.2.0   | 新增事件 `parent.click` 和 `subtask.click`，支持显示父子任务信息；新增属性 `groupId` |
| 1.0.0   | 新增构件 `agile.issue-card`                                                          |

</details>

# INPUTS

| property            | type                                                                      | required | default                            | description                                                                                          |
| ------------------- | ------------------------------------------------------------------------- | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| issueInfo           | IssueInfo                                                                 | ✔️       | -                                  | issue 信息，具体定义如下表，通常来自于接口                                                           |
| issueTypeConfig     | IssueTypeConfig[]                                                         | -        | -                                  | issue 类型的配置，支持自定义类型和对应的背景色、icon 等，不配置的时候将使用默认配置，具体定义如下表  |
| issuePriorityConfig | IssuePriorityConfig[]                                                     | -        | -                                  | issue 优先级的配置，支持自定义优先级名称和对应的背景色等，不配置的时候将使用默认配置，具体定义如下表 |
| issueAvatar         | Array<"assignee" \| "producer" \|"tester" \| "reporter" \| "subscribers"> | -        | ["assignee", "producer", "tester"] | 取 issueInfo 中相关角色信息作为头像显示                                                              |

### IssueInfo

| property       | type                                               | required | default | description                                                                      |
| -------------- | -------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------- |
| name           | string                                             | ✔️       | -       | issue 名称                                                                       |
| title          | string                                             | ✔️       | -       | issue 标题                                                                       |
| type           | string                                             | -        | -       | issue 类型                                                                       |
| priority       | string                                             | -        | -       | issue 优先级，默认可选 high/medium/low，也支持自定义                             |
| storyPoint     | number                                             | -        | -       | 估时                                                                             |
| storyPointUnit | string                                             | -        | -       | 估时单位                                                                         |
| assignee       | {name:string,instanceId:string,user_icon:string}[] | -        | -       | 负责人，会在卡片头像区的第一列显示，若无数据时会默认显示灰色头像                 |
| reporter       | {name:string,instanceId:string,user_icon:string}[] | -        | -       | 报告人                                                                           |
| tester         | {name:string,instanceId:string,user_icon:string}[] | -        | -       | 测试人， 会在卡片头像区的第二列显示，若无数据时会默认显示灰色头像                |
| groupId        | number                                             | -        | -       | 用于自动给 issue 卡片带上分组色条，内置 8 个颜色，该值取值 0-7                   |
| resolution     | string                                             | -        | -       | 标记卡片的解决结果，如果该字段不为空，则表示卡片处于完成状态，标题会做删除线处理 |

### IssueTypeConfig

| property        | type     | required | default | description                                        |
| --------------- | -------- | -------- | ------- | -------------------------------------------------- |
| name            | string   | ✔️       | -       | 类型定义，`IssueInfo.type`字段与该字段匹配进行呈现 |
| backgroundColor | string   | ✔️       | -       | 背景色                                             |
| icon            | MenuIcon | ✔️       | -       | 类型的 icon，通平台 icon 配置一致                  |
| title           | string   | -        | -       | 类型名称                                           |

### IssuePriorityConfig

| property        | type   | required | default | description                                              |
| --------------- | ------ | -------- | ------- | -------------------------------------------------------- |
| name            | string | ✔️       | -       | 优先级定义，`IssueInfo.priority`字段与该字段匹配进行呈现 |
| title           | string | ✔️       | -       | 优先级名称                                               |
| backgroundColor | string | ✔️       | -       | 背景色                                                   |

# EVENTS

| type          | detail    | description                                                        |
| ------------- | --------- | ------------------------------------------------------------------ |
| card.click    | issueInfo | 点击卡片发出的事件，detail 为卡片所有内容                          |
| parent.click  | issueInfo | 点击卡片 P 标签（表示卡片父任务）发出的事件，detail 为卡片所有内容 |
| subtask.click | issueInfo | 点击卡片下方子任务统计信息发出的事件，detail 为卡片所有内容        |
