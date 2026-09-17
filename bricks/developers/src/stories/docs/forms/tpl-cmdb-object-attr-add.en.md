[//]: # "business-bricks/cmdb-object/tpl-cmdb-object-attr-add.ts"

<details>
<summary>History</summary>

| Version | Change                                          |
| ------- | ----------------------------------------------- |
| 1.x.0   | Added brick `forms.tpl-cmdb-object-attr-add` |

</details>

# INPUTS

| property            | type           | required | default      | description                                          |
| ------------------- | -------------- | -------- | ------------ | ---------------------------------------------------- |
| values              | ModelAttrValue | true     | -            | Initial values of the model attribute form          |
| attrIdInputDisabled | boolean        | false    | -            | In edit mode, the attribute id cannot be edited      |
| submitBtnHidden     | boolean        | false    | -            | Whether the submit button is rendered                |
| layout              | enum           | false    | "horizontal" | Form layout                                          |

|

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

| type             | detail | description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| validate.success | -      | Validation of the create/edit model attribute form succeeded |
| validate.error   | -      | Validation of the create/edit model attribute form failed    |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
