import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-tables/front-search-table.md";

export const story: Story = {
  storyId: "general-tables.front-search-table",
  type: "template",
  author: "lynette",
  text: {
    en: "Front end search table",
    zh: "前端搜索表格"
  },
  description: {
    en: "Front end search table",
    zh: "通用的前端搜索表格"
  },
  icon: {
    lib: "fa",
    icon: "table"
  },
  conf: [
    {
      template: "general-tables.front-search-table",
      params: {
        tableProps: {
          id: "table1",
          rowKey: "id"
        },
        toolbarBricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "设置显示列"
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          }
        ],
        afterSearchBricks: [
          {
            brick: "presentational-bricks.datetime-selector",
            properties: {
              from: "now/d"
            }
          }
        ],
        belowSearchBricks: [
          {
            brick: "presentational-bricks.brick-tag",
            properties: {
              componentType: "CheckableTag",
              tagList: [
                { key: "dev", label: "开发" },
                { key: "test", label: "测试" },
                { key: "prerelease", label: "预发布" },
                { key: "prod", label: "生产" }
              ],
              multipleCheck: false,
              configProps: {
                color: "#108ee9"
              },
              default: "dev",
              showCard: false,
              tagStyle: {
                marginBottom: 0
              }
            },
            events: {
              "checked.update": {
                action: "console.log"
              }
            }
          }
        ],
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name"
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age"
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address"
          }
        ],
        frontSearchFilterKeys: ["name", "age", "address"],
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park"
            },
            {
              id: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 1 Lake Park"
            },
            {
              id: "3",
              name: "Joe Black",
              age: 32,
              address: "Sidney No. 1 Lake Park"
            }
          ],
          page: 1,
          pageSize: 10,
          total: 3
        }
      }
    },
    {
      template: "general-tables.front-search-table",
      params: {
        tableProps: {
          id: "table2",
          rowKey: "id"
        },
        cardProps: {
          configProps: {
            title: "标题栏"
          }
        },
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name"
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age"
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address"
          }
        ],
        shouldUpdateUrlParams: false,
        frontSearchFilterKeys: ["name", "age", "address"],
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park"
            },
            {
              id: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 1 Lake Park"
            }
          ],
          page: 1,
          pageSize: 10,
          total: 2
        }
      }
    }
  ],
  doc: docMD
};
