import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/highlight-table.md";

export const story: Story = {
  storyId: "cmdb-instances.highlight-table",
  type: "template",
  author: "jo",
  text: {
    en: "Highlight Table",
    zh: "具有颜色高亮的表格",
  },
  description: {
    en: "highlight related table cell base on instance list",
    zh: "根据实例数据的相关条件高亮相关单元的内容",
  },
  icon: {
    lib: "fa",
    icon: "table",
  },
  conf: [
    {
      template: "cmdb-instances.highlight-table",
      params: {
        objectId: "ISSUE_STAT",
        columns: [
          {
            title: "数量",
            dataIndex: "bug",
            rules: [
              {
                condition: {
                  bug: {
                    $gte: 8,
                  },
                },
                style: {
                  color: "red",
                  backgroundColor: "#fff",
                },
              },
              {
                condition: {
                  bug: {
                    $lte: 7,
                    $gt: 4,
                  },
                },
                style: {
                  color: "orange",
                  backgroundColor: "#fff",
                },
              },
              {
                condition: {
                  bug: {
                    $lte: 4,
                    $gt: -1,
                  },
                },
                style: {
                  color: "green",
                  backgroundColor: "#fff",
                },
              },
            ],
          },
          {
            title: "年龄",
            dataIndex: "age",
          },
          {
            title: "处理人",
            dataIndex: "name",
            target: "_blank",
            detailUrlTemplate: "developer/#{name}",
          },
        ],
      },
    },
    {
      template: "cmdb-instances.highlight-table",
      params: {
        objectId: "ISSUE_STAT",
        columns: [
          {
            title: "数量",
            dataIndex: "bug",
            rules: [
              {
                condition: {
                  bug: {
                    $gte: 8,
                  },
                },
                style: {
                  backgroundColor: "red",
                  color: "#fff",
                },
              },
              {
                condition: {
                  bug: {
                    $lte: 7,
                    $gt: 4,
                  },
                },
                style: {
                  backgroundColor: "orange",
                  color: "#fff",
                },
              },
              {
                condition: {
                  bug: {
                    $lte: 4,
                    $gt: -1,
                  },
                },
                style: {
                  backgroundColor: "green",
                  color: "#fff",
                },
              },
            ],
          },
          {
            title: "年龄",
            dataIndex: "age",
          },
          {
            title: "处理人",
            dataIndex: "name",
            detailUrlTemplate: "developer/#{name}",
          },
        ],
      },
    },
  ],
  doc: docMD,
};
