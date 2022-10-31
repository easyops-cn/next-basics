import { Story } from "@next-core/brick-types";
import { brickQuickEntriesSvg } from "../images";
import { brickQuickEntriesNormalSvg } from "../images";
export const BrickQuickEntriesStory: Story = {
  storyId: "presentational-bricks.brick-quick-entries",
  category: "card-info",
  type: "brick",
  author: "cyril",
  text: {
    en: "brick quick entries",
    zh: "快捷入口",
  },
  description: {
    en: "show multiple quick entries",
    zh: "展示多个快捷入口",
  },
  icon: {
    imgSrc: brickQuickEntriesSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-quick-entries[normal]",
      title: {
        zh: "快速入口",
        en: "",
      },
      thumbnail: brickQuickEntriesNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-quick-entries",
          properties: {
            row: 2,
            column: 2,
            links: [
              {
                icon: {
                  lib: "antd",
                  type: "number",
                },
                text: "单值构件",
                target: "/developers/brick-book/atom/single-value",
              },
              {
                icon: {
                  lib: "antd",
                  type: "line-chart",
                },
                text: "趋势图构件",
                target: "/developers/brick-book/atom/trend-chart",
              },
              {
                icon: {
                  lib: "antd",
                  type: "pie-chart",
                },
                text: "饼图构件",
                target: "/developers/brick-book/atom/pie-chart",
              },
              {
                icon: {
                  lib: "antd",
                  type: "table",
                },
                text: "多实例指标表",
                target:
                  "developers/brick-book/business/instances-metrics-table",
              },
            ],
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.brick-quick-entries",
      properties: {
        row: 1,
        column: 2,
        useBrick: [
          {
            brick: "general-charts.statistic-item",
            properties: {
              value: 25,
              colorMap: [
                {
                  progress: 60,
                  color: "blue",
                },
                {
                  progress: 80,
                  color: "orange",
                },
                {
                  progress: 100,
                  color: "green",
                },
              ],
              title: "事件评分",
              description: "权重：80%",
            },
          },
          {
            brick: "general-charts.statistic-item",
            properties: {
              value: 75,
              colorMap: [
                {
                  progress: 60,
                  color: "blue",
                },
                {
                  progress: 80,
                  color: "orange",
                },
                {
                  progress: 100,
                  color: "green",
                },
              ],
              title: "关联资源评分",
              description: "权重：20%",
            },
          },
        ],
      },
    },
    {
      snippetId: "presentational-bricks.brick-quick-entries[with-chart]",
      message: {
        zh: "结合图表使用,达到多图表效果",
        en: "",
      },
      title: {
        zh: "快速入口(图表)",
        en: "",
      },
      bricks: [
        {
          description: {
            title: "图表",
            message: "结合图表使用,达到多图表效果",
          },
          brick: "presentational-bricks.brick-quick-entries",
          properties: {
            row: 1,
            column: 2,
            useBrick: [
              {
                brick: "chart-v2.line-chart",
                events: {
                  "chart-v2.click": {
                    action: "console.log",
                  },
                },
                properties: {
                  style: {
                    padding: "0 20px",
                  },
                  height: 250,
                  xField: "month",
                  yField: "temperature",
                  groupField: "city",
                  showPoint: true,
                  data: [
                    {
                      month: "Jan",
                      city: "Tokyo",
                      temperature: 7,
                    },
                    {
                      month: "Jan",
                      city: "London",
                      temperature: 3.9,
                    },
                    {
                      month: "Feb",
                      city: "Tokyo",
                      temperature: 6.9,
                    },
                    {
                      month: "Feb",
                      city: "London",
                      temperature: 4.2,
                    },
                    {
                      month: "Mar",
                      city: "Tokyo",
                      temperature: 9.5,
                    },
                    {
                      month: "Mar",
                      city: "London",
                      temperature: 5.7,
                    },
                    {
                      month: "Apr",
                      city: "Tokyo",
                      temperature: 14.5,
                    },
                    {
                      month: "Apr",
                      city: "London",
                      temperature: 8.5,
                    },
                    {
                      month: "May",
                      city: "Tokyo",
                      temperature: 18.4,
                    },
                    {
                      month: "May",
                      city: "London",
                      temperature: 11.9,
                    },
                    {
                      month: "Jun",
                      city: "Tokyo",
                      temperature: 21.5,
                    },
                    {
                      month: "Jun",
                      city: "London",
                      temperature: 15.2,
                    },
                    {
                      month: "Jul",
                      city: "Tokyo",
                      temperature: 25.2,
                    },
                    {
                      month: "Jul",
                      city: "London",
                      temperature: 17,
                    },
                    {
                      month: "Aug",
                      city: "Tokyo",
                      temperature: 26.5,
                    },
                    {
                      month: "Aug",
                      city: "London",
                      temperature: 16.6,
                    },
                    {
                      month: "Sep",
                      city: "Tokyo",
                      temperature: 23.3,
                    },
                    {
                      month: "Sep",
                      city: "London",
                      temperature: 14.2,
                    },
                    {
                      month: "Oct",
                      city: "Tokyo",
                      temperature: 18.3,
                    },
                    {
                      month: "Oct",
                      city: "London",
                      temperature: 10.3,
                    },
                    {
                      month: "Nov",
                      city: "Tokyo",
                      temperature: 13.9,
                    },
                    {
                      month: "Nov",
                      city: "London",
                      temperature: 6.6,
                    },
                    {
                      month: "Dec",
                      city: "Tokyo",
                      temperature: 9.6,
                    },
                    {
                      month: "Dec",
                      city: "London",
                      temperature: 4.8,
                    },
                  ],
                },
              },
              {
                brick: "chart-v2.line-chart",
                events: {
                  "chart-v2.click": {
                    action: "console.log",
                  },
                },
                properties: {
                  style: {
                    padding: "0 20px",
                  },
                  height: 250,
                  xField: "month",
                  yField: "temperature",
                  groupField: "city",
                  showPoint: true,
                  data: [
                    {
                      month: "Jan",
                      city: "Tokyo",
                      temperature: 7,
                    },
                    {
                      month: "Jan",
                      city: "London",
                      temperature: 3.9,
                    },
                    {
                      month: "Feb",
                      city: "Tokyo",
                      temperature: 6.9,
                    },
                    {
                      month: "Feb",
                      city: "London",
                      temperature: 4.2,
                    },
                    {
                      month: "Mar",
                      city: "Tokyo",
                      temperature: 9.5,
                    },
                    {
                      month: "Mar",
                      city: "London",
                      temperature: 5.7,
                    },
                    {
                      month: "Apr",
                      city: "Tokyo",
                      temperature: 14.5,
                    },
                    {
                      month: "Apr",
                      city: "London",
                      temperature: 8.5,
                    },
                    {
                      month: "May",
                      city: "Tokyo",
                      temperature: 18.4,
                    },
                    {
                      month: "May",
                      city: "London",
                      temperature: 11.9,
                    },
                    {
                      month: "Jun",
                      city: "Tokyo",
                      temperature: 21.5,
                    },
                    {
                      month: "Jun",
                      city: "London",
                      temperature: 15.2,
                    },
                    {
                      month: "Jul",
                      city: "Tokyo",
                      temperature: 25.2,
                    },
                    {
                      month: "Jul",
                      city: "London",
                      temperature: 17,
                    },
                    {
                      month: "Aug",
                      city: "Tokyo",
                      temperature: 26.5,
                    },
                    {
                      month: "Aug",
                      city: "London",
                      temperature: 16.6,
                    },
                    {
                      month: "Sep",
                      city: "Tokyo",
                      temperature: 23.3,
                    },
                    {
                      month: "Sep",
                      city: "London",
                      temperature: 14.2,
                    },
                    {
                      month: "Oct",
                      city: "Tokyo",
                      temperature: 18.3,
                    },
                    {
                      month: "Oct",
                      city: "London",
                      temperature: 10.3,
                    },
                    {
                      month: "Nov",
                      city: "Tokyo",
                      temperature: 13.9,
                    },
                    {
                      month: "Nov",
                      city: "London",
                      temperature: 6.6,
                    },
                    {
                      month: "Dec",
                      city: "Tokyo",
                      temperature: 9.6,
                    },
                    {
                      month: "Dec",
                      city: "London",
                      temperature: 4.8,
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    {
      description: {
        title: "data 传递给子构件数据",
        message:
          "列如 agent-status 需要value 属性，可以通过 data + transform 传递",
      },
      brick: "presentational-bricks.brick-quick-entries",
      properties: {
        row: 1,
        column: 1,
        data: {
          value: "正常",
        },
        useBrick: [
          {
            brick: "presentational-bricks.agent-status",
            // properties: {  使用 data 传递
            //   value: '正常'
            // }
            transform: {
              value: "@{value}",
            },
          },
        ],
      },
    },
  ],
  previewColumns: 1,
};
