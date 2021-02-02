import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-charts/instances-total.md";

export const story: Story = {
  storyId: "cmdb-charts.instances-total",
  type: "template",
  author: "cyril",
  text: {
    en: "instance total",
    zh: "实例总数"
  },
  description: {
    en: "show the total of cmdb instances",
    zh: "展示 CMDB 实例总数"
  },
  icon: {
    lib: "antd",
    type: "number"
  },
  conf: [
    {
      template: "monitor-charts.instances-total",
      params: {
        objectId: "HOST",
        query: {
          _agentStatus: "正常"
        },
        title: "正常主机个数",
        icon: {
          lib: "antd",
          type: "dashboard"
        },
        format: {
          precision: 0,
          unit: "个"
        },
        valueColor: "rgba(140, 140, 140, 1)"
      }
    }
  ],
  doc: docMD
};
