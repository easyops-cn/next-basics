import { Story } from "@next-core/brick-types";

export const BrickValueMappingStory: Story = {
  storyId: "presentational-bricks.brick-value-mapping",
  category: "data-view-value-mapping",
  type: "brick",
  author: "ice",
  text: {
    en: "Basic Value Translate",
    zh: "基本数值映射",
  },
  icon: {
    lib: "fa",
    icon: "book",
  },
  description: {
    en: "translate basic-type data to another text, according to what your mapping is",
    zh: "适用于将基本类型的数值转换成有意义的文本进行展示",
  },
  conf: [
    {
      description: {
        title: "映射为多彩标签",
        message: "同时可以设置是否触发点击事件",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-value-mapping",
              properties: {
                showTagCircle: true,
                mapping: {
                  failed: {
                    color: "red",
                    text: "失败",
                  },
                  success: {
                    color: "green",
                    text: "正常",
                  },
                  warning: {
                    color: "orange",
                    text: "异常",
                  },
                },
                value: "success",
              },
            },
            {
              brick: "presentational-bricks.brick-value-mapping",
              events: {
                "brick-value-mapping.click": [
                  {
                    action: "console.log",
                    args: ["<% EVENT.detail %>"],
                  },
                ],
              },
              properties: {
                style: {
                  marginTop: "10px",
                },
                triggerClickEvent: true,
                showTagCircle: false,
                mapping: {
                  warning: {
                    color: "red-inverse",
                    text: "紧急",
                  },
                  safe: {
                    color: "green-inverse",
                    text: "正常",
                  },
                },
                value: "warning",
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "映射为多彩标签",
        message:
          "通常使用圆点+非填充色标签表示不同的状态。不使用圆点的标签不代表状态，仅用于区分。填充色标签具有更高等级的信息。",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        configProps: {
          pagination: false,
        },
        columns: [
          {
            dataIndex: "host",
            title: "主机",
          },
          {
            dataIndex: "id",
            title: "编号",
          },
          {
            dataIndex: "user",
            title: "所属用户",
          },
          {
            dataIndex: "status",
            title: "状态",
            useBrick: {
              brick: "presentational-bricks.brick-value-mapping",
              properties: {
                showTagCircle: true,
                mapping: {
                  failed: {
                    color: "red",
                    text: "失败",
                  },
                  success: {
                    color: "green",
                    text: "正常",
                  },
                  warning: {
                    color: "orange",
                    text: "异常",
                  },
                  other: {
                    color: "gray",
                    text: "暂无数据",
                  },
                },
              },
              transform: {
                value: "<% DATA.cellData %>",
              },
            },
          },
          {
            dataIndex: "warning",
            title: "警告等级",
            useBrick: {
              brick: "presentational-bricks.brick-value-mapping",
              events: {
                "brick-value-mapping.click": [
                  {
                    action: "console.log",
                    args: ["<% EVENT.detail %>", "<% DATA.rowData %>"],
                  },
                ],
              },
              properties: {
                triggerClickEvent: true,
                showTagCircle: false,
                mapping: {
                  warning: {
                    color: "red-inverse",
                    text: "紧急",
                  },
                  safe: {
                    color: "green-inverse",
                    text: "正常",
                  },
                },
              },
              transform: {
                value: "<% DATA.cellData %>",
              },
            },
          },
        ],
        dataSource: {
          list: [
            {
              host: "主机1",
              id: "#7220",
              user: "easyops",
              status: "success",
              warning: "safe",
            },
            {
              host: "主机2",
              id: "#7221",
              user: "easyops",
              status: "failed",
              warning: "warning",
            },
            {
              host: "主机3",
              id: "#7222",
              user: "easyops",
              status: "warning",
              warning: "warning",
            },
            {
              host: "主机4",
              id: "#7223",
              user: "easyops",
              status: "other",
              warning: "safe",
            },
          ],
        },
        rowKey: "id",
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        value: "text",
        mapping: {
          text: {},
        },
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        value: 1,
        mapping: {
          0: { text: "error" },
        },
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        value: 1,
        mapping: {
          1: {
            text: "mapping-text",
            color: "green",
            icon: {
              lib: "fa",
              icon: "link",
            },
          },
        },
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        value: 2,
        mapping: {
          2: {
            iconSize: 36,
            color: "red",
            icon: {
              lib: "fa",
              icon: "bell",
            },
          },
        },
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        value: "hello",
        mapping: {
          ".*": {
            color: "orange",
            text: "remapping",
            icon: {
              lib: "fa",
              icon: "star",
            },
          },
          2: {
            iconSize: 36,
            color: "red",
            icon: {
              lib: "fa",
              icon: "bell",
            },
          },
        },
      },
    },
    {
      brick: "presentational-bricks.brick-value-mapping",
      properties: {
        style: { display: "inline-block" },
        value: "hello",
        link: {
          to: "/developers/brick-book",
        },
        mapping: {
          ".*": {
            color: "orange",
            text: "remapping",
            icon: {
              lib: "fa",
              icon: "star",
            },
          },
          2: {
            iconSize: 36,
            color: "red",
            icon: {
              lib: "fa",
              icon: "bell",
            },
          },
        },
      },
      events: {
        "brick-value-mapping.click": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 1,
};
