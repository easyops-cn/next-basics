import { Story } from "@next-core/brick-types";

export const generalButtonStory: Story = {
  storyId: "forms.general-buttons",
  type: "brick",
  category: "form-input-basic",
  author: "lynette",
  text: {
    en: "General buttons",
    zh: "表单提交按钮",
  },
  description: {
    en: "can be used in general-forms,support to set submit button and cancel button",
    zh: "用于general-forms的通用按钮，可以配置submit按钮和cancel按钮",
  },
  icon: {
    lib: "fa",
    icon: "hockey-puck",
  },
  conf: {
    brick: "forms.general-buttons",
    properties: {
      showCancelButton: true,
      submitText: "提交",
      cancelText: "取消",
      dataset: {
        testid: "basic-usage-demo",
      },
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
};
