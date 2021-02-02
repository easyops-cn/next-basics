import { Story } from "../../../interfaces";
import docMD from "../../../docs/forms/inform-methods-form.md";

export const story: Story = {
  storyId: "forms.inform-methods-form",
  type: "brick",
  author: "cyril",
  text: {
    en: "inform-methods-form",
    zh: "通知方式多选框"
  },
  description: {
    en: "select inform methods by checkbox",
    zh: "选择通知方式"
  },
  icon: {
    lib: "fa",
    icon: "pen"
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          inform_methods: ["phone", "email"]
        }
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.inform-methods-form",
              properties: {
                name: "inform_methods",
                label: "通知方式",
                required: true
              }
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消"
              },
              events: {
                "submit.button.click": {
                  action: "console.log"
                },
                "cancel.button.click": {
                  action: "console.log"
                }
              }
            }
          ]
        }
      }
    }
  ],
  doc: docMD
};

export default story;
