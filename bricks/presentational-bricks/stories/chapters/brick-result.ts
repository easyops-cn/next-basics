import { Story } from "@next-core/brick-types";

export const BrickResultStory: Story = {
  storyId: "presentational-bricks.brick-result",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "ice",
  text: {
    en: "Result",
    zh: "结果提示",
  },
  description: {
    en: "result page with status, title, subTitle and icon",
    zh: "结果页面，可配置其状态，标题，次要标题和自定义图标",
  },
  icon: {
    lib: "fa",
    icon: "bell",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-result",
      properties: {
        status: "success",
        customTitle: "tool executed successfully",
      },
    },
    {
      brick: "presentational-bricks.brick-result",
      properties: {
        status: "info",
        customTitle: "Today is Tuesday",
        subTitle: "2019/10/29 21:35",
      },
    },
    {
      brick: "presentational-bricks.brick-result",
      properties: {
        status: "warning",
        customTitle: "Rainy day",
        subTitle: "Tomorrow will be fine",
        icon: "question",
      },
    },
    {
      brick: "presentational-bricks.brick-result",
      properties: {
        status: "404",
        customTitle: "HTTP 404",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  textAlign: "center",
                },
                textContent: "This is a slot",
              },
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.brick-result",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  textAlign: "center",
                },
              },
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "请前往 ",
                      },
                    },
                    {
                      brick: "a",
                      properties: {
                        textContent: "首页",
                        href: "/next",
                      },
                    },
                    {
                      brick: "span",
                      properties: {
                        textContent: " 进行创建",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      properties: {
        status: "empty",
        noSubTitle: true,
      },
    },
    {
      brick: "presentational-bricks.brick-result",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  textAlign: "center",
                },
                textContent: "搜索为空",
              },
            },
          ],
        },
      },
      properties: {
        status: "search-empty",
        noSubTitle: true,
      },
    },
    {
      description: {
        title: "自定义插画",
        message:
          "status属性值设置成customize时为自定义插画模式，背景插画可通过`name`和`category`更改为插画库的图片，通过imageStyle修改插画样式,此时icon属性不生效",
      },
      brick: "presentational-bricks.brick-result",
      properties: {
        noSubTitle: true,
        status: "illustrations",
        illustrationsConfig: {
          name: "search-empty",
          category: "default",
          imageStyle: {
            width: "250px",
            height: "250px",
          },
        },
      },
      slots: {
        content: {
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  textAlign: "center",
                },
                textContent: "搜索为空",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
  previewColumns: 2,
};
