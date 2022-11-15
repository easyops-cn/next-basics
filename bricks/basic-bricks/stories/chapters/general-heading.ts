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
            text: "h1标题",
            type: "h1",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h1]",
      title: {
        en: "h1 heading",
        zh: "h1标题",
      },
      thumbnail: generalHeadingH1,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "h2标题",
            type: "h2",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h2]",
      title: {
        en: "h2 heading",
        zh: "h2标题",
      },
      thumbnail: generalHeadingH2,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "h3标题",
            type: "h3",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h3]",
      title: {
        en: "h3 heading",
        zh: "h3标题",
      },
      thumbnail: generalHeadingH3,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "h4标题",
            type: "h4",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h4]",
      title: {
        en: "h4 heading",
        zh: "h4标题",
      },
      thumbnail: generalHeadingH4,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "h5标题",
            type: "h5",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h5]",
      title: {
        en: "h5标题 heading",
        zh: "h5标题",
      },
      thumbnail: generalHeadingH5,
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-heading",
          properties: {
            text: "h6标题",
            type: "h6",
          },
        },
      ],
      snippetId: "basic-bricks.general-heading[h6]",
      title: {
        en: "h6 heading",
        zh: "h6标题",
      },
      thumbnail: generalHeadingH6,
    },
  ],
  previewColumns: 2,
};
