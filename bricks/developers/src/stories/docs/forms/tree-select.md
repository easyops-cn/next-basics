[//]: # "atom-bricks/form-input/tree-select.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.90.0  | 新增构件 `forms.tree-select`            |
| 1.92.0  | 属性 `selectStyle` 改为 `inputBoxStyle` |
| 1.93.0  | 新增属性 `treeDataSimpleMode`           |

</details>

# INPUTS

| property                 | type                           | required | default                                                                                                                                                      | description                                          |
| ------------------------ | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| treeData                 | `TreeNode[]`                   | -        | `[]`                                                                                                                                                         | 树选择控件的节点数据                                 |
| treeCheckable            | `boolean`                      | -        | `false`                                                                                                                                                      | 显示 checkbox                                        |
| allowClear               | `boolean`                      | -        | `false`                                                                                                                                                      | 显示清除按钮                                         |
| disabled                 | `boolean`                      | -        | `false`                                                                                                                                                      | 是否禁用                                             |
| inputBoxStyle            | `React.CSSProperties`          | -        | -                                                                                                                                                            | 选择框的样式                                         |
| dropdownMatchSelectWidth | `boolean`                      | -        | `true`                                                                                                                                                       | 下拉菜单和选择器同宽。默认将设置 `min-width`         |
| dropdownStyle            | `React.CSSProperties`          | -        | -                                                                                                                                                            | 下拉菜单的样式                                       |
| multiple                 | `boolean`                      | -        | `false`                                                                                                                                                      | 支持多选（当设置 `treeCheckable` 时自动变为 `true`） |
| placeholder              | `string`                       | -        | -                                                                                                                                                            | 选择框默认文字                                       |
| searchPlaceholder        | `string`                       | -        | -                                                                                                                                                            | 搜索框默认文字                                       |
| showSearch               | `boolean`                      | -        | 单选：`false`，多选：`true`                                                                                                                                  | 是否支持搜索框                                       |
| treeDataSimpleMode       | `boolean | TreeDataSimpleMode` | -        | 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...], pId 是父节点的 id) |
| treeNodeFilterProp       | `string`                       | -        | `'value'`                                                                                                                                                    | 输入项过滤对应的 treeNode 属性                       |
| treeNodeLabelProp        | `string`                       | -        | `'title'`                                                                                                                                                    | 作为显示的 treeNode 属性                             |
| value                    | `TreeNodeValue`                | -        | -                                                                                                                                                            | 树选择控件的值（仅当不在表单中使用时有效）           |

```typescript
type TreeNodeValue = string | number | (string | number)[];

type TreeNode = TreeNodeNormal | TreeNodeSimpleMode;

interface TreeNodeNormal {
  value: TreeNodeValue;
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

interface TreeNodeSimpleMode {
  [key: string]: string | boolean | React.ReactNode;
}

interface TreeDataSimpleMode {
  id?: string;
  pId?: string;
  rootPId?: string;
}
```

# EVENTS

| type              | detail                                           | description              |
| ----------------- | ------------------------------------------------ | ------------------------ |
| treeSelect.change | `{value: TreeNodeValue, label: any, extra: any}` | 树选择控件的值改变的事件 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
