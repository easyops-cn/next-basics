[//]: # "atom-bricks/form-input/general-form-item.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.49.0  | 新增构件 `forms.general-form-item`       |
| 1.53.0  | 新增 `control` 插槽，废弃 `control` 属性 |

</details>

# INPUTS

| property    | type                    | required | default | description                                       |
| ----------- | ----------------------- | -------- | ------- | ------------------------------------------------- |
| ~~control~~ | ~~`ControlConfig`~~     | -        | -       | ~~表单控件配置~~（已废弃，请使用 `control` 插槽） |
| value       | `any`                   | -        | -       | 表单项的值                                        |
| name        | `string`                | -        | -       | 输入框字段名                                      |
| label       | `string`                | -        | -       | 输入框字段说明                                    |
| required    | `boolean`               | -        | `false` | 是否必填                                          |
| message     | `Record<string,string>` | -        | -       | 校验文本信息                                      |

## ControlConfig

| property | type                                                                                          | required | default | description                |
| -------- | --------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------- |
| useBrick | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | ✔️       | -       | 作为表单控件展示的构件配置 |

# SLOTS

| name    | description        |
| ------- | ------------------ |
| control | 表单控件位置的插槽 |

# EVENTS

| type                     | detail | description                                                                                     |
| ------------------------ | ------ | ----------------------------------------------------------------------------------------------- |
| general-form-item.change | `any`  | 当表单项的值通过 `forms.general-form` 的 `setInitValue` 方法修改时的事件，`detail` 为修改后的值 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
