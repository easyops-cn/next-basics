[//]: # "atom-bricks/topology-v2/general-topology.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 0.2.0   | 新增构件 `topology-v2.general-topology` |
| 0.3.0   | 新增事件，`topology-v2.node.click`      |

</details>

# INPUTS

| property        | type              | required | default  | description                  |
| --------------- | ----------------- | -------- | -------- | ---------------------------- |
| data            | [GraphData]       | ✔️       | -        | 描述点、边的数据结构         |
| fitViewPadding  | Padding           | -        | 10       | 图适应画布时，指定四周的留白 |
| layout          | [LayoutConfig]    | -        | -        | 布局                         |
| defaultNode     | DefaultItem       | -        | -        | 默认节点类型，样式           |
| defaultEdge     | DefaultItem       | -        | -        | 默认边类型，样式             |
| width           | number            | -        | -        | 宽度，一般不用指定           |
| height          | number            | -        | -        | 高度, 一般不用指定           |
| renderer        | "canvas" \| "svg" | -        | "canvas" | 底层渲染引擎                 |
| enableAnimate   | boolean           | -        | false    | 启用动画                     |
| enableDragGraph | boolean           | -        | false    | 启用拖动画布                 |
| enableDragNode  | boolean           | -        | false    | 启用拖动节点                 |
| enableZoom      | boolean           | -        | false    | 启用缩放                     |

```typescript
/**
 * 默认状态下节点、边的配置，比如 type, size, color。会被写入的 data 覆盖。
 */
export type DefaultItem = {
  shape?: string;
  type?: string;
  size?: number | number[];
  color?: string;
} & ModelStyle;

// 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距
export declare type Padding = number | string | number[];

export declare type ModelStyle = Partial<{
  [key: string]: unknown;
  style: ShapeStyle;
  stateStyles: {
    [key: string]:
      | ShapeStyle
      | {
          [key: string]: ShapeStyle;
        };
  };
  loopCfg: LoopConfig;
  labelCfg?: ILabelConfig;
}>;

export declare type ShapeStyle = Partial<{
  x: number;
  y: number;
  r: number;
  radius: number;
  width: number;
  height: number;
  offset: number | number[];
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  lineAppendWidth: number;
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  size: number | number[];
  endArrow: boolean | ArrowConfig;
  startArrow: boolean | ArrowConfig;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  cursor: string;
}>;

export interface ArrowConfig {
  d?: number;
  path?: string;
}
```

# EVENTS

| type                   | detail   | description |
| ---------------------- | -------- | ----------- |
| topology-v2.node.click | 节点数据 | -           |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

[graphdata]: https://g6.antv.vision/zh/docs/api/Graph#datadata
[layoutconfig]: https://g6.antv.vision/zh/docs/api/layout/Layout
