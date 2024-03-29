import { Story } from "@next-core/brick-types";
import {
  dynamicGridContainerNormalSvg,
  dynamicGridContainerSvg,
  dynamicGridContainerWithInfoSvg,
} from "../images";
export const DynamicGridContainerStory: Story = {
  storyId: "presentational-bricks.dynamic-grid-container",
  category: "container-layout",
  type: "brick",
  author: "astrid",
  text: {
    en: "dynamic grid container",
    zh: "动态网格布局",
  },
  description: {
    en: "a versatile grid layout container. it supports custom styles. The core feature lies in its ability to dynamically render child bricks based on the provided `data` array. Each child brick can correspond to different data items",
    zh: "一个功能强大的grid布局容器，该构件支持自定义样式，其核心特性在于能根据传入的`data`数组动态渲染子构件`useBrick`，每个子构件可对应不同的数据项",
  },
  icon: {
    imgSrc: dynamicGridContainerSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.dynamic-grid-container[normal]",
      title: {
        zh: "基础动态网格布局",
        en: "",
      },
      thumbnail: dynamicGridContainerNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.dynamic-grid-container",
          properties: {
            containerStyle: {
              gridTemplateColumns: "repeat(14, 1fr)",
              gridAutoRows: "100px",
            },
            data: ["传递第一份的数据", "传递的第二份数据"],
            useBrick: [
              {
                brick: "div",
                properties: {
                  style: {
                    gridColumn: "span 4",
                    gridRow: 1,
                    background: "orange",
                  },
                },
                transform: {
                  textContent: "@{}",
                },
              },
              {
                brick: "div",
                properties: {
                  style: {
                    gridColumn: "span 4",
                    gridRow: 1,
                    background: "red",
                  },
                },
                transform: {
                  textContent: "@{}",
                },
              },
            ],
          },
          description: {
            title: "传入data",
            message: "data与子构件一一对应",
          },
          events: {
            "dynamic-grid-container.rendered": {
              action: "console.log",
            },
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.dynamic-grid-container[with-info]",
      title: {
        zh: "动态网格布局(负责场景)",
        en: "",
      },
      thumbnail: dynamicGridContainerWithInfoSvg,
      bricks: [
        {
          brick: "presentational-bricks.dynamic-grid-container",
          properties: {
            containerStyle: {
              gridTemplateColumns: "repeat(12, 1fr)",
            },
            useBrick: [
              {
                brick: "basic-bricks.general-card",
                properties: {
                  style: {
                    gridColumn: "span 8",
                    gridRow: 1,
                  },
                },
                slots: {
                  content: {
                    type: "bricks",
                    bricks: [
                      {
                        brick: "dashboard.panel-header",
                        properties: {
                          title: "xxx",
                        },
                        events: {
                          drag: [
                            {
                              action: "console.log",
                            },
                          ],
                        },
                      },
                      {
                        brick: "presentational-bricks.brick-table",
                        properties: {
                          showCard: false,
                          style: {
                            height: "300px",
                            overflow: "auto",
                          },
                          columns: [
                            {
                              dataIndex: "hostname",
                              key: "hostname",
                              title: "hostname",
                            },
                            {
                              dataIndex: "ip",
                              key: "ip",
                              title: "ip",
                            },
                            {
                              dataIndex: "instanceId",
                              key: "instanceId",
                              title: "instanceId",
                            },
                          ],
                          rowKey: "instanceId",
                        },
                        lifeCycle: {
                          useResolves: [
                            {
                              useProvider:
                                "providers-of-cmdb.instance-api-post-search",
                              args: [
                                "HOST",
                                {
                                  fields: {
                                    hostname: 1,
                                    ip: 1,
                                  },
                                  page_size: 10,
                                },
                              ],
                              transform: {
                                dataSource: "@{}",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
              {
                brick: "basic-bricks.general-card",
                properties: {
                  style: {
                    gridColumn: "span 4",
                    gridRow: 1,
                  },
                },
                slots: {
                  content: {
                    type: "bricks",
                    bricks: [
                      {
                        brick: "graph.header-with-dropdown",
                        properties: {
                          draggable: true,
                          header: "Project Menuafaffafafafaaaaaaaaaaa",
                          item: {
                            name: "Project Menu",
                          },
                          contentItemActions: {
                            useBrick: [
                              {
                                brick: "presentational-bricks.general-label",
                                properties: {
                                  text: "上移",
                                },
                              },
                              {
                                brick: "presentational-bricks.general-label",
                                properties: {
                                  text: "下移",
                                },
                              },
                            ],
                          },
                        },
                        events: {
                          dragstart: [
                            {
                              action: "console.log",
                            },
                          ],
                        },
                      },
                      {
                        brick: "chart-v2.bar-chart",
                        properties: {
                          height: 300,
                          xField: "月份",
                          yField: "月均降雨量",
                          groupField: "name",
                          axis: {
                            yAxis: {
                              unit: "mm",
                            },
                          },
                          data: [
                            {
                              name: "London",
                              月份: "Jan.",
                              月均降雨量: 18.9,
                            },
                            {
                              name: "London",
                              月份: "Feb.",
                              月均降雨量: 28.8,
                            },
                            {
                              name: "London",
                              月份: "Mar.",
                              月均降雨量: 39.3,
                            },
                            {
                              name: "London",
                              月份: "Apr.",
                              月均降雨量: 81.4,
                            },
                            {
                              name: "London",
                              月份: "May",
                              月均降雨量: 47,
                            },
                            {
                              name: "London",
                              月份: "Jun.",
                              月均降雨量: 20.3,
                            },
                            {
                              name: "London",
                              月份: "Jul.",
                              月均降雨量: 24,
                            },
                            {
                              name: "London",
                              月份: "Aug.",
                              月均降雨量: 35.6,
                            },
                            {
                              name: "Berlin",
                              月份: "Jan.",
                              月均降雨量: 12.4,
                            },
                            {
                              name: "Berlin",
                              月份: "Feb.",
                              月均降雨量: 23.2,
                            },
                            {
                              name: "Berlin",
                              月份: "Mar.",
                              月均降雨量: 34.5,
                            },
                            {
                              name: "Berlin",
                              月份: "Apr.",
                              月均降雨量: 99.7,
                            },
                            {
                              name: "Berlin",
                              月份: "May",
                              月均降雨量: 52.6,
                            },
                            {
                              name: "Berlin",
                              月份: "Jun.",
                              月均降雨量: 35.5,
                            },
                            {
                              name: "Berlin",
                              月份: "Jul.",
                              月均降雨量: 37.4,
                            },
                            {
                              name: "Berlin",
                              月份: "Aug.",
                              月均降雨量: 42.4,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          description: {
            title: "基本",
            message: "",
          },
        },
      ],
    },
  ],
  previewColumns: 1,
};
