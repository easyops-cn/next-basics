[//]: # "business-bricks/agile/issue-card.ts"

<details>
<summary>History</summary>

| Version | Change                                                                                     |
| ------- | ------------------------------------------------------------------------------------------ |
| 1.11.1  | Added the `resolution` property                                                            |
| 1.9.19  | Added the display of tester avatars                                                        |
| 1.2.0   | Added the events `parent.click` and `subtask.click` to support parent/child task display; added the `groupId` property |
| 1.0.0   | Added the `agile.issue-card` brick                                                         |

</details>

# INPUTS

| property            | type                                                                      | required | default                            | description                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------- | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| issueInfo           | IssueInfo                                                                 | ✔️       | -                                  | Issue information, defined as in the table below, usually obtained from an API                                                                                                     |
| issueTypeConfig     | IssueTypeConfig[]                                                         | -        | -                                  | Configuration of issue types, supporting custom types with their background color, icon, etc. The default configuration is used when not configured; see the table below for details |
| issuePriorityConfig | IssuePriorityConfig[]                                                     | -        | -                                  | Configuration of issue priorities, supporting custom priority names with their background color, etc. The default configuration is used when not configured; see the table below for details |
| issueAvatar         | Array<"assignee" \| "producer" \|"tester" \| "reporter" \| "subscribers"> | -        | ["assignee", "producer", "tester"] | Takes the related role information from issueInfo to display as avatars                                                                                                            |
| topRightBrick       | {useBrick: UseBrickConf }                                                 | -        | -                                  | Custom brick displayed at the top right                                                                                                                                            |

### IssueInfo

| property                 | type                                               | required | default | description                                                                                                 |
| ------------------------ | -------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| name                     | string                                             | ✔️       | -       | Issue name                                                                                                  |
| title                    | string                                             | ✔️       | -       | Issue title                                                                                                 |
| type                     | string                                             | -        | -       | Issue type                                                                                                  |
| priority                 | string                                             | -        | -       | Issue priority. The default options are high/medium/low, and custom values are also supported              |
| storyPoint               | number                                             | -        | -       | Story point                                                                                                 |
| storyPointUnit           | string                                             | -        | -       | Story point unit                                                                                            |
| assignee                 | {name:string,instanceId:string,user_icon:string}[] | -        | -       | Assignee, displayed in the first column of the card's avatar area; a gray avatar is shown by default when there is no data |
| reporter                 | {name:string,instanceId:string,user_icon:string}[] | -        | -       | Reporter                                                                                                    |
| tester                   | {name:string,instanceId:string,user_icon:string}[] | -        | -       | Tester, displayed in the second column of the card's avatar area; a gray avatar is shown by default when there is no data |
| groupId                  | number                                             | -        | -       | Used to automatically add a group color bar to the issue card. 8 colors are built in, and the value ranges from 0 to 7 |
| resolution               | string                                             | -        | -       | Marks the resolution result of the card. If this field is not empty, the card is considered completed and the title is displayed with a strikethrough |
| isShowSubtasksStatistics | boolean                                            | -        | false   | Whether to show separate statistics for tasks and bugs                                                      |

### IssueTypeConfig

| property        | type     | required | default | description                                                                          |
| --------------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| name            | string   | ✔️       | -       | Type definition; the `IssueInfo.type` field is matched against this field for rendering |
| backgroundColor | string   | ✔️       | -       | Background color                                                                     |
| icon            | MenuIcon | ✔️       | -       | Icon of the type, consistent with the platform icon configuration                    |
| title           | string   | -        | -       | Type name                                                                            |

### IssuePriorityConfig

| property        | type   | required | default | description                                                                                  |
| --------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------- |
| name            | string | ✔️       | -       | Priority definition; the `IssueInfo.priority` field is matched against this field for rendering |
| title           | string | ✔️       | -       | Priority name                                                                                |
| backgroundColor | string | ✔️       | -       | Background color                                                                             |

# EVENTS

| type          | detail    | description                                                                                       |
| ------------- | --------- | ------------------------------------------------------------------------------------------------- |
| card.click    | issueInfo | Event emitted when the card is clicked; detail is all the card content                            |
| parent.click  | issueInfo | Event emitted when the P tag on the card (representing the card's parent task) is clicked; detail is all the card content |
| subtask.click | issueInfo | Event emitted when the subtask statistics below the card are clicked; detail is all the card content |
