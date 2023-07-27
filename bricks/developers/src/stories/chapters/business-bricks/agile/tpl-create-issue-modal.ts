import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/tpl-create-issue-modal.md";

export const story: Story = {
  storyId: "agile.tpl-create-issue-modal",
  type: "brick",
  author: "alren",
  text: {
    en: "issue create modal",
    zh: "新建ISSUE弹框模板"
  },
  icon: {
    lib: "fa",
    icon: "comments",
    prefix: "fas"
  },
  description: {
    en: "issue create modal",
    zh: "封装了标准issue新建的弹框"
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "click"
              },
              events: {
                "general.button.click": [
                  {
                    target: "agile\\.tpl-create-issue-modal",
                    method: "setInitValue",
                    args: [
                      {
                        author: "${SYS.userInstanceId}",
                        title: "create demo"
                      }
                    ]
                  },
                  {
                    target: "agile\\.tpl-create-issue-modal",
                    properties: {
                      staticValues: {
                        step: "to-be-developed"
                      }
                    }
                  },
                  {
                    target: "agile\\.tpl-create-issue-modal",
                    method: "open"
                  }
                ]
              }
            },
            {
              brick: "agile.tpl-create-issue-modal",
              slots: {
                endItems: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "custom",
                        label: "自定义",
                        placeholder: "通过插槽额外添加的表单项"
                      }
                    }
                  ]
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
