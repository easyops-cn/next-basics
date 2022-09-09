import { Story } from "@next-core/brick-types";

export const autoCompleteStory: Story = {
  storyId: "forms.general-auto-complete",
  category: "form-input-basic",
  type: "brick",
  author: "ice",
  text: {
    en: "Input box with candidates",
    zh: "带候选项的输入框",
  },
  description: {
    en: "an auto-complete input",
    zh: "输入框自动完成功能",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.general-form",
      description: {
        title: "基本使用",
      },
      properties: {
        values: {
          category: "f5",
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
        "validate.error": {
          action: "console.warn",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-auto-complete",
              properties: {
                dataset: { testid: "basic-usage-demo" },
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
                  args: ["auto-complete", "<% EVENT.detail %>"],
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
    {
      brick: "forms.general-form",
      description: {
        title: "禁用",
      },
      properties: {
        values: {
          category: "f5",
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
        "validate.error": {
          action: "console.warn",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-auto-complete",
              properties: {
                dataset: { testid: "basic-usage-demo" },
                name: "category",
                label: "二级分类",
                labelTooltip: "auto complete",
                required: true,
                placeholder: "请输入",
                options: ["网络设备", "存储", "IP管理"],
                disabled: true,
              },
              events: {
                "general.auto-complete.change": {
                  action: "console.log",
                  args: ["auto-complete", "<% EVENT.detail %>"],
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
  ],
};
