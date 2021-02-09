import { Story } from "@next-core/brick-types";

export const generalInputNumberStory: Story = {
  storyId: "forms.general-input-number",
  type: "brick",
  category: "form-input",
  author: "jo",
  text: {
    en: "General Input Number",
    zh: "普通数字输入框",
  },
  description: {
    en: "General Input Number",
    zh: "通用的数字输入框",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: {
    brick: "forms.general-input-number",
    properties: {
      name: "count",
      label: "数量",
      value: "12",
      placeholder: "请填写数量",
    },
    events: {
      "general.input.change": {
        action: "console.log",
        args: ["count", "${EVENT.detail}"],
      },
      "general.input.press.enter": {
        action: "console.log",
        args: ["${EVENT.detail.key}", "${EVENT.detail.keyCode}"],
      },
      "general.input.blur": {
        action: "console.log",
      },
    },
  },
};
