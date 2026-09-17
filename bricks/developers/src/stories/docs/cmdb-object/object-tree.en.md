[//]: # "business-bricks/cmdb-object/object-tree.ts"

# INPUTS

| property   | type  | required | default | description                                                                         |
| ---------- | ----- | -------- | ------- | ----------------------------------------------------------------------------------- |
| objectList | any[] | ✔️       | -       | CMDB model object list, can be obtained via `providers-of-cmdb.cmdb-object-api-get-object-all` |

# EVENTS

| type                               | detail                         | description                       |
| ---------------------------------- | ------------------------------ | --------------------------------- |
| cmdb-object.object-tree.drag-start | { type: string, payload: any } | Triggered when a tree node is dragged |
| cmdb-object.object-tree.drag-end   | -                              | Triggered when dragging ends      |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
