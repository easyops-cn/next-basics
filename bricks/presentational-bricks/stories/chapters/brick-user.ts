import { Story } from "@next-core/brick-types";
import { brickUserSvg } from "../images";
export const BrickUserStory: Story = {
  storyId: "presentational-bricks.brick-user",
  category: "display-component",
  type: "brick",
  author: "ice",
  text: {
    en: "username element",
    zh: "展示用户名",
  },
  description: {
    en: "display user avatar and user name",
    zh: "展示用户头像加用户名",
  },
  icon: {
    imgSrc: brickUserSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.brick-user",
      properties: {
        userNameOrId: "alrenhuang",
        size: "large",
      },
    },
    {
      brick: "presentational-bricks.brick-user",
      properties: {
        userNameOrId: "5c6bbc5010976",
      },
    },
    {
      brick: "presentational-bricks.brick-user",
      properties: {
        userNameOrId: "easyops",
        iconUrl: "assets/favicon.png",
        hideUsername: true,
      },
    },
  ],
  previewColumns: 2,
};
