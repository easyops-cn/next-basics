import { Story } from "@next-core/brick-types";
import { gridLayoutSvg } from "../images";
import { gridLayoutBasicSvg } from "../images";
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
    imgSrc: gridLayoutSvg,
  },
  conf: [
    {
      bricks: [
        {
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
      ],
      snippetId: "basic-bricks.grid-layout[basic]",
      title: {
        en: "Basic Grid Layout",
        zh: "基础网格布局",
      },
      thumbnail: gridLayoutBasicSvg,
    },
  ],
};
