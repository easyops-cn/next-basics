[//]: # "atom-bricks/card/collapsible-card-list.ts"

# 描述

通用折叠卡片列表模版，会根据 dataSource 动态渲染出每个 collapsible-card-item。

# INPUTS

| property                  | type                                                                                                                                             | required | default | description                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| showCard                  | boolean                                                                                                                                          | -        | true    | 是否显示外层卡片                                                                                           |
| dataSource                | Record<string, any>[]                                                                                                                            | ✔️       | -       | 卡片信息数据源                                                                                             |
| fields                    | { cardTitle?: string;icon?:string;cardDesc?: string; }                                                                                           | -        | -       | 字段映射, 跟 dataSource 一起使用来获得运行时 cardTitle、icon                                               |
| cardTitle                 | string                                                                                                                                           | -        | -       | 卡片 title                                                                                                 |
| cardDesc                  | string                                                                                                                                           | -        | -       | 卡片描述信息                                                                                               |
| icon                      | MenuIcon                                                                                                                                         | -        | -       | 卡片 icon                                                                                                  |
| iconStyle                 | Record<string, any>                                                                                                                              | -        | -       | 卡片 icon 的样式                                                                                           |
| operateBricks             | CustomBrick[]                                                                                                                                    | -        | -       | 操作区 slots 的 bricks。                                                                                   |
| contentBricks             | CustomBrick[]                                                                                                                                    | -        | -       | 内容区 slots 的 bricks。                                                                                   |
| disableClickHeaderToOpen  | boolean                                                                                                                                          | -        | false   | 是否禁止点击卡片头部展开（有些场景不希望用户点击头部展开，而希望定制点击按钮展开时，可设置为 true）        |
| disableClickHeaderToClose | boolean                                                                                                                                          | -        | false   | 是否禁止点击卡片头部折叠（有些场景不希望用户点击头部折叠，而希望定制点击按钮折叠时，可设置为 true）        |
| customHeader              | boolean                                                                                                                                          | -        | false   | 是否自定义头部                                                                                             |
| customHeaderBricks        | CustomBrick[]                                                                                                                                    | -        | -       | 自定义头部 slots 的 bricks。                                                                               |
| contentStyle              | Record<string,any>                                                                                                                               | -        | -       | 内容区样式，目前内容区有默认 padding:32px 72px。当里面的构件自己带有边距的时候需要自行调整到理想样式效果。 |
| subscriptConfig           | {field: string; value: any; isNotEqual?: boolean; type?: "default"\|"checked"\|"custom"; subscriptIconConfig?: MenuIcon; hideOperate?: boolean;} | -        | -       | 右上角角标                                                                                                 |

# subscriptConfig

| property            | type                           | required | default   | description                                                                                                                                         |
| ------------------- | ------------------------------ | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| field               | string                         | ✔️       | -         | 是否显示角标的决定字段，例如设置字段为"default"，值为 true 的时候表示只有当`dataSource.default===true`时才显示角标                                  |
| value               | string                         | ✔️       | -         | 是否显示角标的决定值                                                                                                                                |
| isNotEqual          | boolean                        | -        | false     | 对应字段等于 value 的时候显示角标                                                                                                                   |
| type                | "default"\|"checked"\|"custom" | -        | "default" | 角标内的图标类型，默认为五角星(`default`)，多选场景可设为勾选（`checked`)，也可自定义（`custom`)，当设为`custom`时需要同时设置`subscriptIconConfig` |
| subscriptIconConfig | MenuIcon                       | -        | -         | 自定义角标的标签                                                                                                                                    |
| hideOperate         | boolean                        | -        | -         | 显示角标的时候隐藏操作区                                                                                                                            |

# CustomBrick

由`BrickConf`扩展下面两个属性组成

| property         | type                                                                                           | required | default | description                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| propertyFieldMap | Record<string, string>                                                                         | -        | -       | 可配置该操作构件的属性来自于 item 里的哪个字段的数据，例如`{propertyFieldMap:{dataSource:"",name:"title"}}`表示该操作构件的`dataSource`属性来自于`item`，`name`属性来自于`item.title`。其中`key`和`value`都支持嵌套的形式，例如`a.b.c` |
| eventMethodMap   | { eventName: string;method: "open"\| "close"\| "toggle"\|string;target?:string;args?:any[];}[] | -        | -       | 可配置子构件的某个事件名称以及 method。对应可以触发该`collapsible-card-item`的展开/折叠/切换方法。也可配置 target 构件和 args。                                                                                                        |
