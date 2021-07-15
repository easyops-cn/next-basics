/// <reference types="../../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";
import withSubMenuSvg from "../thumbnails/menu-layout/grid-with-sub-menu.svg";
import withoutSubMenuSvg from "../thumbnails/menu-layout/grid-without-sub-menu.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.easy-view[with-sub-menu]",
    layerType: "layout",
    category: "layout",
    text: {
      zh: "带二级菜单布局",
      en: "Layout with sub menu",
    },
    thumbnail: withSubMenuSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridAreas: {
            header: [1, 1, 2, 3],
            subMenu: [2, 1, 3, 2],
            content: [2, 2, 3, 3],
          },
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
          gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[without-sub-menu]",
    layerType: "layout",
    category: "layout",
    text: {
      zh: "不带二级菜单布局",
      en: "Layout without sub menu",
    },
    thumbnail: withoutSubMenuSvg,
    bricks: [
      {
        brick: "basic-bricks.easy-view",
        properties: {
          containerStyle: {
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridAreas: {
            header: [1, 1, 2, 3],
            content: [2, 1, 3, 3],
          },
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        },
      },
    ],
  },
];

export default snippets;
