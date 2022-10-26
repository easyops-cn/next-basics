import { Story } from "@next-core/brick-types";
import { easyViewSvg } from "../images";

export const easyViewStory: Story = {
  storyId: "basic-bricks.easy-view",
  category: "container-layout",
  type: "brick",
  author: "steve",
  text: {
    en: "Grid Layout Container - Supports Grid Area",
    zh: "网格布局容器-支持grid-area",
  },
  description: {
    en: "A grid layout container, which can generate slots by grid-area automatically",
    zh: "基于网格的简易布局容器，可以根据 grid-area 名称自动生成对应的插槽",
  },
  icon: {
    imgSrc: easyViewSvg,
  },
  conf: [
    {
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
    {
      bricks: [
        {
          brick: "basic-bricks.easy-view",
          properties: {
            containerStyle: {
              gap: "var(--card-content-gap)",
            },
            gridAreas: {
              a: [1, 1, 2, 13],
              b: [2, 1, 3, 5],
              c: [2, 5, 3, 13],
            },
            gridTemplateColumns: "repeat(12, 1fr)",
          },
          slots: {
            a: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "aquamarine",
                    },
                    textContent: "A",
                  },
                },
              ],
              type: "bricks",
            },
            b: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "aquamarine",
                    },
                    textContent: "B",
                  },
                },
              ],
              type: "bricks",
            },
            c: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "aquamarine",
                    },
                    textContent: "C",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.easy-view[grid-areas]",
      title: {
        en: "Easy View Dividing By Grid Areas",
        zh: "由gridAreas划分区域的easy-view",
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.easy-view",
          properties: {
            containerStyle: {
              gap: "var(--page-card-gap)",
            },
            gridTemplateAreas: [
              ["header", "header"],
              ["sidebar", "content"],
              ["footer", "footer"],
            ],
            gridTemplateColumns: "200px 1fr",
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "aquamarine",
                    },
                    textContent: "Content",
                  },
                },
              ],
              type: "bricks",
            },
            footer: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "gray",
                    },
                    textContent: "Footer",
                  },
                },
              ],
              type: "bricks",
            },
            header: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "green",
                    },
                    textContent: "Header",
                  },
                },
              ],
              type: "bricks",
            },
            sidebar: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    style: {
                      background: "orange",
                    },
                    textContent: "Sidebar",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.easy-view[grid-template-areas]",
      title: {
        en: "Easy View Dividing By Grid Template Areas",
        zh: "由grid-template-areas划分区域的easy-view",
      },
    },
  ],
};
