/// <reference types="../../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";

import classicOneColSvg from "../thumbnails/classic-layout/grid-classic-one-col.svg";
import classicTwoColSvg from "../thumbnails/classic-layout/grid-classic-two-col.svg";
import classicThreeColSvg from "../thumbnails/classic-layout/grid-classic-three-col.svg";
import classicFourColSvg from "../thumbnails/classic-layout/grid-classic-four-col.svg";
import classic2x3Svg from "../thumbnails/classic-layout/grid-classic-2x3.svg";
import classicTopBottom1x3Svg from "../thumbnails/classic-layout/grid-classic-top-bottom-1x3.svg";
import classicHeaderContentSvg from "../thumbnails/classic-layout/grid-classic-header-content.svg";
import classicHeaderContentFooterSvg from "../thumbnails/classic-layout/grid-classic-header-content-footer.svg";
import classicHeaderContentLeft1Right2Svg from "../thumbnails/classic-layout/grid-classic-header-content-left1-right2.svg";
import classicHeaderContentLeft2Right1Svg from "../thumbnails/classic-layout/grid-classic-header-content-left2-right1.svg";
import classicLeft1Right2Svg from "../thumbnails/classic-layout/grid-classic-left1-right2.svg";
import classicLeft2Right1Svg from "../thumbnails/classic-layout/grid-classic-left2-right1.svg";
import classicLeft1Right3Svg from "../thumbnails/classic-layout/grid-classic-left1-right3.svg";
import classicLeft3Right1Svg from "../thumbnails/classic-layout/grid-classic-left3-right1.svg";
import classicLeft1Right2HeaderContentSvg from "../thumbnails/classic-layout/grid-classic-left1-right2-header-content.svg";
import classicLeft2Right1HeaderContentSvg from "../thumbnails/classic-layout/grid-classic-left2-right1-header-content.svg";
import classicTitlebarToolbarContentSvg from "../thumbnails/classic-layout/grid-classic-titlebar-toolbar-content.svg";

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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr"],
          gridTemplateRows: ["1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-top-bottom-1x3]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "上下均分，底部平分为3 网格布局",
      en: "2*3 grid layout",
    },
    thumbnail: classicTopBottom1x3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["top", "top", "top"],
            ["bottomLeft", "bottomCenter", "bottomRight"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateColumns: ["1fr", "1fr", "1fr"],
          gridTemplateRows: ["1fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-header-content]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "标题-内容网格布局",
      en: "Header-content grid layout",
    },
    thumbnail: classicHeaderContentSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["header"], ["content"]],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-header-content-footer]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "标题-内容-页脚网格布局",
      en: "Header-content-footer layout",
    },
    thumbnail: classicHeaderContentFooterSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["header"], ["content"], ["footer"]],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr", "auto"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-header-content-left1-right2]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "标题-内容-1:2 网格布局",
      en: "Header-Content-1:2 grid layout",
    },
    thumbnail: classicHeaderContentLeft1Right2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["header", "header"],
            ["contentLeft", "contentRight"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr"],
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-header-content-left2-right1]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "标题-内容-2:1 网格布局",
      en: "Header-content-2:1 grid layout",
    },
    thumbnail: classicHeaderContentLeft2Right1Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["header", "header"],
            ["contentLeft", "contentRight"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr"],
          gridTemplateColumns: ["2fr", "1fr"],
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateColumns: ["1fr", "3fr"],
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateColumns: ["3fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left1-right2-header-content]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "1:2-标题-内容 网格布局",
      en: "1:2-header-content grid layout",
    },
    thumbnail: classicLeft1Right2HeaderContentSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["left", "rightHeader"],
            ["left", "rightContent"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr"],
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic-left2-right1-header-content]",
    layerType: "layout",
    category: "classic",
    text: {
      zh: "2:1-标题-内容 网格布局",
      en: "2:1-header-content grid layout",
    },
    thumbnail: classicLeft2Right1HeaderContentSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["leftHeader", "right"],
            ["leftContent", "right"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateRows: ["auto", "1fr"],
          gridTemplateColumns: ["2fr", "1fr"],
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
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
];

export default snippets;
