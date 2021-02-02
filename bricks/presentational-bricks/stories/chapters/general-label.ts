import { Story } from "@next-core/brick-types";

export const GeneralLabelStory: Story = {
  storyId: "presentational-bricks.general-label",
  category: "value-mapping",
  type: "brick",
  author: "lynette",
  text: {
    en: "general label",
    zh: "通用 label",
  },
  description: {
    en:
      "Display label,prefix icon and suffix icon.Support for configuration click event and url.",
    zh:
      "可用来展示基本文案、前后缀图标，可配置点击事件和 url 的通用 label 构件",
  },
  icon: {
    lib: "antd",
    type: "book",
    theme: "filled",
  },
  conf: [
    {
      brick: "presentational-bricks.general-label",
      properties: {
        suffixIcon: {
          lib: "antd",
          icon: "calendar",
          theme: "outlined",
          color: "#0071eb",
        },
        text: "2020-03-14",
      },
      events: {
        "label.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.general-label",
      properties: {
        prefixIcon: {
          lib: "antd",
          icon: "tag",
          theme: "outlined",
        },
        text: "1.0.0",
        url: "/1",
      },
      events: {
        "label.click": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
