import { Story } from "@next-core/brick-types";

export const generalTextareaStory: Story = {
  storyId: "forms.general-textarea",
  category: "form-input-basic",
  type: "brick",
  author: "ice",
  text: {
    en: "Text Area",
    zh: "多行文本输入框",
  },
  description: {
    en: "autoSize, value and placeholder configurable",
    zh: "可支持配置 autoSize, value 和 placeholder",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: {
    brick: "forms.general-form",
    slots: {
      items: {
        type: "bricks",
        bricks: [
          {
            brick: "forms.general-textarea",
            properties: {
              name: "description",
              label: "描述",
              value: "This is a long description",
              placeholder: "请填写描述",
              autoSize: { minRows: 3, maxRows: 8 },
              required: true,
              max: 10,
              message: {
                required: "请输入内容",
                max: "最长长度限制，10",
              },
              dataset: {
                testid: "basic-usage-demo",
              },
            },
            events: {
              "general.textarea.blur": {
                action: "console.log",
              },
              "general.textarea.change": {
                action: "console.log",
                args: ["description", "${EVENT.detail}"],
              },
            },
          },
        ],
      },
    },
  },
};
