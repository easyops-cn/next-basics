[//]: # "business-bricks/cmdb-object/tpl-cmdb-object-attr-add.ts"

<details>
<summary>History</summary>

| Version | Change                                    |
| ------- | ----------------------------------------- |
| 1.x.0   | 新增构件 `forms.tpl-cmdb-object-attr-add` |

</details>

# INPUTS

| property            | type           | required | default | description                  |
| ------------------- | -------------- | -------- | ------- | ---------------------------- |
| values              | ModelAttrValue | true     | -       | 模型属性表单初始值           |
| attrIdInputDisabled | boolean        | false    | -       | 编辑模式下，属性 id 禁止编辑 |
| submitBtnHidden     | boolean        | false    | -       | 提交按钮是否渲染             |

```typescript
interface ModelAttrValue {
  id: string;
  name: string;
  attrValue: any;
  tag: string[];
  attrOptions: string[];
}
```

# EVENTS

| type             | detail | description                  |
| ---------------- | ------ | ---------------------------- |
| validate.success | -      | 创建编辑模型属性表单验证成功 |
| validate.error   | -      | 创建编辑模型属性表单验证失败 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
