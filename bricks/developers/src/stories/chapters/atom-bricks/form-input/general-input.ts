import doc from "../../../docs/forms/general-input.md";
import { Story } from "../../../interfaces";

const story: Story = {
  storyId: "forms.general-input",
  type: "brick",
  author: "steve",
  text: {
    en: "General Input",
    zh: "普通输入框"
  },
  description: {
    en: "",
    zh: ""
  },
  icon: {
    lib: "fa",
    icon: "pen"
  },
  conf: [
    {
      brick: "forms.general-input",
      properties: {
        name: "username",
        type: "email",
        label: "邮箱",
        value: "test",
        placeholder: "请输入邮箱地址"
      },
      events: {
        "general.input.change": {
          action: "console.log",
          args: ["username", "${EVENT.detail}"]
        },
        "general.input.blur": {
          action: "console.log"
        }
      }
    },
    {
      brick: "forms.general-form",
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-input",
              properties: {
                name: "production",
                type: "text",
                label: "产品",
                pattern: "\\w{10}",
                required: true,
                message: {
                  required: "请输入相应产品",
                  pattern: "包含下划线，a-z 和 0-9最少10个字符"
                }
              },
              events: {
                "general.input.change": {
                  action: "console.log",
                  args: ["production", "${EVENT.detail}"]
                },
                "general.input.press.enter": {
                  action: "console.log",
                  args: ["${EVENT.detail.key}", "${EVENT.detail.keyCode}"]
                }
              }
            },
            {
              brick: "forms.general-input",
              properties: {
                name: "url",
                type: "url",
                label: "url",
                value: "",
                placeholder: "请输入url",
                addonBefore: "Http://",
                addonAfter: ".com"
              },
              events: {
                "general.input.change": {
                  action: "console.log",
                  args: ["username", "${EVENT.detail}"]
                },
                "general.input.blur": {
                  action: "console.log"
                }
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
