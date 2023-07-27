[//]: # "atom-bricks/layout-and-container/form-steps.ts"

<details>
<summary>History</summary>

| Version | Change                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.10.9  | 新增属性 `manualMode` 和 新增事件 `next-step` 和 `pre-step`，不再通过给给每个构件添加 stepOUt 和 stepIn 的方法来切换上下步骤，能够在编排中直接编排控制 |

</details>

# INPUTS

> Tips: 容器构件对外提供了两个钩子，一个是 stepIn，一个是 stepOut， 分别是在进入该步骤时和离开该步骤时被分步容器调用。可根据需要在自己的构件内去实现相应方法，达到校验的逻辑。`bricks/forms/src/general-form/index.tsx` 有相应的示例，其中 stepOut 函数返回 Promise.resolve() 告诉向导容器可以切换到下一个步骤，
> 返回 Promise.reject() 告诉向导容器不能切换到下一个步骤，说明当前校验失败。

| property        | type                                    | required | default      | description                                                                                                                                                                                                                                                                                                                         |
| --------------- | --------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| stepList        | {title: string, description?: string}[] | ✔️       | -            | title 表示每个步骤的标题 description 表示该步骤的详细描述                                                                                                                                                                                                                                                                           |
| lastStepButton  | {text: string, icon: string}            | -        | {text: 完成} | 自定义最后一个步骤按钮的文本                                                                                                                                                                                                                                                                                                        |
| stepBtnAction   | top \| bottom \| none                   | -        | top          | 定义向导上一步下一步按钮的位置， none 表示不需要上下步按钮, 此时需要用户构件自己调用容器对外提供的上下步方法                                                                                                                                                                                                                        |
| direction       | horizontal \| vertical                  | -        | horizontal   | 步骤条的布局                                                                                                                                                                                                                                                                                                                        |
| size            | default \| small                        | -        | default      | 步骤条的大小                                                                                                                                                                                                                                                                                                                        |
| btnActionOffset | number                                  | -        | 0            | 当 stepBtnAction = bottom 时 配置按钮的偏移距离                                                                                                                                                                                                                                                                                     |
| preDisabled     | boolean                                 | -        | false        | 上一步按钮 disabled                                                                                                                                                                                                                                                                                                                 |
| nextDisabled    | boolean                                 | -        | false        | 下一步或者最后一步按钮 disabled， 可用于在有些场景下最后一步点击时会触发相关请求，为了避免多次点击按钮触发多次请求，可简单的在点击之后设置 disabled 属性来避免                                                                                                                                                                      |
| manualMode      | boolean                                 | -        | false        | 是否手动模式，在手动模式下，可以通过自主调用 preStep 和 nextStep 方法达到切换步骤，容器构件不会再根据 stepIn 和 stepOut 这两个钩子自动切换到下一步骤，这极大的提高了用户构件用在分步容器的便利性，不需要再在构件中申明 stepOut 和 stepIn 这两个方法，可直接通过编排使用。最后一个 demo 就是通过把现有的分步表单改造成手动模式的示例 |

# EVENTS

| type                      | detail                            | description                                                                                                                                                                     |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| step.done                 | -                                 | 向导容器最后一步点击完成时会触发 step.done 的定制事件，用户构建可以通过监听该事件做相应的提交逻辑 `e.g. document.addEventListener("step.done", { ... })`                        |
| step.pre.button.disabled  | 通过 e.detail 传递 disabled 的值  | 控制向导容器上一步按钮的 disabled 值，用户构建通过触发该事件通知向导容器 `e.g. this.dispatchEvent(new CustomEvent("step.next.button.disabled", {bubbles: true, detail: true}))` |
| step.next.button.disabled | 同上                              | 控制向导容器下一步按钮的 disabled 值                                                                                                                                            |
| pre-step                  | {detail: {fromStepIndex: number}} | 点击上一步时触发， `fromStepIndex` 表示来自于哪一步骤切换到当前步骤                                                                                                             |
| next-step                 | {detail: {fromStepIndex: number}} | 点击下一步时触发， `fromStepIndex` 表示来自于哪一步骤切换到当前步骤                                                                                                             |

# METHODS

| name     | params | description                                                                                                |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| stepIn   | -      | 用户构件可在自己的构件内声明 stepIn 方法，向导容器会在进入每一步之前调用该方法                             |
| stepOut  | -      | 用户构件可在自己的构件内声明 stepOut 方法，向导容器会在离开每一步之后调用该方法                            |
| preStep  | -      | 触发上一步的方法，在有些场景不需要使用向导容器自带的上一步按钮时，可由用户构件自己调用该方法触发上一步行为 |
| nextStep | -      | 触发下一步的方法，在有些场景不需要使用向导容器自带的下一步按钮时，可由用户构件自己调用该方法触发下一步行为 |
