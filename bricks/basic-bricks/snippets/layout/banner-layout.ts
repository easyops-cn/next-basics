/// <reference types="../../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";

import banner1_2Svg from "../thumbnails/banner-layout/grid-banner-left1-right2.svg";
import banner1_3Svg from "../thumbnails/banner-layout/grid-banner-left1-right3.svg";
import banner1_3SecondSvg from "../thumbnails/banner-layout/grid-banner-left1-right3-2.svg";
import banner2_1Svg from "../thumbnails/banner-layout/grid-banner-left2-right1.svg";
import banner3_1Svg from "../thumbnails/banner-layout/grid-banner-left3-right1.svg";
import banner3_1SecondSvg from "../thumbnails/banner-layout/grid-banner-left3-right1-2.svg";
import bannerOneColSvg from "../thumbnails/banner-layout/grid-banner-one-col.svg";

import bannerRightFirstSvg from "../thumbnails/banner-layout/grid-banner-right-1.svg";
import bannerRightSecondSvg from "../thumbnails/banner-layout/grid-banner-right-2.svg";
import bannerRightThirdSvg from "../thumbnails/banner-layout/grid-banner-right-3.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.easy-view[banner-1:2]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "1:2 通栏布局",
      en: "1:2 banner layout",
    },
    thumbnail: banner1_2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [["contentLeft", "contentRight"]],
                  gridTemplateColumns: ["1fr", "2fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-1:3]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "1:3 通栏布局",
      en: "1:3 banner layout",
    },
    thumbnail: banner1_3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [["contentLeft", "contentRight"]],
                  gridTemplateColumns: ["1fr", "3fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-1:3-2]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "1:3-2 通栏布局",
      en: "1:3-2 banner layout",
    },
    thumbnail: banner1_3SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [
                    ["contentLeft", "contentRightTop"],
                    ["contentLeft", "contentRightBottom"],
                  ],
                  gridTemplateColumns: ["1fr", "3fr"],
                  gridTemplateRows: ["1fr", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-2:1]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "2:1 通栏布局",
      en: "2:1 banner layout",
    },
    thumbnail: banner2_1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [["contentLeft", "contentRight"]],
                  gridTemplateColumns: ["2fr", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-3:1]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "3:1 通栏布局",
      en: "3:1 banner layout",
    },
    thumbnail: banner3_1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [["contentLeft", "contentRight"]],
                  gridTemplateColumns: ["3fr", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-3:1-2]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "3:1-2 通栏布局",
      en: "3:1-2 banner layout",
    },
    thumbnail: banner3_1SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - 260px - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [
                    ["contentLeftTop", "contentRight"],
                    ["contentLeftBottom", "contentRight"],
                  ],
                  gridTemplateColumns: ["3fr", "1fr"],
                  gridTemplateRows: ["1fr", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-one-col]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "单列通栏布局",
      en: "One-column banner layout",
    },
    thumbnail: bannerOneColSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["260px", "1fr"],
          styleByAreas: {
            content: {
              margin: "16px",
            },
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-right-1]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "右通栏布局1",
      en: "Right banner layout 1",
    },
    thumbnail: bannerRightFirstSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["content", "banner"]],
          gridTemplateColumns: ["3fr", "1fr"],
          styleByAreas: {
            content: {
              margin: "16px",
            },
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-right-2]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "右通栏布局2",
      en: "Right banner layout 2",
    },
    thumbnail: bannerRightSecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["content", "banner"]],
          gridTemplateColumns: ["3fr", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [["contentTop"], ["contentBottom"]],
                  gridTemplateRows: ["162px", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-right-3]",
    layerType: "layout",
    category: "banner",
    text: {
      zh: "右通栏布局3",
      en: "Right banner layout 3",
    },
    thumbnail: bannerRightThirdSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
          gridTemplateAreas: [["content", "banner"]],
          gridTemplateColumns: ["3fr", "1fr"],
        },
        slots: {
          content: {
            bricks: [
              {
                brick: "basic-bricks.easy-view",
                properties: {
                  containerStyle: {
                    padding: "16px",
                    minHeight: "calc(100vh - var(--app-bar-height))",
                    gap: "16px",
                  },
                  gridTemplateAreas: [
                    ["contentTop"],
                    ["contentCenter"],
                    ["contentBottom"],
                  ],
                  gridTemplateRows: ["162px", "1fr", "1fr"],
                },
              },
            ],
            type: "bricks",
          },
        },
      },
    ],
  },
];

export default snippets;
