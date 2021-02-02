[//]: # "business-bricks/monitor-alert/not-recover-alert-view.ts"

# INPUTS

| property     | type                     | required | default | description                                                                 |
| ------------ | ------------------------ | -------- | ------- | --------------------------------------------------------------------------- |
| graphRequest | TraverseGraphRequestBody | ✔        | -       | 实例图接口请求                                                              |
| st           | number \| string         | ✔        | -       | 获取关联实例的告警事件，开始时间，时间截或 '-1h', '-2d'                     |
| et           | number \| string         | -        | -       | 获取关联实例的告警事件，结束时间，时间截或 '-1h', '-2d', 不提供则为当前时间 |

```ts
export interface TraverseGraphRequestBody {
  /** 模型Id */
  object_id: string;

  /** 实例的过滤条件 (过滤条件不仅支持属性的过滤，也支持关系字段的过滤) */
  query: Record<string, any>;

  /** 指定返回此关系指向模型的fields */
  fields: Record<string, any>;

  /** 父节点指向当前节点的关系字段, 比如 APP的 owner, CLUSTER 的 deviceList */
  parentOut: string;

  /** 自递归深度 -1表示不限深度 */
  depth: number;

  /** 子节点列表 */
  child: Partial<TraverseGraphRequestBody>[];
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
