import { Story } from "@next-core/brick-types";
import { mainSvg } from "../images";
import { containerCardTitleSvg } from "../images";
import { auxiliaryTextSvg } from "../images";
import { bannerTitleSvg } from "../images";
import { categoryTitleSvg } from "../images";
import { textSvg } from "../images";
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
    imgSrc: textSvg,
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
      thumbnail: containerCardTitleSvg,
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
      thumbnail: mainSvg,
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
      thumbnail: auxiliaryTextSvg,
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
      thumbnail: bannerTitleSvg,
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
      snippetId: "basic-bricks.general-button[categoryTitle]",
      title: {
        en: "Category Title",
        zh: "分类标题",
      },
      thumbnail: categoryTitleSvg,
    },
  ],
  previewColumns: 2,
};
