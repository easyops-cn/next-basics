import { Story } from "../../../interfaces";
import { graphic } from "echarts";

export const story: Story = {
  storyId: "graph.graph-icon",
  type: "brick",
  author: "astrid",
  text: {
    en: "Graph Icon",
    zh: "graph-icon拓扑节点构件",
  },
  icon: {
    lib: "fa",
    icon: "ello",
    prefix: "fab",
  },
  description: {
    en: "",
    zh:
      "纯图标+文字的构件，不需要外层包圈，以便于用于一些拟人化的拓扑展示（如网络拓扑等）",
  },
  conf: [
    {
      brick: "graph.graph-icon",
      properties: {
        label: "easyops",
        icon: {
          lib: "easyops",
          category: "default",
          icon: "it-resource-deploy",
          color: "green",
        },
        graphIconStyle: {
          fontSize: 50,
        },
        hoverable: true,
      },
      events: {
        "node.click": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
