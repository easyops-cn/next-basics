import { Story } from "@next-core/brick-types";

export const autoCompleteStory: Story = {
  storyId: "forms.general-auto-complete",
  category: "form-input",
  type: "brick",
  author: "ice",
  text: {
    en: "Auto Complete",
    zh: "自动补全",
  },
  description: {
    en: "an auto-complete input",
    zh: "输入框自动完成功能",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: {
    brick: "forms.general-form",
    properties: {
      values: {
        category: "f5",
      },
    },
    events: {
      "validate.success": {
        action: "console.log",
        args: ["${EVENT.type}", "${EVENT.detail}"],
      },
      "validate.error": {
        action: "console.warn",
        args: ["${EVENT.type}", "${EVENT.detail}"],
      },
    },
    slots: {
      items: {
        type: "bricks",
        bricks: [
          {
            brick: "forms.general-auto-complete",
            properties: {
              name: "category",
              label: "二级分类",
              labelTooltip: "auto complete",
              required: true,
              placeholder: "请输入",
              options: ["网络设备", "存储", "IP管理"],
            },
            events: {
              "general.auto-complete.change": {
                action: "console.log",
                args: ["auto-complete", "${EVENT.detail}"],
              },
            },
          },
          {
            brick: "forms.general-buttons",
            properties: {
              showCancelButton: true,
              submitText: "提交",
              cancelText: "取消",
            },
            events: {
              "submit.button.click": {
                action: "console.log",
              },
              "cancel.button.click": {
                action: "console.log",
              },
            },
          },
        ],
      },
    },
  },
};
