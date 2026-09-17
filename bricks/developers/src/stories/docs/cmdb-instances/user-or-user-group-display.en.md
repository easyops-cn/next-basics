[//]: # "business-bricks/cmdb-instances/user-or-user-group-display.ts"

> Tips:
>
> The corresponding form brick of this brick is [User (Group) Select](developers/brick-book/brick/forms.user-or-user-group-selec)

<details>
<summary>History</summary>

| Version | Change                                               |
| ------- | ---------------------------------------------------- |
| 1.33.0  | New brick `cmdb-instances.user-or-user-group-display` |

</details>

# INPUTS

| property       | type                                 | required | default | description                                                                                                                                                                                                                                       |
| -------------- | ------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value          | {user: string[],userGroup: string[]} | ✔️       | -       | User/user group data. Following the user (group) data of our platform, `user` is the `name` in the "USER" model, and `userGroup` is the `instanceId` or `:${instanceId}` in the "USER_GROUP" model. This data format is consistent with the [User (Group) Select](developers/brick-book/brick/forms.user-or-user-group-selec) form item |
| objectList     | CmdbModels.ModelCmdbObject           | ✔️       | -       | Model list, directly from "providers-of-cmdb.cmdb-object-api-get-object-all"                                                                                                                                                                              |
| userTitle      | string                               | -        | User    | The title of the user in the popover, defaults to User                                                                                                                                                                                                                  |
| userGroupTitle | string                               | -        | User Group  | The title of the user group in the popover, defaults to User Group                                                                                                                                                                                                              |
