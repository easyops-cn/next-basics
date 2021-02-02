[//]: # "atom-bricks/topology-v2/general-graph.ts"

<details>
<summary>History</summary>

| Version | Change                                                                                    |
| ------- | ----------------------------------------------------------------------------------------- |
| 1.39.0  | 支持节点高亮，新增属性 `highlightNode`,`highlightOptions`                                 |
| 1.33.0  | 支持边类型 `polyline`                                                                     |
| 1.27.0  | `force` 布局支持设置保存拖动后的节点位置：`saveDraggedNodes`                              |
| 1.26.0  | 新增布局 `manual`                                                                         |
| 1.11.0  | 新增属性 `fitCenter`,`fitView`,`hideZoomBar`,`disableDrag`,`fitVertical`,`graphMinHeight` |
| 1.5.0   | 新增构件 `graph.general-graph`                                                            |

</details>

# 内置边[DrawLineOptions.type]

- direct：直线
- horizontal：水平方向的贝塞尔曲线
- polyline：折线
- auto：自动画线，根据节点位置绘制水平方向贝塞尔曲线／垂直方向贝塞尔曲线／直线

# 内置布局[GraphViewGroup.layout]

- force：力布局
- dagre：层次布局
- tree：树布局
- grid：网格布局
- link：链表布局
- manual：手工布局

# INPUTS

| property         | type             | required | default | description                                                                                                                 |
| ---------------- | ---------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| graphData        | GraphData        | ✔️       | -       | 图数据                                                                                                                      |
| graphView        | GraphView        | ✔️       | -       | 视图定义                                                                                                                    |
| graphKey         | string           | -        | -       | `graphKey` 可用于同一个拓扑构件渲染不同的拓扑实例时，区分拓扑实例的唯一键，每当 `graphKey` 变化时，拓扑构件会整体重新渲染。 |
| fitCenter        | boolean          | -        | true    | 开启后，图将会被平移，图的中心将对齐到画布中心。                                                                            |
| fitView          | boolean          | -        | true    | 是否开启画布自适应。开启后图自动适配画布大小。比例只缩小不放大。                                                            |
| fitVertical      | boolean          | -        | false   | 是否撑满页面。                                                                                                              |
| hideZoomBar      | boolean          | -        | false   | 隐藏右下角的缩放面板                                                                                                        |
| disableDrag      | boolean          | -        | false   | 禁用移动视图，开启后不能拖动／滚动视图。                                                                                    |
| graphMinHeight   | number           | -        | 225     | 画布最小高度。                                                                                                              |
| highlightNode    | string \|number  | -        | -       | 需要高亮的节点 ID（通过绑定节点构件的 `mouseenter` `mouseleave` `click` 事件设置该属性可以实现悬浮高亮等特性）              |
| highlightOptions | HighlightOptions | -        | -       | 高亮选项设置，可以设置条件过滤                                                                                              |

### GraphData

| property | type                                                                                  | required | default | description                                                                          |
| -------- | ------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| nodes    | {id:string\|number;[key: string]: any;}[]                                             | ✔️       | -       | 包含所有的点信息，每一个 node 中，必须有 id 字段， 其它字段按具体需求添加            |
| edges    | {source: string \| number;target: string \| number;type?: string;[key: string]: any;} | ✔️       | -       | 包含所有的边信息，每一个 edge 中，必须有 source, target 字段，其它字段按具体需求添加 |
| root     | string                                                                                | -        | -       | 根节点                                                                               |

### GraphView

| property   | type                 | required | default | description                                                        |
| ---------- | -------------------- | -------- | ------- | ------------------------------------------------------------------ |
| groups     | GraphViewGroup[]     | -        | -       | 视图分组定义，可以按照边类型定义或者其他属性分组定义，支持 if 语句 |
| nodeBricks | GraphViewNodeBrick[] | -        | -       | node 节点自定义显示构件                                            |

### GraphViewGroup

| property      | type               | required | default | description                                                                                                                                                |
| ------------- | ------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout        | string             | -        | -       | 布局类型，现支持 `force`（力布局）,`tree`（树布局），`grid`（网格布局），`link`（链表布局），`dagre`（层次布局），`manual`（手工布局）                     |
| layoutOptions | Record<string,any> | -        | -       | 根据不同布局可以有不同的设置选项，具体选项支持如下表                                                                                                       |
| nodeType      | string \| string[] | -        | -       | 节点类型，可以根据 `GraphData.nodes` 中的 type 进行分组定义视图。仅可用于 `force, grid, dagre, manual` 布局中的第一层视图。优先级高于 `edgeType` 和 `if`。 |
| edgeType      | string \| string[] | -        | -       | 边类型，可以根据 `GraphData.edges` 中的 type 进行分组定义视图。优先级高于 `if`。                                                                           |
| if            | string \| boolean  | -        | -       | 根据条件过滤边，可以填写条件表达式，根据 `DATA.edge` 设置视图分组。                                                                                        |

### GraphViewNodeBrick

| property | type               | required | default | description                                                           |
| -------- | ------------------ | -------- | ------- | --------------------------------------------------------------------- |
| useBrick | UseSingleBrickConf | ✔️       | -       | node 节点自定义渲染构件，仅支持单个构件                               |
| nodeType | string\|string[]   | -        | -       | node 类型，可以根据 `GraphData.nodes` 中的 type 自定义渲染构件。      |
| if       | string \| boolean  | -        | -       | 支持条件语句，可以根据 `DATA.node` 中的字段写条件语句自定义渲染构件。 |

### UseSingleBrickConf

| property      | type           | required | default | description                                        |
| ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
| brick         | string         | ✔️       | -       | 构件名称                                           |
| properties    | object         | -        | -       | 构件属性                                           |
| events        | BrickEventsMap | -        | -       | 事件                                               |
| transform     | string\|object | -        | -       | 属性数据转换                                       |
| transformFrom | string         | -        | -       | 属性数据转换来自数据源的哪个字段，不填则为整个数据 |

node 节点自定义构件传递的数据源为：

| field | type                                    | description |
| ----- | --------------------------------------- | ----------- |
| node  | {id:string\|number;[key: string]: any;} | node 数据   |

### GraphLineOptions

| property    | type               | required | default | description                                                                      |
| ----------- | ------------------ | -------- | ------- | -------------------------------------------------------------------------------- |
| edgeType    | string \| string[] | -        | -       | 边类型，可以根据 `GraphData.edges` 中的 type 进行分组定义视图。优先级高于 `if`。 |
| if          | string \| boolean  | -        | -       | 根据条件过滤边，可以填写条件表达式，根据 `DATA.edge` 过滤边。                    |
| drawOptions | DrawLineOptions    | -        | -       | 画线配置                                                                         |

### GraphAreaOptions

布局中的背景区域框定义。每个区域框通过 `nodeType` 或 `if` 得到一组节点，以此计算得到一个背景框将这些节点包裹起来。

| property    | type               | required | default | description                                                                        |
| ----------- | ------------------ | -------- | ------- | ---------------------------------------------------------------------------------- |
| nodeType    | string \| string[] | -        | -       | 节点类型，可以根据 `GraphData.nodes` 中的 type 进行分组定义视图。优先级高于 `if`。 |
| if          | string \| boolean  | -        | -       | 根据条件过滤节点，可以填写条件表达式，根据 `DATA.node` 过滤节点。                  |
| drawOptions | DrawAreaOptions    | -        | -       | 背景框配置，包括样式和文字信息 。                                                  |

### DrawLineOptions

通用配置，各个类型的线在通用配置的基础上还可能有特定的扩展配置，详见下表。

| property    | type                                             | required | default              | description          |
| ----------- | ------------------------------------------------ | -------- | -------------------- | -------------------- |
| type        | "auto" \| "horizontal" \| "direct"\|"polyline"   | -        | "auto"               | 画线类型。           |
| arrow       | boolean                                          | -        | -                    | 是否绘制箭头         |
| arrowType   | "solid" \| "outlined"                            | -        | "outlined"           | 箭头类型             |
| strokeColor | string                                           | -        | "rgb(217, 217, 217)" | 画线颜色             |
| strokeWidth | number                                           | -        | 1                    | 画线宽度             |
| text        | { content: string; style?: Record<string, any> } | -        | -                    | 连线上显示的文字信息 |

### DrawLineOptions - polyline

| property            | type                                            | required | default       | description                                                                                                                                              |
| ------------------- | ----------------------------------------------- | -------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| polylineRadius      | number                                          | -        | 10            | 拐弯处的圆角弧度                                                                                                                                         |
| controlPointsOffset | number\|string\|[number\|string,number\|string] | -        | ["30%","30%"] | 两个控制点距离两端点连线的距离，支持数字或者百分比                                                                                                       |
| horizontalPriority  | boolean                                         | -        | -             | 当设置为 `true` 时优先水平方向连线，如果不成功再垂直方向连线。`false` 则优先垂直方向连线。当不设置的时候自动根据两个节点的水平和垂直距离进行计算和连线。 |

### DrawLineOptions - direct

| property       | type   | required | default   | description              |
| -------------- | ------ | -------- | --------- | ------------------------ |
| nodeRadiusDiff | number | -        | "default" | 画线时节点半径大小的差值 |

### DrawAreaOptions

| property | type                                             | required | default | description          |
| -------- | ------------------------------------------------ | -------- | ------- | -------------------- |
| style    | Record<string, any>                              | -        | -       | 背景框样式。         |
| text     | { content: string; style?: Record<string, any> } | -        | -       | 背景框显示的文字信息 |

### layoutOptions - force

| property          | type                                   | required | default | description                                                                                                                                                                                                    |
| ----------------- | -------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lines             | GraphLineOptions[]                     | -        | -       | 布局中连线的定义。可以根据边类型/if 语句进行分组，定义线的选项，现支持自动类型和水平切线连线，还可以设置是否显示箭头／箭头类型，以及计算节点半径时的差值。                                                     |
| forceLink         | {edgeType?:string;if:string\|boolean;} | -        | -       | 其中 `edgeType` 和 `if` 的定义同`GraphViewGroup.edgeType`和`GraphViewGroup.if`。设置哪些边类型为该力布局中的链接。                                                                                             |
| initialNodeRadius | number                                 | -        | 100     | 初始布局时节点半径，如果节点大小不确定，可以给一个预估的平均值（d3-force 初始化时会进行一次 [phyllotaxis arrangement](https://observablehq.com/@d3/force-layout-phyllotaxis)，以便让所有节点在开始时均匀分布） |
| linkDistance      | number                                 | -        | 100     | 链接的距离。链接相当于一根弹簧，链接两端的节点距离超过这个值时，弹簧拉紧它们，反之则推开它们。详见 [d3-force](https://github.com/d3/d3-force#link_distance)                                                    |
| padding           | number                                 | -        | 30      | 内容区域的 padding                                                                                                                                                                                             |
| nodeDraggable     | boolean                                | -        | false   | 节点是否可以拖动，拖动后的节点将保持固定位置，其它节点则会根据力学布局重新计算位置                                                                                                                             |
| saveDraggedNodes  | { namespace: string; key: string; }    | -        | -       | 设置用于保存已拖动的节点位置的 namespace 和 key，它们是定义一个视图的联合唯一索引。不设置时将不保存。                                                                                                          |

### layoutOptions - dagre

| property | type                                      | required | default   | description                                                                                                                    |
| -------- | ----------------------------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| lines    | GraphLineOptions[]                        | -        | -         | 同 force 布局的 `lines`                                                                                                        |
| rankdir  | "TB" \| "BT" \| "LR" \| "RL"              | -        | "TB"      | 布局的方向, 可选 TB-从上到下, BT-从下到上, LR-从左到右, RL-从右到左                                                            |
| align    | undefined \| "UL" \| "UR" \| "DL" \| "DR" | -        | undefined | 节点对齐方式，可选 UL-对齐到左上角, UR-对齐到右上角, DL-对齐到左下角, DR-对齐到右下角，undefined-默认，中间对齐                |
| nodesep  | number                                    | -        | 50        | 节点水平间距(px)，在`rankdir` 为 'TB' 或 'BT' 时是节点的水平间距；在`rankdir` 为 'LR' 或 'RL' 时代表节点的竖直方向间距。       |
| ranksep  | number                                    | -        | 50        | 每一层节点之间间距，在`rankdir` 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在`rankdir` 为 'LR' 或 'RL' 时代表水平方向相邻层间距。 |
| padding  | number                                    | -        | 30        | 内容区域的 padding                                                                                                             |

### layoutOptions - grid

| property     | type               | required | default | description             |
| ------------ | ------------------ | -------- | ------- | ----------------------- |
| style        | Record<string,any> | -        | -       | 自定义 grid 布局的样式  |
| excludesRoot | boolean            | -        | -       | 是否排除渲染根结点      |
| lines        | GraphLineOptions[] | -        | -       | 同 force 布局的 `lines` |

### layoutOptions - tree

| property | type               | required | default | description            |
| -------- | ------------------ | -------- | ------- | ---------------------- |
| style    | Record<string,any> | -        | -       | 自定义 tree 布局的样式 |

### layoutOptions - link

| property | type               | required | default | description            |
| -------- | ------------------ | -------- | ------- | ---------------------- |
| style    | Record<string,any> | -        | -       | 自定义 link 布局的样式 |

### layoutOptions - manual

| property     | type               | required | default | description                                                                                                        |
| ------------ | ------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| namespace    | string             | ✔️       | -       | 用户视图设置的命名空间                                                                                             |
| key          | string             | ✔️       | -       | 用户视图设置的 key，`namespace + key` 是定义一个视图的联合唯一索引                                                 |
| style        | Record<string,any> | -        | -       | 自定义 grid 布局的样式                                                                                             |
| dividerStyle | Record<string,any> | -        | -       | 自定义分割线的样式                                                                                                 |
| lines        | GraphLineOptions[] | -        | -       | 同 force 布局的 `lines`                                                                                            |
| areas        | GraphAreaOptions[] | -        | -       | 布局中的背景区域框定义。每个区域框通过 `nodeType` 或 `if` 得到一组节点，以此计算得到一个背景框将这些节点包裹起来。 |
| initial      | InitialLayout      | -        | -       | 当没有可用的用户视图时、初始使用的布局，当前仅支持 `force`                                                         |

### InitialLayout - force

| property          | type    | required | default | description          |
| ----------------- | ------- | -------- | ------- | -------------------- |
| layout            | "force" | ✔️       | -       | 使用力学进行初始布局 |
| initialNodeRadius | number  | -        | 100     | 详见力学布局参数     |
| linkDistance      | number  | -        | 100     | 详见力学布局参数     |
| forceLink         | -       | -        | -       | 详见力学布局参数     |

### HighlightOptions

| property | type               | required | default | description                                                                                                                      |
| -------- | ------------------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| edgeType | string \| string[] | -        | -       | 高亮关联边类型，可以根据 `GraphData.edges` 中的 type 进行条件过滤，例如只高亮 type 为"A"类型的边，则设置成"A"。优先级高于 `if`。 |
| if       | string \| boolean  | -        | -       | 根据条件过滤边，可以填写条件表达式，根据 `DATA.edge` 设置条件过滤。                                                              |

# EVENTS

| type         | detail                                                     | description                                                                      |
| ------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| node.dragged | `{ node: GraphNode; position: { x: number, y: number }; }` | （仅支持 `force` 布局）节点拖动后触发，`detail` 中包含节点数据和拖动后的位置信息 |
