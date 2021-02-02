import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-charts/statistic-card.md";

export const story: Story = {
  storyId: "general-charts.statistic-card",
  type: "brick",
  author: "cyril",
  text: {
    en: "statistic card",
    zh: "统计卡片",
  },
  description: {
    en: "show statistic value",
    zh: "展示统计值，可结合统计入口构件配置多卡片",
  },
  icon: {
    lib: "fa",
    icon: "dolly",
  },
  conf: [
    {
      description: {
        title: "基本用法1",
      },
      brick: "general-charts.statistic-card",
      properties: {
        value: 3,
        format: {
          unit: "次/秒",
        },
        valueStyle: {
          color: "rgba(7255, 162, 53, 1)",
        },
        title: "QPS",
        icon: {
          lib: "fa",
          icon: "file-alt",
        },
        url: "#project-index",
        tip: "这是一条提示",
      },
    },
    {
      description: {
        title: "基本用法2",
      },
      brick: "general-charts.statistic-card",
      properties: {
        value: 1234,
        format: {
          type: "none",
          unit: "次/秒",
          precision: 0,
        },
        valueStyle: {
          color: "rgba(74, 172, 162, 1)",
        },
        title: "请求数",
        icon: {
          lib: "fa",
          icon: "file-alt",
        },
        url: "#project-index",
        tip: "这是一条提示",
      },
    },
    {
      description: {
        title: "基本用法3",
      },
      brick: "general-charts.statistic-card",
      properties: {
        value: 59,
        format: {
          type: "none",
          unit: "分",
          precision: 0,
        },
        title: "得分",
        icon: {
          lib: "antd",
          icon: "rise",
        },
        rules: [
          {
            condition: {
              value: {
                $lt: 60,
              },
            },
            color: "rgba(252, 80, 67, 1)",
          },
          {
            condition: {
              value: {
                $gte: 60,
                $lt: 80,
              },
            },
            color: "rgba(255, 162, 53, 1)",
          },
          {
            condition: {
              value: {
                $gte: 80,
                $lt: 90,
              },
            },
            color: "rgba(47, 194, 91, 1)",
          },
          {
            condition: {
              value: {
                $gte: 90,
                $lte: 100,
              },
            },
            color: "rgba(22, 123, 224, 1)",
          },
        ],
      },
    },
    {
      description: {
        title: "基本多卡片1",
        message:
          "通用型，multiConfig长度不为0时即为多卡片模式,各卡片属性既可使用multiConfig的私有配置，也可以使用INPUT的公共配置",
      },
      brick: "general-charts.statistic-card",
      properties: {
        format: {
          precision: 0,
        },
        valueStyle: {
          fontSize: 30,
        },
        url: "space",
        title: "今日构建",
        iconPosition: "left",
        multiData: [3, 5, 7, 9, 10],
        multiConfig: [
          {
            icon: {
              lib: "easyops",
              category: "colored-common",
              icon: "expansion",
              color: "#167be0",
              background: "#C7E3FF",
            },
            url: "list",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "easyops",
              category: "colored-common",
              icon: "expansion",
              color: "#167be0",
              background: "#C7E3FF",
            },
            url: "#",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "easyops",
              category: "colored-common",
              icon: "expansion",
              color: "#167be0",
              background: "#C7E3FF",
            },
            url: "#",
            sideLineColor: "blue",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "easyops",
              category: "colored-common",
              icon: "expansion",
              color: "#167be0",
              background: "#C7E3FF",
            },
            sideLineColor: "blue",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "easyops",
              category: "colored-common",
              icon: "expansion",
              color: "#167be0",
              background: "#C7E3FF",
            },
            sideLineColor: "blue",
            iconPosition: "left",
          },
        ],
      },
    },
    {
      description: {
        title: "基本多卡片1(颜色状态)",
        message:
          "有状态要求的场景下，不同的颜色代表不同的状态，通过icon属性下的size,color,background设置icon颜色和大小",
      },
      brick: "general-charts.statistic-card",
      properties: {
        format: {
          precision: 0,
        },
        valueStyle: {
          fontSize: 30,
        },
        url: "space",
        title: "今日构建",
        iconPosition: "left",
        multiData: [3, 5, 7, 9, 10],
        multiConfig: [
          {
            icon: {
              lib: "fa",
              icon: "hourglass-start",
              background: "#FEF7E1",
              color: "#FDC008",
            },
            url: "list",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "fa",
              icon: "hourglass-start",
              background: "#E8F9ED",
              color: "#45D26F",
            },
            url: "#",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "fa",
              icon: "hourglass-start",
              background: "#E2F7F7",
              color: "#14C2C2",
            },
            url: "#",
            sideLineColor: "blue",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "fa",
              icon: "hourglass-start",
              background: "#E0EEFC",
              color: "#0071EB",
            },
            sideLineColor: "blue",
            iconPosition: "left",
          },
          {
            icon: {
              lib: "fa",
              icon: "hourglass-start",
              background: "#FFECEB",
              color: "#FF6059",
            },
            sideLineColor: "blue",
            iconPosition: "left",
          },
        ],
      },
    },
    {
      description: {
        title: "基本多卡片2",
        message: "通用型，卡片不支持跳转",
      },
      brick: "general-charts.statistic-card",
      properties: {
        format: {
          precision: 0,
        },
        valueStyle: {
          fontSize: 30,
        },
        title: "今日构建",
        iconPosition: "left",
        multiData: [3, 5, 7, 9, 10],
        multiConfig: [
          {
            iconPosition: "left",
          },
          {
            iconPosition: "left",
          },
          {
            iconPosition: "left",
          },
          {
            iconPosition: "left",
          },
          {
            iconPosition: "left",
          },
        ],
      },
    },
    {
      description: {
        title: "特殊多卡片：含侧边栏",
        message:
          "含侧边栏型，需将卡片属性mode设置为sideLine，不支持跳转，通过sideLineColor可设置侧边栏颜色",
      },
      brick: "general-charts.statistic-card",
      properties: {
        format: {
          precision: 0,
        },
        valueStyle: {
          fontSize: 30,
        },
        title: "今日构建",
        mode: "sideLine",
        multiData: [3, 5, 7, 9, 10],
        multiConfig: [
          {
            url: "#",
            sideLineColor: "#D8D8D8",
          },
          {
            url: "#",
            sideLineColor: "#FDC008",
          },
          {
            url: "#",
            sideLineColor: "#14C2C2",
          },
          {
            url: "#",
            sideLineColor: "#0071EB",
          },
          {
            url: "#",
            sideLineColor: "#FF6059",
          },
        ],
      },
    },
  ],
  doc: docMD,
};
