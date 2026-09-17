[//]: # "business-bricks/cmdb-instances/instance-list.ts"

> Tips: This instance list is a brick type and will deprecate the previously used legacy template approach. Its usage is the same as before; the specific properties are as follows.

# INPUTS

| property               | type                                               | required | default | description                                                                                                                                                                |
| ---------------------- | -------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| objectId               | string                                             | ✔️       | -       | CMDB model ID                                                                                                                                                              |
| presetConfigs          | {query?: Record<string, any>;fieldIds?: string[];} | -        | -       | Preset configuration items; query is the default search parameter, and fieldIds is the property Id of the columns displayed by default                                     |
| detailUrlTemplates     | {[objectId: string]: string];};                    | -        | -       | Link for viewing instance details. A link is added to the first property column of the model according to objectId; the jump path of relation fields is also configured under this property. When this property is not set, link jumping is disabled |
| propertyDisplayConfigs | {"key": string; useBrick: UseBrickConf}            | -        | -       | Use another display brick to display the value of a property. By default the row data is passed to the dataSource param of that display brick; the brick's params can be specified in properties (the fields param must be included) |
| showCard               | boolean                                            | -        | true    | Whether to show the card                                                                                                                                                   |
| selectDisabled         | boolean                                            | -        | false   | Whether instances can be checked                                                                                                                                           |
| searchDisabled         | boolean                                            | -        | false   | Whether searching is allowed                                                                                                                                               |
| aliveHostsDisabled     | boolean                                            | -        | false   | Whether to show the "Normal Hosts" checkbox.                                                                                                                               |
| relationLinkDisabled   | boolean                                            | -        | false   | Whether relations can be jumped to                                                                                                                                         |
| relatedToMeDisabled    | boolean                                            | -        | false   | Whether to show the "Related to Me" checkbox.                                                                                                                              |
| moreButtonsDisabled    | boolean                                            | -        | false   | Whether to show the "More" button.                                                                                                                                         |
| advancedSearchDisabled | boolean                                            | -        | false   | Whether to show advanced search                                                                                                                                            |
| notifyUrl              | boolean                                            | -        | true    | Whether to put the search conditions in the url (conditions are still preserved after refreshing the route)                                                                |

# EVENTS

| type                         | detail                                                                               | description                                  |
| ---------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| "read.search.change"         | {q:string}                                                                           | Search params changed                        |
| "read.search.execute"        | {query: Record<string, any>, fields: Record<string, any>, only_my_instance: boolean} | Actual params of the search request (http body) |
| "read.advancedSearch.change" | {aq:json}                                                                            | Advanced search params changed               |
| "read.multiple.clickItem"    | {id:string}                                                                          | Click a certain instance                     |
| "read.pagination.change"     | {page:number;pageSize:string}                                                        | Page number and page size changed            |
| "read.selection.change"      | {selectedKeys:string[] \| number[];selectedItems:T[];}                               | Selection changed                            |
| "read.relatedToMe.change"    | {relatedToMe:boolean}                                                                | "Related to me" checkbox changed             |
| "read.alive.hosts.change"    | {aliveHosts:boolean}                                                                 | "Normal hosts" checkbox changed              |
