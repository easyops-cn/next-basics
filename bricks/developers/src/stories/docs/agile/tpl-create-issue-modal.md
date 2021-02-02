[//]: # "business-bricks/agile/tpl-create-issue-modal.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.5.2   | 新增构件 `agile.tpl-create-issue-modal` |
| 1.6.0   | 新增配置 `productOptionQuery`           |
| 1.7.0   | 新增插槽 `headItems` and `endItems`     |

</details>

# INPUTS

| property           | type                | required | default | description                                      |
| ------------------ | ------------------- | -------- | ------- | ------------------------------------------------ |
| values             | IssueForm           | -        | -       | issue 的默认值                                   |
| staticValues       | Record<string, any> | -        | -       | issue 的固定值                                   |
| productOptionQuery | any                 | -        | -       | 可限定产品的下拉框选项，cmdb search 接口的 query |

## IssueForm

| property             | type                                                  | required | default | description    |
| -------------------- | ----------------------------------------------------- | -------- | ------- | -------------- |
| type                 | bug/story/sub-task                                    | -        | -       | 类型           |
| title                | string                                                | -        | -       | 标题           |
| descriptionAndImages | {text: string, images: [{name: string, url: string}]} | -        | -       | 描述及截图附件 |
| priority             | high/medium/low                                       | -        | -       | 优先级         |
| assignee             | string                                                | -        | -       | 负责人         |
| reporter             | string                                                | -        | -       | 报告人         |
| tester               | string                                                | -        | -       | 测试           |
| product              | string                                                | -        | -       | 关联产品       |

# EVENTS

| type | detail    | description                                                                |
| ---- | --------- | -------------------------------------------------------------------------- |
| save | IssueForm | 点击保存按钮后的消息，不输入则使用默认的 provider 写入数据，成功后刷新页面 |

# SLOTS

| name      | description                          |
| --------- | ------------------------------------ |
| headItems | 该插槽会把构件放在所有表单项首部显示 |
| endItems  | 该插槽会把构件放在所有表单项尾部显示 |

# METHODS

| name         | params    | description      |
| ------------ | --------- | ---------------- |
| open         | -         | 打开弹框         |
| close        | -         | 关闭弹框         |
| setInitValue | IssueForm | 给表单设置默认值 |
