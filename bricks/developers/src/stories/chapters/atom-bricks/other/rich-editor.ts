import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "rich-editor.easy-editor",
  category: "form-input-advanced",
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
      bricks: [
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
      ],
      snippetId: "rich-editor.easy-editor[basic]",
      title: {
        en: "Basic Easy Editor",
        zh: "基本富文本编辑",
      },
      message: {
        en: "Basic use",
        zh: "基本使用",
      },
    },
    {
      bricks: [
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
      snippetId: "rich-editor.easy-editor[inline]",
      title: {
        en: "Inline Easy Editor",
        zh: "单行富文本编辑",
      },
    },
  ],
};
