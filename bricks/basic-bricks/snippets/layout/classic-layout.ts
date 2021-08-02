/// <reference types="../../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";

import classicOneColSvg from "../thumbnails/classic-layout/grid-classic-one-col.svg";
import classicTwoColSvg from "../thumbnails/classic-layout/grid-classic-two-col.svg";
import classicThreeColSvg from "../thumbnails/classic-layout/grid-classic-three-col.svg";
import classicFourColSvg from "../thumbnails/classic-layout/grid-classic-four-col.svg";

import classic2x3Svg from "../thumbnails/classic-layout/grid-classic-2x3.svg";
import classic2x3SecondSvg from "../thumbnails/classic-layout/grid-classic-2x3-2.svg";

import classicTopBottomSvg from "../thumbnails/classic-layout/grid-classic-top-bottom.svg";
import classicTopCenterBottomSvg from "../thumbnails/classic-layout/grid-classic-top-center-bottom.svg";
import classicTopBottomLeft1Right2Svg from "../thumbnails/classic-layout/grid-classic-top-bottom-left1-right2.svg";
import classicTopBottomLeft2Right1Svg from "../thumbnails/classic-layout/grid-classic-top-bottom-left2-right1.svg";
import classicTopBottomLeft1Right3Svg from "../thumbnails/classic-layout/grid-classic-top-bottom-left1-right3.svg";
import classicTopBottomLeft3Right1Svg from "../thumbnails/classic-layout/grid-classic-top-bottom-left3-right1.svg";

import classicLeft1Right2Svg from "../thumbnails/classic-layout/grid-classic-left1-right2.svg";
import classicLeft1Right2SecondSvg from "../thumbnails/classic-layout/grid-classic-left1-right2-2.svg";
import classicLeft2Right1Svg from "../thumbnails/classic-layout/grid-classic-left2-right1.svg";
import classicLeft2Right1SecondSvg from "../thumbnails/classic-layout/grid-classic-left2-right1-2.svg";
import classicLeft1Right3Svg from "../thumbnails/classic-layout/grid-classic-left1-right3.svg";
import classicLeft1Right3SecondSvg from "../thumbnails/classic-layout/grid-classic-left1-right3-2.svg";
import classicLeft1Right3ThirdSvg from "../thumbnails/classic-layout/grid-classic-left1-right3-3.svg";
import classicLeft3Right1Svg from "../thumbnails/classic-layout/grid-classic-left3-right1.svg";
import classicLeft3Right1SecondSvg from "../thumbnails/classic-layout/grid-classic-left3-right1-2.svg";
import classicLeft3Right1ThirdSvg from "../thumbnails/classic-layout/grid-classic-left3-right1-3.svg";

import classicTitlebarToolbarContentSvg from "../thumbnails/classic-layout/grid-classic-titlebar-toolbar-content.svg";

import classicWithCatelog1Svg from "../thumbnails/classic-layout/grid-classic-with-catelog-1.svg";
import classicWithCatelog2Svg from "../thumbnails/classic-layout/grid-classic-with-catelog-2.svg";
import classicWithCatelog3Svg from "../thumbnails/classic-layout/grid-classic-with-catelog-3.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.easy-view[classic-one-col]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "单列经典布局",
      en: "One-col classic layout",
    },
    thumbnail: classicOneColSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["one"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-two-col]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "两列经典布局",
      en: "Two-col classic layout",
    },
    thumbnail: classicTwoColSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["one", "two"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-three-col]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "三列经典布局",
      en: "Three-col classic layout",
    },
    thumbnail: classicThreeColSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["one", "two", "three"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-four-col]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "四列经典布局",
      en: "Four-col classic layout",
    },
    thumbnail: classicFourColSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["one", "two", "three", "four"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-2x3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "2*3网格布局",
      en: "2*3 grid layout",
    },
    thumbnail: classic2x3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["topLeft", "topCenter", "topRight"],
            ["bottomLeft", "bottomCenter", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr"],
          gridTemplateRows: ["1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-2x3-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "2*3-2 网格布局",
      en: "2*3-2 grid layout",
    },
    thumbnail: classic2x3SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top", "top"],
            ["bottomLeft", "bottomCenter", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr"],
          gridTemplateRows: ["1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下网格布局",
      en: "Top-bottom grid layout",
    },
    thumbnail: classicTopBottomSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["top"], ["bottom"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-center-bottom]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上中下网格布局",
      en: "Top-center-bottom grid layout",
    },
    thumbnail: classicTopCenterBottomSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["top"], ["center"], ["bottom"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom-1:2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下-下1:2网格布局",
      en: "Top-bottom-1:2 grid layout",
    },
    thumbnail: classicTopBottomLeft1Right2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top"],
            ["bottomLeft", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom-2:1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下-下2:1 网格布局",
      en: "Top-bottom-2:1 grid layout",
    },
    thumbnail: classicTopBottomLeft2Right1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top"],
            ["bottomLeft", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["2fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom-1:3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下-下1:3 网格布局",
      en: "Top-bottom-1:3 grid layout",
    },
    thumbnail: classicTopBottomLeft1Right3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top"],
            ["bottomLeft", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["1fr", "3fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom-3:1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下-下3:1 网格布局",
      en: "Top-bottom-3:1 grid layout",
    },
    thumbnail: classicTopBottomLeft3Right1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top"],
            ["bottomLeft", "bottomRight"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["3fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:2 网格布局",
      en: "1:2 grid layout",
    },
    thumbnail: classicLeft1Right2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["left", "right"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right2-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:2-2 网格布局",
      en: "1:2-2 grid layout",
    },
    thumbnail: classicLeft1Right2SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["left", "rightHeader"],
            ["left", "rightContent"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left2-right1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "2:1 网格布局",
      en: "2:1 grid layout",
    },
    thumbnail: classicLeft2Right1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["left", "right"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["2fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left2-right1-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "2:1-2 网格布局",
      en: "2:1-2 grid layout",
    },
    thumbnail: classicLeft2Right1SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["leftHeader", "right"],
            ["leftContent", "right"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["2fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:3 网格布局",
      en: "1:3 grid layout",
    },
    thumbnail: classicLeft1Right3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["left", "right"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "3fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right3-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:3-2 网格布局",
      en: "1:3-2 grid layout",
    },
    thumbnail: classicLeft1Right3SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["left", "rightTop"],
            ["left", "rightBottom"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "3fr"],
          gridTemplateRows: ["162px", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right3-3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:3-3 网格布局",
      en: "1:3-3 grid layout",
    },
    thumbnail: classicLeft1Right3ThirdSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["left", "rightTop"],
            ["left", "rightCenter"],
            ["left", "rightBottom"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["1fr", "3fr"],
          gridTemplateRows: ["162px", "1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left3-right1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "3:1 网格布局",
      en: "3:1 grid layout",
    },
    thumbnail: classicLeft3Right1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["left", "right"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["3fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left3-right1-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "3:1-2 网格布局",
      en: "3:1-2 grid layout",
    },
    thumbnail: classicLeft3Right1SecondSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["leftTop", "right"],
            ["leftBottom", "right"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["3fr", "1fr"],
          gridTemplateRows: ["162px", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left3-right1-3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "3:1-3 网格布局",
      en: "3:1-3 grid layout",
    },
    thumbnail: classicLeft3Right1ThirdSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["leftTop", "right"],
            ["leftCenter", "right"],
            ["leftBottom", "right"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["3fr", "1fr"],
          gridTemplateRows: ["162px", "1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-titlebar-toolbar-content]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "标题栏-工具栏-内容 网格布局",
      en: "Titlebar-toolbar-content grid layout",
    },
    thumbnail: classicTitlebarToolbarContentSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["titleBar", "toolBar"],
            ["content", "content"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["auto", "1fr"],
          gridTemplateColumns: ["1fr", "1fr"],
          styleByAreas: {
            toolBar: {
              display: "flex",
              justifyContent: "flex-end",
            },
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-with-catelog-1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "带目录网格布局1",
      en: "With-catelog grid layout 1",
    },
    thumbnail: classicWithCatelog1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["catelog", "content"]],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateColumns: ["220px", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-with-catelog-2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "带目录网格布局2",
      en: "With-catelog grid layout 2",
    },
    thumbnail: classicWithCatelog2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["catelog", "contentTop"],
            ["catelog", "contentBottom"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr"],
          gridTemplateColumns: ["220px", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-with-catelog-3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "带目录网格布局3",
      en: "With-catelog grid layout 3",
    },
    thumbnail: classicWithCatelog3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["catelog", "contentTop"],
            ["catelog", "contentCenter"],
            ["catelog", "contentBottom"],
          ],
          containerStyle: {
            padding: "16px",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "16px",
          },
          gridTemplateRows: ["162px", "1fr", "1fr"],
          gridTemplateColumns: ["220px", "1fr"],
        },
      },
    ],
  },
];

export default snippets;
