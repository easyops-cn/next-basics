[//]: # "business-bricks/cmdb-instances/instance-detail.ts"

# INPUTS

| property          | type                                             | required | default | description                                                                                    |
| ----------------- | ------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| objectId          | string                                           | ✔️       | -       | CMDB model ID                                                                                  |
| instanceId        | string                                           | ✔️       | -       | Instance ID                                                                                    |
| attributeKeys     | string[]                                         | -        | -       | Instance property key                                                                          |
| brickConfigList   | CustomBrickConfig\<T = Record\<string, any\>\>[] | -        | -       | List of custom display brick configurations                                                    |
| actions           | BrickAction[]                                    | -        | -       | Actions of the instance                                                                        |
| attrCustomConfigs | AttrCustomConfigs                                | -        | -       | Custom brick configuration for instance property values                                        |
| fieldsByTag       | fieldsByTag[]                                    | -        | -       | Set the specified fields and the category they belong to                                       |
| showCard          | boolean                                          | -        | true    | Whether to display the outer card. Note that when set to false, the title at the top-left and the area at the top-right of the card are hidden as well |

## fieldsByTag

| property | type     | required | default | description                                |
| -------- | -------- | -------- | ------- | ------------------------------------------ |
| name     | string   | ✔️       | -       | Category name                              |
| fields   | string[] | ✔️       | -       | Array of property IDs under the category   |

## CustomBrickConfig\<T = Record\<string, any\>\>

| property | type   | required | default | description                   |
| -------- | ------ | -------- | ------- | ----------------------------- |
| name     | string | ✔️       | -       | Brick name                    |
| label    | string | ✔️       | -       | Title of the brick container card |
| options  | T[]    | -        | -       | Options of the brick          |

## BrickAction

| property    | type                   | required | default  | description                                                         |
| ----------- | ---------------------- | -------- | -------- | ------------------------------------------------------------------- |
| label       | string                 | ✔️       | -        | Displayed text                                                      |
| type        | 'button' \| 'dropdown' | -        | 'button' | Type                                                                |
| buttonProps | Record<string, any>    | -        | -        | Properties passed to the Button control when the type is button     |
| isDanger    | boolean                | -        | -        | When the type is dropdown, controls whether the text is in danger color |
| url         | string                 | -        | -        | Redirect URL                                                        |
| event       | string                 | -        | -        | Name of the event to trigger; takes no effect when url is present   |

## AttrCustomConfigs

| property             | type                  | required | default | description                                 |
| -------------------- | --------------------- | -------- | ------- | ------------------------------------------- |
| instance property id | LegacyCustomComponent | ✔️       | -       | Custom brick configuration for the property id |

## LegacyCustomComponent

| property             | type                                                                                          | required | default | description |
| -------------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ----------- |
| useBrick             | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | ✔️       | -       | Custom brick |
| <del>component</del> | CustomComponent                                                                               | -        | -       | Custom brick |

The data passed in `useBrick` is: `{ modelData: {...}, instanceData: {...} }`

## <del>CustomComponent\<T = Record\<string, any\>\></del>

<details>
<summary>Expand</summary>

| property | type   | required | default      | description           |
| -------- | ------ | -------- | ------------ | --------------------- |
| brick    | string | ✔️       | -            | Custom brick name     |
| field    | string | -        | instanceData | Instance data         |
| options  | T[]    | -        | -            | Properties of the custom brick |

</details>

## METHODS

| name          | params                            | description                  |
| ------------- | --------------------------------- | ---------------------------- |
| setInitFields | {obejctId,instanceId,fieldsByTag} | Dynamically set displayed value |
