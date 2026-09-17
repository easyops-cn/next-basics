[//]: # "business-bricks/permission/roles-members-setting-modal.ts"

<details>
<summary>History</summary>

| Version | Change                                                       |
| ------- | ------------------------------------------------------------ |
| 1.x.0   | Added brick `permission.roles-members-setting-modal`         |
| 1.x.0   | Added property `roles.labelTooltip`                          |

</details>

# INPUTS

| property   | type      | required | default      | description                          |
| ---------- | --------- | -------- | ------------ | ------------------------------------ |
| id         | string    | ✔️       | -            | Modal ID                             |
| title      | string    | -        | -            | Modal title                          |
| roles      | RoleProps | ✔        | -            | Role information                     |
| width      | string    | -        | 780px        | Modal width                          |
| labelCol   | ColProps  | -        | { span: 4 }  | Layout style of the label column     |
| wrapperCol | ColProps  | -        | { span: 19 } | Layout style of the input control column |

### RoleProps

| property     | type                       | required | default | description                                     |
| ------------ | -------------------------- | -------- | ------- | ----------------------------------------------- |
| name         | string                     | ✔️       | -       | Role name                                       |
| optionsMode  | "all" \| "user" \| "group" | -        | "group" | Supports selecting users, user groups, or both  |
| placeholder  | string                     | -        | -       | Placeholder                                     |
| labelBrick   | LabelBrick                 | -️       | -       | The form item label supports useBrick           |
| labelTooltip | LabelTooltipProps          | -️       | -       | The form item label supports tooltip            |

```typescript
interface ColProps {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  order?: number;
}
interface LabelTooltipProps {
  content: string;
  icon: MenuIcon;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}
```
