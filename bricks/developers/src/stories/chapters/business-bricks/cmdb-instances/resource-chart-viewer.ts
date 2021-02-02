import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/resource-chart-viewer.md";

export const story: Story = {
  storyId: "cmdb-instances.resource-chart-viewer",
  type: "template",
  author: "jo",
  text: {
    en: "Resource Chart Viewer",
    zh: "资源图形展示"
  },
  description: {
    en: "Show Resource Chart Base on Model Instance Data",
    zh: "基于模型实例数据展示资源图形"
  },
  icon: {
    lib: "fa",
    icon: "chart-area"
  },
  conf: [
    {
      template: "cmdb-instances.resource-chart-viewer",
      params: {
        type: "pie",
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: ["bug"]
      }
    },
    {
      template: "cmdb-instances.resource-chart-viewer",
      params: {
        type: "doughnut",
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: ["bug"]
      }
    },
    {
      template: "cmdb-instances.resource-chart-viewer",
      params: {
        type: "line",
        objectId: "ISSUE_STAT",
        xAxisField: "time",
        yAxisField: ["bug", "issue"]
      }
    },
    {
      template: "cmdb-instances.resource-chart-viewer",
      params: {
        type: "bar",
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: ["bug", "issue"]
      }
    }
  ],
  doc: docMD
};
