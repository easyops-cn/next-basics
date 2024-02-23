import { Story } from "@next-core/brick-types";
import {
  brickResult404WithSlotSvg,
  brickResultInfoSvg,
  brickResultSvg,
  brickResultWarnSvg,
} from "../images";
import { brickResultSuccessSvg } from "../images";
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
    en: "offers a suite of feedback and tooltip components,including result status display, primary and secondary titles, custom icons, and illustration configurations",
    zh: "提供了一系列的反馈和提示的构件，包括结果状态展示、主次标题、自定义图标及插画配置等。通过灵活配置`status`属性，可以轻松实现不同状态下的视觉展示，如成功、信息、警告以及404等状态",
  },
  icon: {
    imgSrc: brickResultSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-result[success]",
      title: {
        zh: "成功结果",
        en: "",
      },
      thumbnail: brickResultSuccessSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-result",
          properties: {
            status: "success",
            customTitle: "tool executed successfully",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-result[info]",
      title: {
        zh: "普通结果",
        en: "",
      },
      thumbnail: brickResultInfoSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-result",
          properties: {
            status: "info",
            customTitle: "Today is Tuesday",
            subTitle: "2019/10/29 21:35",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-result[warn]",
      title: {
        zh: "警告结果",
        en: "",
      },
      thumbnail: brickResultWarnSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-result",
          properties: {
            status: "warning",
            customTitle: "Rainy day",
            subTitle: "Tomorrow will be fine",
            icon: "question",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-result[404-with-slot]",
      title: {
        zh: "404(with-slot)",
        en: "",
      },
      thumbnail: brickResult404WithSlotSvg,
      bricks: [
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
      ],
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
