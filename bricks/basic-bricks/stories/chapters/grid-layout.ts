import { Story } from "@next-core/brick-types";

export const gridLayoutStory: Story = {
  storyId: "basic-bricks.grid-layout",
  category: "container-layout",
  type: "brick",
  author: "steve",
  text: {
    en: "Grid Layout",
    zh: "网格布局",
  },
  description: {
    en: "Provide responsive layout by grid",
    zh: "提供多行多列的响应式网格布局",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: {
    brick: "basic-bricks.grid-layout",
    properties: {
      columns: 2,
      responsive: {
        medium: {
          columns: 1,
        },
      },
    },
    slots: {
      items: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.grid-layout",
            properties: {
              columns: 2,
            },
            slots: {
              items: {
                type: "bricks",
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        gridColumn: "span 2",
                        height: "200px",
                        backgroundColor: "orange",
                      },
                    },
                  },
                  {
                    brick: "div",
                    properties: {
                      style: {
                        height: "100px",
                        backgroundColor: "aquamarine ",
                      },
                    },
                  },
                  {
                    brick: "div",
                    properties: {
                      style: {
                        height: "100px",
                        backgroundColor: "aquamarine ",
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            brick: "basic-bricks.grid-layout",
            slots: {
              items: {
                type: "bricks",
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        height: "100px",
                        backgroundColor: "green",
                      },
                    },
                  },
                  {
                    brick: "div",
                    properties: {
                      style: {
                        height: "300px",
                        backgroundColor: "green",
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
};
