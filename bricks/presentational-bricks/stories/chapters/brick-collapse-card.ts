import { Story } from "@next-core/brick-types";
import { brickCollapseCardNormalSvg, brickCollapseCardSvg } from "../images";
export const BrickCollapseCardStory: Story = {
  storyId: "presentational-bricks.brick-collapse-card",
  category: "text",
  type: "brick",
  author: "lynette",
  text: {
    en: "Collapse card",
    zh: "详情折叠",
  },
  description: {
    en: "This component is a flexible UI element designed for displaying expandable and collapsible card information. It supports custom titles and descriptions, as well as defining text and icons for expanded and collapsed states. The card component can be easily integrated into various front-end applications, offering rich interaction effects through simple property configurations",
    zh: "详情折叠，主要用于展示可以展开和收起的卡片信息。它支持自定义标题和描述，以及定义展开和收起状态时的文本和图标。该构件可以轻松集成到各种前端应用中，通过简单的属性配置，即可实现丰富的交互效果",
  },
  icon: {
    imgSrc: brickCollapseCardSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.brick-collapse-card",
      properties: {
        title: "名称",
        expandInactiveText: "工具详情",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "Content",
              },
            },
          ],
        },
      },
    },
    {
      snippetId: "presentational-bricks.brick-collapse-card[normal]",
      title: {
        zh: "详情折叠",
        en: "Collapse card",
      },
      thumbnail: brickCollapseCardNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-collapse-card",
          properties: {
            expandInactiveText: "展开",
            expandInactiveIcon: "down",
            expandActiveText: "收起",
            expandActiveIcon: "up",
            isActive: true,
            titleWithIconAndDesc: true,
            cardTitle: "容器管理-闲置资源采集",
            descriptionList: [
              {
                label: "作者",
                text: "defalutUser",
              },
              {
                label: "分类",
                text: "容器管理",
              },
            ],
            titleIcon: {
              lib: "easyops",
              category: "agile",
              icon: "easy-now",
            },
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "presentational-bricks.brick-descriptions",
                  properties: {
                    showCard: false,
                    itemList: [
                      {
                        label: "版本信息",
                        text: "1.0.10",
                      },
                      {
                        label: "版本作者",
                        text: "defaultUser",
                      },
                      {
                        label: "脚本信息",
                        text: "python",
                      },
                    ],
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
        {
          brick: "presentational-bricks.brick-collapse-card",
          properties: {
            expandInactiveText: "展开",
            expandInactiveIcon: "down",
            expandActiveText: "收起",
            expandActiveIcon: "up",
            isActive: true,
            titleWithIconAndDesc: "compact",
            cardTitle: "容器管理-闲置资源采集",
            descriptionList: [
              {
                label: "作者",
                text: "defalutUser",
              },
              {
                label: "分类",
                text: "容器管理",
              },
            ],
            titleIcon: {
              lib: "easyops",
              category: "agile",
              icon: "easy-now",
            },
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "presentational-bricks.brick-descriptions",
                  properties: {
                    showCard: false,
                    itemList: [
                      {
                        label: "版本信息",
                        text: "1.0.10",
                      },
                      {
                        label: "版本作者",
                        text: "defaultUser",
                      },
                      {
                        label: "脚本信息",
                        text: "python",
                      },
                    ],
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
    },
  ],
};
