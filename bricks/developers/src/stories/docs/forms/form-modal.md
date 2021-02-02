[//]: # "atom-bricks/form-input/form-modal.ts"

<details>
<summary>History</summary>

| Version | Change                      |
| ------- | --------------------------- |
| 1.94.0  | 新增构件 `forms.form-modal` |
| 1.95.0  | 新增属性 `dataSource`       |
| 1.98.0  | 新增属性 `form`、`items`    |

</details>

# INPUTS

| property          | type                                                                  | required | default                                                                              | description                                                                |
| ----------------- | --------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| modalTitle        | `string`                                                              | -        | -                                                                                    | 模态框标题                                                                 |
| confirmLoading    | `boolean`                                                             | -        | -                                                                                    | 确定按钮 loading                                                           |
| closable          | `boolean`                                                             | -        | `true`                                                                               | 是否显示右上角的关闭按钮                                                   |
| centered          | `boolean`                                                             | -        | `false`                                                                              | 垂直居中展示模态框                                                         |
| width             | `string \| number`                                                    | -        | `520`                                                                                | 模态框宽度                                                                 |
| okText            | `string`                                                              | -        | `"确定"`                                                                             | 确认按钮文字                                                               |
| okType            | `"default" \| "primary" \| "ghost" \| "dashed" \| "danger" \| "link"` | -        | `"primary"`                                                                          | 确认按钮类型                                                               |
| cancelText        | `string`                                                              | -        | `"取消"`                                                                             | 取消按钮文字                                                               |
| maskClosable      | `boolean`                                                             | -        | `true`                                                                               | 点击蒙层是否允许关闭                                                       |
| forceRender       | `boolean`                                                             | -        | `false`                                                                              | 强制渲染模态框                                                             |
| okButtonProps     | `ButtonProps`                                                         | -        | -                                                                                    | 确认按钮 props，详细属性参见 <https://3x.ant.design/components/button-cn/> |
| cancelButtonProps | `ButtonProps`                                                         | -        | -                                                                                    | 取消按钮 props，详细属性参见 <https://3x.ant.design/components/button-cn/> |
| destroyOnClose    | `boolean`                                                             | -        | `false`                                                                              | 关闭时销毁模态框里的子元素                                                 |
| mask              | `boolean`                                                             | -        | `true`                                                                               | 是否展示遮罩                                                               |
| form              | `{ useBrick: Omit<UseSingleBrickConf, 'brick'> }`                     | -        | `{ useBrick: { brick: "forms.general-form" | properties: { layout: "vertical" } } }` | 表单构件配置                                                               |
| ~~formBrick~~     | ~~`Omit<UseSingleBrickConf, 'brick'>`~~                               | -        | ~~`{ brick: "forms.general-form" | properties: { layout: "vertical" } }`~~           | ~~表单构件配置~~（已废弃，请使用 `form` 属性）                             |
| items             | `{ useBrick: UseSingleBrickConf[] }`                                  | -        | -                                                                                    | 表单构件的 items 插槽的构件配置                                            |
| ~~itemBricks~~    | ~~`UseSingleBrickConf[]`~~                                            | -        | -                                                                                    | ~~表单构件的 items 插槽的构件配置~~（已废弃，请使用 `items` 属性）         |
| dataSource        | `any`                                                                 | -        | -                                                                                    | 用于 `formBrick` 和 `itemBricks` 的 `transform` 的 `DATA` 上下文           |

# EVENTS

| type             | detail | description                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| formModal.open   | -      | 模态框打开                                                               |
| formModal.close  | -      | 模态框关闭                                                               |
| formModal.ok     | -      | 模态框确定，默认自动关闭模态框，可以通过 `action: 'preventDefault'` 阻止 |
| formModal.cancel | -      | 模态框取消，默认自动关闭模态框，可以通过 `action: 'preventDefault'` 阻止 |

# METHODS

| name  | params | description |
| ----- | ------ | ----------- |
| open  | -      | 打开模态框  |
| close | -      | 关闭模态框  |
