import { Story } from "@next-core/brick-types";
import { textCollapseNormalSvg, textCollapseSvg } from "../images";
export const TextCollapseStory: Story = {
  storyId: "presentational-bricks.text-collapse",
  category: "text",
  type: "brick",
  author: "julielai",
  text: {
    en: "text-collapse",
    zh: "可折叠文本",
  },
  description: {
    en: "displaying collapsible text content. Its primary features include the ability to set the displayed text and specify the number of lines visible when collapsed",
    zh: "主要用于展示可折叠的文本内容。它的主要特性包括可以设定展示的文本内容以及折叠后显示的行数",
  },
  icon: {
    imgSrc: textCollapseSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.text-collapse[normal]",
      title: {
        en: "",
        zh: "基础可折叠文本",
      },
      thumbnail: textCollapseNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.text-collapse",
          properties: {
            text: "This is a text-collapse.",
            line: 1,
          },
        },
      ],
    },
  ],
};
