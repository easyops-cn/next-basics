import { Story } from "../../../interfaces";
import doc from "../../../docs/forms/input-with-unit.md";

const story: Story = {
  storyId: "forms.input-with-unit",
  type: "brick",
  author: "ice",
  text: {
    en: "Input with unit",
    zh: "带有单位选择的输入框",
  },
  description: {
    en: "output value with unit",
    zh: "根据单位输出值",
  },
  icon: {
    lib: "fa",
    icon: "edit",
  },
  conf: [
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
  doc,
};

export default story;
