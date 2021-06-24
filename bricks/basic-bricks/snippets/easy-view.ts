/// <reference types="../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";
import easyViewBasicSvg from "./thumbnails/easy-view.basic.svg";
import easyViewClassicSvg from "./thumbnails/easy-view.classic.svg";
import easyViewRightAlignedMenuSvg from "./thumbnails/easy-view.right-aligned-menu.svg";
import easyView1x2Svg from "./thumbnails/easy-view.1x2.svg";
import easyView2x3Svg from "./thumbnails/easy-view.2x3.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.easy-view[basic]",
    category: "layout",
    text: {
      zh: "基本页面布局",
      en: "Basic page layout",
    },
    thumbnail: easyViewBasicSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["header"], ["content"], ["footer"]],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--page-card-gap)",
          },
          gridTemplateRows: ["auto", "1fr", "auto"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[classic]",
    category: "layout",
    text: {
      zh: "经典页面布局",
      en: "Classic page layout",
    },
    thumbnail: easyViewClassicSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["header", "header"],
            ["sidebar", "content"],
            ["footer", "footer"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--page-card-gap)",
          },
          gridTemplateRows: ["auto", "1fr", "auto"],
          gridTemplateColumns: ["auto", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[right-aligned-menu]",
    category: "layout",
    text: {
      zh: "右侧菜单页面布局",
      en: "Right aligned menu page layout",
    },
    thumbnail: easyViewRightAlignedMenuSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["header", "header"],
            ["content", "sidebar"],
            ["footer", "footer"],
          ],
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--page-card-gap)",
          },
          gridTemplateRows: ["auto", "1fr", "auto"],
          gridTemplateColumns: ["1fr", "auto"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[1x2]",
    category: "layout",
    text: {
      zh: "1x2 网格布局",
      en: "1x2 grid layout",
    },
    thumbnail: easyView1x2Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [["left", "right"]],
          containerStyle: {
            gap: "var(--card-content-gap)",
          },
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[2x3]",
    category: "layout",
    text: {
      zh: "2x3 网格布局",
      en: "2x3 grid layout",
    },
    thumbnail: easyView2x3Svg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          gridTemplateAreas: [
            ["topLeft", "topCenter", "topRight"],
            ["bottomLeft", "bottomCenter", "bottomRight"],
          ],
          containerStyle: {
            gap: "var(--card-content-gap)",
          },
        },
      },
    ],
  },
];

export default snippets;
