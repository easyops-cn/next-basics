[//]: # "business-bricks/agile/tpl-create-issue-modal.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.5.2   | New brick `agile.tpl-create-issue-modal` |
| 1.6.0   | New configuration `productOptionQuery`   |
| 1.7.0   | New slots `headItems` and `endItems`     |

</details>

# INPUTS

| property           | type                | required | default | description                                        |
| ------------------ | ------------------- | -------- | ------- | -------------------------------------------------- |
| values             | IssueForm           | -        | -       | The default values of the issue                    |
| staticValues       | Record<string, any> | -        | -       | The fixed values of the issue                      |
| productOptionQuery | any                 | -        | -       | Options that can restrict the product dropdown, the query of the cmdb search interface |

## IssueForm

| property             | type                                                  | required | default | description    |
| -------------------- | ----------------------------------------------------- | -------- | ------- | -------------- |
| type                 | bug/story/sub-task                                    | -        | -       | Type           |
| title                | string                                                | -        | -       | Title          |
| descriptionAndImages | {text: string, images: [{name: string, url: string}]} | -        | -       | Description and screenshot attachments |
| priority             | high/medium/low                                       | -        | -       | Priority       |
| assignee             | string                                                | -        | -       | Assignee       |
| reporter             | string                                                | -        | -       | Reporter       |
| tester               | string                                                | -        | -       | Tester         |
| product              | string                                                | -        | -       | Related product |

# EVENTS

| type | detail    | description                                                                |
| ---- | --------- | -------------------------------------------------------------------------- |
| save | IssueForm | The message after clicking the save button. If not provided, the default provider is used to write data, and the page is refreshed on success |

# SLOTS

| name      | description                                        |
| --------- | -------------------------------------------------- |
| headItems | This slot displays the brick at the head of all form items |
| endItems  | This slot displays the brick at the end of all form items |

# METHODS

| name         | params    | description              |
| ------------ | --------- | ------------------------ |
| open         | -         | Open the modal           |
| close        | -         | Close the modal          |
| setInitValue | IssueForm | Set the default values of the form |
