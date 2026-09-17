[//]: # "business-bricks/cmdb-topology/object-topology-view.ts"

# INPUTS

| property      | type     | required | default | description                                                      |
| ------------- | -------- | -------- | ------- | ---------------------------------------------------------------- |
| viewDetail    | ViewData | ✔️       | -       | View data, the instance data of the `_TOPO_VIEW` model           |
| readonly      | boolean  | -        | false   | Whether read-only                                                |
| searchable    | boolean  | -        | true    | Whether search is supported                                      |
| dragEnabled   | boolean  | -        | true    | Enable canvas dragging and the centering button                  |
| zoomEnabled   | boolean  | -        | true    | Enable zooming                                                   |
| autoScale     | boolean  | -        | true    | Enable auto scaling when the canvas content is too large         |
| autoCenter    | boolean  | -        | true    | Enable auto centering                                            |
| nodeDraggable | boolean  | -        | true    | Enable node dragging                                             |
| hideLinks     | boolean  | -        | false   | Hide links                                                       |

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

| type                              | detail | description                                  |
| --------------------------------- | ------ | -------------------------------------------- |
| objectTopologyView.showIconConfig | -      | Emitted when the icon needs to be set        |

# METHODS

| name           | params | description                       |
| -------------- | ------ | --------------------------------- |
| update         | -      | Update the view                   |
| create         | -      | Create a view                     |
| receivePayload | -      | Receive dragged element data      |
| dropPayload    | -      | Discard dragged data              |
| updateShape    | -      | Update the node icon and color    |
