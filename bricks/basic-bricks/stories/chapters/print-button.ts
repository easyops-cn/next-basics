import { Story } from "@next-core/brick-types";

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
    lib: "fa",
    icon: "print",
  },
  conf: {
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
};
