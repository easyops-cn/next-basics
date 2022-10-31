import { Story } from "@next-core/brick-types";
import { foldBrickV2Svg } from "../images";
import { foldBrickV2BasicSvg } from "../images";
import { foldBrickV2DividerSvg } from "../images";
import { foldBrickV2PrimarySvg } from "../images";
export const foldBrickV2Story: Story = {
  storyId: "basic-bricks.fold-brick-v2",
  category: "container-display",
  type: "brick",
  author: "momo",
  text: {
    en: "More Information Folding Containers",
    zh: "更多信息折叠容器",
  },
  description: {
    en: "",
    zh: "折叠容器，只折叠单个内容，支持slot",
  },
  icon: {
    imgSrc: foldBrickV2Svg,
  },
  conf: [
    {
      bricks: [
        {
          description: {
            title: "基本",
            message: "",
          },
          brick: "basic-bricks.fold-brick-v2",
          properties: {
            foldName: "查看",
          },
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "123",
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.fold-brick-v2[basic]",
      title: {
        en: "Basic Fold Brick V2",
        zh: "基础折叠容器",
      },
      thumbnail: foldBrickV2BasicSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "type为primary",
            message: "",
          },
          brick: "basic-bricks.fold-brick-v2",
          properties: {
            foldName: "查看",
            type: "primary",
          },
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "123",
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.fold-brick-v2[primary]",
      title: {
        en: "Primary Fold Brick V2",
        zh: "Primary折叠容器",
      },
      thumbnail: foldBrickV2PrimarySvg,
    },
    {
      bricks: [
        {
          description: {
            title: "isShowFoldIcon为false",
            message: "",
          },
          brick: "basic-bricks.fold-brick-v2",
          properties: {
            foldName: "查看",
            isShowFoldIcon: false,
            type: "primary",
          },
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "123",
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.fold-brick-v2[no-icon]",
      title: {
        en: "Fold Brick V2 without icon",
        zh: "无展开图标的折叠容器",
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.fold-brick-v2",
          properties: {
            foldName: "查看",
            showDivider: true,
            dividerOrientation: "center",
            dividerDashed: false,
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "123",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.fold-brick-v2[divider]",
      title: {
        en: "Fold Brick V2 with Divider",
        zh: "带分割线的折叠容器",
      },
      thumbnail: foldBrickV2DividerSvg,
    },
  ],
  previewColumns: 2,
};
