import { Story } from "@next-core/brick-types";
import { generalButtonSvg } from "../images";
import { generalButtonPrimarySvg } from "../images";
import { generalButtonBasicSvg } from "../images";
import { generalButtonDangerSvg } from "../images";
import { generalButtonIconSvg } from "../images";
import { generalButtonLinkSvg } from "../images";
export const generalTextStory: Story = {
  storyId: "basic-bricks.general-text",
  category: "interact-basic",
  type: "brick",
  author: "derrickma",
  text: {
    en: "General text",
    zh: "通用文本",
  },
  description: {
    en: "General text",
    zh: "通用文本",
  },
  icon: {
    imgSrc: generalButtonSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-text",
          properties: {
            text: "容器卡片标题",
            fontSize: "var(--card-title-font-size)",
            color: "var(--color-header-text)",
            fontWeight: "var(--font-weight-500)",
            customStyle: {
              display: "block",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-button[containerCardTitle]",
      title: {
        en: "Container Card Title",
        zh: "容器卡片标题",
      },
      thumbnail: generalButtonBasicSvg,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-text",
          properties: {
            text: "正文",
            fontSize: "var(--normal-font-size)",
            color: "var(--color-normal-text)",
            fontWeight: "var(--font-weight-400)",
          },
        },
      ],
      snippetId: "basic-bricks.general-button[main]",
      title: {
        en: "main",
        zh: "正文",
      },
      thumbnail: generalButtonBasicSvg,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-text",
          properties: {
            text: "辅助文字",
            fontSize: "var(--normal-font-size)",
            color: "var(--color-secondary-text)",
            fontWeight: "var(--font-weight-400)",
          },
        },
      ],
      snippetId: "basic-bricks.general-button[auxiliaryText]",
      title: {
        en: "Auxiliary Text",
        zh: "辅助文字	",
      },
      thumbnail: generalButtonBasicSvg,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-text",
          properties: {
            text: "banner标题",
            fontSize: "var(--special-title-font-size-small)",
            color: "var(--color-header-text)",
            fontWeight: "var(--font-weight-500)",
            customStyle: {
              display: "block",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-button[bannerTitle]",
      title: {
        en: "Banner Title",
        zh: "banner标题",
      },
      thumbnail: generalButtonBasicSvg,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-text",
          properties: {
            text: "分类标题",
            fontSize: "var(--sub-title-font-size-small)",
            color: "var(--color-secondary-text)",
            fontWeight: "var(--font-weight-400)",
            customStyle: {
              display: "block",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-button[bannerTitle]",
      title: {
        en: "Category Title",
        zh: "分类标题",
      },
      thumbnail: generalButtonBasicSvg,
    },
  ],
  previewColumns: 2,
};
