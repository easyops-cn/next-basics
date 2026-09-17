[//]: # "business-bricks/cmdb-object/model-icon-combination-modal.ts"

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# EVENTS

| type                                           | detail                                                                   | description                          |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| ModelIconCombinationModal.comfirmIconSelection | { id: string, selection: { color: string, icon: string, form: 'shape' }} | The event emitted after the selection is confirmed |

# METHODS

| name      | params                                                 | description             |
| --------- | ------------------------------------------------------ | ----------------------- |
| showModal | event: { detail: { node: { style: { shape: string }}}} | Initial icon (tobe refined) |
