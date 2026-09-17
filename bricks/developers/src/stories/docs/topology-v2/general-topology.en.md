[//]: # "atom-bricks/topology-v2/general-topology.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 0.2.0   | New brick `topology-v2.general-topology` |
| 0.3.0   | New event, `topology-v2.node.click`      |

</details>

# INPUTS

| property        | type              | required | default  | description                  |
| --------------- | ----------------- | -------- | -------- | ---------------------------- |
| data            | [GraphData]       | ✔️       | -        | The data structure describing nodes and edges         |
| fitViewPadding  | Padding           | -        | 10       | Specifies the padding around when the graph fits the canvas |
| layout          | [LayoutConfig]    | -        | -        | Layout                         |
| defaultNode     | DefaultItem       | -        | -        | The default node type and style           |
| defaultEdge     | DefaultItem       | -        | -        | The default edge type and style             |
| width           | number            | -        | -        | Width, usually no need to specify           |
| height          | number            | -        | -        | Height, usually no need to specify           |
| renderer        | "canvas" \| "svg" | -        | "canvas" | The underlying rendering engine                 |
| enableAnimate   | boolean           | -        | false    | Enable animation                     |
| enableDragGraph | boolean           | -        | false    | Enable dragging the canvas                 |
| enableDragNode  | boolean           | -        | false    | Enable dragging nodes                 |
| enableZoom      | boolean           | -        | false    | Enable zooming                     |

```typescript
/**
 * The configuration of nodes and edges in the default state, such as type, size, color. It will be overridden by the written data.
 */
export type DefaultItem = {
  shape?: string;
  type?: string;
  size?: number | number[];
  color?: string;
} & ModelStyle;

// When a single value is specified, the margins of all four sides are equal; when an array is specified, the values in the array correspond to the margins of the top, right, bottom and left sides in order
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
| topology-v2.node.click | Node data | -           |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

[graphdata]: https://g6.antv.vision/zh/docs/api/Graph#datadata
[layoutconfig]: https://g6.antv.vision/zh/docs/api/layout/Layout
