import { Story } from "@next-core/brick-types";

export const easyViewStory: Story = {
  storyId: "basic-bricks.easy-view",
  category: "layout",
  type: "brick",
  author: "steve",
  text: {
    en: "Easy View",
    zh: "简易网格布局",
  },
  description: {
    en: "A grid layout container, which can generate slots by grid-area automatically",
    zh: "基于网格的简易布局容器，可以根据 grid-area 名称自动生成对应的插槽",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: {
    brick: "basic-bricks.easy-view",
    properties: {
      gridTemplateAreas: [
        ["header", "header"],
        ["sidebar", "content"],
        ["footer", "footer"],
      ],
      gridTemplateColumns: "200px 1fr",
      // gridTemplateRows: "60px 1fr 60px",
      containerStyle: {
        gap: "var(--page-card-gap)",
      },
    },
    slots: {
      header: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "Header",
              style: {
                background: "green",
              },
            },
          },
        ],
      },
      sidebar: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "Sidebar",
              style: {
                background: "orange",
              },
            },
          },
        ],
      },
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.easy-view",
            properties: {
              gridAreas: {
                a: [1, 1, 2, 13],
                b: [2, 1, 3, 5],
                c: [2, 5, 3, 13],
              },
              gridTemplateColumns: "repeat(12, 1fr)",
              containerStyle: {
                gap: "var(--card-content-gap)",
              },
            },
            slots: {
              a: {
                type: "bricks",
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      textContent: "A",
                      style: {
                        background: "aquamarine",
                      },
                    },
                  },
                ],
              },
              b: {
                type: "bricks",
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      textContent: "B",
                      style: {
                        background: "aquamarine",
                      },
                    },
                  },
                ],
              },
              c: {
                type: "bricks",
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      textContent: "C",
                      style: {
                        background: "aquamarine",
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      footer: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "Footer",
              style: {
                background: "gray",
              },
            },
          },
        ],
      },
    },
  },
};
