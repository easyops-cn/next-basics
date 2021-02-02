import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instance-chart.md";

export const story: Story = {
  storyId: "cmdb-instances.group-chart",
  type: "template",
  author: "jo",
  text: {
    en: "Cmdb Instance Chart Viewer",
    zh: "cmdb 数据展示"
  },
  description: {
    en: "Show Resource Chart Base on Model Instance Data",
    zh: "基于模型实例数据展示资源图形（基于实例聚合接口的封装）"
  },
  icon: {
    lib: "fa",
    icon: "chart-area"
  },
  conf: [
    {
      template: "cmdb-instances.group-chart",
      params: {
        type: "pie",
        pieChartProps: {
          title: "bug 分布图"
        },
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: [
          {
            op: "avg",
            field: "bug",
            alias: "bug 数量"
          },
          {
            op: "avg",
            field: "issue",
            alias: "issue 数量"
          }
        ]
      }
    },
    {
      template: "cmdb-instances.group-chart",
      params: {
        type: "doughnut",
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: [
          {
            op: "avg",
            field: "bug",
            alias: "bug 数量"
          },
          {
            op: "avg",
            field: "issue",
            alias: "issue 数量"
          }
        ]
      }
    },
    {
      template: "cmdb-instances.group-chart",
      params: {
        type: "doughnut",
        objectId: "ISSUE_STAT",
        xAxisField: "issue",
        yAxisField: [
          {
            op: "count",
            field: "issue",
            alias: "issue 数量"
          }
        ]
      }
    },
    {
      template: "cmdb-instances.group-chart",
      params: {
        type: "line",
        objectId: "ISSUE_STAT",
        xAxisField: "time",
        yAxisField: [
          {
            op: "sum",
            field: "bug",
            alias: "bug 数量"
          },
          {
            op: "sum",
            field: "issue",
            alias: "issue 数量"
          }
        ],
        configProps: {
          xAxis: {
            type: "time"
          }
        }
      }
    },
    {
      template: "cmdb-instances.group-chart",
      params: {
        type: "bar",
        objectId: "ISSUE_STAT",
        xAxisField: "name",
        yAxisField: [
          {
            op: "avg",
            field: "bug",
            alias: "bug 数量"
          },
          {
            op: "avg",
            field: "issue",
            alias: "issue 数量"
          }
        ]
      }
    }
  ],
  doc: docMD
};
