[//]: # "business-bricks/cmdb-instances/instance-change-history.ts"

# INPUTS

| property           | type                                 | required | default | description                                                                       |
| ------------------ | ------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------- |
| showCard           | boolean                              | false    | true    | 是否显示 card 边框                                                                |
| dataSource         | { detail: any; changelogTable: any } | true     | -       | 数据源，配合 provider 构件`"cmdb-instances.instance-change-history-data"`一起使用 |
| detailUrlTemplates | {default:string}                     | true     | -       | 实例关系的链接                                                                    |
