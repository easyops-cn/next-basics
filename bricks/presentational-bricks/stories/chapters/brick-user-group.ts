import { Story } from "@next-core/brick-types";
import { brickUserSvg } from "../images";
export const BrickUserGroupStory: Story = {
  storyId: "presentational-bricks.brick-user-group",
  category: "display-component",
  type: "brick",
  author: "dophi",
  text: {
    en: "user group element",
    zh: "展示一组用户",
  },
  description: {
    en: "display user avatar and user name group",
    zh: "展示一组用户头像加用户名",
  },
  icon: {
    imgSrc: brickUserSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.brick-user-group",
      properties: {
        userNameOrIds: ["alrenhuang", "5c6bbc5010976", "easyops", "youngxu"],
        displayShowKey: true,
        configProps: {
          maxCount: 2,
          size: "small",
        },
      },
    },
  ],
  previewColumns: 2,
};
