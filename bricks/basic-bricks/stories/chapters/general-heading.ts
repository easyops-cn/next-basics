import { Story } from "@next-core/brick-types";
import { generalHeadingH1 } from "../images";
import { generalHeadingH2 } from "../images";
import { generalHeadingH3 } from "../images";
import { generalHeadingH4 } from "../images";
import { generalHeadingH5 } from "../images";
import { generalHeadingH6 } from "../images";
import { generalHeading } from "../images";
export const generalHeadingStory: Story = {
  storyId: "basic-bricks.general-heading",
  category: "interact-basic",
  type: "brick",
  author: "derrickma",
  text: {
    en: "General heading",
    zh: "通用标题",
  },
  description: {
    en: "General heading",
    zh: "通用标题",
  },
  icon: {
    imgSrc: generalHeading,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "一级标题",
            type: "h1",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h1]",
      title: {
        en: "h1 heading",
        zh: "一级标题",
      },
      thumbnail: generalHeadingH1,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "二级标题",
            type: "h2",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h2]",
      title: {
        en: "h2 heading",
        zh: "二级标题",
      },
      thumbnail: generalHeadingH2,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "三级标题",
            type: "h3",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h3]",
      title: {
        en: "h3 heading",
        zh: "三级标题",
      },
      thumbnail: generalHeadingH3,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "四级标题",
            type: "h4",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h4]",
      title: {
        en: "h4 heading",
        zh: "四级标题",
      },
      thumbnail: generalHeadingH4,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "五级标题",
            type: "h5",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h5]",
      title: {
        en: "h5 heading",
        zh: "五级标题",
      },
      thumbnail: generalHeadingH5,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "六级标题",
            type: "h6",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h6]",
      title: {
        en: "h6 heading",
        zh: "六级标题",
      },
      thumbnail: generalHeadingH6,
    },
  ],
  previewColumns: 2,
};
