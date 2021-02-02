import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-tables/searchable-table.md";

export const story: Story = {
  storyId: "general-tables.searchable-table",
  type: "template",
  author: "lynette",
  text: {
    en: "Searchable table",
    zh: "可搜索表格"
  },
  description: {
    en: "General searchable table",
    zh: "通用的带搜索框的表格"
  },
  icon: {
    lib: "fa",
    icon: "table"
  },
  conf: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "providers-of-notify.oplog-api-list-operation-log",
            bg: true,
            injectDeep: true,
            properties: {
              args: [
                {
                  page: "${query.page=1|number}",
                  pageSize: "${query.pageSize=10|number}",
                  system: "deploy",
                  query: "${query.q=}",
                  ctime_order: "${query.order=}"
                }
              ]
            }
          },
          {
            template: "general-tables.searchable-table",
            params: {
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
                    "checked.update": [
                      {
                        action: "console.log"
                      }
                    ]
                  }
                }
              ],
              columns: [
                {
                  title: "开始时间",
                  dataIndex: "ctime",
                  key: "ctime",
                  sorter: true,
                  useBrick: {
                    brick: "presentational-bricks.brick-humanize-time",
                    properties: {
                      secondsTimestamp: true,
                      formatter: "accurate"
                    },
                    transform: {
                      value: "@{cellData}"
                    }
                  }
                },
                {
                  title: "任务来源",
                  dataIndex: "topic",
                  key: "topic"
                },
                {
                  title: "部署应用",
                  dataIndex: "target_name",
                  key: "target_name"
                },
                {
                  title: "执行用户",
                  key: "operator",
                  dataIndex: "operator"
                },
                {
                  title: "任务状态",
                  key: "status",
                  dataIndex: "status"
                }
              ],
              fields: {
                ascend: "asc",
                descend: "desc",
                rowKey: "event_id"
              },
              tableProps: {
                configProps: {
                  rowSelection: true
                }
              },
              tableEvents: {
                "select.update": {
                  action: "console.log"
                }
              }
            },
            lifeCycle: {
              useResolves: [
                {
                  name: "dataSource",
                  provider: "providers-of-notify\\.oplog-api-list-operation-log"
                }
              ]
            }
          }
        ]
      }
    }
  },
  doc: docMD
};
