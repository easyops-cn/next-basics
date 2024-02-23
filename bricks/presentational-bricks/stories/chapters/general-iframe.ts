import { Story } from "@next-core/brick-types";
import { generalIframeSvg } from "../images";
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
    en: "This brick allows the embedding of websites within an iframe and provides various options to interact with the iframe content",
    zh: "该构件可以在iframe中嵌入网站，并提供多种与iframe内容交互的选项",
  },
  icon: {
    imgSrc: generalIframeSvg,
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
