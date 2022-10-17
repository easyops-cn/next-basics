import { Story } from "@next-core/brick-types";
import { textCollapseSvg } from "../images";
export const TextCollapseStory: Story = {
  storyId: "presentational-bricks.text-collapse",
  category: "data-view",
  type: "brick",
  author: "julielai",
  text: {
    en: "text-collapse",
    zh: "可折叠文本",
  },
  description: {
    en: "copyable text component",
    zh: "可折叠文本",
  },
  icon: {
    imgSrc: textCollapseSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.text-collapse",
      properties: {
        text: "This is a text-collapse.",
        line: 1,
      },
    },
  ],
};
