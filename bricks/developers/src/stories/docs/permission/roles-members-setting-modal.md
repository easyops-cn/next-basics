[//]: # "business-bricks/permission/roles-members-setting-modal.ts"

<details>
<summary>History</summary>

| Version | Change                                            |
| ------- | ------------------------------------------------- |
| 1.x.0   | 新增构件 `permission.roles-members-setting-modal` |
| 1.x.0   | 新增属性 `roles.labelTooltip`                     |

</details>

# INPUTS

| property   | type      | required | default      | description        |
| ---------- | --------- | -------- | ------------ | ------------------ |
| id         | string    | ✔️       | -            | 弹窗 ID            |
| title      | string    | -        | -            | 弹窗标题           |
| roles      | RoleProps | ✔        | -            | 角色信息           |
| width      | string    | -        | 780px        | 弹窗宽度           |
| labelCol   | ColProps  | -        | { span: 4 }  | 标签列布局样式     |
| wrapperCol | ColProps  | -        | { span: 19 } | 输入控件列布局样式 |

### RoleProps

| property     | type                       | required | default | description                  |
| ------------ | -------------------------- | -------- | ------- | ---------------------------- |
| name         | string                     | ✔️       | -       | 角色名称                     |
| optionsMode  | "all" \| "user" \| "group" | -        | "group" | 支持选择用户、用户组或者两者 |
| placeholder  | string                     | -        | -       | 提示信息                     |
| labelBrick   | LabelBrick                 | -️       | -       | 表单项 label 支持 useBrick   |
| labelTooltip | LabelTooltipProps          | -️       | -       | 表单项 label 支持 tooltip    |

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
