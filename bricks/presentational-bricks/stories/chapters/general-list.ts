import { Story } from "@next-core/brick-types";
import { generalListNormalSvg, generalListSvg } from "../images";
export const GeneralListStory: Story = {
  storyId: "presentational-bricks.general-list",
  category: "container-layout",
  type: "brick",
  author: "lynette",
  text: {
    en: "List Layout",
    zh: "列表布局",
  },
  description: {
    en: "general list",
    zh: "可配置具体每个item构件，常用于卡片列表",
  },
  icon: {
    imgSrc: generalListSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-list[normal]",
      title: {
        zh: "基础列表布局",
        en: "",
      },
      thumbnail: generalListNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.general-list",
          properties: {
            isCardList: true,
          },
          slots: {
            items: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "#ffffff",
                      height: "200px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      display: "grid",
                      alignItems: "center",
                      justifyItems: "center",
                    },
                    textContent: "这是自定义的卡片",
                  },
                },
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "#ffffff",
                      height: "200px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      display: "grid",
                      alignItems: "center",
                      justifyItems: "center",
                    },
                    textContent: "这是自定义的卡片",
                  },
                },
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "#ffffff",
                      height: "200px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      display: "grid",
                      alignItems: "center",
                      justifyItems: "center",
                    },
                    textContent: "这是自定义的卡片",
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
