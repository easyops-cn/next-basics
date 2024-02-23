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
    en: "providing an efficient way to present user information. It supports a variety of customizable properties to control the appearance of the user avatar, username, and other user-related elements",
    zh: "展示用户头像信息，支持多种可定制属性，用于控制用户头像、用户名的显示以及其他相关元素的呈现",
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
