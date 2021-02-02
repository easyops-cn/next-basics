import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "rich-editor.easy-editor",
  type: "brick",
  author: "jo",
  text: {
    en: "Rich Editor",
    zh: "富文本编辑构件",
  },
  description: {
    en: "Support some common editing operations",
    zh: "支持一些常用的编辑操作",
  },
  icon: {
    lib: "antd",
    type: "code",
  },
  conf: [
    {
      brick: "rich-editor.easy-editor",
      properties: {
        data: "<p>rich editor</p>",
        useEasyImage: {
          bucketName: "lytest",
        },
      },
      events: {
        "editor.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
      },
    },
    {
      brick: "rich-editor.easy-editor",
      properties: {
        type: "inline",
        data: "<p>rich editor</p>",
      },
      events: {
        "editor.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
      },
    },
  ],
};
