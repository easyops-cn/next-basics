import { Story } from "../../../interfaces";
import doc from "../../../docs/graph/general-graph.md";

const modelData = {
  root: "project",
  nodes: [
    {
      id: "project",
      type: "group",
    },
    {
      id: "APP",
      label: "APP",
      type: "model",
    },
    {
      id: "SERVICE",
      label: "SERVICE",
      type: "model",
    },
    {
      id: "appName",
      label: "appName",
      type: "attribute",
    },
    {
      id: "name",
      label: "name",
      type: "attribute",
    },
    {
      id: "port",
      label: "port",
      type: "attribute",
    },
    {
      id: "dbSize",
      label: "dbSize",
      type: "attribute",
    },
    {
      id: "APP.service",
      label: "关联服务",
      type: "relation",
    },
    {
      id: "SERVICE.app",
      label: "所属应用",
      type: "relation",
    },
  ],
  edges: [
    {
      source: "project",
      target: "APP",
      type: "include",
    },
    {
      source: "project",
      target: "SERVICE",
      type: "include",
    },
    {
      source: "APP",
      target: "appName",
      type: "model.include.attribute",
    },
    {
      source: "APP",
      target: "APP.service",
      type: "model.include.relation",
    },
    {
      source: "SERVICE",
      target: "name",
      type: "model.include.attribute",
    },
    {
      source: "SERVICE",
      target: "port",
      type: "model.include.attribute",
    },
    {
      source: "SERVICE",
      target: "SERVICE.app",
      type: "model.include.relation",
    },
    {
      source: "APP.service",
      target: "SERVICE.app",
      type: "link",
    },
  ],
};

const forceData = {
  root: "root",
  nodes: [
    {
      id: "root",
      label: "root",
      type: "group",
    },
    {
      id: "0",
      label: "0",
      type: "node",
    },
    {
      id: "1",
      label: "1",
      type: "node",
    },
    {
      id: "2",
      label: "2",
      type: "node",
    },
  ],
  edges: [
    {
      source: "root",
      target: "0",
      type: "include",
    },
    {
      source: "root",
      target: "1",
      type: "include",
    },
    {
      source: "root",
      target: "2",
      type: "include",
    },
    {
      source: "0",
      target: "1",
      type: "link",
    },
    {
      source: "0",
      target: "2",
      type: "link",
    },
  ],
};

const forceDataWithoutRoot = {
  nodes: [
    {
      id: "A",
      type: "node",
    },
    {
      id: "B",
      type: "node",
    },
    {
      id: "C",
      type: "node",
    },
    {
      type: "node",
      __comment__: "Make a random node from 'G' to 'Z'",
      id:
        "<% `Random ${String.fromCharCode(Math.floor(Math.random() * Math.floor(20)) + 71)}` %>",
    },
  ],
  edges: [
    {
      source: "A",
      target: "B",
      type: "link",
    },
    {
      source: "A",
      target: "C",
      type: "link",
    },
  ],
};

const treeData = {
  root: "root",
  nodes: [
    {
      id: "root",
      label: "root",
      type: "group",
    },
    {
      id: "0",
      label: "0",
      type: "node",
    },
    {
      id: "1",
      label: "1",
      type: "node",
    },
  ],
  edges: [
    {
      source: "root",
      target: "0",
      type: "include",
    },
    {
      source: "root",
      target: "1",
      type: "include",
    },
    {
      source: "0",
      target: "1",
      type: "link",
    },
  ],
};

const idcData = {
  root: "idc",
  nodes: [
    {
      id: "idc",
      label: "IDC",
      type: "group",
    },
    {
      id: "line-h",
      label: "H",
      type: "line",
    },
    {
      id: "line-g",
      label: "G",
      type: "line",
    },
    {
      id: "rack-h01",
      label: "H01",
      type: "rack",
      rackType: "网络柜",
    },
    {
      id: "rack-h02",
      label: "H02",
      type: "rack",
      rackType: "存储柜",
    },
    {
      id: "rack-g01",
      label: "G01",
      type: "rack",
      rackType: "改造柜",
    },
  ],
  edges: [
    {
      source: "idc",
      target: "line-h",
      type: "idc.include",
    },
    {
      source: "idc",
      target: "line-g",
      type: "idc.include",
    },
    {
      source: "line-h",
      target: "rack-h01",
      type: "line.include",
    },
    {
      source: "line-h",
      target: "rack-h02",
      type: "line.include",
    },
    {
      source: "line-g",
      target: "rack-g01",
      type: "line.include",
    },
  ],
};

const mockPipelineData = {
  nodes: [
    {
      id: "0",
      type: "node",
      label: "获取部署信息",
    },
    {
      id: "1",
      type: "node",
      label: "拉取代码",
    },
    {
      id: "2",
      type: "node",
      label: "安装 node 依赖",
    },
    {
      id: "3",
      type: "node",
      label: "代码构建 node",
    },
    {
      id: "4",
      type: "node",
      label: "单元测试",
    },
    {
      id: "5",
      type: "node",
      label: "推送代码 brick-next",
    },
    {
      id: "6",
      type: "node",
      label: "更新小产品配置 for-brick-next-162",
    },
    {
      id: "7",
      type: "node",
      label: "失败",
    },
  ],
  edges: [
    {
      source: "0",
      target: "1",
      type: "link",
    },
    {
      source: "1",
      target: "2",
      type: "link",
    },
    {
      source: "2",
      target: "3",
      type: "link",
    },
    {
      source: "3",
      target: "4",
      type: "link",
    },
    {
      source: "4",
      target: "5",
      type: "link",
    },
    {
      source: "5",
      target: "6",
      type: "link",
    },
    {
      source: "1",
      target: "7",
      type: "link",
    },
  ],
};

const dagreDataWithEdgeType = {
  root: "root",
  nodes: [
    {
      id: "root",
    },
    {
      id: "a",
      label: "a",
      type: "node",
      widthForDemo: 80,
      heightForDemo: 50,
    },
    {
      id: "b",
      label: "b",
      type: "node",
      widthForDemo: 40,
      heightForDemo: 40,
    },
    {
      id: "c",
      label: "c",
      type: "node",
      widthForDemo: 40,
      heightForDemo: 40,
    },
    {
      id: "d",
      label: "d",
      type: "node",
      widthForDemo: 80,
      heightForDemo: 30,
    },
    {
      id: "e",
      label: "e",
      type: "node",
      widthForDemo: 30,
      heightForDemo: 30,
    },
  ],
  edges: [
    {
      source: "root",
      target: "a",
      type: "include",
    },
    {
      source: "root",
      target: "b",
      type: "include",
    },
    {
      source: "root",
      target: "c",
      type: "include",
    },
    {
      source: "root",
      target: "d",
      type: "include",
    },
    {
      source: "root",
      target: "e",
      type: "include",
    },
    {
      source: "a",
      target: "b",
      type: "dagre",
    },
    {
      source: "a",
      target: "c",
      type: "dagre",
    },
    {
      source: "b",
      target: "d",
      type: "dagre",
    },
    {
      source: "c",
      target: "d",
      type: "dagre",
    },
    {
      source: "d",
      target: "e",
      type: "dagre",
    },
  ],
};

const dataForHighlight = {
  nodes: [
    {
      id: "A",
      type: "node",
    },
    {
      id: "B",
      type: "node",
    },
    {
      id: "C",
      type: "node",
    },
    {
      id: "D-not-to-related",
      type: "node",
    },
  ],
  edges: [
    {
      source: "A",
      target: "B",
      type: "link",
    },
    {
      source: "A",
      target: "C",
      type: "link",
    },
    {
      source: "A",
      target: "D-not-to-related",
      type: "link-not-to-highligh",
    },
  ],
};

export const story: Story = {
  storyId: "graph.general-graph",
  type: "brick",
  author: "steve",
  text: {
    en: "General Graph",
    zh: "混合拓扑视图",
  },
  icon: {
    lib: "fa",
    icon: "pushed",
    prefix: "fab",
  },
  description: {
    en:
      "Support the definition of different layouts based on edgeType and the definition of different node bricks based on nodeType",
    zh:
      "支持根据边类型配置不同布局(force/tree/grid/link/dagre/manual)和节点构件的混合拓扑视图构件",
  },
  conf: [
    {
      description: {
        title: "在 Manual 布局中使用 Force 作为初始布局",
        message:
          "Force/Grid/Dagre/Manual 布局作为第一层视图时，可以使用 `nodeType` 过滤节点。",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: forceDataWithoutRoot,
        graphView: {
          groups: [
            {
              nodeType: "node",
              layout: "manual",
              layoutOptions: {
                namespace: "developers.demo.graph.manual.initial.with.force",
                key: "<% String(SYS.username) %>",
                initial: {
                  layout: "force",
                  forceLink: {
                    edgeType: "link",
                  },
                },
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "horizontal",
                      arrow: true,
                      strokeColor:
                        "<% DATA.edge.target === 'B' ? 'red': 'green' %>",
                      strokeWidth: "<% DATA.edge.target === 'B' ? 3 : 1 %>",
                      text:
                        "<% DATA.edge.target === 'B' ? { content: `50%\n200 ms`, style: { color: 'orange' } } : undefined %>",
                    },
                  },
                ],
                areas: [
                  {
                    if: "<% ['A', 'B'].includes(DATA.node.id) %>",
                    drawOptions: {
                      style: {
                        border: "2px solid orange",
                        borderRadius: "6px",
                        background: "rgba(0,0,0,0.1)",
                        padding: "15px",
                        paddingTop: "40px",
                      },
                      text: {
                        content:
                          "<% DATA.nodes.map(node => node.id).join(', ') %>",
                        style: {
                          position: "relative",
                          top: "-35px",
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                transform: {
                  style: {
                    background: "rgb(113, 215, 227)",
                    color: "#ffffff",
                    width: "70px",
                    height: "70px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    whitespace: "nowrap",
                  },
                  textContent: "<% DATA.node.id %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "使用 `edgeType` 过滤的 Force 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: forceData,
        graphView: {
          groups: [
            {
              edgeType: "include",
              layout: "force",
              layoutOptions: {
                distance: 100,
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "horizontal",
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                properties: {
                  style: {
                    background: "rgb(113, 215, 227)",
                    color: "#ffffff",
                    width: "30px",
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                  },
                },
                transform: {
                  textContent: "<% DATA.node.label %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "Force 布局 + Grid 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: modelData,
        graphView: {
          groups: [
            {
              edgeType: "include",
              layout: "force",
              layoutOptions: {
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "horizontal",
                    },
                  },
                ],
              },
            },
            {
              edgeType: ["model.include.attribute", "model.include.relation"],
              layout: "grid",
              layoutOptions: {
                style: {
                  color: "#2c2c2c",
                  gap: "10px",
                  background: "rgba(255, 255, 0, 0.2)",
                  borderRadius: 8,
                  border: "1px solid rgb(226,226,226)",
                  padding: "10px",
                  width: 200,
                },
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "model",
              useBrick: {
                brick: "graph.header-with-dropdown",
                properties: {
                  contentItemActions: {
                    useBrick: [
                      {
                        brick: "presentational-bricks.general-label",
                        properties: {
                          text: "Attribute",
                          prefixIcon: {
                            lib: "antd",
                            icon: "plus-circle",
                            theme: "outlined",
                          },
                        },
                      },
                    ],
                  },
                },
                transform: {
                  header: "<% DATA.node.label %>",
                  item: "<% DATA.node %>",
                },
              },
            },
            {
              nodeType: "attribute",
              useBrick: {
                brick: "graph.item-with-tag",
                properties: {
                  icon: {
                    lib: "antd",
                    icon: "table",
                    theme: "outlined",
                    color: "#B5B5B5",
                  },
                },
                transform: {
                  text: "<% DATA.node.label %>",
                },
              },
            },
            {
              nodeType: "relation",
              useBrick: {
                brick: "graph.item-with-tag",
                properties: {
                  icon: {
                    lib: "antd",
                    icon: "environment",
                    theme: "filled",
                    color: "#71D7E3",
                  },
                },
                transform: {
                  text: "<% DATA.node.label %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "Tree 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: treeData,
        graphView: {
          groups: [
            {
              edgeType: "include",
              layout: "tree",
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                properties: {
                  style: {
                    background: "rgb(113, 215, 227)",
                    color: "#ffffff",
                    width: "200px",
                    height: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    display: "flex",
                  },
                },
                transform: {
                  textContent: "<% DATA.node.label %>",
                },
              },
            },
            {
              nodeType: "group",
              useBrick: {
                brick: "div",
                properties: {
                  style: {
                    background: "rgb(113, 215, 227)",
                    color: "#ffffff",
                    width: "200px",
                    height: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    display: "flex",
                  },
                },
                transform: {
                  textContent: "<% DATA.node.label %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "使用 `nodeType` 过滤的 Dagre 布局，布局方向从左到右",
        message:
          "Force/Grid/Dagre 布局作为第一层视图时，可以使用 `nodeType` 过滤节点。",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: mockPipelineData,
        graphView: {
          groups: [
            {
              nodeType: "node",
              layout: "dagre",
              layoutOptions: {
                ranksep: 60,
                rankdir: "LR",
                align: "UL",
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "polyline",
                      arrow: true,
                      arrowType: "solid",
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "graph.item-with-tag",
                properties: {
                  hoverable: true,
                  showUnderline: false,
                  defaultBgColor: "#ffffff",
                  style: {
                    width: "max-content",
                    maxWidth: "120px",
                  },
                  icon: {
                    lib: "easyops",
                    category: "model",
                    icon: "provider",
                  },
                },
                transform: {
                  text: "<% DATA.node.label %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "使用 `edgeType` 过滤的 Dagre 布局，布局方向从上到下",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: dagreDataWithEdgeType,
        graphView: {
          groups: [
            {
              edgeType: "include",
              layout: "dagre",
              layoutOptions: {
                ranksep: 60,
                lines: [
                  {
                    edgeType: "dagre",
                    drawOptions: {
                      type: "polyline",
                      arrow: true,
                      arrowType: "solid",
                      controlPointsOffset: "30%",
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                transform: {
                  textContent: "<% DATA.node.label %>",
                  style: {
                    background: "var(--theme-cyan-color)",
                    color: "#ffffff",
                    lineHeight: "<% `${DATA.node.heightForDemo}px` %>",
                    width: "<% `${DATA.node.widthForDemo}px` %>",
                    height: "<% `${DATA.node.heightForDemo}px` %>",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    display: "flex",
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "多层 Grid 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: idcData,
        graphView: {
          groups: [
            {
              edgeType: "idc.include",
              layout: "grid",
              layoutOptions: {
                style: {
                  gap: "10px",
                  color: "#2c2c2c",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "400px",
                },
              },
            },
            {
              edgeType: "line.include",
              layout: "grid",
              layoutOptions: {
                style: {
                  background: "rgb(234, 233, 233)",
                  gap: "10px",
                  color: "#2c2c2c",
                  borderRadius: "8px",
                  padding: "10px",
                  gridAutoFlow: "column",
                  justifyContent: "left",
                },
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "line",
              useBrick: {
                brick: "div",
                properties: {
                  style: {
                    background: "#ccc",
                    color: "#ffffff",
                    width: "30px",
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    display: "flex",
                    marginRight: "20px",
                  },
                },
                transform: {
                  textContent: "<% DATA.node.label %>",
                },
              },
            },
            {
              nodeType: "rack",
              useBrick: {
                brick: "div",
                transform: {
                  textContent: "<% DATA.node.label %>",
                  style: {
                    background:
                      "<% DATA.node.rackType==='网络柜'?'rgb(250, 190, 120)':DATA.node.rackType==='存储柜'?'rgb(101, 178, 255)':'rgb(150, 224, 173)' %>",
                    color: "#000",
                    fontSize: "12px",
                    width: "30px",
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    display: "flex",
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "Link 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: {
          root: "0",
          nodes: [
            {
              id: "0",
              label: "0",
              type: "node",
            },
            {
              id: "1",
              label: "1",
              type: "node",
            },
            {
              id: "2",
              label: "2",
              type: "node",
            },
          ],
          edges: [
            {
              source: "0",
              target: "1",
              type: "link",
            },
            {
              source: "1",
              target: "2",
              type: "link",
            },
          ],
        },
        graphView: {
          groups: [
            {
              edgeType: "link",
              layout: "link",
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                properties: {
                  style: {
                    background: "rgb(113, 215, 227)",
                    color: "#ffffff",
                    width: "30px",
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                  },
                },
                transform: {
                  textContent: "<% DATA.node.label %>",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "Grid 布局中绘制内部连线",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: {
          root: "root",
          nodes: [
            {
              type: "group",
              id: "root",
            },
            {
              type: "level",
              id: "level-0",
              label: "level-0",
            },
            {
              type: "level",
              id: "level-1",
              label: "level-1",
            },
            {
              type: "level",
              id: "level-2",
              label: "level-2",
            },
            {
              type: "model",
              id: "HOST",
              label: "HOST",
            },
            {
              type: "model",
              id: "CLUSTER",
              label: "CLUSTER",
            },
            {
              type: "model",
              id: "APP",
              label: "APP",
            },
            {
              type: "model",
              id: "USER",
              label: "USER",
            },
            {
              type: "instance",
              id: 100.162,
              label: 100.162,
            },
            {
              type: "instance",
              id: "生产集群",
              label: "生产集群",
              alertCount: 3,
            },
            {
              type: "instance",
              id: "开发集群",
              label: "开发集群",
            },
            {
              type: "instance",
              id: "cmdb",
              label: "cmdb",
            },
            {
              type: "instance",
              id: "easy_core",
              label: "easy_core",
              alertCount: 1,
            },
            {
              type: "instance",
              id: "easyops",
              label: "easyops",
              alertCount: 1,
            },
          ],
          edges: [
            {
              source: "root",
              target: "level-0",
              type: "level",
            },
            {
              source: "root",
              target: "level-1",
              type: "level",
            },
            {
              source: "root",
              target: "level-2",
              type: "level",
            },
            {
              source: "level-0",
              target: "HOST",
              type: "model",
            },
            {
              source: "level-1",
              target: "CLUSTER",
              type: "model",
            },
            {
              source: "level-1",
              target: "USER",
              type: "model",
            },
            {
              source: "level-2",
              target: "APP",
              type: "model",
            },
            {
              source: "HOST",
              target: 100.162,
              type: "instance",
            },
            {
              source: "CLUSTER",
              target: "生产集群",
              type: "instance",
            },
            {
              source: "CLUSTER",
              target: "开发集群",
              type: "instance",
            },
            {
              source: "APP",
              target: "cmdb",
              type: "instance",
            },
            {
              source: "APP",
              target: "easy_core",
              type: "instance",
            },
            {
              source: "USER",
              target: "easyops",
              type: "instance",
            },
            {
              source: 100.162,
              target: "生产集群",
              type: "link",
            },
            {
              source: 100.162,
              target: "开发集群",
              type: "link",
            },
            {
              source: "生产集群",
              target: "cmdb",
              type: "link",
            },
            {
              source: "开发集群",
              target: "cmdb",
              type: "link",
            },
            {
              source: 100.162,
              target: "easyops",
              type: "link",
            },
            {
              source: "easy_core",
              target: "easyops",
              type: "link",
            },
          ],
        },
        graphView: {
          groups: [
            {
              edgeType: "level",
              layout: "grid",
              layoutOptions: {
                style: {
                  gridTemplateColumns: "repeat(auto-fill, 220px)",
                  alignItems33: "center",
                },
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "horizontal",
                      arrow: true,
                    },
                  },
                ],
              },
            },
            {
              edgeType: "model",
              layout: "grid",
            },
            {
              edgeType: ["instance"],
              layout: "grid",
              layoutOptions: {
                style: {
                  gap: "10px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.1)",
                  border: "1px dashed rgb(226,226,226)",
                  boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.04)",
                  padding: "10px",
                  width: 200,
                },
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "model",
              useBrick: {
                brick: "graph.header-with-dropdown",
                transform: {
                  header: "<% DATA.node.label %>",
                },
              },
            },
            {
              nodeType: ["instance", "instance-group"],
              useBrick: {
                brick: "graph.item-with-tag",
                properties: {
                  hoverable: true,
                  itemStyle: {
                    borderRadius: "16px",
                  },
                  showUnderline: false,
                  defaultBgColor: "#D6E8FB",
                },
                transform: {
                  text:
                    '<% DATA.node.label.length > 20 ? (DATA.node.label.substr(0, 17) + "...") : DATA.node.label %>',
                  icon: {
                    lib: "antd",
                    icon:
                      '<% DATA.node.type === "instance-group" ? "gateway" : "environment" %>',
                  },
                  tagText: "<% DATA.node.alert_count > 0 ? 1 : 0 %>",
                  tagColor: '<% DATA.node.alert_count > 0 ? "red" : "green" %>',
                  dataSource: "@{node}",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "Manual 布局",
        message: "",
      },
      brick: "graph.general-graph",
      properties: {
        graphData: {
          nodes: [
            {
              type: "node",
              id: "A",
            },
            {
              type: "node",
              id: "B",
            },
            {
              type: "node",
              id: "C",
            },
            {
              type: "node",
              id: "D",
            },
            {
              type: "node",
              id: "E",
            },
            {
              type: "node",
              id: "F",
            },
            {
              type: "node",
              __comment__: "Make a random node from 'G' to 'Z'",
              id:
                "<% `Random ${String.fromCharCode(Math.floor(Math.random() * Math.floor(20)) + 71)}` %>",
            },
          ],
          edges: [
            {
              type: "link",
              source: "A",
              target: "B",
            },
            {
              type: "link",
              source: "E",
              target: "D",
            },
          ],
        },
        graphView: {
          groups: [
            {
              nodeType: "node",
              layout: "manual",
              layoutOptions: {
                namespace: "developers.demo.graph.manual",
                key: "<% String(SYS.username) %>",
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "direct",
                      arrow: true,
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "div",
                properties: null,
                transform: {
                  textContent: "<% DATA.node.id %>",
                  style: {
                    width: "100px",
                    height: "<% `${(DATA.node.id.charCodeAt(0)-65)*5+30}px` %>",
                    border: "2px solid green",
                    borderRadius: "6px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "节点高亮",
        message:
          "需要子构件配合实现，子构件内可以分别实现highlighted(高亮节点)/related(关联节点)/faded(淡化节点)样式。通过绑定节点构件的 mouseenter mouseleave 或者 click 事件设置去设置`highlightNode`可以实现悬浮高亮等特性。",
      },
      brick: "graph.general-graph",
      properties: {
        id: "highlight-graph",
        graphData: dataForHighlight,
        graphView: {
          groups: [
            {
              nodeType: "node",
              layout: "force",
              layoutOptions: {
                distance: 100,
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "direct",
                      strokeColor: "var(--theme-blue-color)",
                    },
                  },
                  {
                    edgeType: "link-not-to-highligh",
                    drawOptions: {
                      type: "direct",
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "graph.graph-node",
                properties: {
                  icon: {
                    lib: "antd",
                    icon: "environment",
                    theme: "filled",
                    color: "cyan",
                  },
                  percent: 100,
                  sizeDependsOnCircle: false,
                },
                transform: {
                  dataSource: "<% DATA.node %>",
                  label: "<% DATA.node.id %>",
                },
                events: {
                  "item.mouse.enter": [
                    {
                      target: "#highlight-graph",
                      properties: {
                        highlightNode: "<% EVENT.detail.id %>",
                      },
                    },
                  ],
                  "item.mouse.leave": [
                    {
                      target: "#highlight-graph",
                      properties: {
                        highlightNode: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        highlightOptions: {
          edgeType: "link",
        },
      },
    },
    {
      description: {
        title: "节点高亮",
        message:
          "需要子构件配合实现，子构件内可以分别实现highlighted(高亮节点)/related(关联节点)/faded(淡化节点)样式。通过绑定节点构件的 mouseenter mouseleave 或者 click 事件设置去设置`highlightNode`可以实现悬浮高亮等特性。",
      },
      brick: "graph.general-graph",
      properties: {
        id: "highlight-graph1",
        graphData: dataForHighlight,
        graphView: {
          groups: [
            {
              nodeType: "node",
              layout: "force",
              layoutOptions: {
                distance: 100,
                lines: [
                  {
                    edgeType: "link",
                    drawOptions: {
                      type: "direct",
                      strokeColor: "green",
                    },
                  },
                  {
                    edgeType: "link-not-to-highligh",
                    drawOptions: {
                      type: "direct",
                    },
                  },
                ],
              },
            },
          ],
          nodeBricks: [
            {
              nodeType: "node",
              useBrick: {
                brick: "graph.graph-icon",
                properties: {
                  icon: {
                    lib: "easyops",
                    category: "default",
                    icon: "it-resource-deploy",
                    color: "green",
                  },
                  bg: true,
                  size: 50,
                  reverseBgColor: true,
                  hoverable: true,
                  // percent: 100,
                  // sizeDependsOnCircle: false,
                },
                transform: {
                  dataSource: "<% DATA.node %>",
                  label: "<% DATA.node.id %>",
                },
                events: {
                  "item.mouse.enter": [
                    {
                      target: "#highlight-graph1",
                      properties: {
                        highlightNode: "<% EVENT.detail.id %>",
                      },
                    },
                  ],
                  "item.mouse.leave": [
                    {
                      target: "#highlight-graph1",
                      properties: {
                        highlightNode: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        highlightOptions: {
          edgeType: "link",
        },
      },
    },
  ],
  doc,
};
