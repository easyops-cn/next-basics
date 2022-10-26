import { Story } from "@next-core/brick-types";
import { generalImageSvg } from "../images";
export const GeneralImageStory: Story = {
  storyId: "presentational-bricks.general-image",
  category: "display-component",
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
    imgSrc: generalImageSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-image[normal]",
      title: {
        en: "基本图片展示构件",
        zh: "",
      },
      bricks: [
        {
          description: {
            title: "基本用法",
          },
          brick: "presentational-bricks.general-image",
          properties: {
            imgSrc:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            imgWidth: 200,
          },
        },
      ],
    },
    {
      description: {
        title: "调用 open() 打开预览",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "open()",
              },
              events: {
                "general.button.click": [
                  {
                    target: "#image-to-preview",
                    method: "open",
                  },
                ],
              },
            },
            {
              brick: "presentational-bricks.general-image",
              properties: {
                id: "image-to-preview",
                hidden: true,
                imgSrc:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                imgWidth: 200,
              },
            },
          ],
        },
      },
    },
  ],
};
