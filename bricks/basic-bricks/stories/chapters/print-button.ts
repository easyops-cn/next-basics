import { Story } from "@next-core/brick-types";
import { printButtonSvg } from "../images";

export const printButtonStory: Story = {
  storyId: "basic-bricks.print-button",
  category: "other",
  type: "brick",
  author: "momo",
  text: {
    en: "print button",
    zh: "打印按钮",
  },
  description: {
    en: "Tool brick for print button",
    zh: "触发打开浏览器的打印窗口",
  },
  icon: {
    imgSrc: printButtonSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.print-button",
          properties: {
            prefixTitle: "IT资源统计大屏",
            backgroundColor: "rgb(0, 249, 253)",
            color: "white",
            border: "none",
            bottom: "15px",
            right: "10px",
          },
        },
      ],
      snippetId: "basic-bricks.print-button[basic]",
      title: {
        en: "Basic Print Button",
        zh: "基础打印按钮",
      },
    },
  ],
};
