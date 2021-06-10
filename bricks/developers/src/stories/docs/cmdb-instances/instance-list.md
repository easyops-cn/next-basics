[//]: # "business-bricks/cmdb-instances/instance-list.ts"

# INPUTS

| property               | type                                                | required | default | description                                                                                                                                  |
| ---------------------- | --------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| objectId               | string                                              | ✔️       | -       | CMDB 模型 ID                                                                                                                                 |
| presetConfigs          | {query?: Record<string, any>;fieldIds?: string[];}  | -        | -       | 预设配置项，query 为默认的搜索参数，fieldIds 为默认展示列的属性 Id                                                                           |
| detailUrlTemplates     | {[objectId: string]: string];};                     | -        | -       | 实例详情查看链接。根据 objectId 在该模型的第一属性列添加链接，关系字段的跳转路径也在该属性下配置，不设置该属性时，关闭链接的跳转             |
| propertyDisplayConfigs | {"key": string; "brick": string; "properties": any} | -        | -       | 使用其它展示构件展示某个属性的值，默认将行数据传入该展示构件的 dataSource 参数，可在 properties 指定该展示构件的参数（必须包含 fields 参数） |
| showCard               | boolean                                             | -        | true    | 是否展示卡片                                                                                                                                 |
| selectDisabled         | boolean                                             | -        | false   | 是否可勾选实例                                                                                                                               |
| searchDisabled         | boolean                                             | -        | false   | 是否可以搜索                                                                                                                                 |
| aliveHostsDisabled     | boolean                                             | -        | false   | 是否展示"正常主机"的勾选框。                                                                                                                 |
| relationLinkDisabled   | boolean                                             | -        | false   | 关系是否可以跳转                                                                                                                             |
| relatedToMeDisabled    | boolean                                             | -        | false   | 是否展示"与我相关"的勾选框。                                                                                                                 |
| moreButtonsDisabled    | boolean                                             | -        | false   | 是否展示"更多"的按钮。                                                                                                                       |
| advancedSearchDisabled | boolean                                             | -        | false   | 是否展示高级搜索                                                                                                                             |
| notifyUrl              | boolean                                             | -        | true    | 是否把搜索条件放上 url(刷新路由仍能保持条件)                                                                                                 |
| events                 | object                                              | -        | -       | 相关事件，具体如下表                                                                                                                         |

# EVENTS

| type                         | detail                                                                               | description                     |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| "read.search.change"         | {q:string}                                                                           | 搜索参数变化                    |
| "read.search.execute"        | {query: Record<string, any>, fields: Record<string, any>, only_my_instance: boolean} | 搜索请求的实际参数（http body） |
| "read.advancedSearch.change" | {aq:json}                                                                            | 高级搜索参数变化                |
| "read.multiple.clickItem"    | {id:string}                                                                          | 点击某条实例                    |
| "read.pagination.change"     | {page:number;pageSize:string}                                                        | 页码和每页条数变化              |
| "read.selection.change"      | {selectedKeys:string[] \| number[];selectedItems:T[];}                               | 勾选变化                        |
| "read.relatedToMe.change"    | {relatedToMe:boolean}                                                                | "与我有关"勾选框变化            |
| "read.alive.hosts.change"    | {aliveHosts:boolean}                                                                 | "正常主机"勾选框变化            |
