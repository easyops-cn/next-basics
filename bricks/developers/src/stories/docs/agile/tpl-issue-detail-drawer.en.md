[//]: # "business-bricks/agile/tpl-issue-detail-drawer.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.5.2   | New brick `agile.tpl-issue-detail-drawer` |

</details>

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# EVENTS

| type  | detail | description  |
| ----- | ------ | ------------ |
| open  | -      | Drawer open event |
| close | -      | Drawer close event |

# METHODS

| name | params  | description                                                        |
| ---- | ------- | ------------------------------------------------------------------ |
| open | issueId | Open the issue detail drawer. Note that `issueId` is the `name` field, not `instanceId` |
