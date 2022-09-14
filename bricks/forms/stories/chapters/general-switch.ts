import { Story } from "@next-core/brick-types";
import { generalSwitchSvg } from "../images";
export const generalSwitch: Story = {
  storyId: "forms.general-switch",
  category: "form-input-basic",
  type: "brick",
  author: "ice",
  text: {
    en: "Switch",
    zh: "开关",
  },
  description: {
    en: "general switch",
    zh: "通用的开关",
  },
  icon: {
    imgSrc: generalSwitchSvg,
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          enabled: false,
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
              brick: "forms.general-switch",
              properties: {
                name: "enabled",
                label: "启用采集",
                size: "default",
                dataset: {
                  testid: "basic-usage-demo",
                },
              },
              events: {
                "general.switch.change": {
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
