[//]: # "business-bricks/cmdb-topology/object-topology-view.ts"

# INPUTS

| property      | type     | required | default | description                           |
| ------------- | -------- | -------- | ------- | ------------------------------------- |
| viewDetail    | ViewData | ✔️       | -       | 视图数据, `_TOPO_VIEW` 模型的实例数据 |
| readonly      | boolean  | -        | false   | 是否只读                              |
| searchable    | boolean  | -        | true    | 是否支持搜索                          |
| dragEnabled   | boolean  | -        | true    | 启用画布可拖拽及中心化按钮            |
| zoomEnabled   | boolean  | -        | true    | 启用缩放功能                          |
| autoScale     | boolean  | -        | true    | 启用自动缩小，当画布内容太大时        |
| autoCenter    | boolean  | -        | true    | 启用自动中心化                        |
| nodeDraggable | boolean  | -        | true    | 启用节点可拖拽                        |
| hideLinks     | boolean  | -        | false   | 隐藏连线                              |

```ts
export interface ViewData {
  nodes?: NodeData[];
  links?: LinkData[];
  elements: ElementData[];
}

export interface ElementData {
  // for dom id, unique
  selectorId: string;
  type: ElementType | string;
}

export interface NodeData extends ElementData {
  // cmdb id, such as instanceId, objectId
  id: string;

  // cmdb property
  name: string;

  // for display
  label: string;

  style: {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    label: {
      x: number;
      y: number;
      hide?: boolean;
    };
    shape?: string;
    hide?: boolean;
  };
}

export enum LineType {
  StraightLine = "StraightLine",
  RightAngleLine = "RightAngleLine",
}

export interface LinkData extends ElementData {
  source: string;
  target: string;
  isCustom: boolean;

  style: {
    type: LineType | string;
    path?: string;
    showArrow?: boolean;
    reverse?: boolean;
    showPoints?: boolean;
    hide?: boolean;
    isShielded?: boolean;
    canDelete?: boolean;
  };
}
```

# EVENTS

| type                              | detail | description                |
| --------------------------------- | ------ | -------------------------- |
| objectTopologyView.showIconConfig | -      | 当需要设置图标时发出该事件 |

# METHODS

| name           | params | description        |
| -------------- | ------ | ------------------ |
| update         | -      | 更新视图           |
| create         | -      | 新建视图           |
| receivePayload | -      | 接收拖拽元素数据   |
| dropPayload    | -      | 丢弃拖拽数据       |
| updateShape    | -      | 更新节点图标及颜色 |
