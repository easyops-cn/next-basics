import { Story } from "@next-core/brick-types";
import { generalInputNumberBasicSvg, generalInputNumberSvg } from "../images";
export const generalInputNumberStory: Story = {
  storyId: "forms.general-input-number",
  type: "brick",
  category: "form-input-basic",
  author: "jo",
  text: {
    en: "Input Number",
    zh: "数字输入框",
  },
  description: {
    en: "General Input Number",
    zh: "通用的数字输入框",
  },
  icon: {
    imgSrc: generalInputNumberSvg,
  },
  conf: [
    {
      bricks: [
        {
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
      ],
      snippetId: "forms.general-input-number[basic]",
      title: {
        en: "Basic General Input Number",
        zh: "基础数字输入框",
      },
      thumbnail: generalInputNumberBasicSvg,
    },
  ],
};
