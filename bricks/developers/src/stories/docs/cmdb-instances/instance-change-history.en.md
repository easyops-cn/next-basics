[//]: # "business-bricks/cmdb-instances/instance-change-history.ts"

# INPUTS

| property           | type                                 | required | default | description                                                                                              |
| ------------------ | ------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| showCard           | boolean                              | false    | true    | Whether to show the card border                                                                          |
| dataSource         | { detail: any; changelogTable: any } | true     | -       | Data source, used together with the provider brick `"cmdb-instances.instance-change-history-data"`        |
| detailUrlTemplates | {default:string}                     | true     | -       | Link to the instance relation                                                                            |
| objectUrlTemplates | {default:string}                     | false    | -       | Link to the model                                                                                        |
