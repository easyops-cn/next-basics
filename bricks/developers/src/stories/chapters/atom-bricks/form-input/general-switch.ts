import doc from "../../../docs/forms/general-switch.md";
import { Story } from "../../../interfaces";

const story: Story = {
  storyId: "forms.general-switch",
  type: "brick",
  author: "ice",
  text: {
    en: "General Switch",
    zh: "普通开关"
  },
  description: {
    en: "general switch",
    zh: "通用的开关"
  },
  icon: {
    lib: "fa",
    icon: "lock"
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          enabled: false
        }
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.detail}"]
        }
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
                size: "default"
              },
              events: {
                "general.switch.change": {
                  action: "console.log"
                }
              }
            },
            {
              brick: "forms.general-buttons",
              properties: {
                submitText: "提交"
              }
            }
          ]
        }
      }
    }
  ],
  doc
};

export default story;
