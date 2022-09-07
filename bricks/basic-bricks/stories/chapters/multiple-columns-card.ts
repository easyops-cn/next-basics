import { Story } from "@next-core/brick-types";

export const multipleColumnsCardStory: Story = {
  storyId: "basic-bricks.multiple-columns-card",
  category: "container-layout",
  type: "brick",
  author: "jo",
  deprecated: true,
  text: {
    en: "Multi Column Layout Container with Border",
    zh: "带边框多列布局容器",
  },
  description: {
    en: "support multiple columns card",
    zh: "支持多列布局的容器,推荐使用 `basic-bricks.easy-view`",
  },
  icon: {
    lib: "fa",
    icon: "columns",
  },
  conf: [
    {
      brick: "basic-bricks.multiple-columns-card",
      properties: {
        gridColumns: ["200px", 1, 2],
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "主机",
                style: {
                  "line-height": "200px",
                  "text-align": "center",
                },
              },
            },
            {
              brick: "div",
              properties: {
                textContent: "应用",
                style: {
                  "line-height": "200px",
                  "text-align": "center",
                },
              },
            },
            {
              brick: "div",
              properties: {
                textContent: "集群",
                style: {
                  "line-height": "200px",
                  "text-align": "center",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.multiple-columns-card",
      properties: {
        gridColumns: ["300px", 1],
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "container-brick.tabs-container",
              properties: {
                className: "columns-card-no-padding",
                showCard: false,
                tabList: [
                  {
                    text: "实例",
                    key: "0",
                  },
                  {
                    text: "拓扑",
                    key: "1",
                  },
                  {
                    text: "对象",
                    key: "2",
                  },
                ],
                slotType: "bricks",
                activeTabIndex: 0,
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        textContent: "实例信息",
                      },
                    },
                    {
                      brick: "div",
                      properties: {
                        textContent: "拓扑图形",
                      },
                    },
                    {
                      brick: "div",
                      properties: {
                        textContent: "模型对象",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              properties: {
                textContent: "相关信息",
                style: {
                  "line-height": "200px",
                  "text-align": "center",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.multiple-columns-card",
      properties: {
        gridColumns: ["300px", 1],
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.sub-menu",
              properties: {
                showCard: false,
                dataSource: {
                  title: "示例",
                  menuItems: [
                    {
                      text: "菜单项1",
                      to: "/developers/brick-book/atom/multiple-columns-card/one",
                      exact: true,
                    },
                    {
                      text: "菜单项2",
                      to: "/developers/brick-book/atom/multiple-columns-card/two",
                      exact: true,
                    },
                    {
                      text: "菜单项3",
                      to: "/developers/brick-book/atom/multiple-columns-card/three",
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "routes",
                  routes: [
                    {
                      path: "/developers/brick-book/atom/multiple-columns-card/one",
                      bricks: [
                        {
                          brick: "div",
                          properties: {
                            textContent: "我是菜单项1的内容",
                          },
                        },
                      ],
                    },
                    {
                      path: "/developers/brick-book/atom/multiple-columns-card/two",
                      bricks: [
                        {
                          brick: "div",
                          properties: {
                            textContent: "我是菜单项2的内容",
                          },
                        },
                      ],
                    },
                    {
                      path: "/developers/brick-book/atom/multiple-columns-card/three",
                      bricks: [
                        {
                          brick: "div",
                          properties: {
                            textContent: "我是菜单项3的内容",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
