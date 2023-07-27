import { Story } from "../../../interfaces";
import docMD from "../../../docs/excel-utils/export-data.md";

export const story: Story = {
  storyId: "excel-utils.export-data",
  type: "brick",
  author: "jo",
  text: {
    en: "Export Excel",
    zh: "导出 excel 文件"
  },
  description: {
    en: "Export The Data As An Excel File based on brick-table",
    zh: "把 brick-table 数据导出为 Excel 文件"
  },
  icon: {
    lib: "fa",
    icon: "pencil-alt"
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "excel-utils.export-data",
              bg: true
            },
            {
              brick: "basic-bricks.micro-view",
              slots: {
                toolbar: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonName: "导出"
                      },
                      events: {
                        "general.button.click": {
                          target: "excel-utils\\.export-data",
                          method: "exportToExcel",
                          args: [
                            {
                              target: "#export-table"
                            },
                            "导出示例"
                          ]
                        }
                      }
                    }
                  ]
                },
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-table",
                      properties: {
                        id: "export-table",
                        fields: {
                          rowKey: "id"
                        },
                        page: "${query.page=1|number}",
                        pageSize: "${query.pageSize=10|number}",
                        rowDisabledConfig: {
                          field: "name",
                          value: "John Brown",
                          operator: "$eq"
                        },
                        configProps: {
                          rowSelection: true
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
                          },
                          {
                            title: "Tags",
                            key: "tags",
                            dataIndex: "tags",
                            useBrick: {
                              brick: "presentational-bricks.brick-tag",
                              transform: {
                                tagList: "@{cellData}"
                              },
                              properties: {
                                showCard: false,
                                configProps: {
                                  color: "#108ee9"
                                }
                              }
                            }
                          }
                        ],
                        dataSource: {
                          list: [
                            {
                              id: "1",
                              name: "John Brown",
                              age: 32,
                              address: "New York No. 1 Lake Park",
                              tags: ["nice", "good"]
                            },
                            {
                              id: "2",
                              name: "Jim Green",
                              age: 42,
                              address: "London No. 1 Lake Park",
                              tags: ["loser", "bad"]
                            },
                            {
                              id: "3",
                              name: "Joe Black",
                              age: 32,
                              address: "Sidney No. 1 Lake Park",
                              tags: ["teacher", "lucky", "lay"]
                            }
                          ],
                          page: 1,
                          pageSize: 10,
                          total: 3
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ],
  doc: docMD
};
