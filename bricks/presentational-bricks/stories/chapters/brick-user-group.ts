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
    en: "effectively presents a collection of user avatars. Its primary function is to display a group of user identities in a user-friendly manner, with optional configurations to enhance the visual presentation",
    zh: "展示一组用户头像,以友好的方式呈现用户身份的集合，并通过可选配置增强视觉效果",
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
