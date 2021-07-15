/// <reference types="../../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";

import banner1_2Svg from "../thumbnails/banner-layout/grid-banner-left1-right2.svg";
import banner1_3Svg from "../thumbnails/banner-layout/grid-banner-left1-right3.svg";
import banner2_1Svg from "../thumbnails/banner-layout/grid-banner-left2-right1.svg";
import banner3_1Svg from "../thumbnails/banner-layout/grid-banner-left3-right1.svg";
import bannerOneColSvg from "../thumbnails/banner-layout/grid-banner-one-col.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.easy-view[banner-1:2]",
    layerType: "layout",
    category: "layout",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateAreas: [
            ["banner", "banner"],
            ["contentLeft", "contentRight"],
          ],
          gridTemplateRows: ["1fr", "1fr"],
          gridTemplateColumns: ["1fr", "2fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-1:3]",
    layerType: "layout",
    category: "layout",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateAreas: [
            ["banner", "banner"],
            ["contentLeft", "contentRight"],
          ],
          gridTemplateRows: ["1fr", "1fr"],
          gridTemplateColumns: ["1fr", "3fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-2:1]",
    layerType: "layout",
    category: "layout",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateAreas: [
            ["banner", "banner"],
            ["contentLeft", "contentRight"],
          ],
          gridTemplateRows: ["1fr", "1fr"],
          gridTemplateColumns: ["2fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-3:1]",
    layerType: "layout",
    category: "layout",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateAreas: [
            ["banner", "banner"],
            ["contentLeft", "contentRight"],
          ],
          gridTemplateRows: ["1fr", "1fr"],
          gridTemplateColumns: ["3fr", "1fr"],
        },
      },
    ],
  },
  {
    id: "basic-bricks.easy-view[banner-one-col]",
    layerType: "layout",
    category: "layout",
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
            padding: "var(--page-padding)",
            minHeight: "calc(100vh - var(--app-bar-height))",
            gap: "var(--card-content-gap)",
          },
          gridTemplateAreas: [["banner"], ["content"]],
          gridTemplateRows: ["1fr", "1fr"],
        },
      },
    ],
  },
];

export default snippets;
