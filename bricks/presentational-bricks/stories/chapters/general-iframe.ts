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
        src: "http://192.168.100.162/next",
      },
      events: {
        "general-iframe.loaded": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.general-iframe",
      properties: {
        messageOrigin: "http://192.168.100.163",
        enableMessageSubscribe: true,
        src: "http://192.168.100.163/next",
      },
      events: {
        "iframe.message": {
          action: "console.log",
        },
      },
    },
  ],
};
