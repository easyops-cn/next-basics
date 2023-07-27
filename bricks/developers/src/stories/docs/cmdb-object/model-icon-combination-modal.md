[//]: # "business-bricks/cmdb-object/model-icon-combination-modal.ts"

# INPUTS

| property | type | required | default | description |
| -------- | ---- | -------- | ------- | ----------- |
| -        | -    | -        | -       | -           |

# EVENTS

| type                                           | detail                                                                   | description          |
| ---------------------------------------------- | ------------------------------------------------------------------------ | -------------------- |
| ModelIconCombinationModal.comfirmIconSelection | { id: string, selection: { color: string, icon: string, form: 'shape' }} | 选择确定后抛出的事件 |

# METHODS

| name      | params                                                 | description             |
| --------- | ------------------------------------------------------ | ----------------------- |
| showModal | event: { detail: { node: { style: { shape: string }}}} | 初始图标 (tobe refined) |
