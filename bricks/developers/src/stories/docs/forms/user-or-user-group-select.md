[//]: # "atom-bricks/form-input/user-or-user-group-select.ts"

> Tips：
>
> 该构件对应的展示构件为 [用户（组）展示构件](developers/brick-book/brick/cmdb-instances.user-or-user-group-display)
>
> 注意，按照我们平台的用户（组）数据，用户的值为"USER"模型中的 name，用户组的值为"USER_GROUP"模型中的":"+instanceId。该构件中的值都遵循这个规则，例如：`value`,`staticList`以及事件`user.group.change`的输出值。

<details>
<summary>History</summary>

| Version | Change                                       |
| ------- | -------------------------------------------- |
| 1.96.0  | 新增属性 `staticList`,`mergeUseAndUserGroup` |
| 1.31.0  | 新增 `optionsMode` 属性                      |
| 1.28.0  | 新增 `user.group.change` 事件                |

</details>

# INPUTS

| property             | type                                                           | required | default | description                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                 | `string`                                                       | ✔️       | -       | 用户（组）选择构件的字段名                                                                                                                                                                                           |
| label                | `string`                                                       | -        | -       | 用户（组）选择构件的字段说明                                                                                                                                                                                         |
| placeholder          | `string`                                                       | -        | -       | 用户（组）选择构件中下拉框的占位说明                                                                                                                                                                                 |
| required             | `boolean`                                                      | -        | false   | 是否是必填项                                                                                                                                                                                                         |
| value                | {selectedUser: string[],selectedUserGroup: string[]}\|string[] | -        | -       | 用户（组）选择构件中下拉框的初始值，按照我们平台的用户（组）数据，selectedUser 为"USER"模型中的 name，selectedUserGroup 为"USER_GROUP"模型中的":"+instanceId。当`mergeUseAndUserGroup`为 true 时，类型为`string[]`。 |
| objectList           | CmdbModels.ModelCmdbObject                                     | ✔️       | -       | 模型列表，直接来自"providers-of-cmdb.cmdb-object-api-get-object-all"                                                                                                                                                 |
| hideAddMeQuickly     | `boolean`                                                      | -        | false   | 是否隐藏“快速选择我”按钮                                                                                                                                                                                             |
| hideSelectByCMDB     | `boolean`                                                      | -        | false   | 是否隐藏搜索 icon，即不支持通过 cmdb 的 modal 选择器选择                                                                                                                                                             |
| optionsMode          | "all"\|"group"\|"user"                                         | -        | "all"   | 支持选择用户、用户组或者两者                                                                                                                                                                                         |
| mergeUseAndUserGroup | boolean                                                        | -        | false   | 是否合并用户和用户组数据，当设置为 true 时，输入的`value`和`user.group.change`事件输出的 detail 都为`string[]`格式。                                                                                                 |
| staticList           | string[]                                                       | -        | -       | 固定白名单列表，该列表中的值用户不能取消。                                                                                                                                                                           |

# EVENTS

| type                | detail                                                           | description          |
| ------------------- | ---------------------------------------------------------------- | -------------------- |
| `user.group.change` | `string[]\|{selectedUser: string[],selectedUserGroup: string[]}` | 当选择用户变化时触发 |
