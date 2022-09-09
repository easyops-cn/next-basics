import { Story } from "@next-core/brick-types";

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
    lib: "fa",
    icon: "list",
  },
  conf: [
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
};
