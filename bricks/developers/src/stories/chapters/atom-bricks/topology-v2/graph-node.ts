import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "graph.graph-node",
  type: "brick",
  author: "lynette",
  text: {
    en: "Graph Node",
    zh: "拓扑节点构件",
  },
  icon: {
    lib: "fa",
    icon: "ello",
    prefix: "fab",
  },
  description: {
    en: "",
    zh:
      "可以显示百分比/图标/数据的拓扑节点构件，常用于general-graph构件的子构件",
  },
  conf: [
    {
      brick: "graph.graph-node",
      properties: {
        label: "appName",
        icon: {
          lib: "antd",
          icon: "environment",
          theme: "filled",
          color: "cyan",
        },
        percent: 80,
      },
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "graph.graph-node",
      properties: {
        sizeDependsOnCircle: false,
        label: "Console",
        percent: 60,
        color: "orange",
        checkable: true,
      },
      events: {
        "check.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "graph.graph-node",
      properties: {
        sizeDependsOnCircle: false,
        label: "CMDB",
        icon: {
          lib: "antd",
          icon: "minus",
        },
        showType: "small",
      },
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "graph.graph-node",
      properties: {
        sizeDependsOnCircle: false,
        label: "Monitor",
        icon: {
          lib: "easyops",
          category: "container",
          icon: "deploy-shortcut",
          color: "green",
        },
        percent: 95,
      },
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "graph.graph-node",
      properties: {
        sizeDependsOnCircle: false,
        label: "appName",
        icon: {
          lib: "antd",
          icon: "environment",
          theme: "filled",
          color: "cyan",
        },
        percent: 80,
      },
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
