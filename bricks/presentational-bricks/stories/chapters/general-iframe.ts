import { Story } from "@next-core/brick-types";

export const GeneralIframeStory: Story = {
  storyId: "presentational-bricks.general-iframe",
  category: "other",
  type: "brick",
  author: "jo",
  text: {
    en: "General Iframe",
    zh: "普通 iframe",
  },
  description: {
    en: "Embeddable On External Websites",
    zh: "可嵌入外部网站通用构件",
  },
  icon: {
    lib: "fa",
    icon: "external-link-square-alt",
  },
  conf: [
    {
      brick: "presentational-bricks.general-iframe",
      properties: {
        src: "https://www.baidu.com",
      },
      events: {
        "general-iframe.loaded": {
          action: "console.log",
        },
      },
    },
  ],
};
