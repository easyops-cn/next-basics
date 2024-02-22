import { Story } from "@next-core/brick-types";
import {
  collapsibleCardItemNormalSvg,
  collapsibleCardItemSvg,
} from "../images";
export const CollapsibleCardItemStory: Story = {
  storyId: "presentational-bricks.collapsible-card-item",
  category: "card-info",
  type: "brick",
  author: "lynette",
  text: {
    en: "Collapsible Card Item",
    zh: "可折叠卡片项",
  },
  description: {
    en: "This brick offers an interactive UI element that allows users to expand or collapse content areas by clicking on the card title. Its main features include customizable card titles, descriptions, icons, and styles, as well as support for hover effects and custom headers",
    zh: "该构件提供了一种交互式的界面元素，允许用户通过点击卡片标题来展开或折叠内容区域。其主要特性包括自定义卡片标题、描述信息、图标以及样式设置，同时支持hover效果和自定义头部",
  },
  icon: {
    imgSrc: collapsibleCardItemSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.collapsible-card-item[normal]",
      title: {
        zh: "基础可折叠卡片项",
        en: "",
      },
      thumbnail: collapsibleCardItemNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.collapsible-card-item",
          properties: {
            contentStyle: {
              paddingBottom: "16px",
            },
            cardTitle: "gitlab",
            icon: {
              lib: "antd",
              type: "gitlab",
            },
          },
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.brick-descriptions",
                  properties: {
                    showCard: false,
                    itemList: [
                      {
                        text: "https://git2.easyops.local",
                        label: "GitLab URL",
                      },
                      {
                        text: "zMKpMvRPhfWf2A-EX5oj",
                        label: "Access Key",
                      },
                    ],
                  },
                },
              ],
            },
            operate: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "设置",
                    buttonType: "primary",
                  },
                  events: {
                    "general.button.click": [
                      {
                        action: "console.log",
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
  ],
};
