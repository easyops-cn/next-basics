[//]: # "business-bricks/cmdb-instances/relation-path-tree.ts"

# 描述

实例树默认可选中（带有 checkbox）

- 选中树节点时，父子间没有任何联系，也即选中父节点时，不会同时选中其子节点；反之，选中子节点同样不会影响到父节点。因为这个实例树是按需拉取节点数据的，所以在没点击展开之前是完全不知道有什么子节点的。如果需要选中父节点同时也要选中其子节点，请使用原子的[树构件](developers/brick-book/brick/presentational-bricks.brick-tree)
- 实例树请求定义中，会自动根据模型的 `show_key` 来添加 `fields` 请求

# INPUTS

| property        | type                                | required | default | description                                |
| --------------- | ----------------------------------- | -------- | ------- | ------------------------------------------ |
| treeRequest     | { tree: ModelInstanceTreeRootNode } | ✔️       | true    | 实例树请求定义                             |
| checkable       | boolean                             | -        | true    | 是否可选中                                 |
| checkInstances  | CmdbInstance[]                      | -        | -       | 默认选中实例列表                           |
| clickedInstance | CmdbInstance                        | -        | -       | 默认高亮实例（单击树节点时，会高亮该节点） |

# EVENTS

| type                                    | detail         | description      |
| --------------------------------------- | -------------- | ---------------- |
| cmdb-instances.relation-path-tree.click | CmdbInstance   | 单击的树节点实例 |
| cmdb-instances.relation-path-tree.check | CmdbInstance[] | 选中的实例列表   |

```typescript
export interface CmdbInstance {
  objectId: string;
  instanceId: string;
}

/** 树根节点定义 */
export interface ModelInstanceTreeRootNode {
  /** 模型ID */
  object_id: string;
  /** 查询条件, 实例树搜索接口此参数无效 */
  query: Record<string, any>;
  /** 过滤的字段列表, 留空代表返回所有字段(true: 表示指定获取字段, false: 表示指定不获取的字段) */
  fields: Record<string, any>;
  /** 子节点列表 */
  child: Partial<ModelInstanceTreeChildNode>[];
}

/** 树子节点定义 */
export interface ModelInstanceTreeChildNode {
  /** 关系字段ID */
  relation_field_id: string;
  /** 过滤的字段列表, 留空代表返回所有字段(true: 表示指定获取字段, false: 表示指定不获取的字段) */
  fields: Record<string, any>;
  /** 忽略与父级无关联实例, 默认false */
  ignore_single: boolean;
  /** 子节点列表 */
  child: Partial<ModelInstanceTreeChildNode>[];
}
```

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
