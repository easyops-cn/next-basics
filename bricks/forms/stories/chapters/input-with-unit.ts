import { Story } from "@next-core/brick-types";
import { inputWithUnit } from "../images";
export const inputWithUnitStory: Story = {
  storyId: "forms.input-with-unit",
  category: "form-input-basic",
  type: "brick",
  author: "ice",
  text: {
    en: "Input with unit",
    zh: "输入框-带单位选择",
  },
  description: {
    en: "output value with unit",
    zh: "根据单位输出值",
  },
  icon: {
    imgSrc: inputWithUnit,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.input-with-unit",
          events: {
            "general.input-with-unit.change": {
              action: "console.log",
            },
          },
          properties: {
            inputBoxStyle: {
              width: "400px",
            },
            label: "间隔时间",
            name: "interval",
            placeholder: "please input a number",
            required: true,
            unit: "s",
            unitType: "time",
          },
        },
      ],
      snippetId: "forms.input-with-unit[basic]",
      title: {
        en: "Basic Input with Unit",
        zh: "基础带单位选择输入框",
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          interval: 100,
          timeout: 90,
          limitUnit: 15,
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.detail}"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.input-with-unit",
              properties: {
                name: "interval",
                label: "采集频率",
                required: true,
                placeholder: "please input a number",
                unit: "s",
                unitType: "time",
                inputBoxStyle: { width: "400px" },
              },
              events: {
                "general.input-with-unit.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.input-with-unit",
              properties: {
                name: "timeout",
                label: "超时时间",
                required: true,
                placeholder: "please input a number",
                precision: 2,
                availableUnits: ["s", "min", "hour"],
                unit: "s",
                unitType: "time",
                inputBoxStyle: { width: "400px" },
              },
              events: {
                "general.input-with-unit.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.input-with-unit",
              properties: {
                name: "limitUnit",
                label: "限制单位",
                required: true,
                placeholder: "please input a number",
                precision: 2,
                availableUnits: ["min"],
                unit: "s",
                unitType: "time",
                inputBoxStyle: { width: "400px" },
              },
              events: {
                "general.input-with-unit.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                submitText: "提交",
              },
            },
          ],
        },
      },
    },
  ],
};
