# INPUTS

| property   | type               | required | default | description                |
| ---------- | ------------------ | -------- | ------- | -------------------------- |
| dataSource | any                | ✔        | -       | 包含节点列表和边列表的数据 |
| fields     | ViewDataDescriptor | ✔        | -       | 描述如何获取节点及边数据   |

```ts
export interface ViewDataDescriptor {
  nodeLabel: string;  // 从节点中获取节点标签文本
  nodeId: string;     // 从节点中获取其 ID
  nodes: string;      // dataSource 中哪个字段为节点列表数据
  links: string;      // dataSource 中哪个字段为边列表数据
  source: string;     // 边数据中哪个字段为出发点
  target: string;     // 边数据中哪个字段为结束点
  number?: string;    // 节点数据中哪个字段为未恢复告警数量
  numberColor?: string;   // 未恢复告警数量颜色
  backgroundColor?: string; // 节点背景颜色
}

// example
const dataSource = {
  vertices: [
    { id: 'id-1', objectId: 'HOST', label: 'label-1', __extraInfo: { total: 1, color: 'red' } }
    { id: 'id-2', objectId: 'APP', label: 'label-2', __extraInfo: { total: 0, color: 'white' } }
  ],
  edges: [
    { out: 'id-1', in: 'id-2' },
  ]
}

const fields = {
  nodeLabel: 'label',
  nodeId: 'id',
  nodes: 'vertices',
  links: 'edges',
  source: 'out',
  target: 'in',
  number: '__extraInfo.total',
  numberColor: '__extraInfo.color'
}
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
