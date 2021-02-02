import { Story } from "@next-core/brick-types";
export const GeneralImageStory: Story = {
  storyId: "presentational-bricks.general-image",
  category: "data-view",
  type: "brick",
  author: "Lynette",
  text: {
    en: "General Image",
    zh: "图片展示构件",
  },
  tags: [],
  description: {
    en: "Image brick that supports preview",
    zh: "支持预览的图片展示构件",
  },
  icon: {
    lib: "fa",
    icon: "image",
    prefix: "fas",
    color: "#167be0",
  },
  conf: [
    {
      brick: "presentational-bricks.general-image",
      properties: {
        imgSrc:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        imgWidth: 200,
      },
    },
  ],
};
