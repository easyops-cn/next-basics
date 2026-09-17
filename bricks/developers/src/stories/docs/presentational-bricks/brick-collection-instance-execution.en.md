# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# EVENTS

| type                                | detail                              | description                                                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| collection-instance-execution.click | { collectionInstanceIds: string[] } | Emitted on click, carrying the list of selected collection instance IDs |

# METHODS

| name                              | params | description                                      |
| --------------------------------- | ------ | ------------------------------------------------ |
| updateSelectedCollectionInstances | ids    | Update the list of selected collection instances |
