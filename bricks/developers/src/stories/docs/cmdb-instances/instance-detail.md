[//]: # "business-bricks/cmdb-instances/instance-detail.ts"

# INPUTS

| property          | type                                             | required | default | description                                                                             |
| ----------------- | ------------------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------------- |
| objectId          | string                                           | ✔️       | -       | CMDB 模型 ID                                                                            |
| instanceId        | string                                           | ✔️       | -       | 实例 ID                                                                                 |
| attributeKeys     | string[]                                         | -        | -       | 实例属性 key                                                                            |
| brickConfigList   | CustomBrickConfig\<T = Record\<string, any\>\>[] | -        | -       | 自定义展示构件配置列表                                                                  |
| actions           | BrickAction[]                                    | -        | -       | 实例的 actions                                                                          |
| attrCustomConfigs | AttrCustomConfigs                                | -        | -       | 实例属性值自定义构件配置                                                                |
| fieldsByTag       | fieldsByTag[]                                    | -        | -       | 设置指定字段和该字段所属分类                                                            |
| showCard          | boolean                                          | -        | true    | 是否显示外层的卡片，注意当设置为 false 时， 卡片的左上角 title 和右上角的区域也不会显示 |

## fieldsByTag

| property | type     | required | default | description                |
| -------- | -------- | -------- | ------- | -------------------------- |
| name     | string   | ✔️       | -       | 分类名字                   |
| fields   | string[] | ✔️       | -       | 分类下的属性 id 组成的数组 |

## CustomBrickConfig\<T = Record\<string, any\>\>

| property | type   | required | default | description        |
| -------- | ------ | -------- | ------- | ------------------ |
| name     | string | ✔️       | -       | 构件名             |
| label    | string | ✔️       | -       | 构件容器卡片的标题 |
| options  | T[]    | -        | -       | 构件的选项         |

## BrickAction

| property    | type                   | required | default  | description                              |
| ----------- | ---------------------- | -------- | -------- | ---------------------------------------- |
| label       | string                 | ✔️       | -        | 显示的文本                               |
| type        | 'button' \| 'dropdown' | -        | 'button' | 类型                                     |
| buttonProps | Record<string, any>    | -        | -        | 类型为 button 时，传给 Button 控件的属性 |
| isDanger    | boolean                | -        | -        | 类型为 dropdown 时，控制文本是否为危险色 |
| url         | string                 | -        | -        | 跳转的 URL                               |
| event       | string                 | -        | -        | 触发的事件名，url 存在时不生效           |

## AttrCustomConfigs

| property    | type                  | required | default | description            |
| ----------- | --------------------- | -------- | ------- | ---------------------- |
| 实例属性 id | LegacyCustomComponent | ✔️       | -       | 属性 id 自定义构件配置 |

## LegacyCustomComponent

| property             | type                                                                                          | required | default | description |
| -------------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ----------- |
| useBrick             | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | ✔️       | -       | 自定义构件  |
| <del>component</del> | CustomComponent                                                                               | -        | -       | 自定义构件  |

`useBrick` 中传递的数据是：`{ modelData: {...}, instanceData: {...} }`

## <del>CustomComponent\<T = Record\<string, any\>\></del>

<details>
<summary>展开</summary>

| property | type   | required | default      | description      |
| -------- | ------ | -------- | ------------ | ---------------- |
| brick    | string | ✔️       | -            | 自定义构件名     |
| field    | string | -        | instanceData | 实例 data        |
| options  | T[]    | -        | -            | 自定义构件的属性 |

</details>

## METHODS

| name          | params                            | description    |
| ------------- | --------------------------------- | -------------- |
| setInitFields | {obejctId,instanceId,fieldsByTag} | 动态设置显示值 |
