[//]: # "business-bricks/cmdb-instances/user-or-user-group-display.ts"

> Tips：
>
> 该构件对应的表单构件为 [用户（组）选择](developers/brick-book/brick/forms.user-or-user-group-selec)

<details>
<summary>History</summary>

| Version | Change                                               |
| ------- | ---------------------------------------------------- |
| 1.33.0  | 新增构件 `cmdb-instances.user-or-user-group-display` |

</details>

# INPUTS

| property       | type                                 | required | default | description                                                                                                                                                                                                                                       |
| -------------- | ------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value          | {user: string[],userGroup: string[]} | ✔️       | -       | 用户／用户组数据，按照我们平台的用户（组）数据， user 为"USER"模型中的 name，userGroup 为"USER_GROUP"模型中的`instanceId`或者`:${instanceId}`，此数据格式与[用户（组）选择](developers/brick-book/brick/forms.user-or-user-group-selec)表单项一致 |
| objectList     | CmdbModels.ModelCmdbObject           | ✔️       | -       | 模型列表，直接来自"providers-of-cmdb.cmdb-object-api-get-object-all"                                                                                                                                                                              |
| userTitle      | string                               | -        | 用户    | 弹出框中用户的 title，默认为用户                                                                                                                                                                                                                  |
| userGroupTitle | string                               | -        | 用户组  | 弹出框中用户组的 title，默认为用户组                                                                                                                                                                                                              |
