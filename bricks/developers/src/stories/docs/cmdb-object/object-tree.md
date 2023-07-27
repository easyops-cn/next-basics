[//]: # "business-bricks/cmdb-object/object-tree.ts"

# INPUTS

| property   | type  | required | default | description                                                                         |
| ---------- | ----- | -------- | ------- | ----------------------------------------------------------------------------------- |
| objectList | any[] | ✔️       | -       | CMDB 模型对象列表, 可通过 `providers-of-cmdb.cmdb-object-api-get-object-all` 来获取 |

# EVENTS

| type                               | detail                         | description        |
| ---------------------------------- | ------------------------------ | ------------------ |
| cmdb-object.object-tree.drag-start | { type: string, payload: any } | 当拖动树节点时触发 |
| cmdb-object.object-tree.drag-end   | -                              | 当拖动结束时触发   |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
