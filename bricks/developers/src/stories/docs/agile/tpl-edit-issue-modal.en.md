[//]: # "business-bricks/agile/tpl-edit-issue-modal.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.5.2   | New brick `agile.tpl-edit-issue-modal` |
| 1.6.0   | New configuration `productOptionQuery`         |
| 1.7.0   | New slots `headItems` and `endItems`   |

</details>

# INPUTS

| property           | type                | required | default | description                                                     |
| ------------------ | ------------------- | -------- | ------- | --------------------------------------------------------------- |
| issueId            | string              | ✔️       | -       | The id of the issue. Note that it is the `name` field, not `instanceId`               |
| values             | IssueForm           | -        | -       | The default values of the issue. Please assign the existing values of the issue to `values` when composing |
| staticValues       | Record<string, any> | -        | -       | The fixed values of the issue                                                  |
| productOptionQuery | any                 | -        | -       | Options that can restrict the product dropdown, the query of the cmdb search interface                |

## IssueForm

| property             | type                                                  | required | default | description    |
| -------------------- | ----------------------------------------------------- | -------- | ------- | -------------- |
| type                 | bug/story/sub-task                                    | -        | -       | Type           |
| title                | string                                                | -        | -       | Title           |
| descriptionAndImages | {text: string, images: [{name: string, url: string}]} | -        | -       | Description and screenshot attachments |
| priority             | high/medium/low                                       | -        | -       | Priority         |
| assignee             | string                                                | -        | -       | Assignee         |
| reporter             | string                                                | -        | -       | Reporter         |
| tester               | string                                                | -        | -       | Tester           |
| product              | string                                                | -        | -       | Related product       |

# SLOTS

| name      | description                          |
| --------- | ------------------------------------ |
| headItems | This slot displays the brick at the head of all form items |
| endItems  | This slot displays the brick at the end of all form items |

# EVENTS

| type | detail    | description                                                                |
| ---- | --------- | -------------------------------------------------------------------------- |
| save | IssueForm | The message after clicking the save button. If not provided, the default provider is used to write data, and the page is refreshed on success |

# METHODS

| name         | params    | description      |
| ------------ | --------- | ---------------- |
| open         | -         | Open the modal         |
| close        | -         | Close the modal         |
| setInitValue | IssueForm | Set the default values of the form |
