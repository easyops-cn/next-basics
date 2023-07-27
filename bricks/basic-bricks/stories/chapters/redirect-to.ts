import { Story } from "@next-core/brick-types";
import { redirectToSvg } from "../images";

export const redirectToStory: Story = {
  storyId: "basic-bricks.redirect-to",
  category: "other",
  type: "brick",
  author: "steve",
  text: {
    en: "redirection brick",
    zh: "重定向构件",
  },
  description: {
    en: "Tool brick for redirection",
    zh: "用于重定向的工具构件",
  },
  icon: {
    imgSrc: redirectToSvg,
  },
  conf: {},
};
